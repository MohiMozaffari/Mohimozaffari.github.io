const jwt = require('jsonwebtoken');

// Allows either the external cron pinger (shared secret header) or a logged-in admin (JWT).
function requireSyncAuth(req, res, next) {
  const cronSecret = req.headers['x-cron-secret'];
  if (cronSecret && process.env.SYNC_SECRET && cronSecret === process.env.SYNC_SECRET) {
    return next();
  }

  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (token) {
    try {
      req.admin = jwt.verify(token, process.env.ADMIN_JWT_SECRET);
      return next();
    } catch (err) {
      // fall through to 401 below
    }
  }

  return res.status(401).json({ error: 'Unauthorized' });
}

module.exports = requireSyncAuth;
