CREATE TABLE IF NOT EXISTS analytics_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  event_name TEXT NOT NULL,
  country TEXT,
  displayed_language TEXT NOT NULL,
  automatic_language TEXT,
  manual_language TEXT,
  selection_source TEXT,
  route TEXT NOT NULL,
  viewport TEXT,
  package_name TEXT,
  service TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS analytics_events_created_at_idx ON analytics_events(created_at);
CREATE INDEX IF NOT EXISTS analytics_events_event_name_idx ON analytics_events(event_name);
