import client from './client';

export const getProjects = () => client.get('/api/projects').then((r) => r.data);
export const getProject = (slug) => client.get(`/api/projects/${slug}`).then((r) => r.data);

export const getAllProjectsAdmin = () =>
  client.get('/api/projects/admin/all').then((r) => r.data);
export const updateProjectAdmin = (id, patch) =>
  client.patch(`/api/projects/admin/${id}`, patch).then((r) => r.data);
export const createProjectAdmin = (data) =>
  client.post('/api/projects/admin', data).then((r) => r.data);
