const { Hono } = require('hono');
const { requireAdmin } = require('../middleware/auth');
const { rowToProject } = require('../db');
const { slugify } = require('../services/githubSync');

const app = new Hono();

app.get('/', async (c) => {
  const { results } = await c.env.DB.prepare(
    `SELECT * FROM projects WHERE hidden = 0
     ORDER BY featured DESC, override_order ASC, stars DESC`
  ).all();
  return c.json(results.map(rowToProject));
});

app.get('/admin/all', requireAdmin, async (c) => {
  const { results } = await c.env.DB.prepare(
    `SELECT * FROM projects ORDER BY featured DESC, override_order ASC, stars DESC`
  ).all();
  return c.json(results.map(rowToProject));
});

app.post('/admin', requireAdmin, async (c) => {
  const body = await c.req.json();
  const { name, description, htmlUrl, featured, overrides } = body;
  if (!name) return c.json({ error: 'name is required' }, 400);

  const slug = slugify(name);
  const o = overrides || {};

  const result = await c.env.DB.prepare(
    `INSERT INTO projects
      (source, name, slug, description, html_url, featured,
       override_arxiv_url, override_zenodo_doi, override_publication_status,
       override_custom_title, override_custom_description, override_order)
     VALUES ('manual', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
     RETURNING *`
  )
    .bind(
      name,
      slug,
      description || '',
      htmlUrl || '',
      featured ? 1 : 0,
      o.arxivUrl || '',
      o.zenodoDoi || '',
      o.publicationStatus || '',
      o.customTitle || '',
      o.customDescription || '',
      o.order || 0
    )
    .first();

  return c.json(rowToProject(result), 201);
});

app.get('/:slug', async (c) => {
  const row = await c.env.DB.prepare(
    `SELECT * FROM projects WHERE slug = ? AND hidden = 0`
  )
    .bind(c.req.param('slug'))
    .first();
  if (!row) return c.json({ error: 'Not found' }, 404);
  return c.json(rowToProject(row));
});

app.patch('/admin/:id', requireAdmin, async (c) => {
  const body = await c.req.json();
  const { featured, hidden, overrides } = body;
  const id = c.req.param('id');

  const sets = [];
  const values = [];

  if (typeof featured === 'boolean') {
    sets.push('featured = ?');
    values.push(featured ? 1 : 0);
  }
  if (typeof hidden === 'boolean') {
    sets.push('hidden = ?');
    values.push(hidden ? 1 : 0);
  }
  if (overrides && typeof overrides === 'object') {
    const map = {
      arxivUrl: 'override_arxiv_url',
      zenodoDoi: 'override_zenodo_doi',
      publicationStatus: 'override_publication_status',
      customTitle: 'override_custom_title',
      customDescription: 'override_custom_description',
      order: 'override_order',
    };
    for (const [key, column] of Object.entries(map)) {
      if (key in overrides) {
        sets.push(`${column} = ?`);
        values.push(overrides[key]);
      }
    }
  }

  if (sets.length === 0) return c.json({ error: 'No fields to update' }, 400);

  sets.push("updated_at = datetime('now')");
  values.push(id);

  const row = await c.env.DB.prepare(
    `UPDATE projects SET ${sets.join(', ')} WHERE id = ? RETURNING *`
  )
    .bind(...values)
    .first();

  if (!row) return c.json({ error: 'Not found' }, 404);
  return c.json(rowToProject(row));
});

module.exports = app;
