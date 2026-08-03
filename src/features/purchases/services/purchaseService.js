import API from "../../../routes/services/authService";

/**
 * Normalizes error responses from Axios requests.
 * @param {Error} error - The caught error object.
 * @param {string} fallbackMessage - Fallback error message.
 */
const handleServiceError = (error, fallbackMessage) => {
  const message =
    error.response?.data?.message ||
    error.response?.data?.error ||
    error.message ||
    fallbackMessage;

  console.error(`PurchaseService Error: ${message}`, {
    status: error.response?.status,
    data: error.response?.data,
  });

  const customError = new Error(message);
  customError.status = error.response?.status;
  customError.data = error.response?.data;

  throw customError;
};

/**
 * Retrieves the authorization header containing the stored JWT.
 * @returns {Object} Config object with Authorization header if token exists.
 */
const getAuthConfig = (customConfig = {}) => {
  const token =
    localStorage.getItem("accessToken") || localStorage.getItem("token");

  const headers = {
    ...customConfig.headers,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  return {
    ...customConfig,
    headers,
  };
};

/**
 * Fetch all purchases with optional query parameters.
 * @param {Object} params - Query parameters (search, page, limit, supplierId, etc.)
 * @param {Object} config - Optional Axios request config
 */
export const getPurchases = async (params = {}, config = {}) => {
  try {
    const res = await API.get("/purchases", getAuthConfig({ ...config, params }));
    return res.data;
  } catch (err) {
    handleServiceError(err, "Failed to fetch purchases list.");
  }
};

/**
 * Fetch purchase summary analytics.
 * @param {Object} config - Optional Axios request config
 */
export const getPurchaseAnalytics = async (config = {}) => {
  try {
    const res = await API.get("/purchases/analytics/summary", getAuthConfig(config));
    return res.data;
  } catch (err) {
    handleServiceError(err, "Failed to fetch purchase analytics.");
  }
};

/**
 * Fetch a single purchase record by ID.
 * @param {string} id - Purchase ID
 * @param {Object} config - Optional Axios request config
 */
export const getPurchaseById = async (id, config = {}) => {
  if (!id) throw new Error("Purchase ID is required.");
  try {
    const res = await API.get(`/purchases/${id}`, getAuthConfig(config));
    return res.data;
  } catch (err) {
    handleServiceError(err, `Failed to fetch purchase record #${id}.`);
  }
};

/**
 * Create a new purchase record.
 * @param {Object} data - Purchase payload
 * @param {Object} config - Optional Axios request config
 */
export const createPurchase = async (data, config = {}) => {
  try {
    const res = await API.post("/purchases", data, getAuthConfig(config));
    return res.data;
  } catch (err) {
    handleServiceError(err, "Failed to create purchase record.");
  }
};

/**
 * Update an existing purchase record.
 * @param {string} id - Purchase ID
 * @param {Object} data - Updated purchase payload
 * @param {Object} config - Optional Axios request config
 */
export const updatePurchase = async (id, data, config = {}) => {
  if (!id) throw new Error("Purchase ID is required for update.");
  try {
    const res = await API.patch(`/purchases/${id}`, data, getAuthConfig(config));
    return res.data;
  } catch (err) {
    handleServiceError(err, `Failed to update purchase record #${id}.`);
  }
};

/**
 * Delete a purchase record.
 * @param {string} id - Purchase ID
 * @param {Object} config - Optional Axios request config
 */
export const deletePurchase = async (id, config = {}) => {
  if (!id) throw new Error("Purchase ID is required for deletion.");
  try {
    const res = await API.delete(`/purchases/${id}`, getAuthConfig(config));
    return res.data;
  } catch (err) {
    handleServiceError(err, `Failed to delete purchase record #${id}.`);
  }
};

/**
 * Update payment status for a specific purchase.
 * @param {string} id - Purchase ID
 * @param {string} paymentStatus - New payment status
 * @param {Object} config - Optional Axios request config
 */
export const updatePaymentStatus = async (id, paymentStatus, config = {}) => {
  if (!id) throw new Error("Purchase ID is required.");
  if (!paymentStatus) throw new Error("Payment status is required.");
  try {
    const res = await API.patch(
      `/purchases/${id}/payment-status`,
      { paymentStatus },
      getAuthConfig(config)
    );
    return res.data;
  } catch (err) {
    handleServiceError(err, `Failed to update payment status for purchase #${id}.`);
  }
};

/**
 * Fetch purchases associated with a specific supplier.
 * @param {string} supplierId - Supplier ID
 * @param {Object} config - Optional Axios request config
 */
export const getPurchasesBySupplier = async (supplierId, config = {}) => {
  if (!supplierId) throw new Error("Supplier ID is required.");
  try {
    const res = await API.get(`/purchases/supplier/${supplierId}`, getAuthConfig(config));
    return res.data;
  } catch (err) {
    handleServiceError(err, `Failed to fetch purchases for supplier #${supplierId}.`);
  }
};

/**
 * Fetch products list for selection inside purchase forms.
 * @param {Object} params - Query parameters
 * @param {Object} config - Optional Axios request config
 */
export const getProducts = async (params = {}, config = {}) => {
  try {
    const res = await API.get("/products", getAuthConfig({ ...config, params }));
    return res.data;
  } catch (err) {
    handleServiceError(err, "Failed to fetch products list.");
  }
};

/**
 * Fetch suppliers list for selection inside purchase forms.
 * @param {Object} params - Query parameters
 * @param {Object} config - Optional Axios request config
 */
export const getSuppliers = async (params = {}, config = {}) => {
  try {
    const res = await API.get("/suppliers", getAuthConfig({ ...config, params }));
    return res.data;
  } catch (err) {
    handleServiceError(err, "Failed to fetch suppliers list.");
  }
};

const purchaseService = {
  getPurchases,
  getPurchaseAnalytics,
  getPurchaseById,
  createPurchase,
  updatePurchase,
  deletePurchase,
  updatePaymentStatus,
  getPurchasesBySupplier,
  getProducts,
  getSuppliers,
};

export default purchaseService;