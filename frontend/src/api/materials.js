import api from './axios';

export const materialAPI = {
  list: () => api.get('/materials'),
  upload: (formData) => api.post('/materials/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
};