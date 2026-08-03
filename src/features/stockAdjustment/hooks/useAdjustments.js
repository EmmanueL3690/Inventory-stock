import { useState, useEffect, useMemo, useCallback } from "react";
import { inventoryService } from "../services/adjustmentService";
import { validateAdjustmentForm } from "../utils/adjustmentValidation";
import { useInventoryProducts } from "./useInventoryProducts";
import toast from "react-hot-toast";

const ALLOWED_ADJUSTMENT_TYPES = new Set([
  "DAMAGE",
  "LOST",
  "EXPIRED",
  "FOUND",
  "CORRECTION",
]);

export const useAdjustments = () => {
  const {
    products,
    loadingProducts,
    errorProducts,
    selectedProduct,
    selectedProductId,
    currentStock,
    loadingStock,
    handleSelectProduct,
    resetSelection,
    fetchProducts,
    fetchSelectedProductStock,
  } = useInventoryProducts();

  /* ===========================================================
      FILTER STATES
  =========================================================== */
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("All Locations");
  const [reasonFilter, setReasonFilter] = useState("All Reasons");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  /* ===========================================================
      FORM STATE
  =========================================================== */
  const [formData, setFormData] = useState({
    productId: "",
    quantity: 1,
    type: "DAMAGE",
    notes: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* ===========================================================
      MOVEMENT STATE
  =========================================================== */
  const [movements, setMovements] = useState([]);
  const [loadingMovements, setLoadingMovements] = useState(false);

  /* ===========================================================
      PRODUCT LOOKUP MAP
  =========================================================== */
  const productMap = useMemo(() => {
    const map = new Map();
    products.forEach((product) => {
      const id = product._id || product.id;
      if (id) {
        map.set(id, product);
      }
    });
    return map;
  }, [products]);

  /* ===========================================================
      SINGLE SOURCE OF TRUTH PRODUCT RESOLUTION
  =========================================================== */
  const resolveProduct = useCallback(
    (movement) => {
      if (!movement) return {};

      // 1. Priority: movement.productId (if object)
      if (movement.productId && typeof movement.productId === "object") {
        return movement.productId;
      }

      // 2. Priority: productMap lookup using movement.productId string
      if (
        typeof movement.productId === "string" &&
        productMap.has(movement.productId)
      ) {
        return productMap.get(movement.productId);
      }

      // 3. Priority: fallback movement.product (if object)
      if (movement.product && typeof movement.product === "object") {
        return movement.product;
      }

      // 4. Default fallback
      return {};
    },
    [productMap]
  );

  /* ===========================================================
      PRODUCT SELECT HANDLER
  =========================================================== */
  const onSelectProduct = useCallback(
    (product) => {
      handleSelectProduct(product);
      setFormData((prev) => ({
        ...prev,
        productId: product ? product._id || product.id : "",
      }));
    },
    [handleSelectProduct]
  );

  /* ===========================================================
      FETCH MOVEMENTS
  =========================================================== */
  const fetchMovements = useCallback(async () => {
    setLoadingMovements(true);
    try {
      const response = await inventoryService.getMovements();
      const records = Array.isArray(response)
        ? response
        : response.movements || [];
      setMovements(records);
    } catch (error) {
      console.error("Fetch Movements Error:", error);
      toast.error("Failed to load adjustment history.");
    } finally {
      setLoadingMovements(false);
    }
  }, []);

  useEffect(() => {
    fetchMovements();
  }, [fetchMovements]);

  /* ===========================================================
      STOCK PREVIEW CALCULATIONS
  =========================================================== */
  const adjustmentQty = Number(formData.quantity) || 0;
  const isReduction =
    formData.type === "DAMAGE" ||
    formData.type === "LOST" ||
    formData.type === "EXPIRED";

  const adjustmentImpact = isReduction
    ? -Math.abs(adjustmentQty)
    : Math.abs(adjustmentQty);

  const newStock = Math.max(0, currentStock + adjustmentImpact);

  /* ===========================================================
      ONLY ADJUSTMENT MOVEMENTS
  =========================================================== */
  const adjustmentMovements = useMemo(() => {
    return movements.filter((movement) => {
      const type = movement.type || movement.movementType || movement.reason;
      return ALLOWED_ADJUSTMENT_TYPES.has(type);
    });
  }, [movements]);

  /* ===========================================================
      FILTERED TABLE ITEMS
  =========================================================== */
  const filteredItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return adjustmentMovements.filter((item) => {
      const product = resolveProduct(item);

      const productName = (product.name || "").toLowerCase();
      const sku = (product.sku || "").toLowerCase();
      const barcode = (product.barcode || "").toLowerCase();

      const matchesSearch =
        !query ||
        productName.includes(query) ||
        sku.includes(query) ||
        barcode.includes(query);

      const productId = product._id || product.id;
      const matchesProduct =
        !selectedProductId || productId === selectedProductId;

      const itemType = item.type || item.movementType || item.reason;
      const matchesReason =
        reasonFilter === "All Reasons" || itemType === reasonFilter;

      return matchesSearch && matchesProduct && matchesReason;
    });
  }, [
    adjustmentMovements,
    resolveProduct,
    searchQuery,
    selectedProductId,
    reasonFilter,
  ]);

  /* ===========================================================
      DASHBOARD STATS
  =========================================================== */
  const stats = useMemo(() => {
    let positive = 0;
    let negative = 0;
    let total = 0;
    let value = 0;

    filteredItems.forEach((item) => {
      const qty = Number(item.quantity) || 0;
      const product = resolveProduct(item);

      const unitCost =
        Number(item.unitCost) ??
        Number(product.cost) ??
        0;

      const type = item.type || item.movementType || item.reason;
      const isNegative =
        type === "DAMAGE" ||
        type === "LOST" ||
        type === "EXPIRED" ||
        qty < 0;

      if (isNegative) {
        negative += Math.abs(qty);
      } else {
        positive += qty;
      }

      total += Math.abs(qty);
      value += qty * (unitCost || 0);
    });

    return {
      totalItemsCounted: total,
      positiveAdjustments: positive,
      negativeAdjustments: negative,
      varianceValue: value,
      variancePercentage: total > 0 ? (value / total) * 100 : 0,
    };
  }, [filteredItems, resolveProduct]);

  /* ===========================================================
      FORM HANDLERS
  =========================================================== */
  const handleInputChange = useCallback((field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    setFormErrors((prev) => (prev[field] ? { ...prev, [field]: null } : prev));
  }, []);

  const handleResetForm = useCallback(() => {
    setFormData({
      productId: "",
      quantity: 1,
      type: "DAMAGE",
      notes: "",
    });
    resetSelection();
    setFormErrors({});
  }, [resetSelection]);

  /* ===========================================================
      SUBMIT ADJUSTMENT
  =========================================================== */
  const handleSubmit = useCallback(
    async (e) => {
      if (e) e.preventDefault();

      const { isValid, errors } = validateAdjustmentForm(formData);

      if (!isValid) {
        setFormErrors(errors);
        toast.error("Please correct the highlighted fields.");
        return;
      }

      setIsSubmitting(true);

      try {
        await inventoryService.adjustStock({
          productId: formData.productId,
          quantity: Number(formData.quantity),
          type: formData.type,
          notes: formData.notes,
        });

        toast.success("Inventory adjusted successfully.");

        await Promise.all([
          fetchMovements(),
          fetchProducts(),
          fetchSelectedProductStock(formData.productId),
        ]);

        handleResetForm();
      } catch (error) {
        console.error("Submit Adjustment Error:", error);
        toast.error(
          error?.response?.data?.message ||
            error.message ||
            "Failed to adjust inventory."
        );
      } finally {
        setIsSubmitting(false);
      }
    },
    [
      formData,
      fetchMovements,
      fetchProducts,
      fetchSelectedProductStock,
      handleResetForm,
    ]
  );

  return {
    /* Products */
    products,
    productMap,
    loadingProducts,
    errorProducts,
    selectedProduct,
    selectedProductId,
    handleSelectProduct: onSelectProduct,

    /* Stock Preview */
    currentStock,
    loadingStock,
    adjustmentImpact,
    newStock,

    /* Form */
    formData,
    formErrors,
    isSubmitting,
    handleInputChange,
    handleSubmit,
    handleResetForm,

    /* Table & Movements */
    items: filteredItems,
    allItemsRaw: adjustmentMovements,
    loadingMovements,
    resolveProduct,

    /* Dashboard */
    stats,

    /* Filters */
    searchQuery,
    setSearchQuery,
    locationFilter,
    setLocationFilter,
    reasonFilter,
    setReasonFilter,
    statusFilter,
    setStatusFilter,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,

    /* Refresh */
    refreshMovements: fetchMovements,

    /* Session Meta */
    sessionMeta: {
      referenceId: "ADJ-LIVE",
    },
    aiInsights: [],
  };
};