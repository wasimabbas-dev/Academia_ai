import api from './axios';

export const quizAPI = {
  list: () => api.get('/quizzes'),
  create: (data) => api.post('/quizzes', data),
  submit: (id, answers) => api.post(`/quizzes/${id}/submit`, { answers }),
};