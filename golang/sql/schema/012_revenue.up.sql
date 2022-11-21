CREATE SCHEMA revenue;

CREATE TABLE revenue (
  id bigserial PRIMARY KEY,
  program_id bigserial NOT NULL,
  vulnerability_id bigserial NOT NULL,
  money int NOT NULL,
  created_at timestamp NOT NULL DEFAULT now(),
  updated_at timestamp NOT NULL DEFAULT now()
);
