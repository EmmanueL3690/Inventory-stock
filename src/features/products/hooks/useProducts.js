import { useState, useEffect, useCallback, useMemo } from "react";
import { productService } from "../../../routes/services/productService";

/**
 * Normalizes raw API response objects into a consistent product structure
 * to guarantee child UI components receive reliable fields.
 */
const normalizeProduct = (item = {}) => {
  const availableStock = Number(
    item?.availableStock ?? item?.currentQuantity ?? item?.stock ?? 0
  );
  const currentQuantity = Number(
    item?.currentQuantity ?? item?.availableStock ?? item?.stock ?? 0
  );
  const reservedStock = Number(item?.reservedStock ?? 0);
  const sellingPrice = Number(item?.sellingPrice ?? item?.price ?? 0);
  const reorderLevel = Number(item?.reorderLevel ?? 5);

  const inventoryValue =
    item?.inventoryValue !== undefined && item?.inventoryValue !== null
      ? Number(item.inventoryValue)
      : availableStock * sellingPrice;

  return {
    id: item?._id || item?.id || "",
    _id: item?._id || item?.id || "",
    name: item?.name || item?.title || "Unnamed Product",
    sku: item?.sku || "N/A",
    category: item?.category || "Uncategorized",
    status: item?.status || "Active",
    reorderLevel,
    sellingPrice,
    price: sellingPrice,
    currentQuantity,
    availableStock,
    reservedStock,
    stock: availableStock,
    inventoryValue,
    barcode: item?.barcode || item?.upc || item?.code || "",
    description: item?.description || "",
    unit: item?.unit || "PCS",
    raw: item,
  };
};

export const useProducts = () => {
  /* ================================
      PRIMARY DATA STATES
  ================================= */
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* ================================
      SEARCH & TABS
  ================================= */
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("All Products");

  /* ================================
      FILTERS
  ================================= */
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [stockFilter, setStockFilter] = useState("All");
  const [priceFilter, setPriceFilter] = useState("All");

  /* ================================
      API FETCHERS
  ================================= */
  const refreshProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await productService.getProducts();
      // Handle response structures (array or wrapped object e.g., response.data)
      const rawData = Array.isArray(response)
        ? response
        : Array.isArray(response?.data)
        ? response.data
        : [];

      const normalizedData = rawData.map(normalizeProduct);
      setProducts(normalizedData);
    } catch (err) {
      console.error("Failed to fetch products:", err);
      setError(err?.message || "Failed to fetch products. Please try again.");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshProducts();
  }, [refreshProducts]);

  /* ================================
      FILTERING LOGIC
  ================================= */
  const filteredProducts = useMemo(() => {
    const list = Array.isArray(products) ? products : [];

    return list.filter((product) => {
      // 1. Search Query Match
      const matchesSearch =
        !search.trim() ||
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.sku.toLowerCase().includes(search.toLowerCase());

      // 2. Tab Filter Match
      let matchesTab = true;
      const stockVal = product.availableStock;
      const reorderLevel = product.reorderLevel;

      if (activeTab === "In Stock") {
        matchesTab = stockVal > reorderLevel;
      } else if (activeTab === "Low Stock") {
        matchesTab = stockVal > 0 && stockVal <= reorderLevel;
      } else if (activeTab === "Out of Stock") {
        matchesTab = stockVal === 0;
      } else if (activeTab === "Archived") {
        matchesTab = product.status === "Archived";
      }

      // 3. Category Match
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;

      // 4. Status Match
      const matchesStatus =
        selectedStatus === "All" || product.status === selectedStatus;

      // 5. Explicit Stock Filter Match
      let matchesStockFilter = true;
      if (stockFilter === "In Stock") {
        matchesStockFilter = stockVal > 0;
      } else if (stockFilter === "Low Stock") {
        matchesStockFilter = stockVal > 0 && stockVal <= reorderLevel;
      } else if (stockFilter === "Out of Stock") {
        matchesStockFilter = stockVal === 0;
      }

      // 6. Explicit Price Range Filter Match
      let matchesPriceFilter = true;
      const price = product.sellingPrice;
      if (priceFilter === "Under 1000") {
        matchesPriceFilter = price < 1000;
      } else if (priceFilter === "1000-5000") {
        matchesPriceFilter = price >= 1000 && price <= 5000;
      } else if (priceFilter === "Above 5000") {
        matchesPriceFilter = price > 5000;
      }

      return (
        matchesSearch &&
        matchesTab &&
        matchesCategory &&
        matchesStatus &&
        matchesStockFilter &&
        matchesPriceFilter
      );
    });
  }, [
    products,
    search,
    activeTab,
    selectedCategory,
    selectedStatus,
    stockFilter,
    priceFilter,
  ]);

  /* ================================
      ACTIONS
  ================================= */
  const handleDeleteProduct = useCallback(
    async (id) => {
      try {
        await productService.deleteProduct(id);
        await refreshProducts();
      } catch (err) {
        console.error("Failed to delete product:", err);
        alert(err?.message || "Failed to delete product. Please try again.");
      }
    },
    [refreshProducts]
  );

  const handleArchiveProduct = useCallback((id) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id || product._id === id
          ? { ...product, status: "Archived" }
          : product
      )
    );
  }, []);

  /* ================================
      RETURN HOOK INTERFACE
  ================================= */
  return {
    products: Array.isArray(products) ? products : [],
    filteredProducts: Array.isArray(filteredProducts) ? filteredProducts : [],
    loading,
    error,

    search,
    setSearch,

    activeTab,
    setActiveTab,

    selectedCategory,
    setSelectedCategory,

    selectedStatus,
    setSelectedStatus,

    stockFilter,
    setStockFilter,

    priceFilter,
    setPriceFilter,

    handleDeleteProduct,
    handleArchiveProduct,
    refreshProducts,
  };
};

export default useProducts;