CREATE TABLE IF NOT EXISTS inquiries (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  offer_price TEXT NOT NULL,
  venture TEXT,
  message TEXT,
  created_at TEXT NOT NULL
);
