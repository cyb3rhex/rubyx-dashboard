CREATE SCHEMA ip;

CREATE TABLE ip (
  id bigserial PRIMARY KEY,
  program_id bigserial NOT NULL REFERENCES program(id) ON DELETE CASCADE,
  subdomain_id bigserial NOT NULL REFERENCES subdomain(id) ON DELETE CASCADE,
  ip VARCHAR NOT NULL UNIQUE,
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  updated_at TIMESTAMP NOT NULL DEFAULT now()
);