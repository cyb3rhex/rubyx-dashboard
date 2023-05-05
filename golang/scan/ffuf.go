package scan

import (
	"bufio"
	"context"
	"encoding/json"
	"fmt"
	"log"
	"os/exec"

	"github.com/aituglo/rubyx/golang/db"
	"github.com/aituglo/rubyx/golang/db/wrapper"
)

type FFUFInput struct {
	FFUFHASH string `json:"FFUFHASH"`
	FUZZ     string `json:"FUZZ"`
}

type FFUFScraper struct{}

type FFUFResponse struct {
	Input            FFUFInput   `json:"input"`
	Position         int         `json:"position"`
	Status           int         `json:"status"`
	Length           int         `json:"length"`
	Words            int         `json:"words"`
	Lines            int         `json:"lines"`
	ContentType      string      `json:"content-type"`
	RedirectLocation string      `json:"redirectlocation"`
	URL              string      `json:"url"`
	Duration         int         `json:"duration"`
	Scraper          FFUFScraper `json:"scraper"`
	ResultFile       string      `json:"resultfile"`
	Host             string      `json:"host"`
}

func LaunchFFUF(task *ScanTask, target string, querier wrapper.Querier) {
	log.Printf("Launching FFUF for %s\n", target)

	command := "ffuf -w /rubyx-data/wordlists/discovery/directories.txt -u " + target + "/FUZZ -mc 200,204,301,302,307,401,403,500 -t 10 -json -s"

	ctx := context.Background()

	cmd := exec.CommandContext(ctx, "bash", "-c", command)

	stdoutPipe, err := cmd.StdoutPipe()
	if err != nil {
		panic(err)
	}
	stderrPipe, err := cmd.StderrPipe()
	if err != nil {
		panic(err)
	}

	err = cmd.Start()
	if err != nil {
		panic(err)
	}

	stdoutScanner := bufio.NewScanner(stdoutPipe)

	go func() {
		for stdoutScanner.Scan() {
			parsed, err := parseFFUF(stdoutScanner.Text())
			if err != nil {
				log.Printf("Error when parsing the result: %v\n", err)
				task.Status = "failed"
			} else {
				task.Status = "completed"
			}

			_, createErr := querier.CreateUrl(context.Background(), db.CreateUrlParams{
				Subdomain:  target,
				Url:        parsed.URL,
				Tag:        "ffuf",
				StatusCode: int32(parsed.Status),
			})
			if createErr != nil {
				log.Printf("Error when adding a subdomain to the database: %v\n", createErr)
			}
		}
	}()

	stderrScanner := bufio.NewScanner(stderrPipe)

	go func() {
		for stderrScanner.Scan() {
			fmt.Println("Error:", stderrScanner.Text())
		}
	}()

	err = cmd.Wait()
	if err != nil {
		log.Printf("Error when executing the command: %v\n", err)
		task.Status = "failed"
	} else {
		task.Status = "completed"
	}
}

func parseFFUF(result string) (FFUFResponse, error) {
	var parsed FFUFResponse
	err := json.Unmarshal([]byte(result), &parsed)
	if err != nil {
		log.Printf("Error unmarshalling JSON: %v\n", err)
		return parsed, err
	}
	return parsed, nil
}
