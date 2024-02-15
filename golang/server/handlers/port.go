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

func CreatePort(env env.Env, user *db.User, w http.ResponseWriter, r *http.Request) http.HandlerFunc {
	if user == nil {
		return write.Error(errors.RouteUnauthorized)
	}

	decoder := json.NewDecoder(r.Body)
	p := &db.Port{}
	err := decoder.Decode(p)
	if err != nil || p == nil {
		return write.Error(errors.NoJSONBody)
	}

	portExist, err := env.DB().FindPortsWithIpIDAndPort(r.Context(), db.FindPortsWithIpIDAndPortParams{
		IpID: p.IpID,
		Port: p.Port,
	})
	if err != nil {
		return write.JSONorErr(env.DB().CreatePort(r.Context(), db.CreatePortParams{
			IpID: p.IpID,
			Port: p.Port,
		}))
	} else {
		return write.JSON(portExist)
	}
}

func GetPort(env env.Env, user *db.User, w http.ResponseWriter, r *http.Request) http.HandlerFunc {
	if user == nil {
		return write.Error(errors.RouteUnauthorized)
	}

	id, err := getID(r)
	if err != nil {
		return write.Error(errors.RouteNotFound)
	}

	port, err := env.DB().FindPortByIDs(r.Context(), id)
	if err != nil {
		if isNotFound(err) {
			return write.Error(errors.ItemNotFound)
		}
		return write.Error(err)
	}

	return write.JSON(port)
}

func UpdatePort(env env.Env, user *db.User, w http.ResponseWriter, r *http.Request) http.HandlerFunc {
	if user == nil {
		return write.Error(errors.RouteUnauthorized)
	}

	decoder := json.NewDecoder(r.Body)
	p := &db.Port{}
	err := decoder.Decode(p)
	if err != nil || p == nil {
		return write.Error(errors.NoJSONBody)
	}

	return write.JSONorErr(env.DB().UpdatePort(r.Context(), db.UpdatePortParams{
		ID:   p.ID,
		IpID: p.IpID,
		Port: p.Port,
	}))
}

func DeletePort(env env.Env, user *db.User, w http.ResponseWriter, r *http.Request) http.HandlerFunc {
	if user == nil {
		return write.Error(errors.RouteUnauthorized)
	}

	id, err := getID(r)
	if err != nil {
		return write.Error(errors.RouteNotFound)
	}

	return write.SuccessOrErr(env.DB().DeletePortByIDs(r.Context(), id))
}

func GetPorts(env env.Env, user *db.User, w http.ResponseWriter, r *http.Request) http.HandlerFunc {
	if user == nil {
		return write.Error(errors.RouteUnauthorized)
	}

	ipIDStr := r.URL.Query().Get("ip")
	var ipID int64
	ipID, err := strconv.ParseInt(ipIDStr, 10, 64)
	if err != nil {
		return write.Error(err)
	}

	var ports []db.Port
	ports, err = env.DB().FindPortsWithIpID(r.Context(), ipID)
	if err != nil {
		return write.Error(err)
	}

	return write.JSONorErr(ports, nil)
}
