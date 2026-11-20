import api from './axios';

export const timetableAPI = {
  list: () => api.get('/timetable'),
  create: (data) => api.post('/timetable', data),
  update: (id, data) => api.put(`/timetable/${id}`, data),
  delete: (id) => api.delete(`/timetable/${id}`),
};