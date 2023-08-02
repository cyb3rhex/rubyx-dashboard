package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/aituglo/rubyx-dashboard/golang/db"
	"github.com/aituglo/rubyx-dashboard/golang/env"
	"github.com/aituglo/rubyx-dashboard/golang/errors"
	utils "github.com/aituglo/rubyx-dashboard/golang/server/utils"
	"github.com/aituglo/rubyx-dashboard/golang/server/write"
)

func CreatePlatform(env env.Env, user *db.User, w http.ResponseWriter, r *http.Request) http.HandlerFunc {
	if user == nil {
		return write.Error(errors.RouteUnauthorized)
	}

	decoder := json.NewDecoder(r.Body)
	p := &db.Platform{}
	err := decoder.Decode(p)
	if err != nil || p == nil {
		return write.Error(errors.NoJSONBody)
	}

	if p.Name == "yeswehack" {
		username, err := utils.GetUsernameYWH(p)
		if err != nil {
			return write.Error(errors.RouteNotFound)
		}

		p.HunterUsername = username
	} else if p.Name == "hackerone" {
		p.HunterUsername = p.Email

		_, err := utils.GetJWTH1(p)
		if err != nil {
			return write.Error(errors.RouteNotFound)
		}

	}

	return write.JSONorErr(env.DB().CreatePlatform(r.Context(), db.CreatePlatformParams{
		Name:           p.Name,
		Slug:           p.Slug,
		HunterUsername: p.HunterUsername,
		Email:          p.Email,
		Password:       p.Password,
		Otp:            p.Otp,
		Jwt:            p.Jwt,
		Type:           p.Type,
	}))
}

func GetPlatform(env env.Env, user *db.User, w http.ResponseWriter, r *http.Request) http.HandlerFunc {
	if user == nil {
		return write.Error(errors.RouteUnauthorized)
	}

	id, err := getID(r)
	if err != nil {
		return write.Error(errors.RouteNotFound)
	}

	platform, err := env.DB().FindPlatformByIDs(r.Context(), id)
	if err != nil {
		if isNotFound(err) {
			return write.Error(errors.ItemNotFound)
		}
		return write.Error(err)
	}

	return write.JSON(platform)
}

func GetPlatforms(env env.Env, user *db.User, w http.ResponseWriter, r *http.Request) http.HandlerFunc {
	if user == nil {
		return write.Error(errors.RouteUnauthorized)
	}

	return write.JSONorErr(env.DB().FindPlatforms(r.Context()))
}

func UpdatePlatform(env env.Env, user *db.User, w http.ResponseWriter, r *http.Request) http.HandlerFunc {
	if user == nil {
		return write.Error(errors.RouteUnauthorized)
	}

	decoder := json.NewDecoder(r.Body)
	p := &db.Platform{}
	err := decoder.Decode(p)
	if err != nil || p == nil {
		return write.Error(errors.NoJSONBody)
	}

	if p.Name == "yeswehack" {
		username, err := utils.GetUsernameYWH(p)
		if err != nil {
			return write.Error(errors.RouteNotFound)
		}

		p.HunterUsername = username
	}

	return write.JSONorErr(env.DB().UpdatePlatform(r.Context(), db.UpdatePlatformParams{
		ID:             p.ID,
		Name:           p.Name,
		Slug:           p.Slug,
		HunterUsername: p.HunterUsername,
		Email:          p.Email,
		Password:       p.Password,
		Otp:            p.Otp,
		Jwt:            p.Jwt,
		Type:           p.Type,
	}))
}

func DeletePlatform(env env.Env, user *db.User, w http.ResponseWriter, r *http.Request) http.HandlerFunc {
	if user == nil {
		return write.Error(errors.RouteUnauthorized)
	}

	id, err := getID(r)
	if err != nil {
		return write.Error(errors.RouteNotFound)
	}

	return write.SuccessOrErr(env.DB().DeletePlatformByIDs(r.Context(), id))
}
