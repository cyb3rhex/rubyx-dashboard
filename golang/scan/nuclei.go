package scan

import (
	"encoding/json"
	"log"

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

func ParseNuclei(result string, querier wrapper.Querier) (NucleiTemplate, error) {
	var parsed NucleiTemplate
	err := json.Unmarshal([]byte(result), &parsed)
	if err != nil {
		log.Printf("Error unmarshalling JSON: %v\n", err)
		return parsed, err
	}
	return parsed, nil
}
