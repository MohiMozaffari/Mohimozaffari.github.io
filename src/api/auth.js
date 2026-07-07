import client, { setAuthToken } from './client';

export async function login(username, password) {
  const { data } = await client.post('/api/auth/login', { username, password });
  localStorage.setItem('adminToken', data.token);
  setAuthToken(data.token);
  return data;
}

export function logout() {
  localStorage.removeItem('adminToken');
  setAuthToken(null);
}

export const me = () => client.get('/api/auth/me').then((r) => r.data);

export const triggerSync = () => client.post('/api/sync/github').then((r) => r.data);

export const getIsLoggedIn = () => !!localStorage.getItem('adminToken');
