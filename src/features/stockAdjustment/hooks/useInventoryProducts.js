import { useState, useEffect, useCallback, useMemo } from 'react';
import toast from 'react-hot-toast';
import { productService, inventoryService } from '../services/adjustmentService';

export const useInventoryProducts = () => {
  // Products state
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [errorProducts, setErrorProducts] = useState(null);

  // Movements state
  const [movements, setMovements] = useState([]);
  const [loadingMovements, setLoadingMovements] = useState(false);

  // Selection & Stock preview state
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [currentStock, setCurrentStock] = useState(0);
  const [loadingStock, setLoadingStock] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    type: 'DAMAGE',
    quantity: '',
    notes: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Filter state
  const [filters, setFilters] = useState({
    search: '',
    productId: '',
    type: 'ALL',
  });

  // ---------------------------------------------------------------------------
  // 1. MEMOIZED PRODUCT MAP
  // ---------------------------------------------------------------------------
  const productMap = useMemo(() => {
    const map = {};
    if (Array.isArray(products)) {
      products.forEach((p) => {
        const id = p._id || p.id;
        if (id) {
          map[id] = p;
        }
      });
    }
    return map;
  }, [products]);

  // ---------------------------------------------------------------------------
  // 2. PRODUCT RESOLUTION HELPER
  // Priority: movement.productId (if object) -> productMap -> movement.product -> {}
  // ---------------------------------------------------------------------------
  const resolveProduct = useCallback(
    (movement) => {
      if (!movement) return {};

      // Priority 1: movement.productId is an object
      if (movement.productId && typeof movement.productId === 'object') {
        const pId = movement.productId._id || movement.productId.id;
        const mapped = pId ? productMap[pId] : null;
        // Merge with full product from map if available to ensure details like barcode/cost are preserved
        return mapped ? { ...mapped, ...movement.productId } : movement.productId;
      }

      // Priority 2: Look up inside productMap
      const targetId =
        typeof movement.productId === 'string'
          ? movement.productId
          : typeof movement.product === 'string'
          ? movement.product
          : movement.product?._id || movement.product?.id;

      if (targetId && productMap[targetId]) {
        return productMap[targetId];
      }

      // Priority 3: Fallback to movement.product (if object)
      if (movement.product && typeof movement.product === 'object') {
        return movement.product;
      }

      // Priority 4: Default fallback
      return {};
    },
    [productMap]
  );

  // ---------------------------------------------------------------------------
  // 3. API FETCHING FUNCTIONS (Unchanged Endpoints)
  // ---------------------------------------------------------------------------
  const fetchProducts = useCallback(async () => {
    setLoadingProducts(true);
    setErrorProducts(null);
    try {
      const data = await productService.getProducts();
      setProducts(Array.isArray(data) ? data : data.products || []);
    } catch (err) {
      const errorMsg = err?.response?.data?.message || 'Failed to load products';
      setErrorProducts(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoadingProducts(false);
    }
  }, []);

  const fetchMovements = useCallback(async () => {
    setLoadingMovements(true);
    try {
      const data = await inventoryService.getMovements();
      const records = Array.isArray(data) ? data : data.movements || [];
      setMovements(records);
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to fetch adjustments history');
    } finally {
      setLoadingMovements(false);
    }
  }, []);

  const fetchSelectedProductStock = useCallback(async (prodId) => {
    if (!prodId) {
      setCurrentStock(0);
      return;
    }
    setLoadingStock(true);
    try {
      const stockData = await inventoryService.getProductStock(prodId);
      const stockVal = typeof stockData?.totalStock === 'number' ? stockData.totalStock : 0;
      setCurrentStock(stockVal);
    } catch (err) {
      toast.error('Failed to fetch product stock');
      setCurrentStock(0);
    } finally {
      setLoadingStock(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
    fetchMovements();
  }, [fetchProducts, fetchMovements]);

  // ---------------------------------------------------------------------------
  // 4. HANDLERS & HELPERS
  // ---------------------------------------------------------------------------
  const handleSelectProduct = useCallback(
    async (product) => {
      if (!product) {
        setSelectedProduct(null);
        setSelectedProductId('');
        setCurrentStock(0);
        return;
      }

      const prodId = product._id || product.id;
      setSelectedProduct(product);
      setSelectedProductId(prodId);

      await fetchSelectedProductStock(prodId);
    },
    [fetchSelectedProductStock]
  );

  const resetSelection = useCallback(() => {
    setSelectedProduct(null);
    setSelectedProductId('');
    setCurrentStock(0);
    setFormData({ type: 'DAMAGE', quantity: '', notes: '' });
    setFormErrors({});
  }, []);

  const handleInputChange = useCallback((field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setFormErrors((prev) => ({ ...prev, [field]: null }));
  }, []);

  const handleFilterChange = useCallback((field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  }, []);

  // Calculate live preview impact on stock
  const qtyNum = Number(formData.quantity) || 0;
  const isNegativeType = ['DAMAGE', 'LOST', 'EXPIRED'].includes(formData.type);
  const adjustmentImpact = isNegativeType ? -Math.abs(qtyNum) : Math.abs(qtyNum);
  const newStock = currentStock + adjustmentImpact;

  // Form submission handler
  const handleSubmit = useCallback(
    async (e) => {
      if (e) e.preventDefault();
      if (!selectedProductId) {
        toast.error('Please select a product');
        return;
      }

      const parsedQty = Number(formData.quantity);
      if (!parsedQty || parsedQty <= 0) {
        setFormErrors((prev) => ({ ...prev, quantity: 'Enter a valid quantity greater than 0' }));
        return;
      }

      setSubmitting(true);
      try {
        await inventoryService.adjustStock({
          productId: selectedProductId,
          type: formData.type,
          quantity: parsedQty,
          notes: formData.notes,
        });

        toast.success('Stock adjusted successfully');
        resetSelection();
        await Promise.all([fetchMovements(), fetchProducts()]);
      } catch (err) {
        toast.error(err?.response?.data?.message || 'Failed to submit stock adjustment');
      } finally {
        setSubmitting(false);
      }
    },
    [selectedProductId, formData, resetSelection, fetchMovements, fetchProducts]
  );

  // ---------------------------------------------------------------------------
  // 5. MEMOIZED FILTERED ITEMS & STATS
  // ---------------------------------------------------------------------------
  const filteredItems = useMemo(() => {
    return movements.filter((item) => {
      const product = resolveProduct(item);

      // Search filter against name, sku, and barcode
      const query = (filters.search || '').toLowerCase().trim();
      if (query) {
        const nameMatch = (product.name || '').toLowerCase().includes(query);
        const skuMatch = (product.sku || '').toLowerCase().includes(query);
        const barcodeMatch = (product.barcode || '').toLowerCase().includes(query);
        if (!nameMatch && !skuMatch && !barcodeMatch) return false;
      }

      // Dropdown filter by Product ID
      if (filters.productId) {
        const pId = product._id || product.id;
        if (pId !== filters.productId) return false;
      }

      // Reason / Type filter
      if (filters.type && filters.type !== 'ALL') {
        const itemType = item.type || item.movementType;
        if (itemType !== filters.type) return false;
      }

      return true;
    });
  }, [movements, filters, resolveProduct]);

  const stats = useMemo(() => {
    let totalAdjustments = filteredItems.length;
    let totalQuantity = 0;
    let totalValue = 0;

    filteredItems.forEach((item) => {
      const product = resolveProduct(item);
      const qty = Number(item.quantity) || 0;

      // Unit Cost priority: item.unitCost -> product.cost -> 0
      const unitCost = Number(item.unitCost ?? product.cost ?? 0);

      totalQuantity += qty;
      totalValue += qty * unitCost;
    });

    return {
      totalAdjustments,
      totalQuantity,
      totalValue,
    };
  }, [filteredItems, resolveProduct]);

  return {
    // Data
    products,
    productMap,
    items: filteredItems,
    rawMovements: movements,
    stats,

    // Loading & Error states
    loadingProducts,
    loadingMovements,
    errorProducts,
    submitting,

    // Selection & Stock
    selectedProduct,
    selectedProductId,
    currentStock,
    loadingStock,
    adjustmentImpact,
    newStock,

    // Form & Filters
    formData,
    formErrors,
    filters,

    // Actions & Resolvers
    resolveProduct,
    handleSelectProduct,
    resetSelection,
    handleInputChange,
    handleFilterChange,
    handleSubmit,
    fetchProducts,
    fetchMovements,
    fetchSelectedProductStock,
  };
};