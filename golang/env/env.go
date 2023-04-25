package env

import (
	"github.com/aituglo/rubyx/golang/db/wrapper"
	"github.com/aituglo/rubyx/golang/mail"
	"github.com/aituglo/rubyx/golang/scan"
	"github.com/jackc/pgx/v4/pgxpool"
)

type Env interface {
	DB() wrapper.Querier
	Close()
	Mailer() *mail.Mailer
	Queue() *scan.ScanQueue
}

// default impl
type env struct {
	queue   *scan.ScanQueue
	db      *pgxpool.Pool
	querier wrapper.Querier
	mail    *mail.Mailer
}

func (e *env) Queue() *scan.ScanQueue {
	return e.queue
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

	scanQueue := scan.NewScanQueue(100)

	scan.StartScanWorkers(querier, scanQueue, 5)

	return &env{
		queue:   scanQueue,
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

func (e *mock) Queue() *scan.ScanQueue {
	return nil
}
