CREATE SCHEMA params;

CREATE TABLE params (
  id bigserial PRIMARY KEY,
  url_id bigserial NOT NULL REFERENCES urls(id) ON DELETE CASCADE,
  param VARCHAR NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  updated_at TIMESTAMP NOT NULL DEFAULT now(),
  UNIQUE (url_id, param)
);