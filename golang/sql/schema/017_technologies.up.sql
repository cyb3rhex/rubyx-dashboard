CREATE SCHEMA technologies;

CREATE TABLE technologies (
  id bigserial PRIMARY KEY,
  name varchar(255) NOT NULL UNIQUE,
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  updated_at TIMESTAMP NOT NULL DEFAULT now()
);