-- Run this in Supabase SQL Editor

CREATE TABLE IF NOT EXISTS waitlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  created_at timestamptz DEFAULT now(),
  source text DEFAULT 'landing'
);

CREATE UNIQUE INDEX IF NOT EXISTS waitlist_email_idx ON waitlist (lower(email));

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anyone can join waitlist"
  ON waitlist FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "anyone can submit contact"
  ON contact_submissions FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Track waitlist button clicks (separate from Google Form submissions)
CREATE TABLE IF NOT EXISTS waitlist_clicks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source text DEFAULT 'landing',
  clicked_at timestamptz DEFAULT now()
);

ALTER TABLE waitlist_clicks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anyone can log click"
  ON waitlist_clicks FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
