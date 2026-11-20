import api from './axios';

export const ragAPI = {
  ask: (data) => api.post('/rag/ask', data),
};