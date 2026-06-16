const ProductFilters = ({

  selectedCategory,
  setSelectedCategory,

  selectedStatus,
  setSelectedStatus,

  stockFilter,
  setStockFilter,

  priceFilter,
  setPriceFilter,

}) => {

  return (

    <div className="flex flex-col gap-4 lg:flex-row lg:items-center">

      {/* CATEGORY FILTER */}

      <select
        value={selectedCategory}
        onChange={(e) =>
          setSelectedCategory(e.target.value)
        }
        className="
          rounded-xl
          border
          border-slate-200
          bg-white
          px-4
          py-3
          text-sm
          outline-none
          focus:border-blue-500
          focus:ring-2
          focus:ring-blue-100
        "
      >

        <option value="All">
          All Categories
        </option>

        <option value="Dairy">
          Dairy
        </option>

        <option value="Bakery">
          Bakery
        </option>

        <option value="Groceries">
          Groceries
        </option>

        <option value="Grains">
          Grains
        </option>

      </select>

      {/* STATUS FILTER */}

      <select
        value={selectedStatus}
        onChange={(e) =>
          setSelectedStatus(e.target.value)
        }
        className="
          rounded-xl
          border
          border-slate-200
          bg-white
          px-4
          py-3
          text-sm
          outline-none
          focus:border-blue-500
          focus:ring-2
          focus:ring-blue-100
        "
      >

        <option value="All">
          All Status
        </option>

        <option value="In Stock">
          In Stock
        </option>

        <option value="Low Stock">
          Low Stock
        </option>

        <option value="Out of Stock">
          Out of Stock
        </option>

        <option value="Archived">
          Archived
        </option>

      </select>

      {/* STOCK FILTER */}

      <select
        value={stockFilter}
        onChange={(e) =>
          setStockFilter(e.target.value)
        }
        className="
          rounded-xl
          border
          border-slate-200
          bg-white
          px-4
          py-3
          text-sm
          outline-none
          focus:border-blue-500
          focus:ring-2
          focus:ring-blue-100
        "
      >

        <option value="All">
          All Stock
        </option>

        <option value="healthy">
          Healthy Stock
        </option>

        <option value="low">
          Low Stock
        </option>

        <option value="out">
          Out of Stock
        </option>

      </select>

      {/* PRICE FILTER */}

      <select
        value={priceFilter}
        onChange={(e) =>
          setPriceFilter(e.target.value)
        }
        className="
          rounded-xl
          border
          border-slate-200
          bg-white
          px-4
          py-3
          text-sm
          outline-none
          focus:border-blue-500
          focus:ring-2
          focus:ring-blue-100
        "
      >

        <option value="All">
          All Prices
        </option>

        <option value="low">
          ₦ Low Price
        </option>

        <option value="medium">
          ₦ Medium Price
        </option>

        <option value="high">
          ₦ High Price
        </option>

      </select>

    </div>
  )
}

export default ProductFilters