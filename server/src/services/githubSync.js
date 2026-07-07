const Project = require('../models/Project');

const GITHUB_USER = 'MohiMozaffari';
const README_EXCERPT_LENGTH = 500;

// Applied only when a Project doc is first created by sync. Keys are exact GitHub repo names
// (verified against the live API — do not guess names, a mismatch here silently does nothing).
const DEFAULT_CURATION = {
  NeuroPHorm: {
    featured: true,
    overrides: { zenodoDoi: '10.5281/zenodo.17542598' },
  },
  Sarcasm_Detection: {
    featured: true,
  },
  'War-Spaceship-Game': {
    hidden: true,
  },
  'Catch-fruits': {
    hidden: true,
  },
};

function slugify(name) {
  return String(name)
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-._~]/g, '')
    .replace(/-+/g, '-');
}

function githubHeaders() {
  const headers = { Accept: 'application/vnd.github+json' };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return headers;
}

async function fetchRepos() {
  const res = await fetch(
    `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`,
    { headers: githubHeaders() }
  );
  if (!res.ok) throw new Error(`GitHub repos fetch failed: ${res.status}`);
  return res.json();
}

async function fetchReadmeExcerpt(repoName) {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${GITHUB_USER}/${repoName}/readme`,
      { headers: githubHeaders() }
    );
    if (!res.ok) return '';
    const data = await res.json();
    const decoded = Buffer.from(data.content, 'base64').toString('utf-8');
    return decoded.replace(/[#*`]/g, '').trim().slice(0, README_EXCERPT_LENGTH);
  } catch (err) {
    return '';
  }
}

async function syncGithubProjects() {
  const repos = await fetchRepos();
  let created = 0;
  let updated = 0;

  for (const repo of repos) {
    if (repo.fork || repo.archived) continue;

    // Hard guard from CLAUDE.md: never surface anything matching this name, even if it appears.
    const forceHidden = /adhd/i.test(repo.name);

    const readmeExcerpt = await fetchReadmeExcerpt(repo.name);

    const githubFields = {
      source: 'github',
      repoId: repo.id,
      name: repo.name,
      description: repo.description || '',
      htmlUrl: repo.html_url,
      topics: repo.topics || [],
      language: repo.language || '',
      stars: repo.stargazers_count || 0,
      forksCount: repo.forks_count || 0,
      readmeExcerpt,
      pushedAt: repo.pushed_at,
      ghCreatedAt: repo.created_at,
      ghUpdatedAt: repo.updated_at,
      lastSyncedAt: new Date(),
    };

    const existing = await Project.findOne({ repoId: repo.id });

    if (existing) {
      Object.assign(existing, githubFields);
      if (forceHidden) existing.hidden = true;
      await existing.save();
      updated += 1;
    } else {
      const curation = DEFAULT_CURATION[repo.name] || {};
      await Project.create({
        ...githubFields,
        slug: slugify(repo.name),
        featured: curation.featured || false,
        hidden: forceHidden || curation.hidden || false,
        overrides: curation.overrides || {},
      });
      created += 1;
    }
  }

  return { created, updated, total: repos.length };
}

module.exports = { syncGithubProjects, slugify, DEFAULT_CURATION };
