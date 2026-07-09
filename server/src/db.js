function rowToProject(row) {
  if (!row) return null;
  return {
    _id: row.id,
    source: row.source,
    repoId: row.repo_id,
    name: row.name,
    slug: row.slug,
    description: row.description,
    htmlUrl: row.html_url,
    topics: JSON.parse(row.topics || '[]'),
    language: row.language,
    stars: row.stars,
    forksCount: row.forks_count,
    readmeExcerpt: row.readme_excerpt,
    pushedAt: row.pushed_at,
    ghCreatedAt: row.gh_created_at,
    ghUpdatedAt: row.gh_updated_at,
    lastSyncedAt: row.last_synced_at,
    featured: !!row.featured,
    hidden: !!row.hidden,
    overrides: {
      arxivUrl: row.override_arxiv_url,
      zenodoDoi: row.override_zenodo_doi,
      publicationStatus: row.override_publication_status,
      customTitle: row.override_custom_title,
      customDescription: row.override_custom_description,
      order: row.override_order,
    },
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function rowToPublication(row) {
  if (!row) return null;
  return {
    _id: row.id,
    title: row.title,
    authors: row.authors,
    status: row.status,
    venue: row.venue,
    url: row.url,
    doi: row.doi,
    description: row.description,
    order: row.order_num,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function rowToPost(row) {
  if (!row) return null;
  return {
    _id: row.id,
    title: row.title,
    slug: row.slug,
    date: row.date,
    body: row.body,
    tags: JSON.parse(row.tags || '[]'),
    published: !!row.published,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function rowToMessage(row) {
  if (!row) return null;
  return {
    _id: row.id,
    name: row.name,
    email: row.email,
    message: row.message,
    read: !!row.read,
    createdAt: row.created_at,
  };
}

module.exports = { rowToProject, rowToPublication, rowToPost, rowToMessage };
