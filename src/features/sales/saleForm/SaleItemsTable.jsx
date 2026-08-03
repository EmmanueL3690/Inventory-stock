import React from "react";

export const SaleItemsTable = ({
  items = [],
  setItems,
  availableProducts = [],
  loading = false,
  errors = {},
}) => {
  // Add a new blank row immutably
  const handleAddItem = () => {
    setItems((prevItems) => [
      ...prevItems,
      { productId: "", quantity: 1, selectedProduct: null },
    ]);
  };

  // Remove a specific row immutably
  const handleRemoveItem = (index) => {
    if (items.length === 1) return; // Prevent removing the last remaining row
    setItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  // Handle product selection & auto-populate details immutably
  const handleProductChange = (index, selectedId) => {
    // Find product details from available list
    const product = availableProducts.find(
      (p) => String(p.id || p._id) === String(selectedId)
    );

    setItems((prevItems) =>
      prevItems.map((item, i) => {
        if (i === index) {
          return {
            ...item,
            productId: selectedId,
            selectedProduct: product || null,
          };
        }
        return item;
      })
    );
  };

  // Handle quantity input change immutably
  const handleQuantityChange = (index, rawQty) => {
    const parsedQty = parseInt(rawQty, 10);
    const validQty = isNaN(parsedQty) ? "" : parsedQty;

    setItems((prevItems) =>
      prevItems.map((item, i) => {
        if (i === index) {
          return {
            ...item,
            quantity: validQty,
          };
        }
        return item;
      })
    );
  };

  // Helper to extract product IDs already selected in other rows
  const getSelectedProductIds = (currentRowIndex) => {
    return items
      .filter((_, idx) => idx !== currentRowIndex)
      .map((item) => String(item.productId))
      .filter(Boolean);
  };

  return (
    <div className="border-t border-slate-100 dark:border-slate-800 pt-6">
      {/* Header & Add Button */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
          Sale Items
        </h3>
        <button
          type="button"
          onClick={handleAddItem}
          disabled={loading}
          className="px-3 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all flex items-center gap-1 disabled:opacity-50"
        >
          <span>+ Add Item</span>
        </button>
      </div>

      {errors.generalItems && (
        <p className="text-xs text-rose-500 mb-2">{errors.generalItems}</p>
      )}

      {/* Table Layout */}
      <div className="overflow-x-auto border border-slate-100 dark:border-slate-800 rounded-xl">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 text-slate-400 text-xs uppercase font-bold">
            <tr>
              <th className="p-3">Product</th>
              <th className="p-3">SKU</th>
              <th className="p-3">Stock</th>
              <th className="p-3">Unit Price (Preview)</th>
              <th className="p-3 w-24">Qty</th>
              <th className="p-3">Total (Preview)</th>
              <th className="p-3 text-right">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {items.map((item, idx) => {
              const selectedIdsInOtherRows = getSelectedProductIds(idx);
              const price =
                item.selectedProduct?.sellingPrice ||
                item.selectedProduct?.price ||
                0;
              const stock =
                item.selectedProduct?.stock ??
                item.selectedProduct?.quantity ??
                "-";
              const sku = item.selectedProduct?.sku || "-";
              
              // Automatically calculate row total preview
              const rowTotalPreview = price * (Number(item.quantity) || 0);

              return (
                <tr
                  key={idx}
                  className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30"
                >
                  {/* Product Dropdown */}
                  <td className="p-3">
                    <select
                      value={item.productId}
                      onChange={(e) => handleProductChange(idx, e.target.value)}
                      disabled={loading}
                      className={`w-full p-2 text-xs rounded-lg border bg-white dark:bg-slate-900 ${
                        errors[`item_${idx}`]
                          ? "border-rose-500"
                          : "border-slate-200 dark:border-slate-700"
                      }`}
                    >
                      <option value="">Select Product...</option>
                      {availableProducts.map((p) => {
                        const pId = String(p.id || p._id);
                        const isAlreadySelected = selectedIdsInOtherRows.includes(pId);

                        return (
                          <option
                            key={pId}
                            value={pId}
                            disabled={isAlreadySelected}
                          >
                            {p.name || p.title} {isAlreadySelected ? "(Added)" : ""}
                          </option>
                        );
                      })}
                    </select>
                    {errors[`item_${idx}`] && (
                      <p className="text-[10px] text-rose-500 mt-0.5">
                        {errors[`item_${idx}`]}
                      </p>
                    )}
                  </td>

                  {/* SKU */}
                  <td className="p-3 text-xs text-slate-500 font-mono">
                    {sku}
                  </td>

                  {/* Stock */}
                  <td className="p-3 text-xs text-slate-600 dark:text-slate-400">
                    {stock}
                  </td>

                  {/* Unit Price Preview */}
                  <td className="p-3 text-xs font-semibold text-slate-700 dark:text-slate-300">
                    ${Number(price).toFixed(2)}
                  </td>

                  {/* Quantity Input */}
                  <td className="p-3">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(idx, e.target.value)}
                      disabled={loading}
                      className={`w-20 p-2 text-xs rounded-lg border bg-white dark:bg-slate-900 ${
                        errors[`qty_${idx}`]
                          ? "border-rose-500"
                          : "border-slate-200 dark:border-slate-700"
                      }`}
                    />
                    {errors[`qty_${idx}`] && (
                      <p className="text-[10px] text-rose-500 mt-0.5">
                        {errors[`qty_${idx}`]}
                      </p>
                    )}
                  </td>

                  {/* Row Total Preview */}
                  <td className="p-3 text-xs font-bold text-slate-900 dark:text-slate-100">
                    ${rowTotalPreview.toFixed(2)}
                  </td>

                  {/* Delete Action */}
                  <td className="p-3 text-right">
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(idx)}
                      disabled={loading || items.length === 1}
                      className="text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline disabled:opacity-30 disabled:no-underline"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SaleItemsTable;