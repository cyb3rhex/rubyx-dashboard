CREATE SCHEMA port;

CREATE TABLE port (
  id bigserial PRIMARY KEY,
  ip_id bigserial NOT NULL,
  port int NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  updated_at TIMESTAMP NOT NULL DEFAULT now(),
  UNIQUE (ip_id, port),
  FOREIGN KEY (ip_id) REFERENCES ip(id)
);