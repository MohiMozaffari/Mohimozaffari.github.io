const { Hono } = require('hono');
const { cors } = require('hono/cors');

const projectsRoutes = require('./routes/projects');
const publicationsRoutes = require('./routes/publications');
const blogRoutes = require('./routes/blog');
const contactRoutes = require('./routes/contact');
const analyticsRoutes = require('./routes/analytics');
const authRoutes = require('./routes/auth');
const syncRoutes = require('./routes/sync');

const app = new Hono();

app.use('*', async (c, next) => {
  const allowedOrigins = (c.env.CORS_ORIGIN || '')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean);

  return cors({
    origin: (origin) => (allowedOrigins.includes(origin) ? origin : null),
  })(c, next);
});

app.get('/api/health', (c) => c.json({ ok: true }));

app.route('/api/projects', projectsRoutes);
app.route('/api/publications', publicationsRoutes);
app.route('/api/blog', blogRoutes);
app.route('/api/contact', contactRoutes);
app.route('/api/analytics', analyticsRoutes);
app.route('/api/auth', authRoutes);
app.route('/api/sync', syncRoutes);

app.onError((err, c) => {
  console.error(err);
  return c.json({ error: 'Internal server error' }, 500);
});

export default app;
