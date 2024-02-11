-- name: CreateScreenshot :one
INSERT INTO screenshot (subdomain_id, screenshot) VALUES ($1, $2) RETURNING *;

-- name: UpdateScreenshot :one
UPDATE screenshot SET subdomain_id = $2, screenshot = $3, updated_at = NOW() WHERE id = $1 RETURNING *;

-- name: FindScreenshotByIDs :one
SELECT * FROM screenshot WHERE id = $1 LIMIT 1;

-- name: CountScreenshots :one
SELECT COUNT(*) FROM screenshot;

-- name: FindScreenshotsWithSubdomainID :many
SELECT * FROM screenshot WHERE subdomain_id = $1 LIMIT $2 OFFSET $3;

-- name: FindScreenshotsWithScreenshot :many
SELECT * FROM screenshot WHERE screenshot = $1  LIMIT $2 OFFSET $3;

-- name: FindScreenshots :many
SELECT * FROM screenshot LIMIT $1 OFFSET $2;

-- name: DeleteScreenshotByIDs :exec
DELETE FROM screenshot WHERE id = $1;
