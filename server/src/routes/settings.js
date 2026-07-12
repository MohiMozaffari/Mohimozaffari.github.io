const { Hono } = require('hono');
const { requireAdmin } = require('../middleware/auth');

const app = new Hono();

// Editable text fields, keyed by name, with fallback defaults used when no override exists.
const DEFAULTS = {
  home_hero_line1: 'AI & Neuroscience Researcher',
  home_hero_line2: 'Brain Networks | Topological Data Analysis | Medical Imaging',
  home_about_paragraph:
    'I started in physics, curious about how simple rules create complex patterns. That curiosity grew into my master’s research on brain networks and autism, where I used tools like persistent homology to study the hidden structure of the brain.',
  about_intro:
    'Passionate about bridging the gap between theoretical physics and practical applications through computational approaches and innovative teaching methods.',
  about_journey_1:
    'I started in physics, curious about how simple rules create complex patterns. That curiosity grew into my master’s research on brain networks and autism, where I used tools like persistent homology to study the hidden structure of the brain.',
  about_journey_2:
    'I love when theory meets practice. Whether it’s running simulations, building models, or teaching Python and AI, I make learning hands-on with games, projects, and real-world applications.',
  about_journey_3:
    'Outside of research and teaching, I’m usually trying out new algorithms, contributing to open-source, or just recharging with yoga, TRX workouts, and a little purple aesthetic ✨.',
  contact_intro: 'Send a message directly, or reach me via Email, LinkedIn, or Telegram.',
  teaching_intro:
    'Python instructor since June 2023 (Ostadbank & Picha Club), teaching Python, data analysis, and machine learning to learners of varying backgrounds — from complete beginners to advanced deep-learning students — through 1:1 and group sessions.',
  footer_tagline: 'AI & Neuroscience Researcher | Brain Networks | Topological Data Analysis | Medical Imaging',
};

app.get('/', async (c) => {
  const { results } = await c.env.DB.prepare('SELECT key, value FROM site_settings').all();
  const overrides = Object.fromEntries(results.map((r) => [r.key, r.value]));
  return c.json({ ...DEFAULTS, ...overrides });
});

app.patch('/', requireAdmin, async (c) => {
  const body = await c.req.json();
  const entries = Object.entries(body).filter(([key]) => key in DEFAULTS);
  if (entries.length === 0) return c.json({ error: 'No recognized fields to update' }, 400);

  for (const [key, value] of entries) {
    await c.env.DB.prepare(
      `INSERT INTO site_settings (key, value, updated_at) VALUES (?, ?, datetime('now'))
       ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = datetime('now')`
    )
      .bind(key, String(value))
      .run();
  }

  const { results } = await c.env.DB.prepare('SELECT key, value FROM site_settings').all();
  const overrides = Object.fromEntries(results.map((r) => [r.key, r.value]));
  return c.json({ ...DEFAULTS, ...overrides });
});

module.exports = app;
