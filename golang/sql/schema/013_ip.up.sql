CREATE SCHEMA ip;

CREATE TABLE ip (
  id bigserial PRIMARY KEY,
  program_id bigserial NOT NULL,
  subdomain_id bigserial NOT NULL,
  ip VARCHAR NOT NULL UNIQUE,
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  updated_at TIMESTAMP NOT NULL DEFAULT now(),
  FOREIGN KEY (subdomain_id) REFERENCES subdomain(id),
  FOREIGN KEY (program_id) REFERENCES program(id)
);