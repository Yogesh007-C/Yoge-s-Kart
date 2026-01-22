import api from './api';

export const orderService = {
  createOrder: async (shippingAddress, paymentMethod) => {
    const response = await api.post('/orders', { shippingAddress, paymentMethod });
    return response.data;
  },

  getUserOrders: async () => {
    const response = await api.get('/orders');
    return response.data;
  },

  getOrderDetails: async (id) => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },

  cancelOrder: async (id) => {
    const response = await api.put(`/orders/${id}/cancel`);
    return response.data;
  },
};
