import client from './client';

export const getPosts = () => client.get('/api/blog').then((r) => r.data);
export const getPost = (slug) => client.get(`/api/blog/${slug}`).then((r) => r.data);

export const getAllPostsAdmin = () => client.get('/api/blog/admin/all').then((r) => r.data);
export const createPost = (data) => client.post('/api/blog', data).then((r) => r.data);
export const updatePost = (id, patch) => client.patch(`/api/blog/${id}`, patch).then((r) => r.data);
export const deletePost = (id) => client.delete(`/api/blog/${id}`);
