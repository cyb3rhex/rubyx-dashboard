package scan

import (
	"bufio"
	"context"
	"encoding/json"
	"fmt"
	"log"
	"os/exec"
	"strings"

	"github.com/aituglo/rubyx/golang/db"
	"github.com/aituglo/rubyx/golang/db/wrapper"
)

type NucleiInfo struct {
	Name           string   `json:"name"`
	Author         []string `json:"author"`
	Tags           []string `json:"tags"`
	Description    string   `json:"description"`
	Reference      []string `json:"reference"`
	Severity       string   `json:"severity"`
	Classification struct {
		CveID       interface{} `json:"cve-id"`
		CweID       interface{} `json:"cwe-id"`
		CvssMetrics string      `json:"cvss-metrics"`
	} `json:"classification"`
}

type NucleiTemplate struct {
	TemplateID       string     `json:"template-id"`
	TemplatePath     string     `json:"template-path"`
	Info             NucleiInfo `json:"info"`
	Type             string     `json:"type"`
	Host             string     `json:"host"`
	MatchedAt        string     `json:"matched-at"`
	ExtractedResults []string   `json:"extracted-results"`
	IP               string     `json:"ip"`
	Timestamp        string     `json:"timestamp"`
	CurlCommand      string     `json:"curl-command"`
	MatcherStatus    bool       `json:"matcher-status"`
	MatchedLine      string     `json:"matched-line"`
}

func LaunchNuclei(task *ScanTask, target string, querier wrapper.Querier) {
	log.Printf("Launching Nuclei for %s\n", target)

	command := "nuclei -u " + target + " -t /rubyx-data/nuclei -silent -jsonl"

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
			result := stdoutScanner.Text()
			parsed, err := parseNuclei(result)
			if err != nil {
				log.Printf("Error when parsing the result: %v\n", err)
				task.Status = "failed"
			} else {
				task.Status = "completed"
			}

			domain, err := ExtractDomain(parsed.MatchedAt)
			if err != nil {
				log.Printf("Error when extracting domain: %v\n", err)
			}
			program_id := CheckScope(domain, querier)

			_, createErr := querier.CreateVulnerability(context.Background(), db.CreateVulnerabilityParams{
				ProgramID: program_id,
				Url:       parsed.MatchedAt,
				Severity:  parsed.Info.Severity,
				Type:      parsed.Info.Name,
				Tag:       strings.Join(parsed.Info.Tags, ","),
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

func parseNuclei(result string) (NucleiTemplate, error) {
	var parsed NucleiTemplate
	err := json.Unmarshal([]byte(result), &parsed)
	if err != nil {
		log.Printf("Error unmarshalling JSON: %v\n", err)
		return parsed, err
	}
	return parsed, nil
}
