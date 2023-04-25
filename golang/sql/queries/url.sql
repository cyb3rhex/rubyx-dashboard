-- name: CreateUrl :one
INSERT INTO urls (subdomain_id, url, title, body_hash, status_code, technologies, content_length) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;

-- name: UpdateUrl :one
UPDATE urls SET subdomain_id = $2, url = $3, title = $4, body_hash = $5, status_code = $6, technologies = $7, content_length = $8, updated_at = NOW() WHERE id = $1 RETURNING *;

-- name: FindUrlByIDs :one
SELECT * FROM urls WHERE id = $1 LIMIT 1;

-- name: FindUrls :many
SELECT * FROM urls;

-- name: DeleteUrlByIDs :exec
DELETE FROM urls WHERE id = $1;
