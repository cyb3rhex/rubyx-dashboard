package handlers

import (
	"encoding/json"
	"log"
	"net/http"
	"strings"

	"github.com/aituglo/rubyx/golang/db"
	"github.com/aituglo/rubyx/golang/env"
	"github.com/aituglo/rubyx/golang/errors"
	"github.com/aituglo/rubyx/golang/scan"
	"github.com/aituglo/rubyx/golang/server/write"
	"github.com/google/uuid"
)

type ScanStruct struct {
	Domain string `json:"domain"`
	Type   string `json:"type"`
}

// Handler pour lancer un scan
func LaunchScan(env env.Env, user *db.User, w http.ResponseWriter, r *http.Request) http.HandlerFunc {
	// Vérifiez les autorisations, décodez les paramètres, etc.
	if user == nil {
		return write.Error(errors.RouteUnauthorized)
	}

	decoder := json.NewDecoder(r.Body)
	p := &ScanStruct{}
	err := decoder.Decode(p)
	if err != nil || p == nil {
		return write.Error(errors.NoJSONBody)
	}

	var cmd string

	switch p.Type {
	case "passive":
		domain, err := scan.ExtractDomain(p.Domain)
		if err != nil {
			log.Println(err)
		}
		log.Println("Domain: " + domain)
		cmd = "subfinder -d " + domain + " -silent"
	case "full":
		scanPorts := "80,81,300,443,591,593,832,981,1010,1311,2082,2087,2095,2096,2480,3000,3128,3333,4243,4567,4711,4712,4993,5000,5104,5108,5800,6543,7000,7396,7474,8000,8001,8008,8014,8042,8069,8080,8081,8088,8090,8091,8118,8123,8172,8222,8243,8280,8281,8333,8443,8500,8834,8880,8888,8983,9000,9043,9060,9080,9090,9091,9200,9443,9800,9981,12443,16080,18091,18092,20720,28017"
		domain, err := scan.ExtractDomain(p.Domain)
		if err != nil {
			log.Println(err)
		}
		log.Println("Domain: " + domain + " Ports: " + scanPorts)
		cmd = "subfinder -d " + domain + " -silent | wappaGo -ports " + scanPorts + " -screenshot /tmp/screenshots"
	case "nuclei":
		domain, err := scan.ExtractDomain(p.Domain)
		if err != nil {
			log.Println(err)
		}
		log.Println("Domain: " + domain)
		cmd = "nuclei -u " + domain + " -t /rubyx-data/nuclei -silent -jsonl"
	default:
	}

	command := strings.Split(cmd, " ")

	task := &scan.ScanTask{
		ID:      uuid.New().String(),
		Command: command[0],
		Param:   command[1:],
		Status:  "queued",
		Type:    p.Type,
		Output:  "",
	}

	env.Queue().AddToQueue(task)

	return write.JSONorErr(env.DB().CreateScan(r.Context(), db.CreateScanParams{
		ID:      task.ID,
		Command: task.Command,
		Param:   strings.Join(task.Param, " "),
		Type:    task.Type,
		Status:  task.Status,
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

/*
// Handler pour récupérer l'état d'un scan et le temps restant estimé
func GetScanStatus(env env.Env, user *db.User, w http.ResponseWriter, r *http.Request) http.HandlerFunc {
	// Récupérez l'ID du scan à partir du chemin de la requête (par exemple, avec chi.URLParam(r, "scanID"))

	// Récupérez les informations de la tâche de scan à partir de la base de données
	scan, err := env.DB().FindScanByID(r.Context(), scanID)
	if err != nil {
		return write.Error(err)
	}

	// Calculez le temps restant estimé en fonction des données que vous avez

	// Retournez le statut du scan et le temps restant estimé
	return write.JSONorErr(map[string]interface{}{
		"status":        scan.Status,
		"remainingTime": remainingTime,
	})
}

// Handler pour récupérer les résultats d'un scan
func GetScanResults(env env.Env, user *db.User, w http.ResponseWriter, r *http.Request) http.HandlerFunc {
	// Récupérez l'ID du scan à partir du chemin de la requête (par exemple, avec chi.URLParam(r, "scanID"))

	// Récupérez les résultats du scan à partir de la base de données
	scan, err := env.DB().FindScanByID(r.Context(), scanID)
	if err != nil {
		return write.Error(err)
	}

	// Retournez les résultats du scan
	return write.JSONorErr(map[string]interface{}{
		"results": scan.Output,
	})
}
*/
