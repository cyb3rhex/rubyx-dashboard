package handlers

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/aituglo/rubyx-dashboard/golang/db"
	"github.com/aituglo/rubyx-dashboard/golang/env"
	"github.com/aituglo/rubyx-dashboard/golang/errors"
	"github.com/aituglo/rubyx-dashboard/golang/server/write"
	"github.com/aituglo/rubyx-dashboard/golang/task"
	amqp "github.com/rabbitmq/amqp091-go"
)

type TaskStruct struct {
	Domain            string `json:"domain"`
	Subdomain         bool   `json:"subdomain"`
	PortScan          bool   `json:"portScan"`
	VulnerabilityScan bool   `json:"vulnerabilityScan"`
	DirectoryScan     bool   `json:"directoryScan"`
	Screenshot        bool   `json:"screenshot"`
	NucleiSeverity    string `json:"nucleiSeverity"`
}

func LaunchTask(env env.Env, user *db.User, w http.ResponseWriter, r *http.Request) http.HandlerFunc {
	if user == nil {
		return write.Error(errors.RouteUnauthorized)
	}

	decoder := json.NewDecoder(r.Body)
	p := &TaskStruct{}
	err := decoder.Decode(p)
	if err != nil || p == nil {
		return write.Error(errors.NoJSONBody)
	}

	task := &task.Task{
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

	// send task to rabbitmq
	amqpConn, amqpChannel, err := env.AMQP()
	if err != nil {
		log.Printf("Erreur lors de la récupération de la connexion RabbitMQ: %s", err)
		return write.Error(errors.InternalError)
	}
	defer amqpConn.Close()
	defer amqpChannel.Close()

	// Récupérez la queue "local" depuis l'environnement
	localQueue, err := env.Queue("local")
	if err != nil {
		log.Printf("Erreur lors de la récupération de la queue 'local': %s", err)
		return write.Error(errors.InternalError)
	}

	// Convertissez la tâche en JSON
	taskJSON, err := json.Marshal(task)
	if err != nil {
		log.Printf("Erreur lors de la conversion de la tâche en JSON: %s", err)
		return write.Error(errors.InternalError)
	}

	// Publier le message dans la queue "local"
	err = amqpChannel.Publish(
		"",              // Échange (vide pour une file d'attente directe par défaut)
		localQueue.Name, // Clé de routage (le nom de la file d'attente)
		false,           // Mandatory
		false,           // Immediate
		amqp.Publishing{
			ContentType: "application/json",
			Body:        taskJSON,
		},
	)
	if err != nil {
		log.Printf("Erreur lors de la publication du message dans la queue 'local': %s", err)
		return write.Error(errors.InternalError)
	}

	return write.JSONorErr(env.DB().CreateTask(r.Context(), db.CreateTaskParams{
		ID:     task.ID,
		Domain: task.Domain,
		Params: "",
		Type:   task.Type,
		Status: task.Status,
	}))

}

func GetTasks(env env.Env, user *db.User, w http.ResponseWriter, r *http.Request) http.HandlerFunc {
	if user == nil {
		return write.Error(errors.RouteUnauthorized)
	}

	return write.JSONorErr(env.DB().FindTasks(r.Context()))
}

func DeleteTask(env env.Env, user *db.User, w http.ResponseWriter, r *http.Request) http.HandlerFunc {
	if user == nil {
		return write.Error(errors.RouteUnauthorized)
	}

	id, err := getID(r)
	if err != nil {
		fmt.Println(err)
	}

	return write.SuccessOrErr(env.DB().DeleteTaskByIDs(r.Context(), id))
}
