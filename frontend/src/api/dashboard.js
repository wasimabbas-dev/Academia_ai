import api from './axios';

export const dashboardAPI = {
  stats: () => api.get('/dashboard/stats'),
};