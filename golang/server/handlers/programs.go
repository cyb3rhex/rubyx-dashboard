package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
	"strings"

	"github.com/aituglo/rubyx-dashboard/golang/db"
	"github.com/aituglo/rubyx-dashboard/golang/env"
	"github.com/aituglo/rubyx-dashboard/golang/errors"
	"github.com/aituglo/rubyx-dashboard/golang/server/utils"
	"github.com/aituglo/rubyx-dashboard/golang/server/write"
)

type ProgramPagination struct {
	Programs []db.Program `json:"programs"`
	Total    int          `json:"total"`
}

// Special cases for TLDs like .co.uk
var specialCases = map[string]struct{}{
	"co.uk":  {},
	"com.au": {},
	"com.br": {},
	"com.sg": {},
}

func getRootDomain(domain string) (string, error) {
	labels := strings.Split(domain, ".")
	if len(labels) < 2 {
		return "", fmt.Errorf("invalid domain")
	}

	// Check if it's a special case TLD
	lastTwoLabels := strings.Join(labels[len(labels)-2:], ".")
	if _, ok := specialCases[lastTwoLabels]; ok && len(labels) >= 3 {
		return strings.Join(labels[len(labels)-3:], "."), nil
	}

	// Regular case
	return strings.Join(labels[len(labels)-2:], "."), nil
}

func toProgramType(s string) db.ProgramType {
	switch s {
	case "public":
		return db.ProgramTypePublic
	case "private":
		return db.ProgramTypePrivate
	default:
		return ""
	}
}

func ReloadPrograms(env env.Env, user *db.User, w http.ResponseWriter, r *http.Request) http.HandlerFunc {
	if user == nil {
		return write.Error(errors.RouteUnauthorized)
	}

	platform, err := env.DB().GetPlatforms(r.Context())
	if err != nil {
		return write.Error(err)
	}

	for _, p := range platform {
		if p.Name == "yeswehack" {
			utils.UpdateProgramsYWH(&p, 0, env, r.Context())
		} else if p.Name == "hackerone" {
			utils.UpdateProgramsH1(&p, 0, env)
		}
	}

	return write.JSONorErr(env.DB().FindStats(r.Context()))
}

func CreateProgram(env env.Env, user *db.User, w http.ResponseWriter, r *http.Request) http.HandlerFunc {
	if user == nil {
		return write.Error(errors.RouteUnauthorized)
	}

	decoder := json.NewDecoder(r.Body)
	p := &db.Program{}
	err := decoder.Decode(p)
	if err != nil || p == nil {
		return write.Error(errors.NoJSONBody)
	}

	return write.JSONorErr(env.DB().CreateProgram(r.Context(), db.CreateProgramParams{
		PlatformID: p.PlatformID,
		Name:       p.Name,
		Slug:       p.Slug,
		Url:        p.Url,
		Vdp:        p.Vdp,
		Type:       p.Type,
	}))
}

func GetProgram(env env.Env, user *db.User, w http.ResponseWriter, r *http.Request) http.HandlerFunc {
	if user == nil {
		return write.Error(errors.RouteUnauthorized)
	}

	id, err := getID(r)
	if err != nil {
		slug := getString("id", r)

		program, err := env.DB().FindProgramBySlug(r.Context(), slug)
		if err != nil {
			if isNotFound(err) {
				return write.Error(errors.ItemNotFound)
			}
			return write.Error(err)
		}
		return write.JSON(program)
	} else {
		program, err := env.DB().FindProgramByIDs(r.Context(), id)
		if err != nil {
			if isNotFound(err) {
				return write.Error(errors.ItemNotFound)
			}
			return write.Error(err)
		}

		return write.JSON(program)
	}
}

func GetScopeByProgramID(env env.Env, user *db.User, w http.ResponseWriter, r *http.Request) http.HandlerFunc {
	if user == nil {
		return write.Error(errors.RouteUnauthorized)
	}

	id, _ := getID(r)

	scope, err := env.DB().FindScopesByProgramID(r.Context(), id)
	if err != nil {
		if isNotFound(err) {
			return write.Error(errors.ItemNotFound)
		}
		return write.Error(err)
	}

	return write.JSON(scope)
}

func GetProgramByScope(env env.Env, user *db.User, w http.ResponseWriter, r *http.Request) http.HandlerFunc {
	if user == nil {
		return write.Error(errors.RouteUnauthorized)
	}

	scope := r.URL.Query().Get("subdomain")

	domain, err := getRootDomain(scope)
	if err != nil {
		fmt.Printf("Error extracting root domain: %v\n", err)
	}

	program_id, err := env.DB().FindProgramByScope(r.Context(), "%"+domain+"%")
	if err != nil {
		if isNotFound(err) {
			return write.JSON(-1)
		}
		return write.JSON(-1)
	}

	return write.JSON(program_id)
}

func GetPrograms(env env.Env, user *db.User, w http.ResponseWriter, r *http.Request) http.HandlerFunc {
	if user == nil {
		return write.Error(errors.RouteUnauthorized)
	}

	reload, err := strconv.Atoi(r.URL.Query().Get("reload"))
	if err != nil || reload > 1 {
		reload = 0
	}

	if reload == 1 {
		return ReloadPrograms(env, user, w, r)
	}

	all, err := strconv.Atoi(r.URL.Query().Get("all"))
	if err != nil || all > 1 {
		all = 0
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
	platformType := r.URL.Query().Get("type")
	platformIDStr := r.URL.Query().Get("platform_id")
	var platformID int64
	platformIDProvided := false
	if platformIDStr != "" {
		id, err := strconv.ParseInt(platformIDStr, 10, 64)
		if err != nil {
			return write.Error(err)
		}
		platformID = id
		if platformID != 0 {
			platformIDProvided = true
		} else {
			platformIDProvided = false
		}
	}

	var programs []db.Program
	var total int64

	if all == 1 {
		return write.JSONorErr(env.DB().FindAllPrograms(r.Context()))
	} else if search != "" && platformType != "" && platformIDProvided {
		programs, err = env.DB().FindProgramsWithSearchAndTypeAndPlatform(r.Context(), db.FindProgramsWithSearchAndTypeAndPlatformParams{
			Name:       "%" + search + "%",
			Column2:    toProgramType(platformType),
			PlatformID: platformID,
			Offset:     int32((page - 1) * resultsPerPage),
			Limit:      int32(resultsPerPage),
		})
		if err != nil {
			return write.Error(err)
		}
		total, err = env.DB().CountProgramsWithSearchAndTypeAndPlatform(r.Context(), db.CountProgramsWithSearchAndTypeAndPlatformParams{
			Name:       "%" + search + "%",
			Column2:    toProgramType(platformType),
			PlatformID: platformID,
		})
	} else if search != "" && platformType != "" && !platformIDProvided {
		programs, err = env.DB().FindProgramsWithSearchAndType(r.Context(), db.FindProgramsWithSearchAndTypeParams{
			Name:    "%" + search + "%",
			Column2: toProgramType(platformType),
			Offset:  int32((page - 1) * resultsPerPage),
			Limit:   int32(resultsPerPage),
		})
		if err != nil {
			return write.Error(err)
		}
		total, err = env.DB().CountProgramsWithSearchAndType(r.Context(), db.CountProgramsWithSearchAndTypeParams{
			Name:    "%" + search + "%",
			Column2: toProgramType(platformType),
		})
	} else if search != "" && platformType == "" && platformIDProvided {
		programs, err = env.DB().FindProgramsWithSearchAndPlatform(r.Context(), db.FindProgramsWithSearchAndPlatformParams{
			Name:       "%" + search + "%",
			PlatformID: platformID,
			Offset:     int32((page - 1) * resultsPerPage),
			Limit:      int32(resultsPerPage),
		})
		if err != nil {
			return write.Error(err)
		}
		total, err = env.DB().CountProgramsWithSearchAndPlatform(r.Context(), db.CountProgramsWithSearchAndPlatformParams{
			Name:       "%" + search + "%",
			PlatformID: platformID,
		})
	} else if search == "" && platformType != "" && platformIDProvided {
		programs, err = env.DB().FindProgramsWithTypeAndPlatform(r.Context(), db.FindProgramsWithTypeAndPlatformParams{
			Column1:    toProgramType(platformType),
			PlatformID: platformID,
			Offset:     int32((page - 1) * resultsPerPage),
			Limit:      int32(resultsPerPage),
		})
		if err != nil {
			return write.Error(err)
		}
		total, err = env.DB().CountProgramsWithTypeAndPlatform(r.Context(), db.CountProgramsWithTypeAndPlatformParams{
			Column1:    toProgramType(platformType),
			PlatformID: platformID,
		})
	} else if search != "" && platformType == "" && !platformIDProvided {
		programs, err = env.DB().FindProgramsWithSearch(r.Context(), db.FindProgramsWithSearchParams{
			Name:   "%" + search + "%",
			Offset: int32((page - 1) * resultsPerPage),
			Limit:  int32(resultsPerPage),
		})
		if err != nil {
			return write.Error(err)
		}
		total, err = env.DB().CountProgramsWithSearch(r.Context(), "%"+search+"%")
	} else if search == "" && platformType != "" && !platformIDProvided {
		programs, err = env.DB().FindProgramsWithType(r.Context(), db.FindProgramsWithTypeParams{
			Column1: toProgramType(platformType),
			Offset:  int32((page - 1) * resultsPerPage),
			Limit:   int32(resultsPerPage),
		})
		if err != nil {
			return write.Error(err)
		}
		total, err = env.DB().CountProgramsWithType(r.Context(), toProgramType(platformType))
	} else if search == "" && platformType == "" && platformIDProvided {
		programs, err = env.DB().FindProgramsWithPlatform(r.Context(), db.FindProgramsWithPlatformParams{
			PlatformID: platformID,
			Offset:     int32((page - 1) * resultsPerPage),
			Limit:      int32(resultsPerPage),
		})
		if err != nil {
			return write.Error(err)
		}
		total, err = env.DB().CountProgramsWithPlatform(r.Context(), platformID)
	} else {
		programs, err = env.DB().FindPrograms(r.Context(), db.FindProgramsParams{
			Offset: int32((page - 1) * resultsPerPage),
			Limit:  int32(resultsPerPage),
		})
		if err != nil {
			return write.Error(err)
		}
		total, err = env.DB().CountPrograms(r.Context())
	}

	if err != nil {
		return write.Error(err)
	}

	return write.JSONorErr(ProgramPagination{
		Programs: programs,
		Total:    int(total),
	}, nil)
}

func UpdateProgram(env env.Env, user *db.User, w http.ResponseWriter, r *http.Request) http.HandlerFunc {
	if user == nil {
		return write.Error(errors.RouteUnauthorized)
	}

	decoder := json.NewDecoder(r.Body)
	p := &db.Program{}
	err := decoder.Decode(p)
	if err != nil || p == nil {
		return write.Error(errors.NoJSONBody)
	}

	return write.JSONorErr(env.DB().UpdateProgram(r.Context(), db.UpdateProgramParams{
		ID:         p.ID,
		PlatformID: p.PlatformID,
		Name:       p.Name,
		Slug:       p.Slug,
		Url:        p.Url,
		Vdp:        p.Vdp,
		Favourite:  p.Favourite,
		Type:       db.ProgramTypePublic,
	}))
}

func DeleteProgram(env env.Env, user *db.User, w http.ResponseWriter, r *http.Request) http.HandlerFunc {
	if user == nil {
		return write.Error(errors.RouteUnauthorized)
	}

	id, err := getID(r)
	if err != nil {
		return write.Error(errors.RouteNotFound)
	}

	return write.SuccessOrErr(env.DB().DeleteProgramByIDs(r.Context(), id))
}
