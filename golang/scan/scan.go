package scan

import (
	"context"
	"log"
	"time"

	"github.com/aituglo/rubyx/golang/db"
	"github.com/aituglo/rubyx/golang/db/wrapper"
)

type ScanTask struct {
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

	_, updateErr := querier.UpdateScan(context.Background(), db.UpdateScanParams{
		ID:        task.ID,
		Status:    task.Status,
		StartTime: task.StartTime,
	})
	if updateErr != nil {
		log.Printf("Error when updating task: %v\n", updateErr)
	}

	var subdomains []string
	var err error

	if task.Subdomain {
		subdomains, err = ScanSubdomains(task.Domain)
		if err != nil {
			log.Printf("Error when scanning subdomains: %v\n", err)
			task.Status = "error"
		}

		LaunchWappaGo(task, subdomains, querier)
	}

	if task.VulnerabilityScan {
		for _, subdomain := range subdomains {
			LaunchNuclei(task, subdomain, querier)
		}
	}

	task.Status = "completed"

	task.EndTime = time.Now()

	_, updateErr = querier.UpdateScan(context.Background(), db.UpdateScanParams{
		ID:        task.ID,
		Status:    task.Status,
		StartTime: task.StartTime,
		EndTime:   task.EndTime,
		Output:    "",
	})
	if updateErr != nil {
		log.Printf("Error when updating task: %v\n", updateErr)
	}

}
