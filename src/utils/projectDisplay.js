const LANG_COLORS = {
  python: 'bg-blue-500',
  'jupyter notebook': 'bg-orange-500',
  tex: 'bg-green-500',
  javascript: 'bg-yellow-500',
  'c++': 'bg-indigo-500',
  unknown: 'bg-gray-500',
};

export const getLangColor = (lang) => {
  const key = String(lang ?? 'unknown').toLowerCase();
  return LANG_COLORS[key] || 'bg-purple-500';
};

export const displayName = (project) =>
  String(project?.overrides?.customTitle || project?.name || '').replaceAll('_', ' ');

export const displayDescription = (project) =>
  project?.overrides?.customDescription || project?.description || '';

export const projectDate = (project) =>
  project?.pushedAt || project?.ghUpdatedAt || project?.createdAt || null;

export const projectYear = (project) => {
  const d = projectDate(project);
  return d ? new Date(d).getFullYear() : '—';
};
