CREATE SCHEMA screenshot;

CREATE TABLE screenshot (
  id bigserial PRIMARY KEY,
  subdomain_id bigserial NOT NULL,
  screenshot TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  updated_at TIMESTAMP NOT NULL DEFAULT now(),
  FOREIGN KEY (subdomain_id) REFERENCES subdomain(id)
);