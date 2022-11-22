package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/aituglo/rubyx/golang/db"
	"github.com/aituglo/rubyx/golang/env"
	"github.com/aituglo/rubyx/golang/errors"
	"github.com/aituglo/rubyx/golang/server/jwt"
	"github.com/aituglo/rubyx/golang/server/write"
)

type loginRequest struct {
	Email string
	Pass  string
}

func Login(env env.Env, user *db.User, w http.ResponseWriter, r *http.Request) http.HandlerFunc {
	decoder := json.NewDecoder(r.Body)
	req := &loginRequest{}
	err := decoder.Decode(&req)
	if err != nil || req == nil {
		return write.Error(errors.NoJSONBody)
	}

	u, err := env.DB().FindUserByEmail(r.Context(), req.Email)
	if err != nil {
		if isNotFound(err) {
			return write.Error(errors.FailedLogin)
		}
		return write.Error(err)
	}

	if !checkPasswordHash(req.Pass, u.Salt, u.Pass) {
		return write.Error(errors.FailedLogin)
	}

	res := jwt.WriteUserToken(w, &u)
	return write.JSON(&res)
}

func Logout(env env.Env, user *db.User, w http.ResponseWriter, r *http.Request) http.HandlerFunc {
	u := &db.User{}
	jwt.WriteUserToken(w, u)
	return write.Success()
}
