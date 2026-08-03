import { useState, useEffect, useMemo, useCallback } from "react";
import {
  getInventory,
  getInventoryMovements,
  getProductStock,
  stockIn,
  stockOut,
  adjustStock,
} from "../../../routes/services/inventoryService";

/**
 * Reusable helper to safely derive the available stock count across
 * various backend schema formats.
 */
const getStock = (item) =>
  Number(
    item?.availableStock ??
      item?.currentQuantity ??
      item?.stock ??
      0
  );

export const useInventory = () => {
  /* =================================
      CORE API STATES
  ================================= */
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* =================================
      MOVEMENT HISTORY STATES
  ================================= */
  const [movements, setMovements] = useState([]);
  const [loadingMovements, setLoadingMovements] = useState(true);
  const [errorMovements, setErrorMovements] = useState(null);

  /* =================================
      FILTER & UI STATES
  ================================= */
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [stockFilter, setStockFilter] = useState("All");
  const [priceFilter, setPriceFilter] = useState("All");

  /* =================================
      DRAWER & INTERACTION STATES
  ================================= */
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState("view"); // 'view' | 'edit'

  /* =================================
      API DATA FETCHING ENGINE
  ================================= */
  const refreshInventory = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getInventory();
      setInventory(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to sync inventory data:", err);
      setError(
        err.message || "Something went wrong while fetching inventory."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshMovements = useCallback(async () => {
    setLoadingMovements(true);
    setErrorMovements(null);
    try {
      const data = await getInventoryMovements();
      setMovements(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to sync inventory movements history:", err);
      setErrorMovements(
        err.message || "Something went wrong while fetching movements."
      );
    } finally {
      setLoadingMovements(false);
    }
  }, []);

  // Automatically fetch inventory metadata and movements ledger on component mount
  useEffect(() => {
    refreshInventory();
    refreshMovements();
  }, [refreshInventory, refreshMovements]);

  /* =================================
      INVENTORY STATISTICS ENGINE
  ================================= */
  const stats = useMemo(() => {
    const totalItems = inventory.length;

    const inStock = inventory.filter(
      (item) => getStock(item) > 5
    ).length;

    const lowStock = inventory.filter((item) => {
      const stock = getStock(item);
      return stock > 0 && stock <= 5;
    }).length;

    const outOfStock = inventory.filter(
      (item) => getStock(item) === 0
    ).length;

    const totalValue = inventory.reduce((acc, item) => {
      // Use inventoryValue provided directly from the API if available,
      // otherwise fallback to calculating price x stock
      if (item.inventoryValue !== undefined && item.inventoryValue !== null) {
        return acc + Number(item.inventoryValue || 0);
      }
      const price = Number(item.sellingPrice || item.price || 0);
      const stock = getStock(item);
      return acc + price * stock;
    }, 0);

    return { totalItems, inStock, lowStock, outOfStock, totalValue };
  }, [inventory]);

  /* =================================
      FILTERING ENGINE
  ================================= */
  const filteredProducts = useMemo(() => {
    return inventory.filter((item) => {
      // 1. Search Query Filter (Matches Name or SKU safely)
      const matchesSearch =
        !search ||
        item.name?.toLowerCase().includes(search.toLowerCase()) ||
        item.sku?.toLowerCase().includes(search.toLowerCase());

      // 2. Category Filter
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;

      // 3. Status Filter
      const matchesStatus =
        selectedStatus === "All" || item.status === selectedStatus;

      // 4. Stock Level Filter using getStock helper
      const stockCount = getStock(item);
      let matchesStock = true;
      if (stockFilter === "In Stock") matchesStock = stockCount > 5;
      else if (stockFilter === "Low Stock")
        matchesStock = stockCount > 0 && stockCount <= 5;
      else if (stockFilter === "Out of Stock")
        matchesStock = stockCount === 0;

      // 5. Price Filter Tier Parsing
      let matchesPrice = true;
      const price = Number(item.sellingPrice || item.price || 0);
      if (priceFilter === "Under $50") matchesPrice = price < 50;
      else if (priceFilter === "$50 to $200")
        matchesPrice = price >= 50 && price <= 200;
      else if (priceFilter === "Over $200") matchesPrice = price > 200;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus &&
        matchesStock &&
        matchesPrice
      );
    });
  }, [
    inventory,
    search,
    selectedCategory,
    selectedStatus,
    stockFilter,
    priceFilter,
  ]);

  /* =================================
      INTERACTION HANDLERS
  ================================= */
  const handleOpenDetails = useCallback((product) => {
    setDrawerMode("view");
    setSelectedProduct(product);
    setIsDrawerOpen(true);
  }, []);

  const handleOpenEdit = useCallback((product) => {
    setDrawerMode("edit");
    setSelectedProduct(product);
    setIsDrawerOpen(true);
  }, []);

  const handleCloseDetails = useCallback(() => {
    setIsDrawerOpen(false);
    setSelectedProduct(null);
  }, []);

  const handleDeleteProduct = useCallback(
    async (productId) => {
      try {
        console.log(`Dispatched deletion request for product: ${productId}`);
        await refreshInventory();
      } catch (err) {
        console.error("Failed to delete product:", err);
        setError("Could not complete removal action.");
      }
    },
    [refreshInventory]
  );

  const handleArchiveProduct = useCallback(
    async (productId) => {
      try {
        await adjustStock({
          productId,
          quantity: 0,
          type: "archive",
          notes: "Product archived through administration panel.",
        });
        await refreshInventory();
      } catch (err) {
        console.error("Failed to archive product:", err);
        setError("Could not update product status to archived.");
      }
    },
    [refreshInventory]
  );

  /* =================================
      RETURN INTERFACE
  ================================= */
  return {
    /* ASYNC STATES */
    products: inventory,
    filteredProducts,
    loading,
    error,
    refreshInventory,

    /* MOVEMENT HISTORY STATES */
    movements,
    loadingMovements,
    errorMovements,
    refreshMovements,

    /* STATS */
    totalItems: stats.totalItems,
    inStock: stats.inStock,
    lowStock: stats.lowStock,
    outOfStock: stats.outOfStock,
    totalValue: stats.totalValue,

    /* CONTROL & SEARCH CONDITIONAL STATES */
    search,
    setSearch,
    activeTab,
    setActiveTab,

    /* FILTER STATE ACCESSORS */
    selectedCategory,
    setSelectedCategory,
    selectedStatus,
    setSelectedStatus,
    stockFilter,
    setStockFilter,
    priceFilter,
    setPriceFilter,

    /* DRAWER CONFIGURATION */
    selectedProduct,
    setSelectedProduct,
    isDrawerOpen,
    setIsDrawerOpen,
    drawerMode,

    /* CALLBACK DISPATCHERS */
    handleOpenEdit,
    handleOpenDetails,
    handleCloseDetails,
    handleDeleteProduct,
    handleArchiveProduct,
  };
};

export default useInventory;