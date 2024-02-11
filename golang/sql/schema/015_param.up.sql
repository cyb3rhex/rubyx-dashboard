CREATE SCHEMA params;

CREATE TABLE params (
  id bigserial PRIMARY KEY,
  url_id bigserial NOT NULL,
  param VARCHAR NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  updated_at TIMESTAMP NOT NULL DEFAULT now(),
  UNIQUE (url_id, param),
  FOREIGN KEY (url_id) REFERENCES url(id)
);