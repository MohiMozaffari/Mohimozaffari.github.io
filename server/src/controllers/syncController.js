const { syncGithubProjects } = require('../services/githubSync');

async function runSync(req, res) {
  try {
    const result = await syncGithubProjects();
    res.json(result);
  } catch (err) {
    console.error('GitHub sync failed:', err.message);
    res.status(502).json({ error: 'GitHub sync failed', detail: err.message });
  }
}

module.exports = { runSync };
