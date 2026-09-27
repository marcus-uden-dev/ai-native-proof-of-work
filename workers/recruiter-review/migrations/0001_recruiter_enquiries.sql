CREATE TABLE IF NOT EXISTS recruiter_enquiries (
  id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  submission_kind TEXT NOT NULL CHECK (submission_kind IN ('question', 'role')),
  input TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_name TEXT NOT NULL DEFAULT '',
  organisation TEXT NOT NULL DEFAULT '',
  consent_version TEXT NOT NULL,
  consented_at TEXT NOT NULL,
  notification_status TEXT NOT NULL DEFAULT 'pending',
  notification_attempted_at TEXT
);

CREATE INDEX IF NOT EXISTS recruiter_enquiries_created_at_idx ON recruiter_enquiries(created_at);
