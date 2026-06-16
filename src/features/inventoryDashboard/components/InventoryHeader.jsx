import Button from "../../../components/ui/Button"

const InventoryHeader = ({
  onAddProduct,
}) => {

  return (

    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

      {/* LEFT */}
      <div>

        <h1 className="text-3xl font-bold text-slate-900">
          Inventory
        </h1>

        <p className="text-slate-500 mt-1">
          Manage and track inventory items
        </p>

      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3">

        <Button variant="outline">
          Import
        </Button>

        <Button variant="outline">
          Export
        </Button>

        <Button
          variant="primary"
          onClick={onAddProduct}
        >
          + Add New Product
        </Button>

      </div>

    </div>
  )
}

export default InventoryHeader