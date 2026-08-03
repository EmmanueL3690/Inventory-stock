import axios from 'axios';

const API_URL = '/api/sales';

/**
 * Retrieves authorization headers with bearer token from localStorage
 */
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };
};

/**
 * Centralized Axios error handler for HTTP & Network errors
 */
const handleApiError = (error, contextMessage) => {
  if (error.response) {
    const { status, data } = error.response;
    const serverMessage = data?.message || data?.error;

    switch (status) {
      case 400:
        throw new Error(serverMessage || `Bad Request: Invalid input provided (${contextMessage}).`);
      case 401:
        throw new Error(serverMessage || 'Unauthorized: Session expired, please log in again.');
      case 403:
        throw new Error(serverMessage || 'Forbidden: You do not have permission to perform this action.');
      case 404:
        throw new Error(serverMessage || `Not Found: Requested resource missing (${contextMessage}).`);
      case 500:
        throw new Error(serverMessage || 'Internal Server Error: Something went wrong on the server.');
      default:
        throw new Error(serverMessage || `Error ${status}: Failed to perform action (${contextMessage}).`);
    }
  } else if (error.request) {
    throw new Error('Network Error: Server is unreachable. Please check your internet connection.');
  } else {
    throw new Error(error.message || 'An unexpected error occurred.');
  }
};

export const salesService = {
  /**
   * Fetch all sales with optional query parameters
   * GET /api/sales
   */
  getSales: async (params = {}) => {
    try {
      const response = await axios.get(API_URL, {
        ...getAuthHeaders(),
        params,
      });
      return response.data;
    } catch (error) {
      handleApiError(error, 'fetching sales');
    }
  },

  /**
   * Fetch single sale details by ID
   * GET /api/sales/:id
   */
  getSaleById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`, getAuthHeaders());
      return response.data;
    } catch (error) {
      handleApiError(error, `fetching sale #${id}`);
    }
  },

  /**
   * Create a new sale
   * POST /api/sales
   * Strictly filters out calculated total/price/sku properties
   */
  createSale: async (saleData) => {
    try {
      const payload = {
        customerName: saleData.customerName ? String(saleData.customerName).trim() : '',
        paymentMethod: saleData.paymentMethod || 'cash',
        paymentStatus: saleData.paymentStatus || 'paid',
        notes: saleData.notes ? String(saleData.notes).trim() : '',
        items: Array.isArray(saleData.items)
          ? saleData.items.map((item) => ({
              productId: item.productId,
              quantity: Number(item.quantity) || 1,
            }))
          : [],
      };

      const response = await axios.post(API_URL, payload, getAuthHeaders());
      return response.data;
    } catch (error) {
      handleApiError(error, 'creating sale');
    }
  },

  /**
   * Void an existing sale
   * POST /api/sales/:id/void
   */
  voidSale: async (id) => {
    try {
      const response = await axios.post(`${API_URL}/${id}/void`, {}, getAuthHeaders());
      return response.data;
    } catch (error) {
      handleApiError(error, `voiding sale #${id}`);
    }
  },

  /**
   * Search sales query helper
   * GET /api/sales?search=query
   */
  searchSales: async (query = '') => {
    try {
      const response = await axios.get(API_URL, {
        ...getAuthHeaders(),
        params: { search: query },
      });
      return response.data;
    } catch (error) {
      handleApiError(error, 'searching sales');
    }
  },

  /**
   * Filter sales by payment status, method, or date ranges
   * GET /api/sales?params
   */
  filterSales: async (filters = {}) => {
    try {
      const response = await axios.get(API_URL, {
        ...getAuthHeaders(),
        params: filters,
      });
      return response.data;
    } catch (error) {
      handleApiError(error, 'filtering sales');
    }
  },
};

export default salesService;