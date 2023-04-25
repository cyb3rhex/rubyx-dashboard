package scan

import (
	"context"
	"log"
	"os/exec"
	"time"

	"github.com/aituglo/rubyx/golang/db"
	"github.com/aituglo/rubyx/golang/db/wrapper"
)

type ScanTask struct {
	ID        string
	Command   string
	Param     []string
	Status    string
	StartTime time.Time
	EndTime   time.Time
	Output    string
}

type ScanQueue struct {
	queue chan *ScanTask
}

func NewScanQueue(capacity int) *ScanQueue {
	return &ScanQueue{
		queue: make(chan *ScanTask, capacity),
	}
}

func (sq *ScanQueue) AddToQueue(task *ScanTask) {
	sq.queue <- task
}

func (sq *ScanQueue) GetQueue() *ScanTask {
	return <-sq.queue
}

func StartScanWorkers(querier wrapper.Querier, queue *ScanQueue, numWorkers int) {
	for i := 0; i < numWorkers; i++ {
		go func() {
			for {
				task := queue.GetQueue()
				ExecuteScan(task, querier)
			}
		}()
	}
}

func ExecuteScan(task *ScanTask, querier wrapper.Querier) {
	task.Status = "running"
	task.StartTime = time.Now()

	cmd := exec.Command(task.Command, task.Param...)
	output, err := cmd.CombinedOutput()

	if err != nil {
		log.Printf("Erreur lors de l'exécution de la commande: %v\n", err)
		task.Status = "failed"
	} else {
		task.Status = "completed"
	}

	task.EndTime = time.Now()

	log.Println(string(output))

	_, updateErr := querier.UpdateScan(context.Background(), db.UpdateScanParams{
		ID:        task.ID,
		Status:    task.Status,
		StartTime: task.StartTime,
		EndTime:   task.EndTime,
		Output:    string(output),
	})
	if updateErr != nil {
		log.Printf("Erreur lors de la mise à jour de la tâche de scan dans la base de données: %v\n", updateErr)
	}

}
