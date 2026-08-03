import React from "react";
import { Plus, Trash2 } from "lucide-react";
import ProductSelector from "./ProductSelector";

// Helper function to create a new empty row
const createEmptyItem = () => ({
  id: Date.now().toString() + Math.random().toString(36).substring(2, 8),
  productId: "",
  quantity: 1,
  costPrice: 0,
  totalPrice: 0,
});

const PurchaseItemsTable = ({
  products = [],
  items = [],
  onChange = () => {},
  errors = {},
}) => {
  // Ensure items is an array with at least one initial row
  const currentItems = Array.isArray(items) && items.length > 0 ? items : [createEmptyItem()];

  // Currency Formatter
  const formatMoney = (amount = 0) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
    }).format(Number(amount) || 0);
  };

  // Calculations for summary box
  const totalProducts = currentItems.filter((item) => item.productId).length;
  const totalQuantity = currentItems.reduce(
    (sum, item) => sum + (Number(item.quantity) || 0),
    0
  );
  const grandTotal = currentItems.reduce(
    (sum, item) => sum + (Number(item.totalPrice) || 0),
    0
  );

  // Handle Product Selection (Updates row in-place without adding extra rows)
  const handleProductChange = (index, selected) => {
    const selectedId = typeof selected === "object" ? selected?._id || selected?.id : selected;
    const selectedProduct = products.find(
      (p) => String(p._id || p.id) === String(selectedId)
    );

    const updatedItems = currentItems.map((item, i) => {
      if (i !== index) return item;

      if (!selectedProduct) {
        return {
          ...item,
          productId: "",
          costPrice: 0,
          totalPrice: 0,
        };
      }

      const qty = Number(item.quantity) > 0 ? Number(item.quantity) : 1;
      const cost = Number(selectedProduct.costPrice ?? selectedProduct.purchasePrice ?? 0);

      return {
        ...item,
        productId: String(selectedProduct._id || selectedProduct.id),
        quantity: qty,
        costPrice: cost,
        totalPrice: qty * cost,
      };
    });

    onChange(updatedItems);
  };

  // Handle direct field modifications (Quantity, Cost Price)
  const handleFieldChange = (index, field, val) => {
    const updatedItems = currentItems.map((item, i) => {
      if (i !== index) return item;

      const numVal = val === "" ? "" : Math.max(0, Number(val));
      const updatedItem = {
        ...item,
        [field]: numVal,
      };

      const q = field === "quantity" ? Number(numVal) || 0 : Number(item.quantity) || 0;
      const c = field === "costPrice" ? Number(numVal) || 0 : Number(item.costPrice) || 0;

      updatedItem.totalPrice = q * c;

      return updatedItem;
    });

    onChange(updatedItems);
  };

  // Add ONE new blank row safely
  const handleAddItem = () => {
    onChange([...currentItems, createEmptyItem()]);
  };

  // Remove specific row
  const handleRemoveItem = (index) => {
    if (currentItems.length === 1) {
      onChange([createEmptyItem()]);
      return;
    }

    const updatedItems = currentItems.filter((_, i) => i !== index);
    onChange(updatedItems);
  };

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-sm border border-slate-200 space-y-6">
      {/* Table Container */}
      <div className="overflow-x-auto border border-slate-200 rounded-md bg-white">
        <table className="w-full text-left border-collapse bg-white">
          <thead>
            <tr className="bg-slate-50 text-slate-600 text-xs font-semibold uppercase tracking-wider border-b border-slate-200">
              <th className="py-3.5 px-4 text-left">Product</th>
              <th className="py-3.5 px-4 text-center w-32">Quantity</th>
              <th className="py-3.5 px-4 text-right w-44">Cost Price</th>
              <th className="py-3.5 px-4 text-right w-44">Total Price</th>
              <th className="py-3.5 px-4 text-center w-20">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white text-sm">
            {currentItems.map((item, index) => (
              <tr key={item.id || index} className="hover:bg-slate-50/50 transition-colors bg-white">
                {/* Product Selector */}
                <td className="p-3 align-top">
                  <ProductSelector
                    products={products}
                    selectedProductId={item.productId}
                    onSelect={(prod) => handleProductChange(index, prod)}
                    onChange={(prodId) => handleProductChange(index, prodId)}
                  />
                  {errors[`item_${index}_product`] && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors[`item_${index}_product`]}
                    </p>
                  )}
                </td>

                {/* Quantity Input */}
                <td className="p-3 align-top">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      handleFieldChange(index, "quantity", e.target.value)
                    }
                    className="w-full rounded border border-slate-300 bg-white px-3 py-1.5 text-center text-slate-800 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                  {errors[`item_${index}_qty`] && (
                    <p className="mt-1 text-xs text-red-600 text-center">
                      {errors[`item_${index}_qty`]}
                    </p>
                  )}
                </td>

                {/* Cost Price Input */}
                <td className="p-3 align-top">
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.costPrice}
                    onChange={(e) =>
                      handleFieldChange(index, "costPrice", e.target.value)
                    }
                    className="w-full rounded border border-slate-300 bg-white px-3 py-1.5 text-right text-slate-800 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                  {errors[`item_${index}_cost`] && (
                    <p className="mt-1 text-xs text-red-600 text-right">
                      {errors[`item_${index}_cost`]}
                    </p>
                  )}
                </td>

                {/* Calculated Total Price */}
                <td className="p-3 align-top text-right font-medium text-slate-900 pt-4">
                  {formatMoney(item.totalPrice)}
                </td>

                {/* Delete Button */}
                <td className="p-3 align-top text-center pt-3.5">
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(index)}
                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-slate-100 rounded transition"
                    title="Delete row"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Global Errors */}
      {errors.general && (
        <div className="p-3 rounded border border-red-200 bg-red-50 text-xs text-red-600">
          {errors.general}
        </div>
      )}

      {/* Bottom Controls & Summary */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-top gap-6 bg-white">
        <button
          type="button"
          onClick={handleAddItem}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
        >
          <Plus size={16} />
          Add Item
        </button>

        {/* ERP Purchase Summary Box */}
        <div className="w-full md:w-80 border border-slate-200 rounded p-4 bg-white space-y-2">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide border-b border-slate-200 pb-2">
            Order Summary
          </div>
          <div className="flex justify-between text-sm text-slate-600 pt-1">
            <span>Distinct Products</span>
            <span className="font-medium text-slate-900">{totalProducts}</span>
          </div>
          <div className="flex justify-between text-sm text-slate-600">
            <span>Total Quantity</span>
            <span className="font-medium text-slate-900">{totalQuantity}</span>
          </div>
          <div className="border-t border-slate-200 pt-2 flex justify-between text-base font-semibold text-slate-900">
            <span>Grand Total</span>
            <span className="text-blue-600">{formatMoney(grandTotal)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseItemsTable;