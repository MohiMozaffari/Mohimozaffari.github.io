// Best-effort in-memory rate limiter. Workers isolates are short-lived and distributed
// across edge locations, so this doesn't guarantee a global limit the way a single-server
// limiter would — but it still blocks basic abuse from a single hot isolate.
function rateLimit({ windowMs, limit, message }) {
  const hits = new Map();

  return async (c, next) => {
    const key = c.req.header('cf-connecting-ip') || 'unknown';
    const now = Date.now();
    const entry = hits.get(key);

    if (!entry || now - entry.start > windowMs) {
      hits.set(key, { start: now, count: 1 });
      return next();
    }

    if (entry.count >= limit) {
      return c.json({ error: message || 'Too many requests.' }, 429);
    }

    entry.count += 1;
    return next();
  };
}

module.exports = { rateLimit };
