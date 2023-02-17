package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/aituglo/rubyx/golang/db"
	"github.com/aituglo/rubyx/golang/env"
	"github.com/aituglo/rubyx/golang/errors"
	"github.com/aituglo/rubyx/golang/server/write"
)

func CreateNote(env env.Env, user *db.User, w http.ResponseWriter, r *http.Request) http.HandlerFunc {
	if user == nil {
		return write.Error(errors.RouteUnauthorized)
	}

	decoder := json.NewDecoder(r.Body)
	n := &db.Note{}
	err := decoder.Decode(n)
	if err != nil || n == nil {
		return write.Error(errors.NoJSONBody)
	}

	return write.JSONorErr(env.DB().CreateNote(r.Context(), db.CreateNoteParams{
		ProgramID: n.ProgramID,
		Title:     n.Title,
		Content:   n.Content,
		Tag:       n.Tag,
	}))
}

func GetNotesByProgramID(env env.Env, user *db.User, w http.ResponseWriter, r *http.Request) http.HandlerFunc {
	if user == nil {
		return write.Error(errors.RouteUnauthorized)
	}

	programID, err := getID(r)
	if err != nil {
		return write.Error(errors.RouteNotFound)
	}

	return write.JSONorErr(env.DB().FindNotesByProgramID(r.Context(), programID))
}

func GetNote(env env.Env, user *db.User, w http.ResponseWriter, r *http.Request) http.HandlerFunc {
	if user == nil {
		return write.Error(errors.RouteUnauthorized)
	}

	id, err := getID(r)
	if err != nil {
		return write.Error(errors.RouteNotFound)
	}

	note, err := env.DB().FindNoteByID(r.Context(), id)
	if err != nil {
		if isNotFound(err) {
			return write.Error(errors.ItemNotFound)
		}
		return write.Error(err)
	}

	return write.JSON(note)
}

func GetNotes(env env.Env, user *db.User, w http.ResponseWriter, r *http.Request) http.HandlerFunc {
	if user == nil {
		return write.Error(errors.RouteUnauthorized)
	}

	return write.JSONorErr(env.DB().FindNotes(r.Context()))
}

func UpdateNote(env env.Env, user *db.User, w http.ResponseWriter, r *http.Request) http.HandlerFunc {
	if user == nil {
		return write.Error(errors.RouteUnauthorized)
	}

	decoder := json.NewDecoder(r.Body)
	n := &db.Note{}
	err := decoder.Decode(n)
	if err != nil || n == nil {
		return write.Error(errors.NoJSONBody)
	}

	return write.JSONorErr(env.DB().UpdateNote(r.Context(), db.UpdateNoteParams{
		ID:        n.ID,
		ProgramID: n.ProgramID,
		Title:     n.Title,
		Content:   n.Content,
		Tag:       n.Tag,
	}))
}

func DeleteNote(env env.Env, user *db.User, w http.ResponseWriter, r *http.Request) http.HandlerFunc {
	if user == nil {
		return write.Error(errors.RouteUnauthorized)
	}

	id, err := getID(r)
	if err != nil {
		return write.Error(errors.RouteNotFound)
	}

	return write.SuccessOrErr(env.DB().DeleteNote(r.Context(), id))
}
