-- name: CreateSubdomain :one
INSERT INTO subdomain (program_id, subdomain, title, body_hash, status_code, content_length, tag, ip, screenshot) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;

-- name: UpdateSubdomain :one
UPDATE subdomain SET program_id = $2, subdomain = $3, title = $4, body_hash = $5, status_code = $6, content_length = $7, tag = $8, ip = $9, screenshot = $10, updated_at = NOW() WHERE id = $1 RETURNING *;

-- name: FavouriteSubdomain :one
UPDATE subdomain SET favourite = $2, updated_at = NOW() WHERE id = $1 RETURNING *;

-- name: FindSubdomainByIDs :one
SELECT * FROM subdomain WHERE id = $1 LIMIT 1;

-- name: FindSubdomainsBySubdomainAndProgramID :one
SELECT * FROM subdomain WHERE subdomain = $1 AND program_id = $2 LIMIT 1;

-- name: CountSubdomains :one
SELECT COUNT(*) FROM subdomain;

-- name: CountSubdomainsWithProgramID :one
SELECT COUNT(*) FROM subdomain WHERE program_id = $1;

-- name: CountSubdomainsWithSearch :one
SELECT COUNT(*) FROM subdomain WHERE subdomain LIKE $1;

-- name: CountSubdomainsWithSearchAndProgramID :one
SELECT COUNT(*) FROM subdomain WHERE subdomain LIKE $1 AND program_id = $2;

-- name: FindAllSubdomains :many
SELECT * FROM subdomain;

-- name: FindSubdomains :many
SELECT * FROM subdomain LIMIT $1 OFFSET $2;

-- name: FindSubdomainsWithProgramID :many
SELECT * FROM subdomain WHERE program_id = $1 LIMIT $2 OFFSET $3;

-- name: FindSubdomainsWithSearch :many
SELECT * FROM subdomain WHERE subdomain LIKE $1 LIMIT $2 OFFSET $3;

-- name: FindSubdomainsWithSearchAndProgramID :many
SELECT * FROM subdomain WHERE subdomain LIKE $1 AND program_id = $2 LIMIT $3 OFFSET $4;

-- name: DeleteSubdomainByIDs :exec
DELETE FROM subdomain WHERE id = $1;
