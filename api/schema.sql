-- ChinaMakersHub - D1 Inquiries Schema
-- 部署: wrangler d1 execute cmh-inquiries --file=./schema.sql

CREATE TABLE IF NOT EXISTS inquiries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  reference_id TEXT UNIQUE NOT NULL,

  -- Core fields
  name TEXT NOT NULL,
  company TEXT NOT NULL,
  email TEXT NOT NULL,
  country TEXT NOT NULL,
  phone_code TEXT,
  whatsapp TEXT,

  -- Optional qualification fields
  category TEXT,
  quantity TEXT,
  timeline TEXT,

  -- The actual inquiry
  inquiry TEXT NOT NULL,

  -- UTM / attribution
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_term TEXT,
  utm_content TEXT,
  referrer TEXT,
  landing_page TEXT,

  -- Client metadata
  user_agent TEXT,
  language TEXT,
  timezone TEXT,
  ip_address TEXT,
  ip_country TEXT,
  ip_city TEXT,

  -- Lifecycle
  status TEXT DEFAULT 'new',  -- new / contacted / qualified / converted / spam / closed
  assigned_to TEXT,            -- 谁在跟进
  internal_notes TEXT,         -- 内部备注
  routed_factories TEXT,       -- JSON array of factory IDs that received this inquiry

  created_at TEXT NOT NULL,
  updated_at TEXT,
  contacted_at TEXT,
  closed_at TEXT
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_reference_id ON inquiries(reference_id);
CREATE INDEX IF NOT EXISTS idx_email ON inquiries(email);
CREATE INDEX IF NOT EXISTS idx_status ON inquiries(status);
CREATE INDEX IF NOT EXISTS idx_created_at ON inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_country ON inquiries(country);
CREATE INDEX IF NOT EXISTS idx_utm_source ON inquiries(utm_source);
CREATE INDEX IF NOT EXISTS idx_ip_address ON inquiries(ip_address, created_at);

-- Inquiry events log (后续做 CRM 时用)
CREATE TABLE IF NOT EXISTS inquiry_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  inquiry_id INTEGER NOT NULL,
  event_type TEXT NOT NULL,  -- email_sent / whatsapp_sent / status_change / note_added
  event_data TEXT,            -- JSON
  created_by TEXT,
  created_at TEXT NOT NULL,
  FOREIGN KEY (inquiry_id) REFERENCES inquiries(id)
);

CREATE INDEX IF NOT EXISTS idx_event_inquiry_id ON inquiry_events(inquiry_id);
