const { Hono } = require('hono');
const { requireSyncAuth } = require('../middleware/syncAuth');
const { syncGithubProjects } = require('../services/githubSync');

const app = new Hono();

app.post('/github', requireSyncAuth, async (c) => {
  try {
    const result = await syncGithubProjects(c.env.DB, c.env.GITHUB_TOKEN);
    return c.json(result);
  } catch (err) {
    console.error('GitHub sync failed:', err.message);
    return c.json({ error: 'GitHub sync failed', detail: err.message }, 502);
  }
});

module.exports = app;
