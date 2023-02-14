package utils

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
	"time"

	"github.com/aituglo/rubyx/golang/db"
	"github.com/aituglo/rubyx/golang/env"
	"github.com/pquerna/otp/totp"
)

type ProgramsInfosYWH struct {
	NbPages  int
	Programs []interface{}
}

type ProgramResponse struct {
	Title  string   `json:"title"`
	Slug   string   `json:"slug"`
	Vdp    string   `json:"vdp"`
	Scopes []string `json:"scopes"`
}

func GetJWTYWH(platform *db.Platform) (string, error) {
	if platform.Jwt != "" && time.Since(platform.UpdatedAt) <= 3500*time.Second {
		return platform.Jwt, nil
	}

	totpToken, err := GetTOTPTokenYWH(platform)
	if err != nil {
		fmt.Println(err)
		return "", err
	}

	jwtToken, err := GetJWTTokenYWH(platform, totpToken)
	if err != nil {
		fmt.Println(err)
		return "", err
	}

	platform.Jwt = jwtToken
	platform.UpdatedAt = time.Now()

	return jwtToken, nil
}

func GetTOTPTokenYWH(platform *db.Platform) (string, error) {
	data := map[string]string{
		"email":    platform.Email,
		"password": platform.Password,
	}
	jsonData, err := json.Marshal(data)
	if err != nil {
		return "", err
	}

	response, err := apiPostRequestYWH("https://api.yeswehack.com/login", jsonData, platform)
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

func GetJWTTokenYWH(platform *db.Platform, totpToken string) (string, error) {
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

	response, err := apiPostRequestYWH("https://api.yeswehack.com/account/totp", jsonData, platform)
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

func GetUsernameYWH(platform *db.Platform) (string, error) {
	_, err := GetJWTYWH(platform)
	if err != nil {
		return "", err
	}

	response, err := apiGetRequestYWH("https://api.yeswehack.com/user", platform)
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

func UpdateProgramsYWH(platform *db.Platform, pageID int, env env.Env, ctx context.Context) {
	GetJWTYWH(platform)

	programsInfos := GetProgramsInfosYWH(platform, pageID)
	if programsInfos == nil {
		return
	}

	ParseProgramsYWH(programsInfos.Programs, platform, env, ctx)
	if pageID+1 <= programsInfos.NbPages {
		UpdateProgramsYWH(platform, pageID+1, env, ctx)
	}
}

func GetProgramsInfosYWH(platform *db.Platform, pageID int) *ProgramsInfosYWH {
	response, err := apiGetRequestYWH(fmt.Sprintf("https://api.yeswehack.com/programs?page=%d", pageID), platform)
	if err != nil || response == nil || response.StatusCode != 200 {
		return nil
	}

	jsonBody := make(map[string]interface{})
	json.NewDecoder(response.Body).Decode(&jsonBody)

	nbPages := int(jsonBody["pagination"].(map[string]interface{})["nb_pages"].(float64))
	programs := jsonBody["items"].([]interface{})

	return &ProgramsInfosYWH{
		NbPages:  nbPages,
		Programs: programs,
	}
}

func ParseProgramsYWH(programs []interface{}, platform *db.Platform, env env.Env, ctx context.Context) {
	for _, program := range programs {
		programMap := program.(map[string]interface{})

		_, err := env.DB().FindProgramBySlug(ctx, programMap["slug"].(string))
		if err != nil {

			programType := db.ProgramTypePrivate
			if programMap["public"].(bool) {
				programType = db.ProgramTypePublic
			}

			programUrl := fmt.Sprintf("https://yeswehack.com/programs/%s", programMap["slug"].(string))

			_, err := env.DB().CreateProgram(ctx, db.CreateProgramParams{
				Name:       programMap["title"].(string),
				Slug:       programMap["slug"].(string),
				Vdp:        programMap["vdp"].(bool),
				Url:        programUrl,
				Tag:        "",
				Type:       programType,
				PlatformID: platform.ID,
			})

			if err != nil {
				fmt.Println(err)
			}

		}

		// And in any case we update the scopes of the program
		UpdateScopesYWH(platform, programMap["slug"].(string), env, ctx)
	}
}

func UpdateScopesYWH(platform *db.Platform, slug string, env env.Env, ctx context.Context) {
	scopeInfos := GetScopeInfosYWH(platform, slug)
	if scopeInfos == nil || len(scopeInfos) == 0 {
		return
	}

	ParseScopesYWH(scopeInfos, slug, platform, env, ctx)
}

func GetScopeInfosYWH(platform *db.Platform, slug string) []interface{} {
	response, err := apiGetRequestYWH(fmt.Sprintf("https://api.yeswehack.com/programs/%s", slug), platform)
	if err != nil || response == nil || response.StatusCode != 200 {
		return nil
	}

	jsonBody := make(map[string]interface{})
	json.NewDecoder(response.Body).Decode(&jsonBody)

	return jsonBody["scopes"].([]interface{})
}

func ParseScopesYWH(scopes []interface{}, slug string, platform *db.Platform, env env.Env, ctx context.Context) {
	program, err := env.DB().FindProgramBySlug(ctx, slug)
	if err != nil {
		fmt.Println(err)
	}
	for _, scope := range scopes {
		scopeMap := scope.(map[string]interface{})
		scopeType := scopeMap["scope_type"].(string)

		if !strings.Contains(scopeType, "web-application") && !strings.Contains(scopeType, "api") {
			continue
		}

		scope := db.GetScopeByProgramIDAndScopeParams{
			ProgramID: program.ID,
			Scope:     scopeMap["scope"].(string),
		}

		_, err := env.DB().GetScopeByProgramIDAndScope(ctx, scope)

		if err != nil {
			_, err := env.DB().CreateScope(ctx, db.CreateScopeParams{
				Scope:     scopeMap["scope"].(string),
				ScopeType: scopeType,
				ProgramID: program.ID,
			})

			if err != nil {
				fmt.Println(err)
			}

		}

	}

}

func GetReportsYWH(platform *db.Platform, collab bool, pageID int, env env.Env, ctx context.Context) {
	apiURL := ""
	if collab {
		apiURL = fmt.Sprintf("https://api.yeswehack.com/collaborator/reports?page=%d", pageID)
	} else {
		apiURL = fmt.Sprintf("https://api.yeswehack.com/user/reports?page=%d", pageID)
	}

	response, _ := apiGetRequestYWH(apiURL, platform)
	if response == nil || response.StatusCode != 200 {
		fmt.Println(response.StatusCode)
		return
	}

	responseJSON := make(map[string]interface{})
	json.NewDecoder(response.Body).Decode(&responseJSON)
	nbPages := int(responseJSON["pagination"].(map[string]interface{})["nb_pages"].(float64))
	reports := responseJSON["items"].([]interface{})

	parseReportsYWH(reports, platform, collab, env, ctx)
	if pageID == nbPages {
		return
	}

	GetReportsYWH(platform, collab, pageID+1, env, ctx)
}

func parseReportsYWH(reports []interface{}, platform *db.Platform, collab bool, env env.Env, ctx context.Context) {
	for _, report := range reports {
		reportMap := report.(map[string]interface{})
		reportID := reportMap["id"].(float64)

		finalReport := reportsInfosYWH(reportID, collab, platform)

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
	}
}

func reportsInfosYWH(reportID float64, collab bool, platform *db.Platform) map[string]interface{} {
	response, _ := apiGetRequestYWH(fmt.Sprintf("https://api.yeswehack.com/reports/%d/logs", int(reportID)), platform)
	if response == nil || response.StatusCode != 200 {
		return nil
	}

	responseJSON := make(map[string]interface{})
	json.NewDecoder(response.Body).Decode(&responseJSON)
	reports := responseJSON["items"].([]interface{})

	return parseReportsInfosYWH(platform, reports, collab, reportID)
}

func parseReportsInfosYWH(platform *db.Platform, reports []interface{}, collab bool, reportID float64) map[string]interface{} {
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
		reportInfos["severity"] = reportSeverityYWH(platform, reportID)
	}

	return reportInfos
}

func reportSeverityYWH(platform *db.Platform, reportID float64) interface{} {
	response, _ := apiGetRequestYWH(fmt.Sprintf("https://api.yeswehack.com/reports/%d", int(reportID)), platform)
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

func apiPostRequestYWH(url string, data []byte, platform *db.Platform) (*http.Response, error) {
	req, err := http.NewRequest(http.MethodPost, url, bytes.NewBuffer(data))
	if err != nil {
		return nil, err
	}
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	return client.Do(req)
}

func apiGetRequestYWH(url string, platform *db.Platform) (*http.Response, error) {
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
