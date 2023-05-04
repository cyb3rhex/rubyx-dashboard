package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/aituglo/rubyx/golang/db"
	"github.com/aituglo/rubyx/golang/env"
	"github.com/aituglo/rubyx/golang/errors"

	utils "github.com/aituglo/rubyx/golang/server/utils"
	"github.com/aituglo/rubyx/golang/server/write"
)

func ReloadStats(env env.Env, user *db.User, w http.ResponseWriter, r *http.Request) http.HandlerFunc {
	if user == nil {
		return write.Error(errors.RouteUnauthorized)
	}

	platform, err := env.DB().GetPlatforms(r.Context())
	if err != nil {
		return write.Error(err)
	}

	for _, p := range platform {
		if p.Name == "yeswehack" {
			_, err := utils.GetJWTYWH(&p)
			if err != nil {
				return write.Error(errors.RouteNotFound)
			}
			utils.GetReportsYWH(&p, false, 0, env, r.Context())
			utils.GetReportsYWH(&p, true, 0, env, r.Context())
		} else if p.Name == "hackerone" {
			_, err := utils.GetJWTH1(&p)
			if err != nil {
				return write.Error(errors.RouteNotFound)
			}
			utils.GetReportsH1(&p, env)
		}
	}

	return write.JSONorErr(env.DB().FindStats(r.Context()))
}

func CreateStat(env env.Env, user *db.User, w http.ResponseWriter, r *http.Request) http.HandlerFunc {
	if user == nil {
		return write.Error(errors.RouteUnauthorized)
	}

	decoder := json.NewDecoder(r.Body)
	p := &db.Stat{}
	err := decoder.Decode(p)
	if err != nil || p == nil {
		return write.Error(errors.NoJSONBody)
	}

	return write.JSONorErr(env.DB().CreateStat(r.Context(), db.CreateStatParams{
		ReportID:     p.ReportID,
		ReportTitle:  p.ReportTitle,
		Severity:     p.Severity,
		Reward:       p.Reward,
		Currency:     p.Currency,
		Collab:       p.Collab,
		ReportStatus: p.ReportStatus,
		ReportDate:   p.ReportDate,
		PlatformID:   p.PlatformID,
	}))
}

func GetStat(env env.Env, user *db.User, w http.ResponseWriter, r *http.Request) http.HandlerFunc {
	if user == nil {
		return write.Error(errors.RouteUnauthorized)
	}

	id, err := getID(r)
	if err != nil {
		return write.Error(errors.RouteNotFound)
	}

	stat, err := env.DB().FindStatByID(r.Context(), id)
	if err != nil {
		if isNotFound(err) {
			return write.Error(errors.ItemNotFound)
		}
		return write.Error(err)
	}

	return write.JSON(stat)
}

func GetStats(env env.Env, user *db.User, w http.ResponseWriter, r *http.Request) http.HandlerFunc {
	if user == nil {
		return write.Error(errors.RouteUnauthorized)
	}

	return write.JSONorErr(env.DB().FindStats(r.Context()))
}

func UpdateStat(env env.Env, user *db.User, w http.ResponseWriter, r *http.Request) http.HandlerFunc {
	if user == nil {
		return write.Error(errors.RouteUnauthorized)
	}

	decoder := json.NewDecoder(r.Body)
	p := &db.Stat{}
	err := decoder.Decode(p)
	if err != nil || p == nil {
		return write.Error(errors.NoJSONBody)
	}

	return write.JSONorErr(env.DB().UpdateStat(r.Context(), db.UpdateStatParams{
		ID:           p.ID,
		ReportID:     p.ReportID,
		ReportTitle:  p.ReportTitle,
		Severity:     p.Severity,
		Reward:       p.Reward,
		Collab:       p.Collab,
		ReportStatus: p.ReportStatus,
	}))
}

func DeleteStat(env env.Env, user *db.User, w http.ResponseWriter, r *http.Request) http.HandlerFunc {
	if user == nil {
		return write.Error(errors.RouteUnauthorized)
	}

	id, err := getID(r)
	if err != nil {
		return write.Error(errors.RouteNotFound)
	}

	return write.SuccessOrErr(env.DB().DeleteStatByID(r.Context(), id))
}
