package wrapper

import (
	"context"
	"log"

	"github.com/aituglo/rubyx-dashboard/golang/db"
	"github.com/jackc/pgx/v4/pgxpool"
)

type Querier interface {
	db.Querier
	WithTx(context.Context, func(q db.Querier) error) error
}

type Queries struct {
	*db.Queries
	conn *pgxpool.Pool
}

func (q *Queries) WithTx(ctx context.Context, fn func(q db.Querier) error) error {
	tx, err := q.conn.Begin(ctx)
	if err != nil {
		return err
	}

	err = fn(&Queries{
		Queries: q.Queries.WithTx(tx),
	})

	if err != nil {
		rollBackErr := tx.Rollback(ctx)
		if rollBackErr != nil {
			log.Println(rollBackErr)
		}

		return err
	}

	return tx.Commit(ctx)
}

func NewQuerier(conn *pgxpool.Pool) Querier {
	return &Queries{
		Queries: db.New(conn),
		conn:    conn,
	}
}
