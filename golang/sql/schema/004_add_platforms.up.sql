CREATE SCHEMA platform;

CREATE TYPE platform_type AS ENUM (
  'public',
  'private'
);

CREATE TABLE platform (
  id bigserial PRIMARY KEY,
  name varchar(60) NOT NULL,
  slug varchar(60) NOT NULL UNIQUE,
  url text NOT NULL,
  type platform_type NOT NULL,
  created_at timestamp NOT NULL DEFAULT now(),
  updated_at timestamp NOT NULL DEFAULT now()
);
