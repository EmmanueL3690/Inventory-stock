import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import purchaseService from "../services/purchaseService";

/**
 * Custom hook for managing purchase records, analytics, filtering, pagination, and CRUD operations.
 */
const usePurchases = () => {
  const isMountedRef = useRef(true);

  // Core Data States
  const [purchases, setPurchases] = useState([]);
  const [analytics, setAnalytics] = useState({});
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  // Loading & Error States
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Modal & Selection States
  const [selectedPurchase, setSelectedPurchase] = useState(null);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const parseErrorMessage = useCallback((err) => {
    if (typeof err === "string") return err;
    if (err?.status === 401) return "Unauthorized. Please log in again.";
    if (err?.status === 403) return "Access denied. You lack required permissions.";
    if (err?.status === 404) return "Requested resource was not found.";
    if (err?.status === 422) return "Validation failed. Check your request data.";
    if (err?.status === 500) return "Server error occurred. Please try again later.";
    return (
      err?.response?.data?.message ||
      err?.response?.data?.error ||
      err?.message ||
      "An unexpected error occurred while processing purchases."
    );
  }, []);

  const fetchAllData = useCallback(async () => {
    try {
      if (isMountedRef.current) {
        setLoading(true);
        setError(null);
      }

      const [purchasesRes, analyticsRes, suppliersRes, productsRes] =
        await Promise.all([
          purchaseService.getPurchases(),
          purchaseService.getPurchaseAnalytics(),
          purchaseService.getSuppliers(),
          purchaseService.getProducts(),
        ]);

      if (!isMountedRef.current) return;

      const purchaseData =
        purchasesRes?.data?.purchases ||
        purchasesRes?.data?.items ||
        purchasesRes?.data ||
        purchasesRes?.purchases ||
        purchasesRes ||
        [];
      setPurchases(Array.isArray(purchaseData) ? purchaseData : []);

      const analyticsData =
        analyticsRes?.data?.analytics ||
        analyticsRes?.data ||
        analyticsRes ||
        {};
      setAnalytics(
        typeof analyticsData === "object" && analyticsData !== null
          ? analyticsData
          : {}
      );

      const supplierData =
        suppliersRes?.data?.suppliers ||
        suppliersRes?.data?.items ||
        suppliersRes?.data ||
        suppliersRes?.suppliers ||
        suppliersRes ||
        [];
      setSuppliers(Array.isArray(supplierData) ? supplierData : []);

      const productData =
        productsRes?.data?.products ||
        productsRes?.data?.items ||
        productsRes?.data ||
        productsRes?.products ||
        productsRes ||
        [];
      setProducts(Array.isArray(productData) ? productData : []);
    } catch (err) {
      console.error("usePurchases Fetch Error:", err);
      if (isMountedRef.current) {
        setError(parseErrorMessage(err));
      }
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  }, [parseErrorMessage]);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  const filteredPurchases = useMemo(() => {
    let data = [...purchases];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();

      data = data.filter((purchase) => {
        const poNumber = String(
          purchase?.purchaseOrderNumber || purchase?.poNumber || ""
        ).toLowerCase();
        const supplierName = String(
          purchase?.supplierId?.name ||
            purchase?.supplierId?.supplierName ||
            purchase?.supplier?.name ||
            purchase?.supplier?.supplierName ||
            ""
        ).toLowerCase();

        return poNumber.includes(query) || supplierName.includes(query);
      });
    }

    if (selectedSupplier) {
      data = data.filter((purchase) => {
        const supplierId = String(
          purchase?.supplierId?._id ||
            purchase?.supplierId?.id ||
            purchase?.supplierId ||
            purchase?.supplier?._id ||
            purchase?.supplier?.id ||
            ""
        );
        return supplierId === String(selectedSupplier);
      });
    }

    if (selectedStatus && selectedStatus !== "ALL") {
      data = data.filter(
        (purchase) =>
          String(purchase?.paymentStatus || "").toLowerCase() ===
          String(selectedStatus).toLowerCase()
      );
    }

    return data.sort(
      (a, b) =>
        new Date(b?.createdAt || b?.date || 0) -
        new Date(a?.createdAt || a?.date || 0)
    );
  }, [purchases, searchQuery, selectedSupplier, selectedStatus]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedSupplier, selectedStatus]);

  const totalCount = filteredPurchases.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  const paginatedPurchases = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredPurchases.slice(start, start + pageSize);
  }, [filteredPurchases, currentPage, pageSize]);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const stats = useMemo(() => {
    return {
      totalOrders: analytics?.totalOrders ?? purchases.length,
      totalCapitalSpent: Number(analytics?.totalCapitalSpent || 0),
      pendingPayments: Number(analytics?.pendingPayments || 0),
      paidOrders: Number(analytics?.paidOrders || 0),
      partialPayments: Number(analytics?.partialPayments || 0),
    };
  }, [analytics, purchases]);

  const createPurchase = useCallback(
    async (purchaseData) => {
      try {
        if (isMountedRef.current) {
          setLoading(true);
          setError(null);
        }

        const response = await purchaseService.createPurchase(purchaseData);
        await fetchAllData();
        return response?.data || response;
      } catch (err) {
        console.error("Create Purchase Error:", err);
        const msg = parseErrorMessage(err);
        if (isMountedRef.current) setError(msg);
        throw err;
      } finally {
        if (isMountedRef.current) setLoading(false);
      }
    },
    [fetchAllData, parseErrorMessage]
  );

  const updatePurchase = useCallback(
    async (id, purchaseData) => {
      try {
        if (isMountedRef.current) {
          setLoading(true);
          setError(null);
        }

        const response = await purchaseService.updatePurchase(id, purchaseData);
        await fetchAllData();
        return response?.data || response;
      } catch (err) {
        console.error("Update Purchase Error:", err);
        const msg = parseErrorMessage(err);
        if (isMountedRef.current) setError(msg);
        throw err;
      } finally {
        if (isMountedRef.current) setLoading(false);
      }
    },
    [fetchAllData, parseErrorMessage]
  );

  const deletePurchase = useCallback(
    async (id) => {
      try {
        if (isMountedRef.current) {
          setLoading(true);
          setError(null);
        }

        const response = await purchaseService.deletePurchase(id);
        await fetchAllData();
        return response?.data || response;
      } catch (err) {
        console.error("Delete Purchase Error:", err);
        const msg = parseErrorMessage(err);
        if (isMountedRef.current) setError(msg);
        throw err;
      } finally {
        if (isMountedRef.current) setLoading(false);
      }
    },
    [fetchAllData, parseErrorMessage]
  );

  const updatePaymentStatus = useCallback(
    async (id, paymentStatus) => {
      try {
        if (isMountedRef.current) {
          setLoading(true);
          setError(null);
        }

        const response = await purchaseService.updatePaymentStatus(id, paymentStatus);
        const updatedDoc = response?.data?.purchase || response?.data || response?.purchase || response;

        if (isMountedRef.current) {
          setPurchases((prevPurchases) =>
            prevPurchases.map((item) => {
              const itemId = item?._id || item?.id;
              if (String(itemId) === String(id)) {
                return {
                  ...item,
                  ...updatedDoc,
                  paymentStatus: paymentStatus,
                };
              }
              return item;
            })
          );
        }

        await fetchAllData();
        return updatedDoc;
      } catch (err) {
        console.error("Update Payment Status Error:", err);
        const msg = parseErrorMessage(err);
        if (isMountedRef.current) setError(msg);
        throw err;
      } finally {
        if (isMountedRef.current) setLoading(false);
      }
    },
    [fetchAllData, parseErrorMessage]
  );

  const filters = useMemo(
    () => ({
      searchQuery,
      selectedSupplier,
      selectedStatus,
      currentPage,
      pageSize,
    }),
    [searchQuery, selectedSupplier, selectedStatus, currentPage, pageSize]
  );

  const updateFilters = useCallback((values = {}) => {
    if (typeof values.searchQuery === "string") {
      setSearchQuery(values.searchQuery);
    }
    if (typeof values.selectedSupplier === "string") {
      setSelectedSupplier(values.selectedSupplier);
    }
    if (typeof values.selectedStatus === "string") {
      setSelectedStatus(values.selectedStatus);
    }
    if (typeof values.currentPage === "number" && values.currentPage > 0) {
      setCurrentPage(values.currentPage);
    }
    if (typeof values.pageSize === "number" && values.pageSize > 0) {
      setPageSize(values.pageSize);
    }
  }, []);

  return {
    purchases: paginatedPurchases,
    rawPurchases: purchases,
    filteredPurchases,
    products,
    suppliers,
    analytics,
    stats,

    loading,
    error,

    filters,
    updateFilters,

    currentPage,
    pageSize,
    totalPages,
    totalCount,
    setCurrentPage,
    setPageSize,

    selectedPurchase,
    setSelectedPurchase,
    isNewModalOpen,
    setIsNewModalOpen,

    createPurchase,
    updatePurchase,
    deletePurchase,
    updatePaymentStatus,
    refetch: fetchAllData,
  };
};

export default usePurchases;