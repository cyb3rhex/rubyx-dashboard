-- name: AddSetting :one
INSERT INTO settings (key, value) VALUES ($1, $2) RETURNING *;

-- name: UpdateSetting :one
UPDATE settings SET value = $2, updated_at = NOW() WHERE key = $1 RETURNING *;

-- name: GetSettingByKey :one
SELECT * FROM settings WHERE key = $1 LIMIT 1;

-- name: GetSettings :many
SELECT * FROM settings;