import { useNavigate } from "react-router-dom"

import ProductSearch from "../../features/products/components/ProductSearch"
import ProductTabs from "../../features/products/components/ProductTabs"
import ProductFilters from "../../features/products/components/ProductFilters"
import ProductTable from "../../features/products/components/ProductTable"
import ProductDetailsDrawer from "../../features/products/components/ProductDetailsDrawer"

import Breadcrumb from "../../components/ui/Breadcrumb"
import PageHeader from "../../components/ui/PageHeader"

import { useProducts } from "../../features/products/hooks/useProducts"

const Products = () => {

  const navigate = useNavigate()

  /* ---------------- PRODUCT ENGINE ---------------- */

  const {

    /* DATA */
    filteredProducts,

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

    /* SELECTED PRODUCT */
    selectedProduct,

    /* DETAILS DRAWER */
    isDrawerOpen,
    setIsDrawerOpen,

    /* ACTIONS */
    handleDeleteProduct,
    handleArchiveProduct,
    handleOpenDetails,

  } = useProducts()


  /* ---------------- TABLE COLUMNS ---------------- */

  const columns = [
    "Product",
    "SKU",
    "Category",
    "Cost Price",
    "Selling Price",
    "Stock",
    "Status",
    "Actions",
  ]


  /* ---------------- PRODUCT TABS ---------------- */

  const tabs = [
    "All Products",
    "In Stock",
    "Low Stock",
    "Out of Stock",
    "Archived",
  ]


  /* ---------------- DEBUG ---------------- */

  console.log(
    "Selected Product:",
    selectedProduct
  )

  console.log(
    "Drawer State:",
    isDrawerOpen
  )


  return (

    <div className="space-y-6 p-4 md:p-6 animate-in fade-in duration-300">

      {/* ---------------- BREADCRUMB ---------------- */}

      <Breadcrumb
        items={["Inventory", "Products"]}
      />


      {/* ---------------- PAGE HEADER ---------------- */}

      <PageHeader
        title="Products"
        subtitle="Manage inventory products, pricing, stock levels, and organization."
        buttonText="Add Product"
        onButtonClick={() =>
          navigate("/inventory/products/add")
        }
      />


      {/* ---------------- SEARCH + FILTERS ---------------- */}

      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">

        <ProductSearch
          search={search}
          setSearch={setSearch}
        />

        <ProductFilters
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          stockFilter={stockFilter}
          setStockFilter={setStockFilter}
          priceFilter={priceFilter}
          setPriceFilter={setPriceFilter}
        />

      </div>


      {/* ---------------- PRODUCT TABS ---------------- */}

      <ProductTabs
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />


      {/* ---------------- PRODUCT TABLE ---------------- */}

      <ProductTable
        columns={columns}
        data={filteredProducts}
        onDelete={handleDeleteProduct}
        onArchive={handleArchiveProduct}
        onView={handleOpenDetails}
      />


      {/* ---------------- PRODUCT DETAILS ---------------- */}

      <ProductDetailsDrawer
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        product={selectedProduct}
      />

    </div>

  )
}

export default Products