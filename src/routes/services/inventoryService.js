import API from "./authService";

/**
 * Default fallback payload returned when a product does not yet have inventory stock records.
 */
const DEFAULT_STOCK_FALLBACK = {
  availableStock: 0,
  currentQuantity: 0,
  reservedStock: 0,
  inventoryValue: 0,
  batches: [],
};

/**
 * Standardizes backend errors for fatal failures only.
 * Missing stock / missing batches are handled separately and do not throw.
 *
 * @param {Error} error
 * @param {string} fallbackContext
 * @throws {Error}
 */
const handleApiError = (error, fallbackContext) => {
  const backendMessage =
    error.response?.data?.message || error.response?.data?.error;
  const finalMessage =
    backendMessage || error.message || "An unexpected network error occurred.";

  console.error(`${fallbackContext}:`, error);
  throw new Error(finalMessage);
};

/**
 * Safely normalizes a value into an array.
 * @param {*} value
 * @returns {Array}
 */
const asArray = (value) => {
  if (Array.isArray(value)) return value;
  if (Array.isArray(value?.data)) return value.data;
  if (Array.isArray(value?.items)) return value.items;
  return [];
};

/**
 * Fetches all current inventory stock items.
 * @route GET /inventory/stock
 */
export const getInventory = async () => {
  try {
    const response = await API.get("/inventory/stock");
    return asArray(response.data);
  } catch (error) {
    handleApiError(error, "Error fetching all stock");
  }
};

/**
 * Fetches the specific stock details for a single product.
 * Missing inventory record is not fatal; returns safe zero-state fallback.
 *
 * @route GET /inventory/stock/:productId
 */
export const getProductStock = async (productId) => {
  try {
    const response = await API.get(`/inventory/stock/${productId}`);
    const data = response.data || {};

    return {
      ...DEFAULT_STOCK_FALLBACK,
      ...data,
      availableStock: Number(
        data.availableStock ?? data.currentQuantity ?? data.stock ?? 0
      ),
      currentQuantity: Number(
        data.currentQuantity ?? data.availableStock ?? data.stock ?? 0
      ),
      reservedStock: Number(data.reservedStock ?? 0),
      inventoryValue: Number(
        data.inventoryValue ??
          (Number(data.availableStock ?? data.currentQuantity ?? data.stock ?? 0) *
            Number(data.sellingPrice ?? data.price ?? 0))
      ),
    };
  } catch (error) {
    const status = error.response?.status;

    // Expected fallback: no inventory record yet
    if (status === 404) {
      return { ...DEFAULT_STOCK_FALLBACK };
    }

    handleApiError(error, `Error fetching stock for product ID ${productId}`);
  }
};

/**
 * Fetches all batches for a specific product.
 * Missing batches are not fatal; returns empty array.
 *
 * @route GET /inventory/batches/:productId
 */
export const getProductBatches = async (productId) => {
  try {
    const response = await API.get(`/inventory/batches/${productId}`);
    return asArray(response.data);
  } catch (error) {
    const status = error.response?.status;
    const backendMsg = String(
      error.response?.data?.message || error.response?.data?.error || ""
    ).toLowerCase();

    // Expected fallback: no batches for this product yet
    if (
      status === 404 ||
      status === 400 ||
      backendMsg.includes("batch not found") ||
      backendMsg.includes("no batches")
    ) {
      return [];
    }

    handleApiError(error, `Error fetching batches for product ID ${productId}`);
  }
};

/**
 * Fetches specific details for a single batch.
 * @route GET /inventory/batch/:batchId
 */
export const getBatch = async (batchId) => {
  try {
    const response = await API.get(`/inventory/batch/${batchId}`);
    return response.data;
  } catch (error) {
    handleApiError(error, `Error fetching batch details for batch ID ${batchId}`);
  }
};

/**
 * Fetches all batches that are near or past their expiration date.
 * @route GET /inventory/batches/expiring
 */
export const getExpiringBatches = async () => {
  try {
    const response = await API.get("/inventory/batches/expiring");
    return asArray(response.data);
  } catch (error) {
    handleApiError(error, "Error fetching expiring batches");
  }
};

/**
 * Fetches the complete history of inventory movements.
 * @route GET /inventory/movements
 */
export const getInventoryMovements = async () => {
  try {
    const response = await API.get("/inventory/movements");
    return asArray(response.data);
  } catch (error) {
    handleApiError(error, "Error fetching inventory movements");
  }
};

/**
 * Records a stock-in action.
 * @route POST /inventory/stock-in
 */
export const stockIn = async (data) => {
  try {
    const response = await API.post("/inventory/stock-in", data);
    return response.data;
  } catch (error) {
    handleApiError(error, "Error processing stock-in transaction");
  }
};

/**
 * Records a stock-out action.
 * @route POST /inventory/stock-out
 */
export const stockOut = async (data) => {
  try {
    const response = await API.post("/inventory/stock-out", data);
    return response.data;
  } catch (error) {
    handleApiError(error, "Error processing stock-out transaction");
  }
};

/**
 * Adjusts inventory counts manually.
 * @route POST /inventory/adjust-stock
 */
export const adjustStock = async (data) => {
  try {
    const response = await API.post("/inventory/adjust-stock", data);
    return response.data;
  } catch (error) {
    handleApiError(error, "Error processing inventory adjustment");
  }
};

/**
 * Reverses a previously recorded inventory movement.
 * @route POST /inventory/reverse-movement
 */
export const reverseMovement = async (data) => {
  try {
    const response = await API.post("/inventory/reverse-movement", data);
    return response.data;
  } catch (error) {
    handleApiError(error, "Error reversing inventory movement");
  }
};

// ==========================================
// DEFAULT EXPORT
// ==========================================
const inventoryService = {
  getInventory,
  getProductStock,
  getProductBatches,
  getBatch,
  getExpiringBatches,
  getInventoryMovements,
  stockIn,
  stockOut,
  adjustStock,
  reverseMovement,
};

export default inventoryService;