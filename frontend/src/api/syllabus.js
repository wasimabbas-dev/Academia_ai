import api from './axios';

export const syllabusAPI = {
  getByCourse: (courseId) => api.get(`/syllabus/${courseId}`),
  upsert: (courseId, data) => api.post(`/syllabus/${courseId}`, data),
};