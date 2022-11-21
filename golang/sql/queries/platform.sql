-- name: CreatePlatform :one
INSERT INTO platform (name, slug, url, type) VALUES ($1, $2, $3, $4) RETURNING *;

-- name: UpdatePlatform :one
UPDATE platform SET name = $2, slug = $3, url = $4, type = $5, updated_at = NOW() WHERE id = $1 RETURNING *;

-- name: FindPlatformByIDs :one
SELECT * FROM platform WHERE id = $1 LIMIT 1;

-- name: FindPlatforms :many
SELECT * FROM platform;

-- name: DeletePlatformByIDs :exec
DELETE FROM platform WHERE id = $1;
