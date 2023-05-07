-- name: CreateSubdomain :one
INSERT INTO subdomain (program_id, url, title, body_hash, status_code, technologies, content_length, tag, ip, port, screenshot) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *;

-- name: UpdateSubdomain :one
UPDATE subdomain SET program_id = $2, url = $3, title = $4, body_hash = $5, status_code = $6, technologies = $7, content_length = $8, tag = $9, updated_at = NOW() WHERE id = $1 RETURNING *;

-- name: FindSubdomainByIDs :one
SELECT * FROM subdomain WHERE id = $1 LIMIT 1;

-- name: FindSubdomainByProgram :many
SELECT * FROM subdomain WHERE program_id = $1;

-- name: CountSubdomains :one
SELECT COUNT(*) FROM subdomain;

-- name: CountSubdomainsWithProgramID :one
SELECT COUNT(*) FROM subdomain WHERE program_id = $1;

-- name: CountSubdomainsWithSearch :one
SELECT COUNT(*) FROM subdomain WHERE url LIKE $1;

-- name: CountSubdomainsWithSearchAndProgramID :one
SELECT COUNT(*) FROM subdomain WHERE url LIKE $1 AND program_id = $2;

-- name: CountSubdomainsWithSearchAndProgramIDAndTechnologies :one
SELECT COUNT(*) FROM subdomain WHERE url LIKE $1 AND program_id = $2 AND string_to_array(technologies, ',') && string_to_array($3, ',');

-- name: CountSubdomainsWithSearchAndTechnologies :one
SELECT COUNT(*) FROM subdomain WHERE url LIKE $1 AND string_to_array(technologies, ',') && string_to_array($2, ',');

-- name: CountSubdomainsWithProgramIDAndTechnologies :one
SELECT COUNT(*) FROM subdomain WHERE program_id = $1 AND string_to_array(technologies, ',') && string_to_array($2, ',');

-- name: CountSubdomainsWithTechnologies :one
SELECT COUNT(*) FROM subdomain WHERE string_to_array(technologies, ',') && string_to_array($1, ',');

-- name: GetTechnologiesForAllSubdomains :many
SELECT technologies FROM subdomain;

-- name: FindSubdomains :many
SELECT * FROM subdomain LIMIT $1 OFFSET $2;

-- name: FindSubdomainsWithProgramID :many
SELECT * FROM subdomain WHERE program_id = $1 LIMIT $2 OFFSET $3;

-- name: FindSubdomainsWithSearch :many
SELECT * FROM subdomain WHERE url LIKE $1 LIMIT $2 OFFSET $3;

-- name: FindSubdomainsWithSearchAndProgramID :many
SELECT * FROM subdomain WHERE url LIKE $1 AND program_id = $2 LIMIT $3 OFFSET $4;

-- name: FindSubdomainsWithSearchAndProgramIDAndTechnologies :many
SELECT * FROM subdomain WHERE url LIKE $1 AND program_id = $2 AND string_to_array(technologies, ',') && string_to_array($3, ',') LIMIT $4 OFFSET $5;

-- name: FindSubdomainsWithSearchAndTechnologies :many
SELECT * FROM subdomain WHERE url LIKE $1 AND string_to_array(technologies, ',') && string_to_array($2, ',') LIMIT $3 OFFSET $4;

-- name: FindSubdomainsWithProgramIDAndTechnologies :many
SELECT * FROM subdomain WHERE program_id = $1 AND string_to_array(technologies, ',') && string_to_array($2, ',') LIMIT $3 OFFSET $4;

-- name: FindSubdomainsWithTechnologies :many
SELECT * FROM subdomain WHERE string_to_array(technologies, ',') && string_to_array($1, ',') LIMIT $2 OFFSET $3;

-- name: DeleteSubdomainByIDs :exec
DELETE FROM subdomain WHERE id = $1;
