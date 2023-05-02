package scan

import (
	"context"
	"log"
	"time"

	"github.com/aituglo/rubyx/golang/db"
	"github.com/aituglo/rubyx/golang/db/wrapper"
	"github.com/projectdiscovery/nuclei/v2/pkg/catalog/config"
	"github.com/projectdiscovery/nuclei/v2/pkg/catalog/disk"
	"github.com/projectdiscovery/nuclei/v2/pkg/catalog/loader"
	"github.com/projectdiscovery/nuclei/v2/pkg/core"
	"github.com/projectdiscovery/nuclei/v2/pkg/core/inputs"
	"github.com/projectdiscovery/nuclei/v2/pkg/output"
	"github.com/projectdiscovery/nuclei/v2/pkg/parsers"
	"github.com/projectdiscovery/nuclei/v2/pkg/protocols"
	"github.com/projectdiscovery/nuclei/v2/pkg/protocols/common/contextargs"
	"github.com/projectdiscovery/nuclei/v2/pkg/protocols/common/hosterrorscache"
	"github.com/projectdiscovery/nuclei/v2/pkg/protocols/common/interactsh"
	"github.com/projectdiscovery/nuclei/v2/pkg/protocols/common/protocolinit"
	"github.com/projectdiscovery/nuclei/v2/pkg/protocols/common/protocolstate"
	"github.com/projectdiscovery/nuclei/v2/pkg/reporting"
	"github.com/projectdiscovery/nuclei/v2/pkg/testutils"
	"github.com/projectdiscovery/nuclei/v2/pkg/types"
	"github.com/projectdiscovery/ratelimit"
)

func LaunchNuclei(task *ScanTask, target string, querier wrapper.Querier) {
	cache := hosterrorscache.New(30, hosterrorscache.DefaultMaxHostsCount, nil)
	defer cache.Close()

	mockProgress := &testutils.MockProgressClient{}
	reportingClient, _ := reporting.New(&reporting.Options{}, "")
	defer reportingClient.Close()

	outputWriter := testutils.NewMockOutputWriter()
	outputWriter.WriteCallback = func(event *output.ResultEvent) {
		domain, err := ExtractDomain(event.Matched)
		if err != nil {
			log.Printf("Error when extracting domain: %v\n", err)
		}
		program_id := CheckScope(domain, querier)

		_, createErr := querier.CreateVulnerability(context.Background(), db.CreateVulnerabilityParams{
			ProgramID: program_id,
			Url:       event.Matched,
			Severity:  event.Info.SeverityHolder.Severity.String(),
			Type:      event.Info.Name,
			Tag:       event.Info.Tags.String(),
		})
		if createErr != nil {
			log.Printf("Error when adding a subdomain to the database: %v\n", createErr)
		}
	}

	defaultOpts := types.DefaultOptions()
	protocolstate.Init(defaultOpts)
	protocolinit.Init(defaultOpts)

	defaultOpts.ExcludeTags = config.ReadIgnoreFile().Tags

	interactOpts := interactsh.DefaultOptions(outputWriter, reportingClient, mockProgress)
	interactClient, err := interactsh.New(interactOpts)
	if err != nil {
		log.Fatalf("Could not create interact client: %s\n", err)
	}
	defer interactClient.Close()

	catalog := disk.NewCatalog("/rubyx-data/nuclei")
	executerOpts := protocols.ExecuterOptions{
		Output:          outputWriter,
		Options:         defaultOpts,
		Progress:        mockProgress,
		Catalog:         catalog,
		IssuesClient:    reportingClient,
		RateLimiter:     ratelimit.New(context.Background(), 150, time.Second),
		Interactsh:      interactClient,
		HostErrorsCache: cache,
		ResumeCfg:       types.NewResumeCfg(),
	}
	engine := core.New(defaultOpts)
	engine.SetExecuterOptions(executerOpts)

	workflowLoader, err := parsers.NewLoader(&executerOpts)
	if err != nil {
		log.Fatalf("Could not create workflow loader: %s\n", err)
	}
	executerOpts.WorkflowLoader = workflowLoader

	store, err := loader.New(loader.NewConfig(defaultOpts, catalog, executerOpts))
	if err != nil {
		log.Fatalf("Could not create loader client: %s\n", err)
	}
	store.Load()
	inputArgs := []*contextargs.MetaInput{{Input: target}}

	input := &inputs.SimpleInputProvider{Inputs: inputArgs}
	log.Println("Starting nuclei engine")
	_ = engine.Execute(store.Templates(), input)
	engine.WorkPool().Wait()
}
