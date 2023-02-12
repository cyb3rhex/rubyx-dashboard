-- name: CreateStat :one
INSERT INTO stats (report_id, report_title, severity, reward, currency, collab, report_status, report_date, platform_id, created_at, updated_at)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), NOW())
RETURNING *;

-- name: UpdateStat :one
UPDATE stats
SET report_id = $2, report_title = $3, severity = $4, reward = $5, currency = $6, collab = $7, report_status = $8, report_date = $9, platform_id = $10, updated_at = NOW()
WHERE id = $1
RETURNING *;

-- name: FindStatByReportID :one
SELECT * FROM stats WHERE report_id = $1 LIMIT 1;

-- name: FindStatByID :one
SELECT * FROM stats WHERE id = $1 LIMIT 1;

-- name: FindStats :many
SELECT * FROM stats;

-- name: DeleteStatByID :exec
DELETE FROM stats WHERE id = $1;
