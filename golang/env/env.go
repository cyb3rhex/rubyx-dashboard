package env

import (
	"github.com/aituglo/rubyx-dashboard/golang/db/wrapper"
	"github.com/aituglo/rubyx-dashboard/golang/mail"
	"github.com/jackc/pgx/v4/pgxpool"
)

type Env interface {
	DB() wrapper.Querier
	Close()
	Mailer() *mail.Mailer
}

// default impl
type env struct {
	db      *pgxpool.Pool
	querier wrapper.Querier
	mail    *mail.Mailer
}

func (e *env) DB() wrapper.Querier {
	return e.querier
}

func (e *env) Close() {
	e.db.Close()
}

func (e *env) Mailer() *mail.Mailer {
	return e.mail
}

func New() (Env, error) {
	db, err := Connect()
	if err != nil {
		return nil, err
	}

	querier := wrapper.NewQuerier(db)

	return &env{
		db:      db,
		querier: querier,
		mail:    mail.New(),
	}, nil
}

// Mock impl
func Mock(db wrapper.Querier) Env {
	return &mock{
		db: db,
	}
}

type mock struct {
	db wrapper.Querier
}

func (e *mock) DB() wrapper.Querier {
	return e.db
}
func (e *mock) Close() {}

func (e *mock) Mailer() *mail.Mailer {
	return nil
}
