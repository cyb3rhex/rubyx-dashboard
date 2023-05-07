package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/aituglo/rubyx/golang/db"
	"github.com/aituglo/rubyx/golang/env"
	"github.com/aituglo/rubyx/golang/errors"
	"github.com/aituglo/rubyx/golang/server/write"
)

type NotesPagination struct {
	Notes []db.Note `json:"notes"`
	Total int       `json:"total"`
}

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

	page, err := strconv.Atoi(r.URL.Query().Get("page"))
	if err != nil || page < 1 {
		page = 1
	}

	resultsPerPage, err := strconv.Atoi(r.URL.Query().Get("resultsPerPage"))
	if err != nil || resultsPerPage < 1 {
		resultsPerPage = 30
	}

	search := r.URL.Query().Get("search")
	tags := r.URL.Query().Get("tags")
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

	var notes []db.Note
	var totalNotes int64

	if search != "" && tags != "" && programIDProvided {
		notes, err = env.DB().FindNotesBySearchAndProgramIDAndTag(r.Context(), db.FindNotesBySearchAndProgramIDAndTagParams{
			Offset:        int32((page - 1) * resultsPerPage),
			Limit:         int32(resultsPerPage),
			Title:         "%" + search + "%",
			StringToArray: tags,
			ProgramID:     programID,
		})
		totalNotes, err = env.DB().CountNotesBySearchAndProgramIDAndTag(r.Context(), db.CountNotesBySearchAndProgramIDAndTagParams{
			Title:         "%" + search + "%",
			StringToArray: tags,
			ProgramID:     programID,
		})
	} else if search != "" && tags != "" && !programIDProvided {
		notes, err = env.DB().FindNotesBySearchAndTag(r.Context(), db.FindNotesBySearchAndTagParams{
			Offset:        int32((page - 1) * resultsPerPage),
			Limit:         int32(resultsPerPage),
			Title:         "%" + search + "%",
			StringToArray: tags,
		})
		totalNotes, err = env.DB().CountNotesBySearchAndTag(r.Context(), db.CountNotesBySearchAndTagParams{
			Title:         "%" + search + "%",
			StringToArray: tags,
		})
	} else if search != "" && tags == "" && programIDProvided {
		notes, err = env.DB().FindNotesBySearchAndProgramID(r.Context(), db.FindNotesBySearchAndProgramIDParams{
			Offset:    int32((page - 1) * resultsPerPage),
			Limit:     int32(resultsPerPage),
			Title:     "%" + search + "%",
			ProgramID: programID,
		})
		totalNotes, err = env.DB().CountNotesBySearchAndProgramID(r.Context(), db.CountNotesBySearchAndProgramIDParams{
			Title:     "%" + search + "%",
			ProgramID: programID,
		})
	} else if search == "" && tags != "" && programIDProvided {
		notes, err = env.DB().FindNotesByProgramIDAndTag(r.Context(), db.FindNotesByProgramIDAndTagParams{
			Offset:        int32((page - 1) * resultsPerPage),
			Limit:         int32(resultsPerPage),
			StringToArray: tags,
			ProgramID:     programID,
		})
		totalNotes, err = env.DB().CountNotesByProgramIDAndTag(r.Context(), db.CountNotesByProgramIDAndTagParams{
			StringToArray: tags,
			ProgramID:     programID,
		})
	} else if search != "" && tags == "" && !programIDProvided {
		notes, err = env.DB().FindNotesBySearch(r.Context(), db.FindNotesBySearchParams{
			Offset: int32((page - 1) * resultsPerPage),
			Limit:  int32(resultsPerPage),
			Title:  "%" + search + "%",
		})
		totalNotes, err = env.DB().CountNotesBySearch(r.Context(), "%"+search+"%")
	} else if search == "" && tags != "" && !programIDProvided {
		notes, err = env.DB().FindNotesByTag(r.Context(), db.FindNotesByTagParams{
			Offset:        int32((page - 1) * resultsPerPage),
			Limit:         int32(resultsPerPage),
			StringToArray: tags,
		})
		totalNotes, err = env.DB().CountNotesByTag(r.Context(), tags)
	} else if search == "" && tags == "" && programIDProvided {
		notes, err = env.DB().FindNotesByProgramID(r.Context(), db.FindNotesByProgramIDParams{
			Offset:    int32((page - 1) * resultsPerPage),
			Limit:     int32(resultsPerPage),
			ProgramID: programID,
		})
		totalNotes, err = env.DB().CountNotesByProgramID(r.Context(), programID)
	} else {
		notes, err = env.DB().FindNotes(r.Context(), db.FindNotesParams{
			Offset: int32((page - 1) * resultsPerPage),
			Limit:  int32(resultsPerPage),
		})
		totalNotes, err = env.DB().CountNotes(r.Context())
	}
	if err != nil {
		return write.Error(err)
	}

	return write.JSONorErr(NotesPagination{
		Notes: notes,
		Total: int(totalNotes),
	}, nil)
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
