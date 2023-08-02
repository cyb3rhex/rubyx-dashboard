package utils

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"time"

	"github.com/aituglo/rubyx-dashboard/golang/db"
	"github.com/aituglo/rubyx-dashboard/golang/env"
)

type ProgramsInfosH1 struct {
	NextPage bool
	Programs []interface{}
}

func GetJWTH1(platform *db.Platform) (string, error) {
	// There is no JWT on hackerone, use this method to make sure the login is valid
	response, err := apiRequestH1(platform, "https://api.hackerone.com/v1/hackers/me/reports")
	if err != nil {
		fmt.Println(err)
		return "", err
	}
	if response.StatusCode != 200 {
		return "", nil
	}
	platform.Jwt = platform.Password

	return platform.Jwt, nil
}

func GetUsernameH1(platform *db.Platform) (string, error) {
	jwt, err := GetJWTH1(platform)
	if err != nil {
		fmt.Println(err)
		return "", err
	}
	if jwt == "" {
		fmt.Println(err)
		return "", nil
	}

	return platform.HunterUsername, err
}

func UpdateProgramsH1(platform *db.Platform, pageID int, env env.Env) {
	jwt, err := GetJWTH1(platform)
	if err != nil {
		return
	}
	if jwt == "" {
		return
	}
	programsInfos := GetProgramsInfosH1(platform, pageID)
	if err != nil {
		return
	}
	log.Println(programsInfos.NextPage)
	if programsInfos == nil {
		return
	}
	ParseProgramsH1(programsInfos.Programs, platform, env)
	if programsInfos.NextPage {
		UpdateProgramsH1(platform, pageID+1, env)
	}
}

func GetProgramsInfosH1(platform *db.Platform, pageID int) *ProgramsInfosH1 {
	response, err := apiRequestH1(platform, fmt.Sprintf("https://api.hackerone.com/v1/hackers/programs?page[number]=%d", pageID))
	if err != nil {
		return nil
	}
	if response.StatusCode == 429 {
		time.Sleep(65 * time.Second)
		return GetProgramsInfosH1(platform, pageID)
	}
	if response.StatusCode != 200 {
		return nil
	}
	var jsonBody map[string]interface{}
	err = json.NewDecoder(response.Body).Decode(&jsonBody)
	if err != nil {
		return nil
	}
	log.Println(jsonBody["links"].(map[string]interface{})["next"])
	if jsonBody["links"].(map[string]interface{})["next"] != "" {
		return &ProgramsInfosH1{NextPage: true, Programs: jsonBody["data"].([]interface{})}
	} else {
		return &ProgramsInfosH1{NextPage: false, Programs: jsonBody["data"].([]interface{})}
	}
}

func ParseProgramsH1(programs []interface{}, platform *db.Platform, env env.Env) {
	for _, program := range programs {
		var public db.ProgramType
		programMap := program.(map[string]interface{})
		submissionState := programMap["attributes"].(map[string]interface{})["submission_state"].(string)

		if submissionState != "open" {
			continue
		}

		slug := programMap["attributes"].(map[string]interface{})["handle"].(string)
		name := programMap["attributes"].(map[string]interface{})["name"].(string)
		vdp := !programMap["attributes"].(map[string]interface{})["offers_bounties"].(bool)

		checkPublic := programMap["attributes"].(map[string]interface{})["state"].(string)

		if checkPublic == "public_mode" {
			public = db.ProgramTypePublic
		} else {
			public = db.ProgramTypePrivate
		}

		_, err := env.DB().FindProgramBySlug(context.Background(), slug)
		if err != nil {

			env.DB().CreateProgram(context.Background(), db.CreateProgramParams{
				Name:       name,
				Slug:       slug,
				Vdp:        vdp,
				Url:        fmt.Sprintf("https://hackerone.com/%s", slug),
				Tag:        "",
				Type:       public,
				PlatformID: platform.ID,
			})
		}

		UpdateScopesH1(platform, slug, env)
	}
}

func UpdateScopesH1(platform *db.Platform, slug string, env env.Env) {
	scopeInfos := GetScopeInfosH1(platform, slug)
	if scopeInfos == nil || len(scopeInfos) == 0 {
		return
	}

	ParseScopesH1(scopeInfos, slug, platform, env)
}

func GetScopeInfosH1(platform *db.Platform, slug string) []interface{} {
	response, _ := apiRequestH1(platform, "https://api.hackerone.com/v1/hackers/programs/"+slug)
	if response != nil && response.StatusCode == 429 {
		time.Sleep(65 * time.Second)
		return GetScopeInfosH1(platform, slug)
	}

	if response == nil || response.StatusCode != 200 {
		return nil
	}

	data := make(map[string]interface{})
	json.NewDecoder(response.Body).Decode(&data)

	return data["relationships"].(map[string]interface{})["structured_scopes"].(map[string]interface{})["data"].([]interface{})
}

func ParseScopesH1(scopes []interface{}, slug string, platform *db.Platform, env env.Env) {
	program, err := env.DB().FindProgramBySlug(context.Background(), slug)
	if err != nil {
		fmt.Println(err)
	}
	for _, scope := range scopes {
		scopeMap := scope.(map[string]interface{})
		attributes := scopeMap["attributes"].(map[string]interface{})

		if !attributes["eligible_for_submission"].(bool) {
			continue
		}

		endpoint := attributes["asset_identifier"].(string)
		scopeType := attributes["asset_type"].(string)
		if scopeType != "URL" {
			continue
		}

		if _, err := env.DB().GetScopeByProgramIDAndScope(context.Background(), db.GetScopeByProgramIDAndScopeParams{
			ProgramID: program.ID,
			Scope:     endpoint,
		}); err != nil {
			if _, err := env.DB().CreateScope(context.Background(), db.CreateScopeParams{
				Scope:     endpoint,
				ScopeType: scopeType,
				ProgramID: program.ID,
			}); err != nil {
				fmt.Println(err)
			}
		}
	}
}

func GetReportsH1(platform *db.Platform, env env.Env) {
	response, _ := apiRequestH1(platform, "https://api.hackerone.com/v1/hackers/me/reports")
	if response.StatusCode != 200 {
		fmt.Println(response.StatusCode)
		return
	}

	data := make(map[string]interface{})
	json.NewDecoder(response.Body).Decode(&data)

	parseReportsH1(data["data"].([]interface{}), platform, env)
}

func parseReportsH1(reports []interface{}, platform *db.Platform, env env.Env) {
	for _, report := range reports {
		reportMap := report.(map[string]interface{})

		finalReport := make(map[string]interface{})
		finalReport["report_id"] = reportMap["id"].(string)
		finalReport["collab"] = false

		if reportMap["attributes"].(map[string]interface{})["bounty_awarded_at"] != nil {
			finalReport["reward"] = getReportRewardH1(platform, finalReport["report_id"].(string))
		} else {
			finalReport["reward"] = 0.0
		}

		finalReport["report_title"] = reportMap["attributes"].(map[string]interface{})["title"].(string)

		finalReport["report_status"] = reportMap["attributes"].(map[string]interface{})["state"].(string)

		finalReport["currency"] = "USD"

		currentReport, err := env.DB().FindStatByReportID(context.Background(), finalReport["report_id"].(string))
		if err != nil {
			reportDate, err := time.Parse("2006-01-02T15:04:05Z", reportMap["attributes"].(map[string]interface{})["created_at"].(string))
			if err != nil {
				fmt.Println(err)
			}

			finalReport["severity"] = reportMap["relationships"].(map[string]interface{})["severity"].(map[string]interface{})["data"].(map[string]interface{})["attributes"].(map[string]interface{})["rating"].(string)

			finalReport["platform_id"] = platform.ID

			env.DB().CreateStat(context.Background(), db.CreateStatParams{
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
			finalReport["severity"] = reportMap["relationships"].(map[string]interface{})["severity"].(map[string]interface{})["data"].(map[string]interface{})["attributes"].(map[string]interface{})["rating"].(string)

			env.DB().UpdateStat(context.Background(), db.UpdateStatParams{
				ID:           currentReport.ID,
				ReportID:     finalReport["report_id"].(string),
				ReportTitle:  finalReport["report_title"].(string),
				Severity:     finalReport["severity"].(string),
				Reward:       float32(finalReport["reward"].(float64)),
				Collab:       finalReport["collab"].(bool),
				ReportStatus: finalReport["report_status"].(string),
			})
		}

	}
}

func getReportRewardH1(platform *db.Platform, reportID string) float64 {
	response, _ := apiRequestH1(platform, fmt.Sprintf("https://api.hackerone.com/v1/hackers/reports/%s", reportID))

	if response.StatusCode != 200 {
		return 0
	}

	var data map[string]interface{}
	json.NewDecoder(response.Body).Decode(&data)

	var activities = data["data"].(map[string]interface{})["relationships"].(map[string]interface{})["activities"].(map[string]interface{})["data"].([]interface{})
	var reward float64 = 0

	for _, activity := range activities {
		if activity.(map[string]interface{})["type"].(string) == "activity-bounty-awarded" {
			bounty_amount, err := strconv.ParseFloat(activity.(map[string]interface{})["attributes"].(map[string]interface{})["bounty_amount"].(string), 64)
			if err != nil {
				fmt.Println(err)
			}
			bonus_amount, err := strconv.ParseFloat(activity.(map[string]interface{})["attributes"].(map[string]interface{})["bonus_amount"].(string), 64)
			if err != nil {
				fmt.Println(err)
			}
			reward = bounty_amount + bonus_amount
		}
	}

	return reward

}

func apiRequestH1(platform *db.Platform, url string) (*http.Response, error) {
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return nil, fmt.Errorf("failed to create request: %w", err)
	}

	req.SetBasicAuth(platform.HunterUsername, platform.Password)
	req.Header.Set("Accept", "application/json")

	client := http.DefaultClient
	resp, err := client.Do(req)
	if err != nil {
		return nil, fmt.Errorf("failed to make request: %w", err)
	}

	return resp, nil
}
