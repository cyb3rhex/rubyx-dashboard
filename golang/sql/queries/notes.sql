-- name: CreateNote :one
INSERT INTO notes (program_id, title, content, tag) VALUES ($1, $2, $3, $4) RETURNING *;

-- name: FindNotes :many
SELECT * FROM notes LIMIT $1 OFFSET $2;

-- name: CountNotes :one
SELECT COUNT(*) FROM notes;

-- name: CountNotesByProgramID :one
SELECT COUNT(*) FROM notes WHERE program_id = $1;

-- name: CountNotesBySearch :one
SELECT COUNT(*) FROM notes WHERE title LIKE $1;

-- name: CountNotesBySearchAndProgramID :one
SELECT COUNT(*) FROM notes WHERE title LIKE $1 AND program_id = $2;

-- name: CountNotesBySearchAndProgramIDAndTag :one
SELECT COUNT(*) FROM notes WHERE title LIKE $1 AND program_id = $2 AND string_to_array(tag, ',') && string_to_array($3, ',');

-- name: CountNotesBySearchAndTag :one
SELECT COUNT(*) FROM notes WHERE title LIKE $1 AND string_to_array(tag, ',') && string_to_array($2, ',');

-- name: CountNotesByProgramIDAndTag :one
SELECT COUNT(*) FROM notes WHERE program_id = $1 AND string_to_array(tag, ',') && string_to_array($2, ',');

-- name: CountNotesByTag :one
SELECT COUNT(*) FROM notes WHERE string_to_array(tag, ',') && string_to_array($1, ',');

-- name: FindNoteByID :one
SELECT * FROM notes WHERE id = $1 LIMIT 1;

-- name: FindNotesByProgramID :many
SELECT * FROM notes WHERE program_id = $1 LIMIT $2 OFFSET $3;

-- name: FindNotesBySearch :many
SELECT * FROM notes WHERE title LIKE $1 LIMIT $2 OFFSET $3;

-- name: FindNotesBySearchAndProgramID :many
SELECT * FROM notes WHERE title LIKE $1 AND program_id = $2 LIMIT $3 OFFSET $4;

-- name: FindNotesBySearchAndProgramIDAndTag :many
SELECT * FROM notes WHERE title LIKE $1 AND program_id = $2 AND string_to_array(tag, ',') && string_to_array($3, ',') LIMIT $4 OFFSET $5;

-- name: FindNotesBySearchAndTag :many
SELECT * FROM notes WHERE title LIKE $1 AND string_to_array(tag, ',') && string_to_array($2, ',') LIMIT $3 OFFSET $4;

-- name: FindNotesByProgramIDAndTag :many
SELECT * FROM notes WHERE program_id = $1 AND string_to_array(tag, ',') && string_to_array($2, ',') LIMIT $3 OFFSET $4;

-- name: FindNotesByTag :many
SELECT * FROM notes WHERE string_to_array(tag, ',') && string_to_array($1, ',') LIMIT $2 OFFSET $3;

-- name: DeleteNote :exec
DELETE FROM notes WHERE id = $1;

-- name: UpdateNote :one
UPDATE notes
SET program_id = $2, title = $3, content = $4, tag = $5, updated_at = now()
WHERE id = $1
RETURNING *;
