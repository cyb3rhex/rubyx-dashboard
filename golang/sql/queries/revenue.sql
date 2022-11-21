-- name: CreateRevenue :one
INSERT INTO revenue (program_id, vulnerability_id, money) VALUES ($1, $2, $3) RETURNING *;

-- name: UpdateRevenue :one
UPDATE revenue SET program_id = $2, vulnerability_id = $3, money = $4, service = $4, updated_at = NOW() WHERE id = $1 RETURNING *;

-- name: FindRevenueByIDs :one
SELECT * FROM revenue WHERE id = $1 LIMIT 1;

-- name: FindRevenues :many
SELECT * FROM revenue;

-- name: DeleteRevenueByIDs :exec
DELETE FROM revenue WHERE id = $1;
