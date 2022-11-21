// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.15.0
// source: rootdomain.sql

package db

import (
	"context"
)

const createRootDomain = `-- name: CreateRootDomain :one
INSERT INTO rootdomain (program_id, url) VALUES ($1, $2) RETURNING id, program_id, url, created_at, updated_at
`

type CreateRootDomainParams struct {
	ProgramID int64  `json:"program_id"`
	Url       string `json:"url"`
}

func (q *Queries) CreateRootDomain(ctx context.Context, arg CreateRootDomainParams) (Rootdomain, error) {
	row := q.db.QueryRow(ctx, createRootDomain, arg.ProgramID, arg.Url)
	var i Rootdomain
	err := row.Scan(
		&i.ID,
		&i.ProgramID,
		&i.Url,
		&i.CreatedAt,
		&i.UpdatedAt,
	)
	return i, err
}

const deleteRootDomainByIDs = `-- name: DeleteRootDomainByIDs :exec
DELETE FROM rootdomain WHERE id = $1
`

func (q *Queries) DeleteRootDomainByIDs(ctx context.Context, id int64) error {
	_, err := q.db.Exec(ctx, deleteRootDomainByIDs, id)
	return err
}

const findRootDomainByIDs = `-- name: FindRootDomainByIDs :one
SELECT id, program_id, url, created_at, updated_at FROM rootdomain WHERE id = $1 LIMIT 1
`

func (q *Queries) FindRootDomainByIDs(ctx context.Context, id int64) (Rootdomain, error) {
	row := q.db.QueryRow(ctx, findRootDomainByIDs, id)
	var i Rootdomain
	err := row.Scan(
		&i.ID,
		&i.ProgramID,
		&i.Url,
		&i.CreatedAt,
		&i.UpdatedAt,
	)
	return i, err
}

const findRootDomains = `-- name: FindRootDomains :many
SELECT id, program_id, url, created_at, updated_at FROM rootdomain
`

func (q *Queries) FindRootDomains(ctx context.Context) ([]Rootdomain, error) {
	rows, err := q.db.Query(ctx, findRootDomains)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	items := []Rootdomain{}
	for rows.Next() {
		var i Rootdomain
		if err := rows.Scan(
			&i.ID,
			&i.ProgramID,
			&i.Url,
			&i.CreatedAt,
			&i.UpdatedAt,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const updateRootDomain = `-- name: UpdateRootDomain :one
UPDATE rootdomain SET program_id = $2, url = $3, updated_at = NOW() WHERE id = $1 RETURNING id, program_id, url, created_at, updated_at
`

type UpdateRootDomainParams struct {
	ID        int64  `json:"id"`
	ProgramID int64  `json:"program_id"`
	Url       string `json:"url"`
}

func (q *Queries) UpdateRootDomain(ctx context.Context, arg UpdateRootDomainParams) (Rootdomain, error) {
	row := q.db.QueryRow(ctx, updateRootDomain, arg.ID, arg.ProgramID, arg.Url)
	var i Rootdomain
	err := row.Scan(
		&i.ID,
		&i.ProgramID,
		&i.Url,
		&i.CreatedAt,
		&i.UpdatedAt,
	)
	return i, err
}