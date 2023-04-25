package handlers

import (
	"encoding/json"
	"net/http"
	"strings"

	"github.com/aituglo/rubyx/golang/db"
	"github.com/aituglo/rubyx/golang/env"
	"github.com/aituglo/rubyx/golang/errors"
	"github.com/aituglo/rubyx/golang/scan"
	"github.com/aituglo/rubyx/golang/server/write"
	"github.com/google/uuid"
)

// Handler pour lancer un scan
func LaunchScan(env env.Env, user *db.User, w http.ResponseWriter, r *http.Request) http.HandlerFunc {
	// Vérifiez les autorisations, décodez les paramètres, etc.
	if user == nil {
		return write.Error(errors.RouteUnauthorized)
	}

	decoder := json.NewDecoder(r.Body)
	p := &db.Scan{}
	err := decoder.Decode(p)
	if err != nil || p == nil {
		return write.Error(errors.NoJSONBody)
	}

	cmd := strings.Split(p.Command, " ")

	// Créez une nouvelle tâche de scan
	task := &scan.ScanTask{
		ID:      uuid.New().String(),
		Command: cmd[0],
		Param:   cmd[1:],
		Status:  "queued",
		Output:  "",
	}

	// Ajoutez la tâche à la file d'attente
	env.Queue().AddToQueue(task)

	return write.JSONorErr(env.DB().CreateScan(r.Context(), db.CreateScanParams{
		ID:      task.ID,
		Command: task.Command,
		Param:   strings.Join(task.Param, " "),
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
