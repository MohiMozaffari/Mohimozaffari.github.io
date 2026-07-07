import client from './client';

export const recordPageview = (path) =>
  client.post('/api/analytics/pageview', { path }).catch(() => {});

export const getAnalyticsSummary = () => client.get('/api/analytics/summary').then((r) => r.data);
