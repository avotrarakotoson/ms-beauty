-- Your SQL goes here
CREATE TABLE customers (
  id INTEGER NOT NULL PRIMARY KEY,
  first_name VARCHAR,
  last_name VARCHAR NOT NULL,
  gender VARCHAR(10) NOT NULL,
  dob VARCHAR(155),
  email VARCHAR(155),
  address VARCHAR(255),
  primary_phone VARCHAR(255) NOT NULL,
  registry_date DATETIME NOT NULL DEFAULT (datetime('now','localtime'))
)