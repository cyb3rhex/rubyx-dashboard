CREATE SCHEMA rootdomain;

CREATE TABLE rootdomain (
  id bigserial PRIMARY KEY,
  program_id bigserial NOT NULL,
  wildcard boolean NOT NULL,
  inscope boolean NOT NULL,
  tag text NOT NULL,
  url text NOT NULL,
  created_at timestamp NOT NULL DEFAULT now(),
  updated_at timestamp NOT NULL DEFAULT now()
);
