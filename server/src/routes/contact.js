const { Hono } = require('hono');
const { requireAdmin } = require('../middleware/auth');
const { rateLimit } = require('../middleware/rateLimit');
const { rowToMessage } = require('../db');
const { sendContactNotification } = require('../services/emailService');

const app = new Hono();

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 5,
  message: 'Too many messages sent, try again later.',
});

app.post('/', contactLimiter, async (c) => {
  const body = await c.req.json();
  const { name, email, message } = body;
  if (!name || !email || !message) {
    return c.json({ error: 'name, email, and message are required' }, 400);
  }

  const row = await c.env.DB.prepare(
    `INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?) RETURNING *`
  )
    .bind(name, email, message)
    .first();

  try {
    await sendContactNotification(c.env, { name, email, message });
  } catch (err) {
    console.error('Failed to send contact notification email:', err.message);
  }

  return c.json({ id: row.id }, 201);
});

app.get('/admin/all', requireAdmin, async (c) => {
  const { results } = await c.env.DB.prepare(
    `SELECT * FROM contact_messages ORDER BY created_at DESC`
  ).all();
  return c.json(results.map(rowToMessage));
});

app.patch('/admin/:id/read', requireAdmin, async (c) => {
  const row = await c.env.DB.prepare(
    `UPDATE contact_messages SET read = 1 WHERE id = ? RETURNING *`
  )
    .bind(c.req.param('id'))
    .first();
  if (!row) return c.json({ error: 'Not found' }, 404);
  return c.json(rowToMessage(row));
});

module.exports = app;
