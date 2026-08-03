import axios from 'axios';

/**
 * Configure Axios Instance
 * Using standard API base URL to prevent endpoint path issues.
 */
const api = axios.create({
 baseURL: "https://smart-inventory-auth-service.onrender.com/api",
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Automatically attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Preserve original Axios error while attaching backend message
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const backendMessage =
      error.response?.data?.message ||
      error.response?.data?.error;

    if (backendMessage) {
      error.message = backendMessage;
    }

    return Promise.reject(error);
  }
);

/**
 * Supplier Service Layer
 */

// 1. Fetch all suppliers with optional query parameters (search, status, pagination)
export const getSuppliers = async (params = {}) => {
  const response = await api.get('/suppliers', { params });
  return response.data;
};

// 2. Fetch single supplier by ID
export const getSupplierById = async (id) => {
  const response = await api.get(`/suppliers/${id}`);
  return response.data;
};

// 3. Create a new supplier
export const createSupplier = async (data) => {
  const response = await api.post('/suppliers', data);
  return response.data;
};

// 4. Update an existing supplier by ID
export const updateSupplier = async (id, data) => {
  const response = await api.patch(`/suppliers/${id}`, data);
  return response.data;
};

// 5. Deactivate / Delete a supplier by ID
export const deactivateSupplier = async (id) => {
  const response = await api.delete(`/suppliers/${id}`);
  return response.data;
};

// Default export object containing all methods
const supplierService = {
  getSuppliers,
  getSupplierById,
  createSupplier,
  updateSupplier,
  deactivateSupplier,
};

export default supplierService;