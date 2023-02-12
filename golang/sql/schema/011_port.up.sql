CREATE SCHEMA port;

CREATE TABLE port (
  id bigserial PRIMARY KEY,
  ip_id bigserial NOT NULL,
  port int NOT NULL,
  tag text NOT NULL,
  service text NOT NULL,
  created_at timestamp NOT NULL DEFAULT now(),
  updated_at timestamp NOT NULL DEFAULT now()
);
