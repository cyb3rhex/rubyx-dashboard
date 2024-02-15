package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/aituglo/rubyx-dashboard/golang/db"
	"github.com/aituglo/rubyx-dashboard/golang/env"
	"github.com/aituglo/rubyx-dashboard/golang/errors"
	"github.com/aituglo/rubyx-dashboard/golang/server/write"
)

type AddTechnologieType struct {
	Technologie string `json:"name"`
	Version     string `json:"version"`
	SubdomainID int64  `json:"subdomain_id"`
}

func AddTechnologie(env env.Env, user *db.User, w http.ResponseWriter, r *http.Request) http.HandlerFunc {
	if user == nil {
		return write.Error(errors.RouteUnauthorized)
	}

	decoder := json.NewDecoder(r.Body)
	p := &AddTechnologieType{}
	err := decoder.Decode(p)
	if err != nil || p == nil {
		return write.Error(errors.NoJSONBody)
	}

	if p.Technologie == "" {
		return write.Error(errors.NoJSONBody)
	} else {
		currentTech, err := env.DB().FindTechnologieByName(r.Context(), p.Technologie)
		if err != nil {
			currentTech, err = env.DB().CreateTechnologie(r.Context(), p.Technologie)
			if err != nil {
				return write.Error(err)
			}
		}

		techVersion, err := env.DB().AddTechnologieVersion(r.Context(), db.AddTechnologieVersionParams{
			TechnologyID: currentTech.ID,
			Version:      p.Version,
		})
		if err != nil {
			return write.Error(err)
		}

		if p.SubdomainID != 0 {
			_, err = env.DB().AddTechnologieSubdomain(r.Context(), db.AddTechnologieSubdomainParams{
				TechnologyVersion: techVersion.ID,
				SubdomainID:       p.SubdomainID,
			})
			if err != nil {
				return write.Error(err)
			}
		}

		return write.JSON(currentTech)
	}
}

func GetTechnologies(env env.Env, user *db.User, w http.ResponseWriter, r *http.Request) http.HandlerFunc {
	if user == nil {
		return write.Error(errors.RouteUnauthorized)
	}

	technologies, err := env.DB().FindAllTechnologies(r.Context())
	if err != nil {
		return write.Error(err)
	}

	return write.JSON(technologies)
}

func GetTechnologie(env env.Env, user *db.User, w http.ResponseWriter, r *http.Request) http.HandlerFunc {
	if user == nil {
		return write.Error(errors.RouteUnauthorized)
	}

	id, err := getID(r)
	if err != nil {
		return write.Error(errors.RouteNotFound)
	}

	technology, err := env.DB().FindTechnologieByIDs(r.Context(), id)
	if err != nil {
		if isNotFound(err) {
			return write.Error(errors.ItemNotFound)
		}
		return write.Error(err)
	}

	return write.JSON(technology)
}

func UpdateTechnologie(env env.Env, user *db.User, w http.ResponseWriter, r *http.Request) http.HandlerFunc {
	if user == nil {
		return write.Error(errors.RouteUnauthorized)
	}

	decoder := json.NewDecoder(r.Body)
	p := &db.Technology{}
	err := decoder.Decode(p)
	if err != nil || p == nil {
		return write.Error(errors.NoJSONBody)
	}

	return write.JSONorErr(env.DB().UpdateTechnologie(r.Context(), db.UpdateTechnologieParams{
		ID:   p.ID,
		Name: p.Name,
	}))
}

func DeleteTechnologie(env env.Env, user *db.User, w http.ResponseWriter, r *http.Request) http.HandlerFunc {
	if user == nil {
		return write.Error(errors.RouteUnauthorized)
	}

	id, err := getID(r)
	if err != nil {
		return write.Error(errors.RouteNotFound)
	}

	return write.SuccessOrErr(env.DB().DeleteTechnologieByIDs(r.Context(), id))
}
