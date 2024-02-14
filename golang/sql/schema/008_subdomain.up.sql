CREATE SCHEMA subdomain;

CREATE TABLE subdomain (
  id bigserial PRIMARY KEY,
  program_id bigserial NOT NULL REFERENCES program(id) ON DELETE CASCADE,
  subdomain varchar NOT NULL,
  tag varchar NOT NULL,
  port int NOT NULL,
  title varchar NOT NULL,
  body_hash text NOT NULL,
  status_code int NOT NULL,
  content_length int NOT NULL,
  favourite boolean NOT NULL DEFAULT false,
  created_at timestamp NOT NULL DEFAULT now(),
  updated_at timestamp NOT NULL DEFAULT now(),
  UNIQUE (subdomain, port)
);
