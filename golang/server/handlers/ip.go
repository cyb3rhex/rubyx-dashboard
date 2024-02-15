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

type IpPagination struct {
	Ips      []db.Ip `json:"ips"`
	TotalIps int     `json:"totalIps"`
}

func CreateIp(env env.Env, user *db.User, w http.ResponseWriter, r *http.Request) http.HandlerFunc {
	if user == nil {
		return write.Error(errors.RouteUnauthorized)
	}

	decoder := json.NewDecoder(r.Body)
	p := &db.Ip{}
	err := decoder.Decode(p)
	if err != nil || p == nil {
		return write.Error(errors.NoJSONBody)
	}

	ipExist, err := env.DB().FindIpByIp(r.Context(), p.Ip)
	if err != nil {
		return write.JSONorErr(env.DB().CreateIp(r.Context(), db.CreateIpParams{
			ProgramID: p.ProgramID,
			Ip:        p.Ip,
		}))
	} else {
		return write.JSON(ipExist)
	}
}

func GetIp(env env.Env, user *db.User, w http.ResponseWriter, r *http.Request) http.HandlerFunc {
	if user == nil {
		return write.Error(errors.RouteUnauthorized)
	}

	id, err := getID(r)
	if err != nil {
		return write.Error(errors.RouteNotFound)
	}

	ip, err := env.DB().FindIpByIDs(r.Context(), id)
	if err != nil {
		if isNotFound(err) {
			return write.Error(errors.ItemNotFound)
		}
		return write.Error(err)
	}

	return write.JSON(ip)
}

func UpdateIp(env env.Env, user *db.User, w http.ResponseWriter, r *http.Request) http.HandlerFunc {
	if user == nil {
		return write.Error(errors.RouteUnauthorized)
	}

	decoder := json.NewDecoder(r.Body)
	p := &db.Ip{}
	err := decoder.Decode(p)
	if err != nil || p == nil {
		return write.Error(errors.NoJSONBody)
	}

	return write.JSONorErr(env.DB().UpdateIp(r.Context(), db.UpdateIpParams{
		ID:        p.ID,
		ProgramID: p.ProgramID,
	}))
}

func DeleteIp(env env.Env, user *db.User, w http.ResponseWriter, r *http.Request) http.HandlerFunc {
	if user == nil {
		return write.Error(errors.RouteUnauthorized)
	}

	id, err := getID(r)
	if err != nil {
		return write.Error(errors.RouteNotFound)
	}

	return write.SuccessOrErr(env.DB().DeleteIpByIDs(r.Context(), id))
}

func GetIps(env env.Env, user *db.User, w http.ResponseWriter, r *http.Request) http.HandlerFunc {
	if user == nil {
		return write.Error(errors.RouteUnauthorized)
	}

	all, err := strconv.Atoi(r.URL.Query().Get("all"))
	if err != nil || all > 1 {
		all = 0
	}

	page, err := strconv.Atoi(r.URL.Query().Get("page"))
	if err != nil || page < 1 {
		page = 1
	}

	resultsPerPage, err := strconv.Atoi(r.URL.Query().Get("resultsPerPage"))
	if err != nil || resultsPerPage < 1 {
		resultsPerPage = 30
	}

	programIDStr := r.URL.Query().Get("program_id")
	var programID int64
	programIDProvided := false
	if programIDStr != "" {
		id, err := strconv.ParseInt(programIDStr, 10, 64)
		if err != nil {
			return write.Error(err)
		}
		programID = id
		if programID != 0 {
			programIDProvided = true
		} else {
			programIDProvided = false
		}
	}

	var ips []db.Ip
	var total int64

	if all == 1 {
		ips, err = env.DB().FindAllIps(r.Context())
		total, err = env.DB().CountIps(r.Context())
	} else if programIDProvided {
		ips, err = env.DB().FindIpsWithProgramID(r.Context(), db.FindIpsWithProgramIDParams{
			ProgramID: programID,
			Offset:    int32((page - 1) * resultsPerPage),
			Limit:     int32(resultsPerPage),
		})
		total, err = env.DB().CountIpsWithProgramID(r.Context(), programID)
	} else {
		ips, err = env.DB().FindIps(r.Context(), db.FindIpsParams{
			Offset: int32((page - 1) * resultsPerPage),
			Limit:  int32(resultsPerPage),
		})
		total, err = env.DB().CountIps(r.Context())
	}

	if err != nil {
		return write.Error(err)
	}

	return write.JSONorErr(IpPagination{
		Ips:      ips,
		TotalIps: int(total),
	}, nil)
}
