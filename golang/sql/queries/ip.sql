-- name: CreateIp :one
INSERT INTO ip (program_id, subdomain_id, ip) VALUES ($1, $2, $3) RETURNING *;

-- name: UpdateIp :one
UPDATE ip SET program_id = $2, subdomain_id = $3, updated_at = NOW() WHERE id = $1 RETURNING *;

-- name: FindIpByIDs :one
SELECT * FROM ip WHERE id = $1 LIMIT 1;

-- name: CountIps :one
SELECT COUNT(*) FROM ip;

-- name: FindIpsWithProgramID :many
SELECT * FROM ip WHERE program_id = $1 LIMIT $2 OFFSET $3;

-- name: FindIpsWithSubdomainID :many
SELECT * FROM ip WHERE subdomain_id = $1 LIMIT $2 OFFSET $3;

-- name: FindIpsWithIp :many
SELECT * FROM ip WHERE ip = $1  LIMIT $2 OFFSET $3;

-- name: FindIps :many
SELECT * FROM ip LIMIT $1 OFFSET $2;

-- name: DeleteIpByIDs :exec
DELETE FROM ip WHERE id = $1;
