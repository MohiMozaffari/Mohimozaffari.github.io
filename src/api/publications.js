import client from './client';

export const getPublications = () => client.get('/api/publications').then((r) => r.data);
export const createPublication = (data) =>
  client.post('/api/publications', data).then((r) => r.data);
export const updatePublication = (id, patch) =>
  client.patch(`/api/publications/${id}`, patch).then((r) => r.data);
export const deletePublication = (id) => client.delete(`/api/publications/${id}`);
