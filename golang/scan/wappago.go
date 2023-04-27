package scan

import (
	"encoding/base64"
	"encoding/json"
	"io/ioutil"
	"log"
	"os"

	"github.com/aituglo/rubyx/golang/db/wrapper"
)

type WappaGoTechnology struct {
	Name    string `json:"name"`
	Version string `json:"version"`
	Cpe     string `json:"cpe"`
}

type WappaGoInfo struct {
	StatusCode    int                 `json:"status_code"`
	Ports         []string            `json:"ports"`
	Path          string              `json:"path"`
	Location      string              `json:"location"`
	Title         string              `json:"title"`
	Scheme        string              `json:"scheme"`
	Data          string              `json:"data"`
	ResponseTime  int                 `json:"response_time"`
	Screenshot    string              `json:"screenshot_name"`
	Technologies  []WappaGoTechnology `json:"technologies"`
	ContentLength int                 `json:"content_length"`
	ContentType   string              `json:"content_type"`
	IP            string              `json:"ip"`
	CertVHost     []string            `json:"certvhost"`
}

type WappaGo struct {
	Url   string      `json:"url"`
	Infos WappaGoInfo `json:"infos"`
}

func ParseWappaGo(result string, querier wrapper.Querier) (WappaGo, error) {
	var parsed WappaGo
	err := json.Unmarshal([]byte(result), &parsed)
	if err != nil {
		log.Printf("Error unmarshalling JSON: %v\n", err)
		return parsed, err
	}

	if parsed.Infos.Screenshot != "" {

		filePath := "/tmp/screenshots/" + parsed.Infos.Screenshot

		fileContent, err := ioutil.ReadFile(filePath)
		if err != nil {
			log.Printf("Error reading file: %v\n", err)
		}

		base64Encoded := base64.StdEncoding.EncodeToString(fileContent)
		parsed.Infos.Screenshot = base64Encoded

		err = os.Remove(filePath)
		if err != nil {
			log.Printf("Error deleting file: %v\n", err)
		}
	}
	return parsed, nil
}
