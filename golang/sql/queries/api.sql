-- name: CreateApi :one
INSERT INTO api (user_id, api_key) VALUES ($1, $2) RETURNING *;

-- name: FindApiByIDs :one
SELECT * FROM api WHERE id = $1 LIMIT 1;

-- name: FindApis :many
SELECT * FROM api;

-- name: DeleteApiByIDs :exec
DELETE FROM api WHERE id = $1;
