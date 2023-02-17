-- name: CreateUser :one
INSERT INTO users (email, salt, pass)
  VALUES (LOWER(@email::varchar), @salt::varchar, @pass::varchar) RETURNING *;

-- name: UpdateUserPassword :exec
UPDATE users SET salt = $2, pass = $3, updated_at = NOW() WHERE id = $1;

-- name: UpdateUserEmail :exec
UPDATE users SET email = $2, updated_at = NOW() WHERE id = $1;

-- name: FindUserByID :one
SELECT * FROM users WHERE id = $1 LIMIT 1;

-- name: FindUserByEmail :one
SELECT * FROM users WHERE email = LOWER($1) LIMIT 1;
