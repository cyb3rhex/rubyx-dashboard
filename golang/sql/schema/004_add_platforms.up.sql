CREATE SCHEMA platform;

CREATE TYPE platform_type AS ENUM (
  'public',
  'private'
);

CREATE TABLE platform (
  id bigserial PRIMARY KEY,
  name varchar(255) NOT NULL,
  slug varchar(255) NOT NULL UNIQUE,
  email varchar(255) NOT NULL,
  password varchar(255) NOT NULL,
  hunter_username varchar(255) NOT NULL,
  otp text NOT NULL,
  jwt text NOT NULL,
  type platform_type NOT NULL,
  created_at timestamp NOT NULL DEFAULT now(),
  updated_at timestamp NOT NULL DEFAULT now()
);
