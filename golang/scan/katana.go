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

type KatanaSitemap struct {
	Timestamp string         `json:"timestamp"`
	Request   KatanaRequest  `json:"request"`
	Response  KatanaResponse `json:"response"`
}

type KatanaRequest struct {
	Method    string `json:"method"`
	Endpoint  string `json:"endpoint"`
	Tag       string `json:"tag"`
	Attribute string `json:"attribute"`
	Source    string `json:"source"`
	Raw       string `json:"raw"`
}

type KatanaResponse struct {
	StatusCode   int           `json:"status_code"`
	Headers      KatanaHeaders `json:"headers"`
	Body         string        `json:"body"`
	Technologies []string      `json:"technologies"`
	Raw          string        `json:"raw"`
}

type KatanaHeaders struct {
	LastModified              string `json:"last_modified"`
	CacheControl              string `json:"cache_control"`
	ReportTo                  string `json:"report_to"`
	Date                      string `json:"date"`
	CrossOriginOpenerPolicy   string `json:"cross_origin_opener_policy"`
	XContentTypeOptions       string `json:"x_content_type_options"`
	CrossOriginResourcePolicy string `json:"cross_origin_resource_policy"`
	Vary                      string `json:"vary"`
	ContentType               string `json:"content_type"`
	ContentSecurityPolicy     string `json:"content_security_policy_report_only"`
	Expires                   string `json:"expires"`
	Server                    string `json:"server"`
	AltSvc                    string `json:"alt_svc"`
	AcceptRanges              string `json:"accept_ranges"`
	XXssProtection            string `json:"x_xss_protection"`
}

func LaunchKatana(task *ScanTask, target string, querier wrapper.Querier) {
	log.Printf("Launching Katana for %s\n", target)

	if strings.HasPrefix(target, "http://") {
		target = strings.Replace(target, "http://", "https://", 1)
	}

	command := "katana -u " + target + " -silent -d 3 -jc -kf -iqp -json"

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
			parsed, err := parseKatana(result)
			if err != nil {
				log.Printf("Error when parsing the result: %v\n", err)
				task.Status = "failed"
			} else {
				task.Status = "completed"
			}

			if strings.HasPrefix(parsed.Request.Endpoint, target) {
				fmt.Println("Adding an url to the database : " + parsed.Request.Endpoint)
				_, createErr := querier.CreateUrl(context.Background(), db.CreateUrlParams{
					Subdomain:  target,
					Url:        parsed.Request.Endpoint,
					Tag:        parsed.Request.Tag,
					StatusCode: int32(parsed.Response.StatusCode),
				})
				if createErr != nil {
					log.Printf("Error when adding a subdomain to the database: %v\n", createErr)
				}
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

func parseKatana(result string) (KatanaSitemap, error) {
	var parsed KatanaSitemap
	err := json.Unmarshal([]byte(result), &parsed)
	if err != nil {
		log.Printf("Error unmarshalling JSON: %v\n", err)
		return parsed, err
	}
	return parsed, nil
}
