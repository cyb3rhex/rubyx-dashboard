-- name: CreatePort :one
INSERT INTO port (ip_id, port) VALUES ($1, $2) RETURNING *;

-- name: UpdatePort :one
UPDATE port SET ip_id = $2, port = $3, updated_at = NOW() WHERE id = $1 RETURNING *;

-- name: FindPortByIDs :one
SELECT * FROM port WHERE id = $1 LIMIT 1;

-- name: CountPortsByIp :one
SELECT COUNT(*) FROM port WHERE ip_id = $1;

-- name: FindPortsWithIpID :many
SELECT * FROM port WHERE ip_id = $1;

-- name: FindPortsWithIpIDAndPort :one
SELECT * FROM port WHERE ip_id = $1 AND port = $2 LIMIT 1;

-- name: DeletePortByIDs :exec
DELETE FROM port WHERE id = $1;
