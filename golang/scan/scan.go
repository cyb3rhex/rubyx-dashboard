package scan

import (
	"context"
	"log"
	"os/exec"
	"strings"
	"time"

	"github.com/aituglo/rubyx/golang/db"
	"github.com/aituglo/rubyx/golang/db/wrapper"
)

type ScanTask struct {
	ID        string
	Command   string
	Param     []string
	Type      string
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

	_, updateErr := querier.UpdateScan(context.Background(), db.UpdateScanParams{
		ID:        task.ID,
		Status:    task.Status,
		StartTime: task.StartTime,
	})
	if updateErr != nil {
		log.Printf("Error when updating task: %v\n", updateErr)
	}

	command := task.Command + " " + strings.Join(task.Param, " ")

	cmd := exec.Command("bash", "-c", command)
	output, err := cmd.CombinedOutput()

	if err != nil {
		log.Printf("Error when executing the command: %v\n", err)
		task.Status = "failed"
	} else {
		task.Status = "completed"
	}

	task.EndTime = time.Now()

	switch task.Type {
	case "passive":
		for _, line := range strings.Split(string(output), "\n") {
			program_id := CheckScope(line, querier)
			if program_id != -1 {
				_, createErr := querier.CreateSubdomain(context.Background(), db.CreateSubdomainParams{
					ProgramID: program_id,
					Url:       line,
				})
				if createErr != nil {
					log.Printf("Error when adding a subdomain to the database: %v\n", createErr)
				}
			}
		}
	case "full":
		for _, line := range strings.Split(string(output), "\n") {
			if line != "" {
				urlInfos, err := ParseWappaGo(line, querier)
				if err != nil {
					log.Printf("Error when parsing wappaGo output: %v\n", err)
				}
				domain, err := ExtractDomain(urlInfos.Url)
				if err != nil {
					log.Printf("Error when extracting domain: %v\n", err)
				}
				program_id := CheckScope(domain, querier)
				var technologies string
				for _, technology := range urlInfos.Infos.Technologies {
					technologies += technology.Name + ","
				}
				log.Println(urlInfos.Infos.Technologies)
				log.Println(technologies)
				_, createErr := querier.CreateSubdomain(context.Background(), db.CreateSubdomainParams{
					ProgramID:     program_id,
					Url:           urlInfos.Url,
					Ip:            urlInfos.Infos.IP,
					Title:         urlInfos.Infos.Title,
					Screenshot:    urlInfos.Infos.Screenshot,
					Technologies:  technologies,
					Port:          strings.Join(urlInfos.Infos.Ports, ","),
					ContentLength: int32(urlInfos.Infos.ContentLength),
					StatusCode:    int32(urlInfos.Infos.StatusCode),
				})
				if createErr != nil {
					log.Printf("Error when adding a subdomain to the database: %v\n", createErr)
				}
			}

		}
	default:
	}

	_, updateErr = querier.UpdateScan(context.Background(), db.UpdateScanParams{
		ID:        task.ID,
		Status:    task.Status,
		StartTime: task.StartTime,
		EndTime:   task.EndTime,
		Output:    string(output),
	})
	if updateErr != nil {
		log.Printf("Error when updating task: %v\n", updateErr)
	}

}
