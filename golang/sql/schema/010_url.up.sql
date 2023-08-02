CREATE SCHEMA urls;

CREATE TABLE urls (
  id bigserial PRIMARY KEY,
  subdomain text NOT NULL,
  url text NOT NULL UNIQUE,
  tag text NOT NULL,
  status_code int NOT NULL,
  created_at timestamp NOT NULL DEFAULT now(),
  updated_at timestamp NOT NULL DEFAULT now()
);
