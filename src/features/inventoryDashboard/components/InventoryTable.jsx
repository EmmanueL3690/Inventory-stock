import React from "react";
import ProductTable from "../../products/components/ProductTable";

const InventoryTable = ({
  data = [],
  loading = false,
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
  ];

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-10 text-center">
        <div className="w-10 h-10 mx-auto border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>

        <p className="mt-4 text-slate-500">
          Loading inventory...
        </p>
      </div>
    );
  }

  if (!data?.length) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-10 text-center">
        <h3 className="text-lg font-semibold text-slate-700">
          No Inventory Found
        </h3>

        <p className="mt-2 text-slate-500">
          There are no inventory items available.
        </p>
      </div>
    );
  }

  return (
    <ProductTable
      columns={columns}
      data={data}
      onEdit={onEdit}
      onDelete={onDelete}
      onArchive={onArchive}
      onView={onView}
    />
  );
};

export default InventoryTable;