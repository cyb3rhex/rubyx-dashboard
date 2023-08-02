-- name: CreateProgram :one
INSERT INTO program (platform_id, name, slug, vdp, tag, url, type) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;

-- name: UpdateProgram :one
UPDATE program SET platform_id = $2, name = $3, slug = $4, vdp = $5, url = $6, type = $7, updated_at = NOW() WHERE id = $1 RETURNING *;

-- name: FavouriteProgram :one
UPDATE program SET favourite = $2, updated_at = NOW() WHERE id = $1 RETURNING *;

-- name: FindProgramByIDs :one
SELECT * FROM program WHERE id = $1 LIMIT 1;

-- name: FindProgramBySlug :one
SELECT * FROM program WHERE slug = $1 LIMIT 1;

-- name: FindAllPrograms :many
SELECT * FROM program;

-- name: FindPrograms :many
SELECT * FROM program LIMIT $1 OFFSET $2;

-- name: FindProgramsWithSearch :many
SELECT * FROM program WHERE name LIKE $1 LIMIT $2 OFFSET $3;

-- name: FindProgramsWithSearchAndType :many
SELECT * FROM program WHERE name LIKE $1 AND type = $2::program_type LIMIT $3 OFFSET $4;

-- name: FindProgramsWithType :many
SELECT * FROM program WHERE type = $1::program_type LIMIT $2 OFFSET $3;

-- name: FindProgramsWithSearchAndTypeAndPlatform :many
SELECT * FROM program WHERE name LIKE $1 AND type = $2::program_type AND platform_id = $3 LIMIT $4 OFFSET $5;

-- name: FindProgramsWithTypeAndPlatform :many
SELECT * FROM program WHERE type = $1::program_type AND platform_id = $2 LIMIT $3 OFFSET $4;

-- name: FindProgramsWithSearchAndPlatform :many
SELECT * FROM program WHERE name LIKE $1 AND platform_id = $2 LIMIT $3 OFFSET $4;

-- name: FindProgramsWithPlatform :many
SELECT * FROM program WHERE platform_id = $1 LIMIT $2 OFFSET $3;

-- name: CountPrograms :one
SELECT COUNT(*) FROM program;

-- name: CountProgramsWithSearch :one
SELECT COUNT(*) FROM program WHERE name LIKE $1;

-- name: CountProgramsWithSearchAndType :one
SELECT COUNT(*) FROM program WHERE name LIKE $1 AND type = $2::program_type;

-- name: CountProgramsWithType :one
SELECT COUNT(*) FROM program WHERE type = $1::program_type;

-- name: CountProgramsWithSearchAndTypeAndPlatform :one
SELECT COUNT(*) FROM program WHERE name LIKE $1 AND type = $2::program_type AND platform_id = $3;

-- name: CountProgramsWithTypeAndPlatform :one
SELECT COUNT(*) FROM program WHERE type = $1::program_type AND platform_id = $2;

-- name: CountProgramsWithSearchAndPlatform :one
SELECT COUNT(*) FROM program WHERE name LIKE $1 AND platform_id = $2;

-- name: CountProgramsWithPlatform :one
SELECT COUNT(*) FROM program WHERE platform_id = $1;

-- name: DeleteProgramByIDs :exec
DELETE FROM program WHERE id = $1;