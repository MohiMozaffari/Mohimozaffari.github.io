-- One-off seed for content with no corresponding public GitHub repo (verified via the GitHub
-- API — see plan notes). Safe to re-run: INSERT OR IGNORE won't duplicate on the unique slug.
INSERT OR IGNORE INTO projects
  (source, name, slug, description, html_url, featured, override_arxiv_url, override_publication_status)
VALUES (
  'manual',
  'Coronary Artery Segmentation',
  'coronary-artery-segmentation',
  'Deep learning approach for coronary artery segmentation in X-ray coronary angiography.',
  'https://arxiv.org/abs/2601.17429',
  1,
  'https://arxiv.org/abs/2601.17429',
  'preprint'
);

-- REMINDER: nothing seeds the Network Neuroscience manuscript automatically — log into the
-- admin panel and add it as a Publication ("Persistent Homology Reveals Topological Alterations
-- in Resting-State Brain Networks of Autism Spectrum Disorder", status: under-review).
