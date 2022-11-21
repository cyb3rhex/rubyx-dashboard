-- name: CreatePort :one
INSERT INTO port (ip_id, port, service) VALUES ($1, $2, $3) RETURNING *;

-- name: UpdatePort :one
UPDATE port SET ip_id = $2, port = $3, service = $4, updated_at = NOW() WHERE id = $1 RETURNING *;

-- name: FindPortByIDs :one
SELECT * FROM port WHERE id = $1 LIMIT 1;

-- name: FindPorts :many
SELECT * FROM port;

-- name: DeletePortByIDs :exec
DELETE FROM port WHERE id = $1;
