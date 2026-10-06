-- Schema for creating tables in db by running setup.ts

CREATE TABLE IF NOT EXISTS cars (
  id            SERIAL PRIMARY KEY,
  slug          TEXT UNIQUE NOT NULL,
  name          TEXT NOT NULL,
  tagline       TEXT NOT NULL,
  description   TEXT NOT NULL,
  year          INTEGER NOT NULL,
  image         TEXT NOT NULL,
  accent_from   TEXT NOT NULL DEFAULT '#3a2a10',
  accent_to     TEXT NOT NULL DEFAULT '#0a0a0a',
  power_hp      INTEGER NOT NULL,
  top_speed_kmh INTEGER NOT NULL,
  zero_to_100   NUMERIC(3,1) NOT NULL,
  engine        TEXT NOT NULL,
  featured      BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order    INTEGER NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS inquiries (
  id          SERIAL PRIMARY KEY,
  name        TEXT NOT NULL,
  email       TEXT NOT NULL,
  car_slug    TEXT,
  message     TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
