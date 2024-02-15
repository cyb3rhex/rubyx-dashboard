CREATE SCHEMA resets;

CREATE TABLE resets (
  user_id bigserial NOT NULL REFERENCES users ON DELETE CASCADE,
  code varchar(60) NOT NULL,
  created_at timestamp NOT NULL DEFAULT now(),
  PRIMARY KEY (code, user_id)
);
