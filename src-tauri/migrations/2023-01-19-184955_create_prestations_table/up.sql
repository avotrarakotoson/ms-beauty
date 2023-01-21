-- Your SQL goes here
CREATE TABLE prestations (
  id INTEGER NOT NULL PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  items TEXT NOT NULL,
  description TEXT,
  rate REAL NOT NULL,
  currency VARCHAR(100) NOT NULL
)