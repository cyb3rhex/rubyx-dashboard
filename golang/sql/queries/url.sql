-- name: CreateUrl :one
INSERT INTO urls (subdomain, url, status_code, tag) VALUES ($1, $2, $3, $4) RETURNING *;

-- name: UpdateUrl :one
UPDATE urls SET subdomain = $2, url = $3, status_code = $4, tag = $5, updated_at = NOW() WHERE id = $1 RETURNING *;

-- name: FindUrlByIDs :one
SELECT * FROM urls WHERE id = $1 LIMIT 1;

-- name: FindUrls :many
SELECT * FROM urls;

-- name: DeleteUrlByIDs :exec
DELETE FROM urls WHERE id = $1;
