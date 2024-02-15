CREATE SCHEMA subdomain;

CREATE TABLE subdomain (
  id bigserial NOT NULL PRIMARY KEY,
  program_id bigserial NOT NULL REFERENCES program(id) ON DELETE CASCADE,
  subdomain varchar NOT NULL UNIQUE,
  tag varchar,
  ip bigserial REFERENCES ip(id) ON DELETE CASCADE,
  title varchar,
  body_hash text,
  status_code int,
  content_length int,
  screenshot text,
  favourite boolean NOT NULL DEFAULT false,
  created_at timestamp NOT NULL DEFAULT now(),
  updated_at timestamp NOT NULL DEFAULT now()
);
