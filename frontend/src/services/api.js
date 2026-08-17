import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api'
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const authAPI = {
  register: (data) => API.post('/auth/register', data),
  login: (data) => API.post('/auth/login', data),
};

export const cartAPI = {
  add: (data) => API.post('/cart/add', data),
  get: (username) => API.get(`/cart?username=${username}`),
  remove: (id) => API.delete(`/cart/${id}`),
  clear: (username) => API.delete(`/cart/clear/${username}`),
};

export const orderAPI = {
  create: (data) => API.post('/orders/create', data),
  getOrders: (username) => API.get(`/orders?username=${username}`),
};

export default API;

