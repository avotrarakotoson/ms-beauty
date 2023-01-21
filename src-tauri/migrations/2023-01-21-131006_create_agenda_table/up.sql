-- Your SQL goes here
CREATE TABLE agendas (
  id INTEGER NOT NULL PRIMARY KEY,
  agenda_date VARCHAR(155) NOT NULL,
  comment TEXT,
  customer_id INTEGER,
  FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE SET NULL
);

CREATE TABLE agendas_details (
  id INTEGER NOT NULL PRIMARY KEY,
  agenda_id INTEGER,
  title VARCHAR(150) NOT NULL,
  items TEXT NOT NULL,
  FOREIGN KEY (agenda_id) REFERENCES agendas(id) ON DELETE SET NULL
);