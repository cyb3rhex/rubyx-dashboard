-- name: CreateParam :one
INSERT INTO params (url_id, param) VALUES ($1, $2) RETURNING *;

-- name: UpdateParam :one
UPDATE params SET url_id = $2, param = $3, updated_at = NOW() WHERE id = $1 RETURNING *;

-- name: FindParamByIDs :one
SELECT * FROM params WHERE id = $1 LIMIT 1;

-- name: CountParams :one
SELECT COUNT(*) FROM params;

-- name: FindParamsWithUrlID :many
SELECT * FROM params WHERE url_id = $1 LIMIT $2 OFFSET $3;

-- name: FindParamsWithParam :many
SELECT * FROM params WHERE param = $1  LIMIT $2 OFFSET $3;

-- name: FindParams :many
SELECT * FROM params LIMIT $1 OFFSET $2;

-- name: DeleteParamByIDs :exec
DELETE FROM params WHERE id = $1;
