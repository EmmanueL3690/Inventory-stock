import api from '../../../routes/services/authService';

export const inventoryService = {
  adjustStock: async (data) => {
    const response = await api.post('/inventory/adjust', data);
    return response.data;
  },

  getProductStock: async (productId) => {
    const response = await api.get(`/inventory/product/${productId}/stock`);
    return response.data;
  },

  getMovements: async () => {
    const response = await api.get('/inventory/movements');
    return response.data;
  }
};

export const productService = {
  getProducts: async () => {
    const response = await api.get('/products');
    return response.data;
  }
};