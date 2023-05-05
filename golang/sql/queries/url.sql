-- name: CreateUrl :one
INSERT INTO urls (subdomain, url, status_code, tag) VALUES ($1, $2, $3, $4) RETURNING *;

-- name: UpdateUrl :one
UPDATE urls SET subdomain = $2, url = $3, status_code = $4, tag = $5, updated_at = NOW() WHERE id = $1 RETURNING *;

-- name: CountUrlsBySubdomain :one
SELECT COUNT(*) FROM urls WHERE subdomain = $1;

-- name: FindUrlsBySubdomain :many
SELECT * FROM urls WHERE subdomain = $1 LIMIT $2 OFFSET $3;

-- name: FindUrlsBySubdomainWithSearch :many
SELECT * FROM urls WHERE subdomain = $1 AND url LIKE $2 LIMIT $3 OFFSET $4;

-- name: FindUrlByIDs :one
SELECT * FROM urls WHERE id = $1 LIMIT 1;

-- name: FindUrls :many
SELECT * FROM urls;



-- name: DeleteUrlByIDs :exec
DELETE FROM urls WHERE id = $1;
