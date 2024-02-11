CREATE SCHEMA tasks;

CREATE TABLE tasks (
  id bigserial PRIMARY KEY,
  domain VARCHAR NOT NULL,
  params VARCHAR NOT NULL,
  type VARCHAR NOT NULL,
  status VARCHAR NOT NULL,
  start_time TIMESTAMP NOT NULL DEFAULT now(),
  end_time TIMESTAMP NOT NULL DEFAULT now(),
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  updated_at TIMESTAMP NOT NULL DEFAULT now(),
  output TEXT NOT NULL
);