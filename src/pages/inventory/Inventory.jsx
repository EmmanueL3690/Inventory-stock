import { useNavigate } from "react-router-dom"
import InventoryHeader from "../../features/inventoryDashboard/components/InventoryHeader"
import InventoryStats from "../../features/inventoryDashboard/components/InventoryStats"
import InventoryFilters from "../../features/inventoryDashboard/components/InventoryFilters"
import InventoryTable from "../../features/inventoryDashboard/components/InventoryTable"
import ProductDetailsDrawer from "../../features/products/components/ProductDetailsDrawer"

import { useInventory } from "../../features/inventoryDashboard/components/hooks/useInventory"

const Inventory = () => {

  const navigate = useNavigate()

  const {
    filteredProducts,

    totalItems,
    inStock,
    lowStock,
    outOfStock,
    totalValue,

    search,
    setSearch,

    selectedCategory,
    setSelectedCategory,

    selectedStatus,
    setSelectedStatus,

    stockFilter,
    setStockFilter,

    priceFilter,
    setPriceFilter,

    selectedProduct,
    isDrawerOpen,
    setIsDrawerOpen,

    handleDeleteProduct,
    handleArchiveProduct,
    handleOpenEdit,
    handleOpenDetails,

  } = useInventory()

  return (

    <div className="space-y-6 p-4 md:p-6">

      <InventoryHeader
        onAddProduct={() =>
          navigate("/inventory/products/add")
        }
      />

      <InventoryStats
        totalItems={totalItems}
        inStock={inStock}
        lowStock={lowStock}
        outOfStock={outOfStock}
        totalValue={totalValue}
      />

      <InventoryFilters
        search={search}
        setSearch={setSearch}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        stockFilter={stockFilter}
        setStockFilter={setStockFilter}
        priceFilter={priceFilter}
        setPriceFilter={setPriceFilter}
      />

      <InventoryTable
        data={filteredProducts}
        onEdit={handleOpenEdit}
        onDelete={handleDeleteProduct}
        onArchive={handleArchiveProduct}
        onView={handleOpenDetails}
      />

      <ProductDetailsDrawer
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        product={selectedProduct}
      />

    </div>

  )
}

export default Inventory