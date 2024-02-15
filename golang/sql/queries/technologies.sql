-- name: CreateTechnologie :one
INSERT INTO technologies (name) VALUES ($1) RETURNING *;

-- name: UpdateTechnologie :one
UPDATE technologies SET name = $2, updated_at = NOW() WHERE id = $1 RETURNING *;

-- name: AddTechnologieVersion :one
INSERT INTO technologie_version (technology_id, version) VALUES ($1, $2) RETURNING *;

-- name: AddTechnologieSubdomain :one
INSERT INTO technologie_subdomain (technology_version, subdomain_id) VALUES ($1, $2) RETURNING *;

-- name: FindAllTechnologies :many
SELECT * FROM technologies;

-- name: FindTechnologieByIDs :one
SELECT * FROM technologies WHERE id = $1 LIMIT 1;

-- name: FindTechnologieByName :one
SELECT * FROM technologies WHERE name = $1 LIMIT 1;

-- name: FindTechnologieVersionsByIDs :many
SELECT * FROM technologie_version WHERE technology_id = $1;

-- name: FindTechnologiesBySubdomain :many
SELECT * FROM technologies WHERE id IN (SELECT technology_id FROM technologie_subdomain WHERE subdomain_id = $1);

-- name: CountTechnologies :one
SELECT COUNT(*) FROM technologies;

-- name: CountTechnologiesVersion :one
SELECT COUNT(*) FROM technologie_version WHERE technology_id = $1;

-- name: DeleteTechnologieByIDs :exec
DELETE FROM technologies WHERE id = $1;
