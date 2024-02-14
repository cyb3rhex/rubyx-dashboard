CREATE SCHEMA stats;

CREATE TABLE stats (
    id BIGSERIAL PRIMARY KEY,
    platform_id BIGSERIAL NOT NULL REFERENCES platform(id) ON DELETE CASCADE,
    report_id VARCHAR(255) NOT NULL,
    report_title VARCHAR(255) NOT NULL,
    severity VARCHAR(255) NOT NULL,
    reward REAL NOT NULL,
    currency VARCHAR(255) NOT NULL,
    collab BOOLEAN NOT NULL,
    report_status VARCHAR(255) NOT NULL,
    report_date DATE NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    updated_at TIMESTAMP NOT NULL DEFAULT now()
);
