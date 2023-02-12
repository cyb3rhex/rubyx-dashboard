package utils

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/aituglo/rubyx/golang/db"
	"github.com/aituglo/rubyx/golang/env"
	"github.com/pquerna/otp/totp"
)

func GetJWT(platform *db.Platform) (string, error) {
	if platform.Jwt != "" && time.Since(platform.UpdatedAt) <= 3500*time.Second {
		return platform.Jwt, nil
	}

	totpToken, err := GetTOTPToken(platform)
	if err != nil {
		fmt.Println(err)
		return "", err
	}

	jwtToken, err := GetJWTToken(platform, totpToken)
	if err != nil {
		fmt.Println(err)
		return "", err
	}

	platform.Jwt = jwtToken
	platform.UpdatedAt = time.Now()

	return jwtToken, nil
}

func GetTOTPToken(platform *db.Platform) (string, error) {
	data := map[string]string{
		"email":    platform.Email,
		"password": platform.Password,
	}
	jsonData, err := json.Marshal(data)
	if err != nil {
		return "", err
	}

	response, err := apiPostRequest("https://api.yeswehack.com/login", jsonData, platform)
	if err != nil {
		return "", err
	}
	defer response.Body.Close()

	if response.StatusCode != 200 {
		return "", nil
	}

	var jsonResponse map[string]interface{}
	err = json.NewDecoder(response.Body).Decode(&jsonResponse)
	if err != nil {
		return "", err
	}

	totpToken, ok := jsonResponse["totp_token"].(string)
	if !ok {
		return "", nil
	}

	return totpToken, nil
}

func GetJWTToken(platform *db.Platform, totpToken string) (string, error) {
	code, err := totp.GenerateCode(platform.Otp, time.Now())
	if err != nil {
		fmt.Println("Error in generation of TOTP", err)
		return "", nil
	}

	data := map[string]interface{}{
		"token": totpToken,
		"code":  code,
	}
	jsonData, err := json.Marshal(data)
	if err != nil {
		return "", err
	}

	response, err := apiPostRequest("https://api.yeswehack.com/account/totp", jsonData, platform)
	if err != nil {
		return "", err
	}
	defer response.Body.Close()

	if response.StatusCode != 200 {
		return "", nil
	}

	var jsonResponse map[string]interface{}
	err = json.NewDecoder(response.Body).Decode(&jsonResponse)
	if err != nil {
		return "", err
	}

	jwtToken, ok := jsonResponse["token"].(string)
	if !ok {
		return "", nil
	}

	return jwtToken, nil
}

func GetUsername(platform *db.Platform) (string, error) {
	_, err := GetJWT(platform)
	if err != nil {
		return "", err
	}

	response, err := apiGetRequest("https://api.yeswehack.com/user", platform)
	if err != nil {
		return "", err
	}
	defer response.Body.Close()

	if response.StatusCode != 200 {
		return "", nil
	}

	var jsonResponse map[string]interface{}
	err = json.NewDecoder(response.Body).Decode(&jsonResponse)
	if err != nil {
		return "", err
	}

	username, ok := jsonResponse["username"].(string)
	if !ok {
		return "", nil
	}

	return username, nil
}

func GetReports(platform *db.Platform, collab bool, pageID int, env env.Env, ctx context.Context) {
	apiURL := ""
	if collab {
		apiURL = fmt.Sprintf("https://api.yeswehack.com/collaborator/reports?page=%d", pageID)
	} else {
		apiURL = fmt.Sprintf("https://api.yeswehack.com/user/reports?page=%d", pageID)
	}

	response, _ := apiGetRequest(apiURL, platform)
	if response == nil || response.StatusCode != 200 {
		fmt.Println(response.StatusCode)
		return
	}

	responseJSON := make(map[string]interface{})
	json.NewDecoder(response.Body).Decode(&responseJSON)
	nbPages := int(responseJSON["pagination"].(map[string]interface{})["nb_pages"].(float64))
	reports := responseJSON["items"].([]interface{})

	parseReports(reports, platform, collab, env, ctx)
	if pageID == nbPages {
		return
	}

	GetReports(platform, collab, pageID+1, env, ctx)
}

func parseReports(reports []interface{}, platform *db.Platform, collab bool, env env.Env, ctx context.Context) {
	for _, report := range reports {
		reportMap := report.(map[string]interface{})
		reportID := reportMap["id"].(float64)

		finalReport := reportsInfos(reportID, collab, platform)

		finalReport["report_title"] = reportMap["title"].(string)
		finalReport["report_status"] = reportMap["status"].(map[string]interface{})["workflow_state"].(string)
		finalReport["currency"] = reportMap["currency"].(string)

		currentReport, err := env.DB().FindStatByReportID(ctx, reportMap["local_id"].(string))
		if err != nil {
			finalReport["report_id"] = reportMap["local_id"].(string)
			reportDate, err := time.Parse("2006-01-02T15:04:05-07:00", reportMap["created_at"].(string))
			if err != nil {
				fmt.Println(err)
			}

			env.DB().CreateStat(ctx, db.CreateStatParams{
				ReportID:     finalReport["report_id"].(string),
				ReportTitle:  finalReport["report_title"].(string),
				Severity:     finalReport["severity"].(string),
				Reward:       float32(finalReport["reward"].(float64)),
				Currency:     finalReport["currency"].(string),
				Collab:       finalReport["collab"].(bool),
				ReportStatus: finalReport["report_status"].(string),
				ReportDate:   reportDate,
				PlatformID:   platform.ID,
			})

		} else {
			fmt.Println(currentReport)
		}

		/*

			if currentReport == nil {
				reportInfos["report_id"] = reportMap["local_id"].(string)
				reportInfos["platform_id"] = platform.ID
				reportInfos["report_date"] = time.Unix(int64(reportMap["created_at"].(float64)), 0).Format("2006-01-02")

				env.DB().CreateStat(r.Context(), db.CreateStatParams{
					ReportID:     reportInfos["report_id"],
					ReportTitle:  reportInfos["report_title"],
					Severity:     reportInfos["severity"],
					Reward:       reportInfos["reward"],
					Currency:     reportInfos["currency"],
					Collab:       reportInfos["collab"],
					ReportStatus: reportInfos["report_status"],
					ReportDate:   reportInfos["report_date"],
					PlatformID:   reportInfos["platform_id"],
				})
			} else {
				currentReport.Update(reportInfos)
			}

		*/
	}
}

func reportsInfos(reportID float64, collab bool, platform *db.Platform) map[string]interface{} {
	response, _ := apiGetRequest(fmt.Sprintf("https://api.yeswehack.com/reports/%d/logs", int(reportID)), platform)
	if response == nil || response.StatusCode != 200 {
		return nil
	}

	responseJSON := make(map[string]interface{})
	json.NewDecoder(response.Body).Decode(&responseJSON)
	reports := responseJSON["items"].([]interface{})

	return parseReportsInfos(platform, reports, collab, reportID)
}

func parseReportsInfos(platform *db.Platform, reports []interface{}, collab bool, reportID float64) map[string]interface{} {
	reportInfos := map[string]interface{}{
		"reward": 0.0,
		"collab": collab,
	}

	for _, item := range reports {
		if item == nil {
			continue
		}

		if oldCvss, ok := item.(map[string]interface{})["old_cvss"].(map[string]interface{}); ok && oldCvss["criticity"] != nil {
			reportInfos["severity"] = oldCvss["criticity"]
		}

		if newCvss, ok := item.(map[string]interface{})["new_cvss"].(map[string]interface{}); ok && newCvss["criticity"] != nil {
			reportInfos["severity"] = newCvss["criticity"]
		}

		if item.(map[string]interface{})["type"] == "collaborator-added" {
			reportInfos["collab"] = true
		}

		if item.(map[string]interface{})["type"] == "reward" && item.(map[string]interface{})["user_rewarded"].(map[string]interface{})["username"] == platform.HunterUsername {
			reportInfos["reward"] = reportInfos["reward"].(float64) + item.(map[string]interface{})["bounty_reward_amount"].(float64)/100
		}
	}

	if reportInfos["severity"] == nil {
		reportInfos["severity"] = reportSeverity(platform, reportID)
	}

	return reportInfos
}

func reportSeverity(platform *db.Platform, reportID float64) interface{} {
	response, _ := apiGetRequest(fmt.Sprintf("https://api.yeswehack.com/reports/%d", int(reportID)), platform)
	if response == nil || response.StatusCode != 200 {
		return nil
	}

	var body map[string]interface{}
	err := json.NewDecoder(response.Body).Decode(&body)
	if err != nil {
		return nil
	}

	return body["criticity"]
}

func apiPostRequest(url string, data []byte, platform *db.Platform) (*http.Response, error) {
	req, err := http.NewRequest(http.MethodPost, url, bytes.NewBuffer(data))
	if err != nil {
		return nil, err
	}
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	return client.Do(req)
}

func apiGetRequest(url string, platform *db.Platform) (*http.Response, error) {
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return nil, err
	}

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer "+platform.Jwt)

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}

	return resp, nil
}
