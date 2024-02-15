CREATE SCHEMA technologie_version;

CREATE TABLE technologie_version (
  id bigserial NOT NULL PRIMARY KEY,
  technology_id bigserial NOT NULL REFERENCES technologies(id) ON DELETE CASCADE,
  version varchar(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  updated_at TIMESTAMP NOT NULL DEFAULT now()
);