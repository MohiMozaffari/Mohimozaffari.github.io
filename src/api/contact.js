import client from './client';

export const sendContactMessage = (data) => client.post('/api/contact', data).then((r) => r.data);

export const getMessagesAdmin = () => client.get('/api/contact/admin/all').then((r) => r.data);
export const markMessageRead = (id) =>
  client.patch(`/api/contact/admin/${id}/read`).then((r) => r.data);
