const { Hono } = require('hono');
const { requireAdmin } = require('../middleware/auth');
const { rowToPublication } = require('../db');

const app = new Hono();

app.get('/', async (c) => {
  const { results } = await c.env.DB.prepare(
    `SELECT * FROM publications ORDER BY order_num ASC, created_at DESC`
  ).all();
  return c.json(results.map(rowToPublication));
});

app.post('/', requireAdmin, async (c) => {
  const body = await c.req.json();
  const { title, authors, status, venue, url, doi, description, order } = body;
  if (!title) return c.json({ error: 'title is required' }, 400);

  const row = await c.env.DB.prepare(
    `INSERT INTO publications (title, authors, status, venue, url, doi, description, order_num)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?) RETURNING *`
  )
    .bind(
      title,
      authors || '',
      status || 'submitted',
      venue || '',
      url || '',
      doi || '',
      description || '',
      order || 0
    )
    .first();

  return c.json(rowToPublication(row), 201);
});

app.patch('/:id', requireAdmin, async (c) => {
  const body = await c.req.json();
  const fieldMap = {
    title: 'title',
    authors: 'authors',
    status: 'status',
    venue: 'venue',
    url: 'url',
    doi: 'doi',
    description: 'description',
    order: 'order_num',
  };

  const sets = [];
  const values = [];
  for (const [key, column] of Object.entries(fieldMap)) {
    if (key in body) {
      sets.push(`${column} = ?`);
      values.push(body[key]);
    }
  }
  if (sets.length === 0) return c.json({ error: 'No fields to update' }, 400);

  sets.push("updated_at = datetime('now')");
  values.push(c.req.param('id'));

  const row = await c.env.DB.prepare(
    `UPDATE publications SET ${sets.join(', ')} WHERE id = ? RETURNING *`
  )
    .bind(...values)
    .first();

  if (!row) return c.json({ error: 'Not found' }, 404);
  return c.json(rowToPublication(row));
});

app.delete('/:id', requireAdmin, async (c) => {
  const result = await c.env.DB.prepare(`DELETE FROM publications WHERE id = ?`)
    .bind(c.req.param('id'))
    .run();
  if (result.meta.changes === 0) return c.json({ error: 'Not found' }, 404);
  return c.body(null, 204);
});

module.exports = app;
