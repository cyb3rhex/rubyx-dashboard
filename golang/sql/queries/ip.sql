-- name: CreateIp :one
INSERT INTO ip (program_id, subdomain_id, ip) VALUES ($1, $2, $3) RETURNING *;

-- name: UpdateIp :one
UPDATE ip SET program_id = $2, subdomain_id = $3, ip = $4, updated_at = NOW() WHERE id = $1 RETURNING *;

-- name: FindIpByIDs :one
SELECT * FROM ip WHERE id = $1 LIMIT 1;

-- name: FindIps :many
SELECT * FROM ip;

-- name: DeleteIpByIDs :exec
DELETE FROM ip WHERE id = $1;
