CREATE SCHEMA ip;

CREATE TABLE ip (
  id bigserial PRIMARY KEY,
  program_id bigserial NOT NULL,
  subdomain_id bigserial NOT NULL,
  ip text NOT NULL,
  created_at timestamp NOT NULL DEFAULT now(),
  updated_at timestamp NOT NULL DEFAULT now()
);
