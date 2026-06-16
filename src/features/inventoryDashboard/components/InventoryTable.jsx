import ProductTable
from "../../products/components/ProductTable"

const InventoryTable = ({
  data,
  onEdit,
  onDelete,
  onArchive,
  onView,
}) => {

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

  return (

    <ProductTable
      columns={columns}
      data={data}

      onEdit={onEdit}
      onDelete={onDelete}
      onArchive={onArchive}
      onView={onView}
    />

  )
}

export default InventoryTable