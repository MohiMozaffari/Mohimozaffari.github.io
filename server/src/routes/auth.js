const { Hono } = require('hono');
const bcrypt = require('bcryptjs');
const { sign } = require('hono/jwt');
const { requireAdmin } = require('../middleware/auth');
const { rateLimit } = require('../middleware/rateLimit');

const app = new Hono();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  message: 'Too many login attempts, try again later.',
});

app.post('/login', loginLimiter, async (c) => {
  const body = await c.req.json();
  const { username, password } = body;
  if (!username || !password) {
    return c.json({ error: 'username and password are required' }, 400);
  }

  const validUsername = username === c.env.ADMIN_USERNAME;
  const validPassword =
    validUsername && (await bcrypt.compare(password, c.env.ADMIN_PASSWORD_HASH || ''));

  if (!validUsername || !validPassword) {
    return c.json({ error: 'Invalid credentials' }, 401);
  }

  const exp = Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60; // 7 days
  const token = await sign({ sub: username, exp }, c.env.ADMIN_JWT_SECRET);
  return c.json({ token });
});

app.get('/me', requireAdmin, async (c) => {
  const admin = c.get('admin');
  return c.json({ username: admin.sub });
});

module.exports = app;
