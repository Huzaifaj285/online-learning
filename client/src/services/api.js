import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Student API calls
export const studentAPI = {
  getAll: () => axios.get(`${API_BASE_URL}/students`),
  getById: (id) => axios.get(`${API_BASE_URL}/students/${id}`),
  create: (data) => axios.post(`${API_BASE_URL}/students`, data),
  update: (id, data) => axios.put(`${API_BASE_URL}/students/${id}`, data),
  delete: (id) => axios.delete(`${API_BASE_URL}/students/${id}`),
};

// Course API calls
export const courseAPI = {
  getAll: () => axios.get(`${API_BASE_URL}/courses`),
  getById: (id) => axios.get(`${API_BASE_URL}/courses/${id}`),
  create: (data) => axios.post(`${API_BASE_URL}/courses`, data),
  update: (id, data) => axios.put(`${API_BASE_URL}/courses/${id}`, data),
  delete: (id) => axios.delete(`${API_BASE_URL}/courses/${id}`),
};

// Enrollment API calls
export const enrollmentAPI = {
  getAll: () => axios.get(`${API_BASE_URL}/enrollments`),
  getById: (id) => axios.get(`${API_BASE_URL}/enrollments/${id}`),
  enroll: (data) => axios.post(`${API_BASE_URL}/enrollments`, data),
  update: (id, data) => axios.put(`${API_BASE_URL}/enrollments/${id}`, data),
  unenroll: (id) => axios.delete(`${API_BASE_URL}/enrollments/${id}`),
};
