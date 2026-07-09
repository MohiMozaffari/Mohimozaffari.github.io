const { verify } = require('hono/jwt');

async function requireAdmin(c, next) {
  const header = c.req.header('Authorization') || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return c.json({ error: 'Missing token' }, 401);

  try {
    const payload = await verify(token, c.env.ADMIN_JWT_SECRET, 'HS256');
    c.set('admin', payload);
    await next();
  } catch (err) {
    return c.json({ error: 'Invalid or expired token' }, 401);
  }
}

module.exports = { requireAdmin };
