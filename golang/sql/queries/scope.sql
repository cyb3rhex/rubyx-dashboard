-- name: CreateScope :one
INSERT INTO scopes (program_id, scope, scope_type) VALUES ($1, $2, $3) RETURNING *;

-- name: FindScopes :many
SELECT * FROM scopes;

-- name: FindProgramByScope :one
SELECT program_id FROM scopes WHERE scope LIKE $1 LIMIT 1;

-- name: FindScopeByID :one
SELECT * FROM scopes WHERE id = $1 LIMIT 1;

-- name: FindScopesByProgramID :many
SELECT * FROM scopes WHERE program_id = $1;

-- name: DeleteScopeByID :exec
DELETE FROM scopes WHERE id = $1;

-- name: GetScopeByProgramIDAndScope :one
SELECT * FROM scopes WHERE program_id = $1 AND scope = $2 LIMIT 1;