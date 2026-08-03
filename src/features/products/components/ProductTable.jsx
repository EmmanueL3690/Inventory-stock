import React, { useState, useMemo } from "react";

import { Card, CardContent } from "../../../components/ui/Card";
import { Table } from "../../../components/ui/Table";
import Pagination from "../../../components/ui/Pagination";

import ProductRow from "./ProductRow";

// Helper functions to safely extract and calculate stock properties
const getAvailableStock = (item) =>
  Number(item?.availableStock ?? item?.currentQuantity ?? 0);

const getCurrentQuantity = (item) =>
  Number(item?.currentQuantity ?? item?.availableStock ?? 0);

const getReservedStock = (item) => Number(item?.reservedStock ?? 0);

const getInventoryValue = (item) => {
  if (item?.inventoryValue !== undefined && item?.inventoryValue !== null) {
    return Number(item.inventoryValue);
  }
  const price = Number(item?.sellingPrice || item?.price || 0);
  return price * getAvailableStock(item);
};

// Column definitions incorporating Available Stock, Reserved Stock, and Inventory Value
const DEFAULT_COLUMNS = [
  { header: "Product", accessor: "name" },
  { header: "SKU", accessor: "sku" },
  { header: "Current Qty", accessor: "currentQuantity" },
  { header: "Available Stock", accessor: "availableStock" },
  { header: "Reserved Stock", accessor: "reservedStock" },
  { header: "Inventory Value", accessor: "inventoryValue" },
  { header: "Status", accessor: "status" },
  { header: "Actions", accessor: "actions" },
];

const ProductTable = ({
  columns = DEFAULT_COLUMNS,
  data = [],
  loading = false,

  onEdit,
  onDelete,
  onArchive,
  onView,
  itemsPerPage = 10,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Pagination calculation
  const totalPages = Math.ceil((data?.length || 0) / itemsPerPage) || 1;

  const paginatedData = useMemo(() => {
    if (!data?.length) return [];
    const start = (currentPage - 1) * itemsPerPage;
    return data.slice(start, start + itemsPerPage);
  }, [data, currentPage, itemsPerPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <Card className="border-none shadow-md">
        <CardContent className="flex items-center justify-center py-20">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-slate-500 font-medium">Loading inventory...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!data?.length) {
    return (
      <Card className="border-none shadow-md">
        <CardContent className="py-20 text-center">
          <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200">
            No Products Found
          </h3>
          <p className="mt-2 text-slate-500 dark:text-slate-400 text-sm">
            There are currently no inventory products matching your criteria.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-none shadow-md">
      <CardContent className="p-0">
        <Table
          columns={columns}
          data={paginatedData}
          renderRow={(item) => {
            const availableStock = getAvailableStock(item);
            const currentQuantity = getCurrentQuantity(item);
            const reservedStock = getReservedStock(item);
            const inventoryValue = getInventoryValue(item);
            const reorderLevel = Number(item?.reorderLevel ?? 5);

            // Stock Status Logic according to your requirements
            const isOutOfStock = availableStock === 0;
            const isLowStock = !isOutOfStock && availableStock <= reorderLevel;

            let computedStatus = "In Stock";
            let statusColor =
              "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400";

            if (isOutOfStock) {
              computedStatus = "Out of Stock";
              statusColor =
                "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400";
            } else if (isLowStock) {
              computedStatus = "Low Stock";
              statusColor =
                "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400";
            }

            const processedItem = {
              ...item,
              availableStock,
              currentQuantity,
              reservedStock,
              inventoryValue,
              computedStatus,
              statusColor,
            };

            return (
              <ProductRow
                key={item?._id || item?.id}
                item={processedItem}
                onEdit={onEdit}
                onDelete={onDelete}
                onArchive={onArchive}
                onView={onView}
              />
            );
          }}
        />

        {/* Dynamic Pagination */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductTable;