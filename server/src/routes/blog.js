const { Hono } = require('hono');
const { requireAdmin } = require('../middleware/auth');
const { rowToPost } = require('../db');

const app = new Hono();

function slugify(title) {
  return String(title)
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-]/g, '')
    .replace(/-+/g, '-');
}

app.get('/', async (c) => {
  const { results } = await c.env.DB.prepare(
    `SELECT * FROM blog_posts WHERE published = 1 ORDER BY date DESC`
  ).all();
  return c.json(results.map(rowToPost));
});

app.get('/admin/all', requireAdmin, async (c) => {
  const { results } = await c.env.DB.prepare(
    `SELECT * FROM blog_posts ORDER BY date DESC`
  ).all();
  return c.json(results.map(rowToPost));
});

app.post('/', requireAdmin, async (c) => {
  const body = await c.req.json();
  const { title, body: postBody, tags, published, date } = body;
  if (!title || !postBody) return c.json({ error: 'title and body are required' }, 400);

  const row = await c.env.DB.prepare(
    `INSERT INTO blog_posts (title, slug, body, tags, published, date)
     VALUES (?, ?, ?, ?, ?, ?) RETURNING *`
  )
    .bind(
      title,
      slugify(title),
      postBody,
      JSON.stringify(tags || []),
      published === false ? 0 : 1,
      date || new Date().toISOString()
    )
    .first();

  return c.json(rowToPost(row), 201);
});

app.get('/:slug', async (c) => {
  const row = await c.env.DB.prepare(
    `SELECT * FROM blog_posts WHERE slug = ? AND published = 1`
  )
    .bind(c.req.param('slug'))
    .first();
  if (!row) return c.json({ error: 'Not found' }, 404);
  return c.json(rowToPost(row));
});

app.patch('/:id', requireAdmin, async (c) => {
  const body = await c.req.json();
  const sets = [];
  const values = [];

  if ('title' in body) { sets.push('title = ?'); values.push(body.title); }
  if ('body' in body) { sets.push('body = ?'); values.push(body.body); }
  if ('tags' in body) { sets.push('tags = ?'); values.push(JSON.stringify(body.tags || [])); }
  if ('published' in body) { sets.push('published = ?'); values.push(body.published ? 1 : 0); }
  if ('date' in body) { sets.push('date = ?'); values.push(body.date); }

  if (sets.length === 0) return c.json({ error: 'No fields to update' }, 400);

  sets.push("updated_at = datetime('now')");
  values.push(c.req.param('id'));

  const row = await c.env.DB.prepare(
    `UPDATE blog_posts SET ${sets.join(', ')} WHERE id = ? RETURNING *`
  )
    .bind(...values)
    .first();

  if (!row) return c.json({ error: 'Not found' }, 404);
  return c.json(rowToPost(row));
});

app.delete('/:id', requireAdmin, async (c) => {
  const result = await c.env.DB.prepare(`DELETE FROM blog_posts WHERE id = ?`)
    .bind(c.req.param('id'))
    .run();
  if (result.meta.changes === 0) return c.json({ error: 'Not found' }, 404);
  return c.body(null, 204);
});

module.exports = app;
