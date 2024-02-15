package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/aituglo/rubyx-dashboard/golang/db"
	"github.com/aituglo/rubyx-dashboard/golang/env"
	"github.com/aituglo/rubyx-dashboard/golang/errors"
	"github.com/aituglo/rubyx-dashboard/golang/server/write"
)

type UrlPagination struct {
	Urls  []db.Url `json:"urls"`
	Total int      `json:"total"`
}

func CreateUrl(env env.Env, user *db.User, w http.ResponseWriter, r *http.Request) http.HandlerFunc {
	if user == nil {
		return write.Error(errors.RouteUnauthorized)
	}

	decoder := json.NewDecoder(r.Body)
	p := &db.Url{}
	err := decoder.Decode(p)
	if err != nil || p == nil {
		return write.Error(errors.NoJSONBody)
	}

	return write.JSONorErr(env.DB().CreateUrl(r.Context(), db.CreateUrlParams{
		SubdomainID: p.SubdomainID,
		Url:         p.Url,
		StatusCode:  p.StatusCode,
	}))
}

func GetUrl(env env.Env, user *db.User, w http.ResponseWriter, r *http.Request) http.HandlerFunc {
	if user == nil {
		return write.Error(errors.RouteUnauthorized)
	}

	id, err := getID(r)
	if err != nil {
		return write.Error(errors.RouteNotFound)
	}

	url, err := env.DB().FindUrlByIDs(r.Context(), id)
	if err != nil {
		if isNotFound(err) {
			return write.Error(errors.ItemNotFound)
		}
		return write.Error(err)
	}

	return write.JSON(url)
}

func GetUrls(env env.Env, user *db.User, w http.ResponseWriter, r *http.Request) http.HandlerFunc {
	if user == nil {
		return write.Error(errors.RouteUnauthorized)
	}

	search := r.URL.Query().Get("search")
	page, err := strconv.Atoi(r.URL.Query().Get("page"))
	if err != nil || page < 1 {
		page = 1
	}

	resultsPerPage, err := strconv.Atoi(r.URL.Query().Get("resultsPerPage"))
	if err != nil || resultsPerPage < 1 {
		resultsPerPage = 30
	}

	subdomain, err := getint64("subdomain", r)

	var urls []db.Url
	if search != "" {
		urls, err = env.DB().FindUrlsBySubdomainWithSearch(r.Context(), db.FindUrlsBySubdomainWithSearchParams{
			SubdomainID: subdomain,
			Url:         "%" + search + "%",
			Offset:      int32((page - 1) * resultsPerPage),
			Limit:       int32(resultsPerPage),
		})
	} else {
		urls, err = env.DB().FindUrlsBySubdomain(r.Context(), db.FindUrlsBySubdomainParams{
			SubdomainID: subdomain,
			Offset:      int32((page - 1) * resultsPerPage),
			Limit:       int32(resultsPerPage),
		})
	}

	total, err := env.DB().CountUrlsBySubdomain(r.Context(), subdomain)
	if err != nil {
		return write.Error(err)
	}

	return write.JSON(UrlPagination{
		Urls:  urls,
		Total: int(total),
	})
}

func UpdateUrl(env env.Env, user *db.User, w http.ResponseWriter, r *http.Request) http.HandlerFunc {
	if user == nil {
		return write.Error(errors.RouteUnauthorized)
	}

	decoder := json.NewDecoder(r.Body)
	p := &db.Url{}
	err := decoder.Decode(p)
	if err != nil || p == nil {
		return write.Error(errors.NoJSONBody)
	}

	return write.JSONorErr(env.DB().UpdateUrl(r.Context(), db.UpdateUrlParams{
		ID:          p.ID,
		SubdomainID: p.SubdomainID,
		Url:         p.Url,
		StatusCode:  p.StatusCode,
	}))
}

func DeleteUrl(env env.Env, user *db.User, w http.ResponseWriter, r *http.Request) http.HandlerFunc {
	if user == nil {
		return write.Error(errors.RouteUnauthorized)
	}

	id, err := getID(r)
	if err != nil {
		return write.Error(errors.RouteNotFound)
	}

	return write.SuccessOrErr(env.DB().DeleteUrlByIDs(r.Context(), id))
}
