package handlers

import (
	"encoding/json"
	"net/http"
	"sort"
	"strconv"
	"strings"

	"github.com/aituglo/rubyx-dashboard/golang/db"
	"github.com/aituglo/rubyx-dashboard/golang/env"
	"github.com/aituglo/rubyx-dashboard/golang/errors"
	"github.com/aituglo/rubyx-dashboard/golang/server/write"
)

type SubdomainPagination struct {
	Subdomains      []db.Subdomain `json:"subdomains"`
	TotalSubdomains int            `json:"totalSubdomains"`
}

func GetTechnologies(env env.Env, user *db.User, w http.ResponseWriter, r *http.Request) http.HandlerFunc {
	if user == nil {
		return write.Error(errors.RouteUnauthorized)
	}

	technologyStrings, err := env.DB().GetTechnologiesForAllSubdomains(r.Context())
	if err != nil {
		return write.Error(err)
	}

	technologySet := make(map[string]struct{})
	for _, techString := range technologyStrings {
		technologies := strings.Split(techString, ",")
		for _, technology := range technologies {
			technologySet[technology] = struct{}{}
		}
	}

	uniqueTechnologies := make([]string, 0, len(technologySet))
	for technology := range technologySet {
		if technology != "" {
			uniqueTechnologies = append(uniqueTechnologies, technology)
		}
	}

	sort.Strings(uniqueTechnologies)

	return write.JSONorErr(uniqueTechnologies, nil)
}

func CreateSubdomain(env env.Env, user *db.User, w http.ResponseWriter, r *http.Request) http.HandlerFunc {
	if user == nil {
		return write.Error(errors.RouteUnauthorized)
	}

	decoder := json.NewDecoder(r.Body)
	p := &db.Subdomain{}
	err := decoder.Decode(p)
	if err != nil || p == nil {
		return write.Error(errors.NoJSONBody)
	}

	return write.JSONorErr(env.DB().CreateSubdomain(r.Context(), db.CreateSubdomainParams{
		ProgramID:     p.ProgramID,
		Subdomain:     p.Subdomain,
		Title:         p.Title,
		BodyHash:      p.BodyHash,
		StatusCode:    p.StatusCode,
		Technologies:  p.Technologies,
		ContentLength: p.ContentLength,
	}))
}

func GetSubdomain(env env.Env, user *db.User, w http.ResponseWriter, r *http.Request) http.HandlerFunc {
	if user == nil {
		return write.Error(errors.RouteUnauthorized)
	}

	id, err := getID(r)
	if err != nil {
		return write.Error(errors.RouteNotFound)
	}

	subdomain, err := env.DB().FindSubdomainByIDs(r.Context(), id)
	if err != nil {
		if isNotFound(err) {
			return write.Error(errors.ItemNotFound)
		}
		return write.Error(err)
	}

	return write.JSON(subdomain)
}

func GetSubdomainByProgram(env env.Env, user *db.User, w http.ResponseWriter, r *http.Request) http.HandlerFunc {
	if user == nil {
		return write.Error(errors.RouteUnauthorized)
	}

	id, err := getID(r)
	if err != nil {
		return write.Error(errors.RouteNotFound)
	}

	subdomains, err := env.DB().FindSubdomainByProgram(r.Context(), id)
	if err != nil {
		if isNotFound(err) {
			return write.Error(errors.ItemNotFound)
		}
		return write.Error(err)
	}

	return write.JSON(subdomains)
}

func UpdateSubdomain(env env.Env, user *db.User, w http.ResponseWriter, r *http.Request) http.HandlerFunc {
	if user == nil {
		return write.Error(errors.RouteUnauthorized)
	}

	decoder := json.NewDecoder(r.Body)
	p := &db.Subdomain{}
	err := decoder.Decode(p)
	if err != nil || p == nil {
		return write.Error(errors.NoJSONBody)
	}

	return write.JSONorErr(env.DB().UpdateSubdomain(r.Context(), db.UpdateSubdomainParams{
		ID:            p.ID,
		ProgramID:     p.ProgramID,
		Title:         p.Title,
		BodyHash:      p.BodyHash,
		StatusCode:    p.StatusCode,
		Technologies:  p.Technologies,
		ContentLength: p.ContentLength,
	}))
}

func DeleteSubdomain(env env.Env, user *db.User, w http.ResponseWriter, r *http.Request) http.HandlerFunc {
	if user == nil {
		return write.Error(errors.RouteUnauthorized)
	}

	id, err := getID(r)
	if err != nil {
		return write.Error(errors.RouteNotFound)
	}

	return write.SuccessOrErr(env.DB().DeleteSubdomainByIDs(r.Context(), id))
}

func GetSubdomains(env env.Env, user *db.User, w http.ResponseWriter, r *http.Request) http.HandlerFunc {
	if user == nil {
		return write.Error(errors.RouteUnauthorized)
	}

	page, err := strconv.Atoi(r.URL.Query().Get("page"))
	if err != nil || page < 1 {
		page = 1
	}

	resultsPerPage, err := strconv.Atoi(r.URL.Query().Get("resultsPerPage"))
	if err != nil || resultsPerPage < 1 {
		resultsPerPage = 30
	}

	search := r.URL.Query().Get("search")
	technologies := r.URL.Query().Get("technologies")
	programIDStr := r.URL.Query().Get("program_id")
	var programID int64
	programIDProvided := false
	if programIDStr != "" {
		id, err := strconv.ParseInt(programIDStr, 10, 64)
		if err != nil {
			return write.Error(err)
		}
		programID = id
		if programID != 0 {
			programIDProvided = true
		} else {
			programIDProvided = false
		}
	}

	var subdomains []db.Subdomain
	var total int64
	if search != "" && programIDProvided && technologies != "" {
		subdomains, err = env.DB().FindSubdomainsWithSearchAndProgramIDAndTechnologies(r.Context(), db.FindSubdomainsWithSearchAndProgramIDAndTechnologiesParams{
			Subdomain:     "%" + search + "%",
			ProgramID:     programID,
			StringToArray: technologies,
			Offset:        int32((page - 1) * resultsPerPage),
			Limit:         int32(resultsPerPage),
		})
		total, err = env.DB().CountSubdomainsWithSearchAndProgramIDAndTechnologies(r.Context(), db.CountSubdomainsWithSearchAndProgramIDAndTechnologiesParams{
			Subdomain:     "%" + search + "%",
			ProgramID:     programID,
			StringToArray: technologies,
		})
	} else if search != "" && programIDProvided && technologies == "" {
		subdomains, err = env.DB().FindSubdomainsWithSearchAndProgramID(r.Context(), db.FindSubdomainsWithSearchAndProgramIDParams{
			Subdomain: "%" + search + "%",
			ProgramID: programID,
			Offset:    int32((page - 1) * resultsPerPage),
			Limit:     int32(resultsPerPage),
		})
		total, err = env.DB().CountSubdomainsWithSearchAndProgramID(r.Context(), db.CountSubdomainsWithSearchAndProgramIDParams{
			Subdomain: "%" + search + "%",
			ProgramID: programID,
		})
	} else if search != "" && programIDProvided == false && technologies != "" {
		subdomains, err = env.DB().FindSubdomainsWithSearchAndTechnologies(r.Context(), db.FindSubdomainsWithSearchAndTechnologiesParams{
			Subdomain:     "%" + search + "%",
			StringToArray: technologies,
			Offset:        int32((page - 1) * resultsPerPage),
			Limit:         int32(resultsPerPage),
		})
		total, err = env.DB().CountSubdomainsWithSearchAndTechnologies(r.Context(), db.CountSubdomainsWithSearchAndTechnologiesParams{
			Subdomain:     "%" + search + "%",
			StringToArray: technologies,
		})
	} else if search != "" && programIDProvided == false && technologies == "" {
		subdomains, err = env.DB().FindSubdomainsWithSearch(r.Context(), db.FindSubdomainsWithSearchParams{
			Subdomain: "%" + search + "%",
			Offset:    int32((page - 1) * resultsPerPage),
			Limit:     int32(resultsPerPage),
		})
		total, err = env.DB().CountSubdomainsWithSearch(r.Context(), "%"+search+"%")
	} else if search == "" && programIDProvided && technologies != "" {
		subdomains, err = env.DB().FindSubdomainsWithProgramIDAndTechnologies(r.Context(), db.FindSubdomainsWithProgramIDAndTechnologiesParams{
			ProgramID:     programID,
			StringToArray: technologies,
			Offset:        int32((page - 1) * resultsPerPage),
			Limit:         int32(resultsPerPage),
		})
		total, err = env.DB().CountSubdomainsWithProgramIDAndTechnologies(r.Context(), db.CountSubdomainsWithProgramIDAndTechnologiesParams{
			ProgramID:     programID,
			StringToArray: technologies,
		})
	} else if search == "" && programIDProvided && technologies == "" {
		subdomains, err = env.DB().FindSubdomainsWithProgramID(r.Context(), db.FindSubdomainsWithProgramIDParams{
			ProgramID: programID,
			Offset:    int32((page - 1) * resultsPerPage),
			Limit:     int32(resultsPerPage),
		})
		total, err = env.DB().CountSubdomainsWithProgramID(r.Context(), programID)
	} else if search == "" && programIDProvided == false && technologies != "" {
		subdomains, err = env.DB().FindSubdomainsWithTechnologies(r.Context(), db.FindSubdomainsWithTechnologiesParams{
			StringToArray: technologies,
			Offset:        int32((page - 1) * resultsPerPage),
			Limit:         int32(resultsPerPage),
		})
		total, err = env.DB().CountSubdomainsWithTechnologies(r.Context(), technologies)
	} else {
		subdomains, err = env.DB().FindSubdomains(r.Context(), db.FindSubdomainsParams{
			Offset: int32((page - 1) * resultsPerPage),
			Limit:  int32(resultsPerPage),
		})
		total, err = env.DB().CountSubdomains(r.Context())
	}

	if err != nil {
		return write.Error(err)
	}

	return write.JSONorErr(SubdomainPagination{
		Subdomains:      subdomains,
		TotalSubdomains: int(total),
	}, nil)
}
