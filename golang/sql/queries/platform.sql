-- name: CreatePlatform :one
INSERT INTO platform (name, slug, email, password, otp, hunter_username, jwt, type) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;

-- name: UpdatePlatform :one
UPDATE platform SET name = $2, slug = $3, email = $4, password = $5, otp = $6, type = $7, hunter_username = $8, jwt = $9, updated_at = NOW() WHERE id = $1 RETURNING *;

-- name: FindPlatformByIDs :one
SELECT name, slug, email, hunter_username, type FROM platform WHERE id = $1 LIMIT 1;

-- name: FindPlatforms :many
SELECT name, slug, email, hunter_username, type FROM platform;

-- name: GetPlatforms :many
SELECT * FROM platform;

-- name: DeletePlatformByIDs :exec
DELETE FROM platform WHERE id = $1;
