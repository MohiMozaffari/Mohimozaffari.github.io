import client from './client';

export const getSettings = () => client.get('/api/settings').then((r) => r.data);
export const updateSettings = (patch) => client.patch('/api/settings', patch).then((r) => r.data);
