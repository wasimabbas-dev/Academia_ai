import api from './axios';

export const courseAPI = {
  list: () => api.get('/courses'),
  create: (data) => api.post('/courses', data),
};