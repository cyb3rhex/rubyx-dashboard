// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.15.0
// source: program.sql

package db

import (
	"context"
)

const createProgram = `-- name: CreateProgram :one
INSERT INTO program (platform_id, name, slug, vdp, url, type) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, platform_id, name, slug, vdp, url, type, created_at, updated_at
`

type CreateProgramParams struct {
	PlatformID int64       `json:"platform_id"`
	Name       string      `json:"name"`
	Slug       string      `json:"slug"`
	Vdp        bool        `json:"vdp"`
	Url        string      `json:"url"`
	Type       ProgramType `json:"type"`
}

func (q *Queries) CreateProgram(ctx context.Context, arg CreateProgramParams) (Program, error) {
	row := q.db.QueryRow(ctx, createProgram,
		arg.PlatformID,
		arg.Name,
		arg.Slug,
		arg.Vdp,
		arg.Url,
		arg.Type,
	)
	var i Program
	err := row.Scan(
		&i.ID,
		&i.PlatformID,
		&i.Name,
		&i.Slug,
		&i.Vdp,
		&i.Url,
		&i.Type,
		&i.CreatedAt,
		&i.UpdatedAt,
	)
	return i, err
}

const deleteProgramByIDs = `-- name: DeleteProgramByIDs :exec
DELETE FROM program WHERE id = $1
`

func (q *Queries) DeleteProgramByIDs(ctx context.Context, id int64) error {
	_, err := q.db.Exec(ctx, deleteProgramByIDs, id)
	return err
}

const findProgramByIDs = `-- name: FindProgramByIDs :one
SELECT id, platform_id, name, slug, vdp, url, type, created_at, updated_at FROM program WHERE id = $1 LIMIT 1
`

func (q *Queries) FindProgramByIDs(ctx context.Context, id int64) (Program, error) {
	row := q.db.QueryRow(ctx, findProgramByIDs, id)
	var i Program
	err := row.Scan(
		&i.ID,
		&i.PlatformID,
		&i.Name,
		&i.Slug,
		&i.Vdp,
		&i.Url,
		&i.Type,
		&i.CreatedAt,
		&i.UpdatedAt,
	)
	return i, err
}

const findPrograms = `-- name: FindPrograms :many
SELECT id, platform_id, name, slug, vdp, url, type, created_at, updated_at FROM program
`

func (q *Queries) FindPrograms(ctx context.Context) ([]Program, error) {
	rows, err := q.db.Query(ctx, findPrograms)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	items := []Program{}
	for rows.Next() {
		var i Program
		if err := rows.Scan(
			&i.ID,
			&i.PlatformID,
			&i.Name,
			&i.Slug,
			&i.Vdp,
			&i.Url,
			&i.Type,
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

const updateProgram = `-- name: UpdateProgram :one
UPDATE program SET platform_id = $2, name = $3, slug = $4, vdp = $5, url = $6, type = $7, updated_at = NOW() WHERE id = $1 RETURNING id, platform_id, name, slug, vdp, url, type, created_at, updated_at
`

type UpdateProgramParams struct {
	ID         int64       `json:"id"`
	PlatformID int64       `json:"platform_id"`
	Name       string      `json:"name"`
	Slug       string      `json:"slug"`
	Vdp        bool        `json:"vdp"`
	Url        string      `json:"url"`
	Type       ProgramType `json:"type"`
}

func (q *Queries) UpdateProgram(ctx context.Context, arg UpdateProgramParams) (Program, error) {
	row := q.db.QueryRow(ctx, updateProgram,
		arg.ID,
		arg.PlatformID,
		arg.Name,
		arg.Slug,
		arg.Vdp,
		arg.Url,
		arg.Type,
	)
	var i Program
	err := row.Scan(
		&i.ID,
		&i.PlatformID,
		&i.Name,
		&i.Slug,
		&i.Vdp,
		&i.Url,
		&i.Type,
		&i.CreatedAt,
		&i.UpdatedAt,
	)
	return i, err
}