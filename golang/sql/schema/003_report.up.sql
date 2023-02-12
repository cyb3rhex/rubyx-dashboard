CREATE SCHEMA reports;

CREATE TYPE report_status AS ENUM (
  'draft',
  'published'
);

CREATE TABLE reports (
  id bigserial PRIMARY KEY,
  author_id bigint NOT NULL REFERENCES users ON DELETE RESTRICT,
  vulnerability_id bigserial NOT NULL,
  title varchar(100) NOT NULL,
  body text NOT NULL,
  tag text NOT NULL,
  status report_status NOT NULL,
  created_at timestamp NOT NULL DEFAULT now(),
  updated_at timestamp NOT NULL DEFAULT now()
);
