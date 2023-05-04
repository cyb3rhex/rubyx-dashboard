package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/aituglo/rubyx/golang/db"
	"github.com/aituglo/rubyx/golang/env"
	"github.com/aituglo/rubyx/golang/errors"
	"github.com/aituglo/rubyx/golang/server/write"
)

type SubdomainPagination struct {
	Subdomains      []db.Subdomain `json:"subdomains"`
	TotalSubdomains int            `json:"totalSubdomains"`
}

func CreateSubdomain(env env.Env, user *db.User, w http.ResponseWriter, r *http.Request) http.HandlerFunc {
	if user == nil {
		return write.Error(errors.RouteUnauthorized)
	}

	decoder := json.NewDecoder(r.Body)
	p := &db.Subdomain{}
	err := decoder.Decode(p)
	if err != nil || p == nil {
		return write.Error(errors.NoJSONBody)
	}

	return write.JSONorErr(env.DB().CreateSubdomain(r.Context(), db.CreateSubdomainParams{
		ProgramID:     p.ProgramID,
		Title:         p.Title,
		BodyHash:      p.BodyHash,
		StatusCode:    p.StatusCode,
		Technologies:  p.Technologies,
		ContentLength: p.ContentLength,
	}))
}

func GetSubdomain(env env.Env, user *db.User, w http.ResponseWriter, r *http.Request) http.HandlerFunc {
	if user == nil {
		return write.Error(errors.RouteUnauthorized)
	}

	id, err := getID(r)
	if err != nil {
		return write.Error(errors.RouteNotFound)
	}

	subdomain, err := env.DB().FindSubdomainByIDs(r.Context(), id)
	if err != nil {
		if isNotFound(err) {
			return write.Error(errors.ItemNotFound)
		}
		return write.Error(err)
	}

	return write.JSON(subdomain)
}

func GetSubdomainByProgram(env env.Env, user *db.User, w http.ResponseWriter, r *http.Request) http.HandlerFunc {
	if user == nil {
		return write.Error(errors.RouteUnauthorized)
	}

	id, err := getID(r)
	if err != nil {
		return write.Error(errors.RouteNotFound)
	}

	subdomains, err := env.DB().FindSubdomainByProgram(r.Context(), id)
	if err != nil {
		if isNotFound(err) {
			return write.Error(errors.ItemNotFound)
		}
		return write.Error(err)
	}

	return write.JSON(subdomains)
}

func GetSubdomains(env env.Env, user *db.User, w http.ResponseWriter, r *http.Request) http.HandlerFunc {
	if user == nil {
		return write.Error(errors.RouteUnauthorized)
	}

	page, err := strconv.Atoi(r.URL.Query().Get("page"))
	if err != nil || page < 1 {
		page = 1
	}

	resultsPerPage, err := strconv.Atoi(r.URL.Query().Get("resultsPerPage"))
	if err != nil || resultsPerPage < 1 {
		resultsPerPage = 30
	}

	totalSubdomains, err := env.DB().CountSubdomains(r.Context())
	if err != nil {
		return write.Error(err)
	}

	subdomains, err := env.DB().FindSubdomains(r.Context(), db.FindSubdomainsParams{Limit: int32(resultsPerPage), Offset: int32((page - 1) * resultsPerPage)})
	if err != nil {
		return write.Error(err)
	}

	return write.JSONorErr(SubdomainPagination{
		Subdomains:      subdomains,
		TotalSubdomains: int(totalSubdomains),
	}, nil)
}

func UpdateSubdomain(env env.Env, user *db.User, w http.ResponseWriter, r *http.Request) http.HandlerFunc {
	if user == nil {
		return write.Error(errors.RouteUnauthorized)
	}

	decoder := json.NewDecoder(r.Body)
	p := &db.Subdomain{}
	err := decoder.Decode(p)
	if err != nil || p == nil {
		return write.Error(errors.NoJSONBody)
	}

	return write.JSONorErr(env.DB().UpdateSubdomain(r.Context(), db.UpdateSubdomainParams{
		ID:            p.ID,
		ProgramID:     p.ProgramID,
		Title:         p.Title,
		BodyHash:      p.BodyHash,
		StatusCode:    p.StatusCode,
		Technologies:  p.Technologies,
		ContentLength: p.ContentLength,
	}))
}

func DeleteSubdomain(env env.Env, user *db.User, w http.ResponseWriter, r *http.Request) http.HandlerFunc {
	if user == nil {
		return write.Error(errors.RouteUnauthorized)
	}

	id, err := getID(r)
	if err != nil {
		return write.Error(errors.RouteNotFound)
	}

	return write.SuccessOrErr(env.DB().DeleteSubdomainByIDs(r.Context(), id))
}
