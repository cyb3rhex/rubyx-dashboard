CREATE SCHEMA urls;

CREATE TABLE urls (
  id bigserial NOT NULL PRIMARY KEY,
  subdomain_id bigserial NOT NULL REFERENCES subdomain(id) ON DELETE CASCADE,
  url text NOT NULL UNIQUE,
  tag text NOT NULL,
  status_code int NOT NULL,
  favourite boolean NOT NULL DEFAULT false,
  created_at timestamp NOT NULL DEFAULT now(),
  updated_at timestamp NOT NULL DEFAULT now()
);
