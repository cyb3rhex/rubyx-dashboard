package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/aituglo/rubyx/golang/db"
	"github.com/aituglo/rubyx/golang/env"
	"github.com/aituglo/rubyx/golang/errors"
	"github.com/aituglo/rubyx/golang/scan"
	"github.com/aituglo/rubyx/golang/server/write"
	"github.com/google/uuid"
)

type ScanStruct struct {
	Domain            string `json:"domain"`
	Subdomain         bool   `json:"subdomain"`
	PortScan          bool   `json:"portScan"`
	VulnerabilityScan bool   `json:"vulnerabilityScan"`
	DirectoryScan     bool   `json:"directoryScan"`
	Screenshot        bool   `json:"screenshot"`
	NucleiSeverity    string `json:"nucleiSeverity"`
}

func LaunchScan(env env.Env, user *db.User, w http.ResponseWriter, r *http.Request) http.HandlerFunc {
	if user == nil {
		return write.Error(errors.RouteUnauthorized)
	}

	decoder := json.NewDecoder(r.Body)
	p := &ScanStruct{}
	err := decoder.Decode(p)
	if err != nil || p == nil {
		return write.Error(errors.NoJSONBody)
	}

	task := &scan.ScanTask{
		ID:                uuid.New().String(),
		Domain:            p.Domain,
		Subdomain:         p.Subdomain,
		PortScan:          p.PortScan,
		VulnerabilityScan: p.VulnerabilityScan,
		DirectoryScan:     p.DirectoryScan,
		Screenshot:        p.Screenshot,
		NucleiSeverity:    p.NucleiSeverity,
		Status:            "queued",
		Type:              "enumeration",
		Output:            "",
	}

	env.Queue().AddToQueue(task)

	return write.JSONorErr(env.DB().CreateScan(r.Context(), db.CreateScanParams{
		ID:     task.ID,
		Domain: task.Domain,
		Params: "",
		Type:   task.Type,
		Status: task.Status,
	}))

}

func GetScans(env env.Env, user *db.User, w http.ResponseWriter, r *http.Request) http.HandlerFunc {
	if user == nil {
		return write.Error(errors.RouteUnauthorized)
	}

	return write.JSONorErr(env.DB().FindScans(r.Context()))
}

func DeleteScan(env env.Env, user *db.User, w http.ResponseWriter, r *http.Request) http.HandlerFunc {
	if user == nil {
		return write.Error(errors.RouteUnauthorized)
	}

	id := getString("id", r)

	return write.SuccessOrErr(env.DB().DeleteScanByIDs(r.Context(), id))
}
