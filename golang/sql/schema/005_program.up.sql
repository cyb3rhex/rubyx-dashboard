CREATE SCHEMA program;

CREATE TYPE program_type AS ENUM (
  'public',
  'private'
);

CREATE TABLE program (
  id bigserial PRIMARY KEY,
  platform_id bigserial NOT NULL,
  name varchar(60) NOT NULL,
  slug varchar(60) NOT NULL,
  vdp boolean NOT NULL,
  url text NOT NULL,
  type program_type NOT NULL,
  created_at timestamp NOT NULL DEFAULT now(),
  updated_at timestamp NOT NULL DEFAULT now()
);
