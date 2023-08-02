CREATE SCHEMA settings;

CREATE TABLE settings (
  id bigserial PRIMARY KEY,
  key VARCHAR NOT NULL UNIQUE,
  value VARCHAR NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  updated_at TIMESTAMP NOT NULL DEFAULT now()
);
