const GITHUB_USER = 'MohiMozaffari';
const README_EXCERPT_LENGTH = 500;

// Applied only when a project row is first created by sync. Keys are exact GitHub repo names
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

function githubHeaders(token) {
  const headers = { Accept: 'application/vnd.github+json', 'User-Agent': 'mohi-portfolio-sync' };
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

async function fetchRepos(token) {
  const res = await fetch(
    `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`,
    { headers: githubHeaders(token) }
  );
  if (!res.ok) {
    // Include GitHub's own reason and name the usual production cause: the
    // Worker missing a GITHUB_TOKEN secret falls back to unauthenticated calls,
    // which are rate-limited to 60/hour and then 403 for the rest of the hour.
    const body = await res.text().catch(() => '');
    const hint = !token
      ? ' (no GITHUB_TOKEN set on the Worker — unauthenticated GitHub calls are rate-limited)'
      : '';
    const reason = body.slice(0, 200).replace(/\s+/g, ' ').trim();
    throw new Error(`GitHub repos fetch failed: ${res.status}${hint}${reason ? ` — ${reason}` : ''}`);
  }
  return res.json();
}

async function fetchReadmeExcerpt(repoName, token) {
  try {
    const res = await fetch(`https://api.github.com/repos/${GITHUB_USER}/${repoName}/readme`, {
      headers: githubHeaders(token),
    });
    if (!res.ok) return '';
    const data = await res.json();
    const binary = atob(data.content.replace(/\n/g, ''));
    const decoded = new TextDecoder('utf-8').decode(
      Uint8Array.from(binary, (ch) => ch.charCodeAt(0))
    );
    return decoded.replace(/[#*`]/g, '').trim().slice(0, README_EXCERPT_LENGTH);
  } catch (err) {
    return '';
  }
}

async function syncGithubProjects(db, token) {
  const repos = await fetchRepos(token);
  let created = 0;
  let updated = 0;

  for (const repo of repos) {
    if (repo.fork || repo.archived) continue;

    // Hard guard from CLAUDE.md: never surface anything matching this name, even if it appears.
    const forceHidden = /adhd/i.test(repo.name);

    const readmeExcerpt = await fetchReadmeExcerpt(repo.name, token);

    const existing = await db
      .prepare(`SELECT id FROM projects WHERE repo_id = ?`)
      .bind(repo.id)
      .first();

    if (existing) {
      const sets = [
        'name = ?',
        'description = ?',
        'html_url = ?',
        'topics = ?',
        'language = ?',
        'stars = ?',
        'forks_count = ?',
        'readme_excerpt = ?',
        'pushed_at = ?',
        'gh_created_at = ?',
        'gh_updated_at = ?',
        "last_synced_at = datetime('now')",
        "updated_at = datetime('now')",
      ];
      const values = [
        repo.name,
        repo.description || '',
        repo.html_url,
        JSON.stringify(repo.topics || []),
        repo.language || '',
        repo.stargazers_count || 0,
        repo.forks_count || 0,
        readmeExcerpt,
        repo.pushed_at,
        repo.created_at,
        repo.updated_at,
      ];
      if (forceHidden) sets.push('hidden = 1');
      values.push(existing.id);

      await db.prepare(`UPDATE projects SET ${sets.join(', ')} WHERE id = ?`).bind(...values).run();
      updated += 1;
    } else {
      const curation = DEFAULT_CURATION[repo.name] || {};
      const o = curation.overrides || {};

      await db
        .prepare(
          `INSERT INTO projects
            (source, repo_id, name, slug, description, html_url, topics, language, stars,
             forks_count, readme_excerpt, pushed_at, gh_created_at, gh_updated_at, last_synced_at,
             featured, hidden, override_zenodo_doi)
           VALUES ('github', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), ?, ?, ?)`
        )
        .bind(
          repo.id,
          repo.name,
          slugify(repo.name),
          repo.description || '',
          repo.html_url,
          JSON.stringify(repo.topics || []),
          repo.language || '',
          repo.stargazers_count || 0,
          repo.forks_count || 0,
          readmeExcerpt,
          repo.pushed_at,
          repo.created_at,
          repo.updated_at,
          curation.featured ? 1 : 0,
          forceHidden || curation.hidden ? 1 : 0,
          o.zenodoDoi || ''
        )
        .run();
      created += 1;
    }
  }

  return { created, updated, total: repos.length };
}

module.exports = { syncGithubProjects, slugify, DEFAULT_CURATION };
