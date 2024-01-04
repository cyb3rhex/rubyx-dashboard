-- name: CreateTask :one
INSERT INTO tasks (id, domain, params, status, type, output)
VALUES ($1, $2, $3, $4, $5, $6)
RETURNING *;

-- name: FindTasks :many
SELECT * FROM tasks;

-- name: FindTaskByID :one
SELECT * FROM tasks WHERE id = $1 LIMIT 1;

-- name: UpdateTask :one
UPDATE tasks
SET status = $2, start_time = $3, end_time = $4, output = $5, updated_at = now()
WHERE id = $1
RETURNING *;

-- name: DeleteTaskByIDs :exec
DELETE FROM tasks WHERE id = $1;