import { useState, useMemo, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { productService } from "../../../../../routes/services/productService";
import {
  getProductStock,
  getProductBatches,
  getInventoryMovements,
} from "../../../../../routes/services/inventoryService";

/**
 * Normalizes raw product and inventory response data into a single unified detail model.
 * Guarantees default zero-state fallbacks for stock and empty arrays for batches/movements.
 */
const normalizeProductDetail = (
  baseProduct = {},
  stockData = {},
  batches = [],
  movements = []
) => {
  const availableStock = Number(
    stockData?.availableStock ??
      stockData?.currentQuantity ??
      stockData?.stock ??
      0
  );
  const currentQuantity = Number(
    stockData?.currentQuantity ??
      stockData?.availableStock ??
      stockData?.stock ??
      0
  );
  const reservedStock = Number(stockData?.reservedStock ?? 0);
  const sellingPrice = Number(
    stockData?.sellingPrice ?? baseProduct?.sellingPrice ?? 0
  );
  const costPrice = Number(
    stockData?.costPrice ?? baseProduct?.costPrice ?? 0
  );
  const reorderLevel = Number(
    stockData?.reorderLevel ?? baseProduct?.reorderLevel ?? 0
  );

  const inventoryValue =
    stockData?.inventoryValue !== undefined && stockData?.inventoryValue !== null
      ? Number(stockData.inventoryValue)
      : availableStock * sellingPrice;

  return {
    id: baseProduct?._id || baseProduct?.id || stockData?._id || stockData?.id || "",
    _id: baseProduct?._id || baseProduct?.id || stockData?._id || stockData?.id || "",
    name: baseProduct?.name || stockData?.name || "Unnamed Product",
    sku: baseProduct?.sku || stockData?.sku || "N/A",
    category: baseProduct?.category || stockData?.category || "Uncategorized",
    unit: baseProduct?.unit || stockData?.unit || "PCS",
    sellingPrice,
    costPrice,
    reorderLevel,
    status: baseProduct?.status || stockData?.status || "Active",
    createdAt: baseProduct?.createdAt || stockData?.createdAt || null,
    updatedAt: baseProduct?.updatedAt || stockData?.updatedAt || null,
    availableStock,
    currentQuantity,
    reservedStock,
    inventoryValue,
    batches: Array.isArray(batches) ? batches : [],
    movements: Array.isArray(movements) ? movements : [],
    raw: {
      ...baseProduct?.raw,
      ...baseProduct,
      ...stockData,
    },
  };
};

export const useProducts = () => {
  const { id } = useParams();

  /* ================================
      PRIMARY DATA STATES
  ================================= */
  const [baseProduct, setBaseProduct] = useState(null);
  const [stockData, setStockData] = useState(null);
  const [batches, setBatches] = useState([]);
  const [movements, setMovements] = useState([]);

  /* ================================
      LOADING & ERROR STATES
  ================================= */
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [loadingBatches, setLoadingBatches] = useState(true);
  const [loadingMovements, setLoadingMovements] = useState(true);

  const [errorProduct, setErrorProduct] = useState(null);
  const [errorBatches, setErrorBatches] = useState(null);
  const [errorMovements, setErrorMovements] = useState(null);

  /* ================================
      NAVIGATION TABS
  ================================= */
  const [activeTab, setActiveTab] = useState("Overview");

  const tabs = useMemo(
    () => [
      "Overview",
      "Stock Movement",
      "Sales History",
      "Batch & Expiry",
      "Suppliers",
      "AI Insights",
    ],
    []
  );

  /* ================================
      API FETCHERS
  ================================= */

  // 1. Fetch Product Metadata and Stock Data
  const refreshProduct = useCallback(async () => {
    if (!id) return;
    setLoadingProduct(true);
    setErrorProduct(null);

    try {
      // Primary Request: Fetch main product record, categories, and units
      const [productData, categories, units] = await Promise.all([
        productService.getProductById(id),
        productService.getCategories().catch(() => []),
        productService.getUnits().catch(() => []),
      ]);

      const matchedCategory = (categories || []).find(
        (cat) => cat._id === productData?.categoryId
      );
      const categoryName = matchedCategory
        ? matchedCategory.name
        : productData?.category || "No Category";

      const matchedUnit = (units || []).find(
        (u) => u._id === productData?.unitId
      );
      const unitName = matchedUnit
        ? matchedUnit.name
        : productData?.unit || "No Unit";

      const mappedBase = {
        _id: productData?._id || id,
        id: productData?._id || id,
        name: productData?.name || "",
        sku: productData?.sku || "",
        sellingPrice: productData?.sellingPrice || 0,
        costPrice: productData?.costPrice || 0,
        category: categoryName,
        unit: unitName,
        reorderLevel: productData?.reorderLevel || 0,
        status: productData?.isArchived
          ? "Archived"
          : productData?.isActive
          ? "Active"
          : "Inactive",
        createdAt: productData?.createdAt,
        updatedAt: productData?.updatedAt,
        raw: productData,
      };

      setBaseProduct(mappedBase);

      // Secondary Request: Fetch inventory stock data with non-fatal 404 fallback
      try {
        const stockInfo = await getProductStock(id);
        setStockData(stockInfo || {
          availableStock: 0,
          currentQuantity: 0,
          reservedStock: 0,
          inventoryValue: 0,
        });
      } catch (stockErr) {
        // Stock 404s or non-fatal missing records fall back to 0 without breaking main page
        console.warn(`Non-fatal stock load warning for product ID ${id}:`, stockErr);
        setStockData({
          availableStock: 0,
          currentQuantity: 0,
          reservedStock: 0,
          inventoryValue: 0,
        });
      }
    } catch (err) {
      // Fatal errors are ONLY triggered when the main product request fails
      console.error(`Fatal error: Failed to fetch core product metadata for ID ${id}:`, err);
      setErrorProduct(
        err.response?.data?.message || err.message || "Failed to load product."
      );
    } finally {
      setLoadingProduct(false);
    }
  }, [id]);

  // 2. Fetch Product Batches
  const refreshBatches = useCallback(async () => {
    if (!id) return;
    setLoadingBatches(true);
    setErrorBatches(null);

    try {
      const data = await getProductBatches(id);
      setBatches(Array.isArray(data) ? data : []);
    } catch (err) {
      // Missing batch records (400, 404, etc.) are handled non-fatally with []
      console.warn(`Non-fatal batch load warning for product ID ${id}:`, err);
      const status = err.response?.status;
      if (status !== 404 && status !== 400) {
        setErrorBatches(
          err.response?.data?.message || err.message || "Failed to load product batches."
        );
      }
      setBatches([]);
    } finally {
      setLoadingBatches(false);
    }
  }, [id]);

  // 3. Fetch Inventory Movements
  const refreshMovements = useCallback(async () => {
    if (!id) return;
    setLoadingMovements(true);
    setErrorMovements(null);

    try {
      const allMovements = await getInventoryMovements();
      const productMovements = (
        Array.isArray(allMovements) ? allMovements : []
      ).filter(
        (m) => String(m.productId || m.product?._id || m.product) === String(id)
      );
      setMovements(productMovements);
    } catch (err) {
      console.warn(`Non-fatal movement load warning for product ID ${id}:`, err);
      setErrorMovements(
        err.response?.data?.message || err.message || "Failed to load inventory movements."
      );
      setMovements([]);
    } finally {
      setLoadingMovements(false);
    }
  }, [id]);

  // Combined Refresh Handler
  const refreshAll = useCallback(() => {
    refreshProduct();
    refreshBatches();
    refreshMovements();
  }, [refreshProduct, refreshBatches, refreshMovements]);

  /* ================================
      INITIALIZATION & MOUNT
  ================================= */
  useEffect(() => {
    if (id) {
      refreshAll();
    }
  }, [id, refreshAll]);

  /* ================================
      NORMALIZED PRODUCT MODEL
  ================================= */
  const product = useMemo(() => {
    if (!baseProduct) return null;
    return normalizeProductDetail(baseProduct, stockData, batches, movements);
  }, [baseProduct, stockData, batches, movements]);

  /* ================================
      RETURN INTERFACE
  ================================= */
  return {
    product,
    loading: loadingProduct,
    loadingBatches,
    loadingMovements,

    // Separate error states so inventory issues do not crash the page
    error: errorProduct,
    errorProduct,
    errorBatches,
    errorMovements,

    refreshProduct,
    refreshBatches,
    refreshMovements,
    refreshAll,

    activeTab,
    setActiveTab,
    tabs,
  };
};

export default useProducts;