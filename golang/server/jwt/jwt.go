package jwt

import (
	"log"
	"net/http"
	"os"
	"time"

	"github.com/aituglo/rubyx/golang/db"
	"github.com/aituglo/rubyx/golang/env"
	"github.com/aituglo/rubyx/golang/errors"
	jwt "github.com/golang-jwt/jwt/v4"
)

const insecureSecret = "asd973hkalkjhx97asdh"

// tokens auto-refresh at the end of their lifetime,
// so long as the user hasn't been disabled in the interim
const tokenLifetime = time.Hour * 6

const apiLifetime = time.Hour * 24 * 365 * 100

var hmacSecret []byte

func init() {
	hmacSecret = []byte(os.Getenv("TOKEN_SECRET"))
	if hmacSecret == nil {
		panic("No TOKEN_SECRET environment variable was found")
	}
	if string(hmacSecret) == insecureSecret {
		log.Print("\n\n*** WARNING ***\nYour JWT isn't secure!\nYou need to change your TOKEN_SECRET variable in .env (and restart your containers).\n\n")
	}
}

type claims struct {
	User *db.User
	jwt.StandardClaims
}

type LoginType struct {
	User  *db.User
	Token string
}

func WriteUserToken(w http.ResponseWriter, u *db.User) LoginType {
	result := LoginType{
		u,
		encodeUser(u, time.Now()),
	}

	return result
}

// HandleUserToken attempts to refresh an expired token if the user is still valid
func HandleUserToken(e env.Env, w http.ResponseWriter, r *http.Request) (*db.User, error) {
	u, err := userFromToken(r)

	// attempt refresh of expired token:
	if err == errors.ExpiredToken && u.Status == db.UserStatusActive {
		user, fetchError := e.DB().FindUserByEmail(r.Context(), u.Email)
		if fetchError != nil {
			return wipeToken(e, w)
		}
		if user.Status == db.UserStatusActive {
			WriteUserToken(w, &user)
			return &user, nil
		} else {
			// their account isn't verified, log them out
			return wipeToken(e, w)
		}
	}

	if err != nil {
		return nil, err
	}

	return u, err
}

func wipeToken(e env.Env, w http.ResponseWriter) (*db.User, error) {
	u := &db.User{}
	WriteUserToken(w, u)
	return u, nil
}

// userFromToken builds a user object from a JWT, if it's valid
func userFromToken(r *http.Request) (*db.User, error) {
	token := r.Header.Get("Api-Key")

	if token == "" {
		return &db.User{}, nil
	}

	return decodeUser(token)
}

// encodeUser convert a user struct into a jwt
func encodeUser(u *db.User, t time.Time) (tokenString string) {
	claims := claims{
		u,
		jwt.StandardClaims{
			IssuedAt:  t.Add(-time.Second).Unix(),
			ExpiresAt: t.Add(tokenLifetime).Unix(),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	// unhandled err here
	tokenString, err := token.SignedString(hmacSecret)
	if err != nil {
		log.Println("Error signing token", err)
	}
	return
}

// decodeUser converts a jwt into a user struct (or returns a zero-value user)
func decodeUser(tokenString string) (*db.User, error) {
	token, err := jwt.ParseWithClaims(tokenString, &claims{}, func(token *jwt.Token) (interface{}, error) {
		return hmacSecret, nil
	})

	if err != nil {
		// check for expired token
		if verr, ok := err.(*jwt.ValidationError); ok {
			if verr.Errors&jwt.ValidationErrorExpired != 0 {
				return getUserFromToken(token), errors.ExpiredToken
			}
		}
	}

	if err != nil || !token.Valid {
		return nil, errors.InvalidToken
	}

	return getUserFromToken(token), nil
}

func CreateApiKey(u *db.User) (tokenString string) {
	t := time.Now()

	claims := claims{
		u,
		jwt.StandardClaims{
			IssuedAt:  t.Add(-time.Second).Unix(),
			ExpiresAt: t.Add(apiLifetime).Unix(),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	// unhandled err here
	tokenString, err := token.SignedString(hmacSecret)
	if err != nil {
		log.Println("Error signing token", err)
	}
	return
}

func getUserFromToken(token *jwt.Token) *db.User {
	if claims, ok := token.Claims.(*claims); ok {
		return claims.User
	}

	return &db.User{}
}
