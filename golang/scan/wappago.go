package scan

import (
	"context"
	"encoding/base64"
	"io/ioutil"
	"log"
	"os"
	"strings"

	"github.com/EasyRecon/wappaGo/structure"
	wappagoWrapper "github.com/EasyRecon/wappaGo/wrapper"
	"github.com/aituglo/rubyx/golang/db"
	"github.com/aituglo/rubyx/golang/db/wrapper"
)

func LaunchWappaGo(task *ScanTask, subdomains []string, querier wrapper.Querier) {
	log.Printf("Launching WappaGo for %s\n", task.Domain)

	options := structure.WrapperOptions{}
	options.FollowRedirect = true

	if task.Screenshot {
		options.Screenshot = "/tmp/screenshots"
	}

	if task.PortScan {
		options.Ports = "80,81,300,443,591,593,832,981,1010,1311,2082,2087,2095,2096,2480,3000,3128,3333,4243,4567,4711,4712,4993,5000,5104,5108,5800,6543,7000,7396,7474,8000,8001,8008,8014,8042,8069,8080,8081,8088,8090,8091,8118,8123,8172,8222,8243,8280,8281,8333,8443,8500,8834,8880,8888,8983,9000,9043,9060,9080,9090,9091,9200,9443,9800,9981,12443,16080,18091,18092,20720,28017"
	} else {
		options.Ports = "80, 443"
	}

	results := make(chan structure.Data)

	go func() {
		for urlInfos := range results {
			if urlInfos.Infos.Screenshot != "" {

				filePath := "/tmp/screenshots/" + urlInfos.Infos.Screenshot

				fileContent, err := ioutil.ReadFile(filePath)
				if err != nil {
					log.Printf("Error reading file: %v\n", err)
				}

				base64Encoded := base64.StdEncoding.EncodeToString(fileContent)
				urlInfos.Infos.Screenshot = base64Encoded

				err = os.Remove(filePath)
				if err != nil {
					log.Printf("Error deleting file: %v\n", err)
				}
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
			_, createErr := querier.CreateSubdomain(context.Background(), db.CreateSubdomainParams{
				ProgramID:     program_id,
				Url:           urlInfos.Url,
				Ip:            urlInfos.Infos.IP,
				Title:         urlInfos.Infos.Title,
				Screenshot:    urlInfos.Infos.Screenshot,
				Technologies:  technologies,
				Port:          strings.Join(urlInfos.Infos.Ports, ","),
				ContentLength: int32(urlInfos.Infos.Content_length),
				StatusCode:    int32(urlInfos.Infos.Status_code),
			})
			if createErr != nil {
				log.Printf("Error when adding a subdomain to the database: %v\n", createErr)
			}
		}
	}()

	wappagoWrapper.StartReconAsync(subdomains, options, results)
}
