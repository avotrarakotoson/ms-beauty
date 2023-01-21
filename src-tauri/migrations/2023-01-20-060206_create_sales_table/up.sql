-- Your SQL goes here
PRAGMA foreign_keys = ON;

CREATE TABLE sales (
  id INTEGER NOT NULL PRIMARY KEY,
  sale_date DATETIME NOT NULL DEFAULT (datetime('now','localtime')),
  amount REAL NOT NULL,
  reduction REAL,
  customer_id INTEGER,
  FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE SET NULL
);

CREATE TABLE sales_details (
  id INTEGER NOT NULL PRIMARY KEY,
  sale_id INTEGER,
  title VARCHAR(150) NOT NULL,
  items TEXT NOT NULL,
  rate REAL NOT NULL,
  currency VARCHAR(100) NOT NULL,
  FOREIGN KEY (sale_id) REFERENCES sales(id) ON DELETE SET NULL
);