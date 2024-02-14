CREATE SCHEMA technologie_subdomain;

CREATE TABLE technologie_subdomain (
  id bigserial PRIMARY KEY,
  technology_version bigserial NOT NULL REFERENCES technologie_version(id) ON DELETE CASCADE,
  subdomain_id bigserial NOT NULL REFERENCES subdomain(id) ON DELETE CASCADE,
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  updated_at TIMESTAMP NOT NULL DEFAULT now()
);