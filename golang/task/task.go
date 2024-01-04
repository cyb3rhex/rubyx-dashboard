package task

import (
	"encoding/json"
	"log"
	"time"

	"github.com/aituglo/rubyx-dashboard/golang/env"
)

type Task struct {
	ID                string
	Domain            string
	Subdomain         bool
	PortScan          bool
	VulnerabilityScan bool
	DirectoryScan     bool
	Screenshot        bool
	NucleiSeverity    string
	Type              string
	Status            string
	StartTime         time.Time
	EndTime           time.Time
	Output            string
}

func ConsumeLocalQueue(env env.Env) {
	// Récupérez la connexion et le canal RabbitMQ depuis l'environnement
	amqpConn, amqpChannel, err := env.AMQP()
	if err != nil {
		log.Printf("Erreur lors de la récupération de la connexion RabbitMQ: %s", err)
		return
	}
	defer amqpConn.Close()
	defer amqpChannel.Close()

	// Récupérez la queue "local" depuis l'environnement
	localQueue, err := env.Queue("local")
	if err != nil {
		log.Printf("Erreur lors de la récupération de la queue 'local': %s", err)
		return
	}

	// Configurez le consommateur sur la queue "local"
	msgs, err := amqpChannel.Consume(
		localQueue.Name, // Nom de la queue
		"",              // Nom du consommateur (laissez vide pour une génération automatique)
		false,           // Auto-acknowledge (false pour manuellement ack les messages)
		false,           // Exclusivité (laissez false pour partager la queue entre plusieurs consommateurs)
		false,           // No-local (laissez false pour permettre aux consommateurs locaux de recevoir les messages)
		false,           // No-wait (laissez false pour bloquer jusqu'à ce qu'un message soit disponible)
		nil,             // Arguments supplémentaires (laissez nil pour utiliser les paramètres par défaut)
	)
	if err != nil {
		log.Printf("Erreur lors de la configuration du consommateur sur la queue 'local': %s", err)
		return
	}

	// Boucle de consommation
	for {
		select {
		case msg := <-msgs:
			// Traitement du message
			task := &Task{}
			err := json.Unmarshal(msg.Body, task)
			if err != nil {
				//log.Printf("Erreur lors de la désérialisation de la tâche depuis JSON: %s", err)
				// Ignorer le message malformé et passer au suivant
				msg.Ack(true)
				continue
			}

			// Traitement de la tâche
			log.Printf("Reçu une tâche: %+v", task)

			// Acknowledge manuel du message après traitement
			msg.Ack(false)
		}
	}
}
