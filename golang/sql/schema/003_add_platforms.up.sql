CREATE SCHEMA platform;

CREATE TYPE platform_type AS ENUM (
  'public',
  'private'
);

CREATE TABLE platform (
  id bigserial NOT NULL PRIMARY KEY,
  name varchar(255) NOT NULL,
  slug varchar(255) NOT NULL UNIQUE,
  email varchar(255),
  password varchar(255),
  hunter_username varchar(255),
  otp text,
  jwt text,
  type platform_type,
  created_at timestamp NOT NULL DEFAULT now(),
  updated_at timestamp NOT NULL DEFAULT now()
);
