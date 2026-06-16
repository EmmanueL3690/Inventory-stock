import { useProducts } from "../../../products/hooks/useProducts"

export const useInventory = () => {

  /* =================================
      PRODUCT ENGINE
  ================================= */

  const productEngine = useProducts()

  const {
    products = [],
    filteredProducts,
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

    selectedProduct,
    setSelectedProduct,

    isDrawerOpen,
    setIsDrawerOpen,

    handleOpenEdit,
    handleOpenDetails,
    handleDeleteProduct,
    handleArchiveProduct,

  } = productEngine

  /* =================================
      INVENTORY STATS
  ================================= */

  const totalItems = products.length

  const inStock = products.filter(
    (item) => Number(item.stock || 0) > 5
  ).length

  const lowStock = products.filter(
    (item) => {
      const stock = Number(item.stock || 0)

      return stock > 0 && stock <= 5
    }
  ).length

  const outOfStock = products.filter(
    (item) => Number(item.stock || 0) === 0
  ).length

  const totalValue = products.reduce(
    (acc, item) => {

      const price = Number(item.sellingPrice || 0)
      const stock = Number(item.stock || 0)

      return acc + (price * stock)

    },
    0
  )

  /* =================================
      RETURN
  ================================= */

  return {

    /* DATA */
    products,
    filteredProducts,

    /* STATS */
    totalItems,
    inStock,
    lowStock,
    outOfStock,
    totalValue,

    /* SEARCH */
    search,
    setSearch,

    /* TABS */
    activeTab,
    setActiveTab,

    /* FILTERS */
    selectedCategory,
    setSelectedCategory,

    selectedStatus,
    setSelectedStatus,

    stockFilter,
    setStockFilter,

    priceFilter,
    setPriceFilter,

    /* PRODUCT */
    selectedProduct,
    setSelectedProduct,

    /* DRAWER */
    isDrawerOpen,
    setIsDrawerOpen,

    /* ACTIONS */
    handleOpenEdit,
    handleOpenDetails,
    handleDeleteProduct,
    handleArchiveProduct,
  }
}