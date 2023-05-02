-- name: CreateScan :one
INSERT INTO scans (id, domain, params, status, type, output)
VALUES ($1, $2, $3, $4, $5, $6)
RETURNING *;

-- name: FindScans :many
SELECT * FROM scans;

-- name: FindScanByID :one
SELECT * FROM scans WHERE id = $1 LIMIT 1;

-- name: UpdateScan :one
UPDATE scans
SET status = $2, start_time = $3, end_time = $4, output = $5, updated_at = now()
WHERE id = $1
RETURNING *;

-- name: DeleteScanByIDs :exec
DELETE FROM scans WHERE id = $1;
