import api from './api';

export const authService = {
  register: async (data) => {
    const response = await api.post('/auth/register', data);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  login: async (data) => {
    const response = await api.post('/auth/login', data);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  },

  updateProfile: async (data) => {
    const response = await api.put('/auth/profile', data);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    return response.data;
  },
};
