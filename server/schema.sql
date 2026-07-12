CREATE TABLE IF NOT EXISTS projects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  source TEXT NOT NULL DEFAULT 'github',
  repo_id INTEGER UNIQUE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT DEFAULT '',
  html_url TEXT DEFAULT '',
  topics TEXT DEFAULT '[]',
  language TEXT DEFAULT '',
  stars INTEGER DEFAULT 0,
  forks_count INTEGER DEFAULT 0,
  readme_excerpt TEXT DEFAULT '',
  pushed_at TEXT,
  gh_created_at TEXT,
  gh_updated_at TEXT,
  last_synced_at TEXT,
  featured INTEGER NOT NULL DEFAULT 0,
  hidden INTEGER NOT NULL DEFAULT 0,
  override_arxiv_url TEXT DEFAULT '',
  override_zenodo_doi TEXT DEFAULT '',
  override_publication_status TEXT DEFAULT '',
  override_custom_title TEXT DEFAULT '',
  override_custom_description TEXT DEFAULT '',
  override_order INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS publications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  authors TEXT DEFAULT '',
  status TEXT NOT NULL DEFAULT 'submitted',
  venue TEXT DEFAULT '',
  url TEXT DEFAULT '',
  doi TEXT DEFAULT '',
  description TEXT DEFAULT '',
  order_num INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS blog_posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  date TEXT DEFAULT (datetime('now')),
  body TEXT NOT NULL,
  tags TEXT DEFAULT '[]',
  published INTEGER NOT NULL DEFAULT 1,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS contact_messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  read INTEGER NOT NULL DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS page_views (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  path TEXT NOT NULL,
  ts TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_page_views_ts ON page_views(ts);
CREATE INDEX IF NOT EXISTS idx_page_views_path ON page_views(path);

CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL DEFAULT '',
  updated_at TEXT DEFAULT (datetime('now'))
);
