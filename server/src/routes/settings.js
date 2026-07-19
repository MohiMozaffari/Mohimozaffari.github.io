const { Hono } = require('hono');
const { requireAdmin } = require('../middleware/auth');

const app = new Hono();

// Editable text fields, keyed by name, with fallback defaults used when no override exists.
const DEFAULTS = {
  home_hero_line1: 'AI & Neuroscience Researcher',
  home_hero_line2: 'Brain Networks | Machine Learning | Medical Imaging',
  home_about_paragraph:
    'I started in physics, curious about how simple rules create complex patterns. That curiosity grew into my master’s research on brain networks and autism, where I used tools like persistent homology to study the hidden structure of the brain.',
  about_intro:
    'Passionate about bridging the gap between theoretical physics and practical applications through computational approaches and innovative teaching methods.',
  about_journey_1:
    'I started in physics, curious about how simple rules create complex patterns. That curiosity grew into my master’s research on brain networks and autism, where I used tools like persistent homology to study the hidden structure of the brain.',
  about_journey_2:
    'I love when theory meets practice. Whether it’s running simulations, building models, or teaching Python and AI, I make learning hands-on with games, projects, and real-world applications.',
  about_journey_3:
    'Outside of research and teaching, I’m usually trying out new algorithms, contributing to open-source, or just enjoying a little purple aesthetic ✨.',
  research_statement:
    'My research traces a path from statistical physics to computational neuroscience: I started by studying how simple local rules generate complex global behavior, then moved into network science and topological data analysis during my master’s work at Shahid Beheshti University.\n\nThere, I applied persistent homology to resting-state fMRI data, developing a node-removal-based method to detect topological differences between autism spectrum disorder and control brain networks and examining how these differences vary with age — work now under review at Network Neuroscience. I released the analysis pipeline as an open-source Python package, NeuroPHorm, so other TDA researchers working with brain networks could build on it.\n\nIn parallel, I’ve contributed to deep-learning pipelines for coronary artery segmentation and FFR estimation from angiography, which shaped how I think about applying machine learning to noisy, high-stakes medical imaging data.\n\nGoing forward, I want to build machine-learning methods for neuroimaging and brain-network data, bringing computational neuroscience and modern deep learning together to understand how the brain’s structure gives rise to its function.',
  // Research-page focus rail. One area per line, "Title — detail". Forward-looking
  // (what she wants to work on next), which is deliberately not the same list as
  // the past-work emphasis in research_statement.
  research_focus:
    'Computational and network neuroscience — brain connectivity, developmental connectomics\nMachine learning for medical imaging — segmentation and classification\nComplex systems and network science — robustness, stochastic processes\nReproducible scientific software — reusable research tooling',
  contact_intro: 'Send a message directly, or reach me via Email, LinkedIn, or Telegram.',
  teaching_intro:
    'Teaching Python, data analysis, and machine learning since June 2023 — beginners through advanced deep-learning students.',
  footer_tagline: 'AI & Neuroscience Researcher | Brain Networks | Machine Learning | Medical Imaging',
  // Public "Book a session" scheduling link — Mohi's Google Calendar Appointment Schedule
  // (reads her calendar, so booked/busy times are hidden automatically). Overridable from
  // the admin Content tab; if ever blanked, the booking CTAs fall back to the public email.
  booking_url: 'https://calendar.app.google/LbBh5ooi89wrhe7m9',
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
