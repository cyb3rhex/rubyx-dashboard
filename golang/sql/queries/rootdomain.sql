-- name: CreateRootDomain :one
INSERT INTO rootdomain (program_id, url) VALUES ($1, $2) RETURNING *;

-- name: UpdateRootDomain :one
UPDATE rootdomain SET program_id = $2, url = $3, updated_at = NOW() WHERE id = $1 RETURNING *;

-- name: FindRootDomainByIDs :one
SELECT * FROM rootdomain WHERE id = $1 LIMIT 1;

-- name: FindRootDomains :many
SELECT * FROM rootdomain;

-- name: DeleteRootDomainByIDs :exec
DELETE FROM rootdomain WHERE id = $1;
