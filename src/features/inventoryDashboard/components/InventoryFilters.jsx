import ProductSearch
from "../../products/components/ProductSearch"

import ProductFilters
from "../../products/components/ProductFilters"

const InventoryFilters = (props) => {

  return (

    <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">

      <ProductSearch
        search={props.search}
        setSearch={props.setSearch}
      />

      <ProductFilters
        selectedCategory={props.selectedCategory}
        setSelectedCategory={props.setSelectedCategory}

        selectedStatus={props.selectedStatus}
        setSelectedStatus={props.setSelectedStatus}

        stockFilter={props.stockFilter}
        setStockFilter={props.setStockFilter}

        priceFilter={props.priceFilter}
        setPriceFilter={props.setPriceFilter}
      />

    </div>
  )
}

export default InventoryFilters