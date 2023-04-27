CREATE SCHEMA urls;

CREATE TABLE urls (
  id bigserial PRIMARY KEY,
  subdomain_id bigserial NOT NULL,
  url text NOT NULL,
  tag text NOT NULL,
  title text NOT NULL,
  body_hash text NOT NULL,
  status_code int NOT NULL,
  technologies text NOT NULL,
  content_length int NOT NULL,
  created_at timestamp NOT NULL DEFAULT now(),
  updated_at timestamp NOT NULL DEFAULT now()
);
