CREATE SCHEMA scopes;

CREATE TABLE scopes (
  id bigserial NOT NULL PRIMARY KEY,
  program_id bigserial NOT NULL REFERENCES program(id) ON DELETE CASCADE,
  scope VARCHAR  NOT NULL,
  scope_type VARCHAR NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  updated_at TIMESTAMP NOT NULL DEFAULT now()
);