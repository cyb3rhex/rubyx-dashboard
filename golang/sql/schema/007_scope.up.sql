CREATE SCHEMA scopes;

CREATE TABLE scopes (
  id BIGSERIAL PRIMARY KEY,
  scope VARCHAR  NOT NULL,
  scope_type VARCHAR NOT NULL,
  program_id BIGSERIAL NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  updated_at TIMESTAMP NOT NULL DEFAULT now(),
  FOREIGN KEY (program_id) REFERENCES program(id)
);