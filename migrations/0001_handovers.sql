CREATE TABLE IF NOT EXISTS handovers (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  project_name TEXT NOT NULL,
  client_name TEXT,
  client_business TEXT,
  description TEXT,
  amount INTEGER NOT NULL CHECK(amount > 0),
  currency TEXT NOT NULL DEFAULT 'aud',
  file_key TEXT NOT NULL,
  included_items TEXT NOT NULL DEFAULT '[]',
  status TEXT NOT NULL DEFAULT 'active' CHECK(status IN ('active','disabled')),
  expires_at TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_handovers_slug ON handovers(slug);
CREATE INDEX IF NOT EXISTS idx_handovers_status ON handovers(status);
