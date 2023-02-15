-- name: CreateNote :one
INSERT INTO notes (program_id, title, content, tag) VALUES ($1, $2, $3, $4) RETURNING *;

-- name: FindNotes :many
SELECT * FROM notes;

-- name: FindNoteByID :one
SELECT * FROM notes WHERE id = $1 LIMIT 1;

-- name: FindNotesByProgramID :many
SELECT * FROM notes WHERE program_id = $1;

-- name: DeleteNote :exec
DELETE FROM notes WHERE id = $1;

-- name: UpdateNote :one
UPDATE notes
SET program_id = $2, title = $3, content = $4, tag = $5, updated_at = now()
WHERE id = $1
RETURNING *;
