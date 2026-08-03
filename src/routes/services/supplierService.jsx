import api from './authService'; // Adjust this import path to match your Axios instance location

/**
 * Service to handle Supplier API interactions.
 */
const supplierService = {
  /**
   * Fetches a list of all suppliers.
   * @returns {Promise<Array<Object>>} List of suppliers.
   */
  getSuppliers: async () => {
    try {
      const response = await api.get('/api/suppliers');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Fetches details for a specific supplier by ID.
   * @param {string|number} id - Supplier ID.
   * @returns {Promise<Object>} Supplier details.
   */
  getSupplierById: async (id) => {
    try {
      const response = await api.get(`/api/suppliers/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Searches suppliers by search query.
   * @param {string} query - The search query term.
   * @returns {Promise<Array<Object>>} Filtered list of suppliers.
   */
  searchSuppliers: async (query) => {
    try {
      const response = await api.get('/api/suppliers', {
        params: { search: query },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

export default supplierService;