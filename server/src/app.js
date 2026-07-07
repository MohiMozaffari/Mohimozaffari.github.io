const express = require('express');
const cors = require('cors');

const projectsRoutes = require('./routes/projects');
const publicationsRoutes = require('./routes/publications');
const blogRoutes = require('./routes/blog');
const contactRoutes = require('./routes/contact');
const analyticsRoutes = require('./routes/analytics');
const authRoutes = require('./routes/auth');
const syncRoutes = require('./routes/sync');

const app = express();

const allowedOrigins = (process.env.CORS_ORIGIN || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error('Not allowed by CORS'));
    },
  })
);
app.use(express.json());

app.get('/api/health', (req, res) => res.json({ ok: true }));

app.use('/api/projects', projectsRoutes);
app.use('/api/publications', publicationsRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/sync', syncRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

module.exports = app;
