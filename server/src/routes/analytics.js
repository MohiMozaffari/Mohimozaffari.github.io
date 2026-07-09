const { Hono } = require('hono');
const { requireAdmin } = require('../middleware/auth');
const { rateLimit } = require('../middleware/rateLimit');

const app = new Hono();

const pageviewLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 30,
  message: 'Too many requests.',
});

app.post('/pageview', pageviewLimiter, async (c) => {
  const body = await c.req.json();
  const { path } = body;
  if (!path) return c.json({ error: 'path is required' }, 400);

  await c.env.DB.prepare(`INSERT INTO page_views (path) VALUES (?)`).bind(path).run();
  return c.body(null, 204);
});

app.get('/summary', requireAdmin, async (c) => {
  const byDay = await c.env.DB.prepare(
    `SELECT substr(ts, 1, 10) as _id, COUNT(*) as count
     FROM page_views GROUP BY _id ORDER BY _id DESC LIMIT 30`
  ).all();

  const byPath = await c.env.DB.prepare(
    `SELECT path as _id, COUNT(*) as count
     FROM page_views GROUP BY path ORDER BY count DESC LIMIT 20`
  ).all();

  return c.json({ byDay: byDay.results, byPath: byPath.results });
});

module.exports = app;
