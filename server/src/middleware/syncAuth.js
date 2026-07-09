const { verify } = require('hono/jwt');

// Allows either the external cron pinger (shared secret header) or a logged-in admin (JWT).
async function requireSyncAuth(c, next) {
  const cronSecret = c.req.header('x-cron-secret');
  if (cronSecret && c.env.SYNC_SECRET && cronSecret === c.env.SYNC_SECRET) {
    return next();
  }

  const header = c.req.header('Authorization') || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (token) {
    try {
      const payload = await verify(token, c.env.ADMIN_JWT_SECRET, 'HS256');
      c.set('admin', payload);
      return next();
    } catch (err) {
      // fall through to 401 below
    }
  }

  return c.json({ error: 'Unauthorized' }, 401);
}

module.exports = { requireSyncAuth };
