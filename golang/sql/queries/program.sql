-- name: CreateProgram :one
INSERT INTO program (platform_id, name, slug, vdp, tag, url, type) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;

-- name: UpdateProgram :one
UPDATE program SET platform_id = $2, name = $3, slug = $4, vdp = $5, url = $6, type = $7, updated_at = NOW() WHERE id = $1 RETURNING *;

-- name: FindProgramByIDs :one
SELECT * FROM program WHERE id = $1 LIMIT 1;

-- name: FindProgramBySlug :one
SELECT * FROM program WHERE slug = $1 LIMIT 1;

-- name: FindPrograms :many
SELECT * FROM program;

-- name: DeleteProgramByIDs :exec
DELETE FROM program WHERE id = $1;

-- name: DeleteProgramBySlug :exec
DELETE FROM program WHERE slug = $1;
