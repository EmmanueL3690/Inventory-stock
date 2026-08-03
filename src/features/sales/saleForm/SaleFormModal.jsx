import React, { useState, useEffect, useMemo } from "react";
import salesService from "../services/salesService";
import { productService } from "../../../routes/services/productService";
import ProductSelector from "./ProductSelector";

export const CreateSaleModal = ({
  isOpen,
  onClose,
  onSaleCreated,
  toast, // Optional toast notification function
}) => {
  // Products Async State
  const [products, setProducts] = useState([]);
  const [fetchingProducts, setFetchingProducts] = useState(false);

  // Form State
  const [customerName, setCustomerName] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [paymentStatus, setPaymentStatus] = useState("paid");
  const [notes, setNotes] = useState("");
  const [items, setItems] = useState([
    { productId: "", quantity: 1, selectedProduct: null },
  ]);

  // UI / Async State
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  // Collect list of already selected product IDs for filtering inside ProductSelector
  const alreadySelectedIds = useMemo(() => {
    return items
      .map((item) => item.productId)
      .filter((id) => id !== "" && id !== null && id !== undefined);
  }, [items]);

  // Fetch available products when modal opens
  useEffect(() => {
    if (isOpen) {
      resetForm();
      loadProducts();
    }
  }, [isOpen]);

  const loadProducts = async () => {
    setFetchingProducts(true);
    try {
      const response = await productService.getProducts();
      const productList = Array.isArray(response)
        ? response
        : response?.products || response?.data || [];
      setProducts(productList);
    } catch (err) {
      console.error("Failed to load products:", err);
      setServerError("Failed to fetch available products. Please try again.");
    } fontFinally: {
      setFetchingProducts(false);
    }
  };

  const resetForm = () => {
    setCustomerName("");
    setPaymentMethod("cash");
    setPaymentStatus("paid");
    setNotes("");
    setItems([{ productId: "", quantity: 1, selectedProduct: null }]);
    setErrors({});
    setServerError("");
  };

  if (!isOpen) return null;

  // Row Management
  const handleAddItem = () => {
    setItems((prev) => [
      ...prev,
      { productId: "", quantity: 1, selectedProduct: null },
    ]);
  };

  const handleRemoveItem = (index) => {
    if (items.length === 1) return; // Keep at least one item row
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleProductChange = (index, productId) => {
    const selected = products.find(
      (p) => String(p.id || p._id) === String(productId)
    );
    const updatedItems = [...items];
    updatedItems[index] = {
      ...updatedItems[index],
      productId,
      selectedProduct: selected || null,
    };
    setItems(updatedItems);

    // Clear item error if resolved
    if (errors[`item_${index}`]) {
      setErrors((prev) => ({ ...prev, [`item_${index}`]: null }));
    }
  };

  const handleQuantityChange = (index, qty) => {
    const parsedQty = parseInt(qty, 10);
    const updatedItems = [...items];
    updatedItems[index].quantity = isNaN(parsedQty) ? "" : parsedQty;
    setItems(updatedItems);

    // Clear quantity error if resolved
    if (errors[`qty_${index}`]) {
      setErrors((prev) => ({ ...prev, [`qty_${index}`]: null }));
    }
  };

  // Preview total (Calculated ONLY on frontend for preview display)
  const previewGrandTotal = items.reduce((sum, item) => {
    const price =
      item.selectedProduct?.sellingPrice ?? item.selectedProduct?.price ?? 0;
    const qty = Number(item.quantity) || 0;
    return sum + price * qty;
  }, 0);

  // Form Validation
  const validateForm = () => {
    const newErrors = {};

    if (!customerName.trim()) {
      newErrors.customerName = "Customer Name is required.";
    }

    if (!paymentMethod) {
      newErrors.paymentMethod = "Payment method is required.";
    }

    if (!paymentStatus) {
      newErrors.paymentStatus = "Payment status is required.";
    }

    if (!items || items.length === 0) {
      newErrors.generalItems = "At least one product must be added.";
    }

    const selectedProductIds = new Set();

    items.forEach((item, idx) => {
      if (!item.productId) {
        newErrors[`item_${idx}`] = "Please select a product.";
      } else {
        // Prevent Duplicate Products Selection
        if (selectedProductIds.has(item.productId)) {
          newErrors[`item_${idx}`] = "This product is already selected.";
        }
        selectedProductIds.add(item.productId);
      }

      const qty = Number(item.quantity);
      if (!item.quantity || qty <= 0) {
        newErrors[`qty_${idx}`] = "Quantity must be > 0.";
      } else if (item.selectedProduct) {
        // Quantity stock validation
        const availableStock =
          item.selectedProduct.stock ??
          item.selectedProduct.quantity ??
          item.selectedProduct.currentQuantity ??
          0;

        if (qty > availableStock) {
          newErrors[`qty_${idx}`] = `Exceeds stock (${availableStock} available).`;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    if (!validateForm()) return;

    setLoading(true);

    // EXACT BACKEND PAYLOAD (Sends strictly required fields only)
    const payload = {
      customerName: customerName.trim(),
      paymentMethod,
      paymentStatus,
      notes: notes.trim(),
      items: items.map((item) => ({
        productId: item.productId,
        quantity: Number(item.quantity),
      })),
    };

    try {
      await salesService.createSale(payload);

      if (toast && typeof toast.success === "function") {
        toast.success("Sale created successfully!");
      }

      // Callback to parent to refresh sales table
      if (typeof onSaleCreated === "function") {
        onSaleCreated();
      }

      resetForm();
      onClose();
    } catch (err) {
      console.error("Failed to save sale:", err);

      // Error Response handling (400, 401, 403, 404, 500, Network Error)
      if (err.response) {
        const status = err.response.status;
        const message = err.response.data?.message;

        switch (status) {
          case 400:
            setServerError(
              message || "Invalid input data. Please check your entries."
            );
            break;
          case 401:
            setServerError("Unauthorized. Session expired, please login again.");
            break;
          case 403:
            setServerError(
              "Forbidden. You do not have permission to perform this action."
            );
            break;
          case 404:
            setServerError(message || "Requested resource not found.");
            break;
          case 500:
            setServerError("Internal server error. Please try again later.");
            break;
          default:
            setServerError(message || `An error occurred (${status}).`);
        }
      } else if (err.request) {
        setServerError(
          "Network error. Unable to reach server. Please check your internet connection."
        );
      } else {
        setServerError(err.message || "An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden transition-all">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
            Create New Sale
          </h2>
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Form Body */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto p-6 space-y-6"
        >
          {/* Server Error Banner */}
          {serverError && (
            <div className="p-4 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-xl text-xs font-semibold text-rose-700 dark:text-rose-400 flex items-center gap-2">
              <svg
                className="w-4 h-4 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{serverError}</span>
            </div>
          )}

          {/* Customer & Payment Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Customer Name */}
            <div className="md:col-span-3">
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">
                Customer Name *
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => {
                  setCustomerName(e.target.value);
                  if (errors.customerName)
                    setErrors((prev) => ({ ...prev, customerName: null }));
                }}
                placeholder="e.g. Jane Doe"
                disabled={loading}
                className={`w-full px-4 py-2.5 rounded-xl border text-sm font-medium bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 transition-all ${
                  errors.customerName
                    ? "border-rose-500 focus:ring-rose-200"
                    : "border-slate-200 dark:border-slate-700 focus:ring-slate-200"
                }`}
              />
              {errors.customerName && (
                <p className="text-xs text-rose-500 mt-1">
                  {errors.customerName}
                </p>
              )}
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">
                Payment Method *
              </label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                disabled={loading}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-medium bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-200 transition-all capitalize"
              >
                <option value="cash">cash</option>
                <option value="card">card</option>
                <option value="transfer">transfer</option>
              </select>
              {errors.paymentMethod && (
                <p className="text-xs text-rose-500 mt-1">
                  {errors.paymentMethod}
                </p>
              )}
            </div>

            {/* Payment Status */}
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">
                Payment Status *
              </label>
              <select
                value={paymentStatus}
                onChange={(e) => setPaymentStatus(e.target.value)}
                disabled={loading}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-medium bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-200 transition-all capitalize"
              >
                <option value="pending">pending</option>
                <option value="paid">paid</option>
                <option value="partially_paid">partially_paid</option>
                <option value="voided">voided</option>
              </select>
              {errors.paymentStatus && (
                <p className="text-xs text-rose-500 mt-1">
                  {errors.paymentStatus}
                </p>
              )}
            </div>

            {/* Notes */}
            <div className="md:col-span-3">
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">
                Notes
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Optional sales notes..."
                rows="2"
                disabled={loading}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-medium bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-200 transition-all"
              />
            </div>
          </div>

          {/* Sale Items Table */}
          <div className="border-t border-slate-100 dark:border-slate-800 pt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                Sale Items
              </h3>
              <button
                type="button"
                onClick={handleAddItem}
                disabled={loading || fetchingProducts}
                className="px-3 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all flex items-center gap-1"
              >
                <span>+ Add Item</span>
              </button>
            </div>

            {errors.generalItems && (
              <p className="text-xs text-rose-500 mb-2">
                {errors.generalItems}
              </p>
            )}

            <div className="overflow-x-auto border border-slate-100 dark:border-slate-800 rounded-xl">
              {fetchingProducts ? (
                <div className="p-6 text-center text-xs font-semibold text-slate-500">
                  Fetching available products...
                </div>
              ) : (
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 text-slate-400 text-xs uppercase font-bold">
                    <tr>
                      <th className="p-3 w-7/12">Product</th>
                      <th className="p-3">SKU</th>
                      <th className="p-3">Stock</th>
                      <th className="p-3">Price</th>
                      <th className="p-3 w-24">Qty</th>
                      <th className="p-3">Total (Preview)</th>
                      <th className="p-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {items.map((item, idx) => {
                      const price =
                        item.selectedProduct?.sellingPrice ??
                        item.selectedProduct?.price ??
                        0;
                      const stock =
                        item.selectedProduct?.stock ??
                        item.selectedProduct?.quantity ??
                        item.selectedProduct?.currentQuantity ??
                        "-";
                      const sku = item.selectedProduct?.sku || "-";
                      const totalPreview = price * (Number(item.quantity) || 0);

                      return (
                        <tr
                          key={idx}
                          className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
                        >
                          {/* Product Selector */}
                          <td className="p-3 align-top">
                            <ProductSelector
                              availableProducts={products}
                              selectedProductId={item.productId}
                              onSelectProduct={(val) =>
                                handleProductChange(idx, val)
                              }
                              alreadySelectedIds={alreadySelectedIds}
                              loading={fetchingProducts}
                              error={errors[`item_${idx}`]}
                            />
                          </td>

                          {/* SKU */}
                          <td className="p-3 align-top pt-4 text-xs text-slate-500 font-mono">
                            {sku}
                          </td>

                          {/* Stock */}
                          <td className="p-3 align-top pt-4 text-xs font-semibold text-slate-600 dark:text-slate-400">
                            {stock}
                          </td>

                          {/* Unit Price */}
                          <td className="p-3 align-top pt-4 text-xs font-semibold text-slate-700 dark:text-slate-300">
                            ${Number(price).toFixed(2)}
                          </td>

                          {/* Quantity */}
                          <td className="p-3 align-top pt-3">
                            <input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) =>
                                handleQuantityChange(idx, e.target.value)
                              }
                              disabled={loading}
                              className={`w-20 p-2 text-xs font-semibold rounded-lg border bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 ${
                                errors[`qty_${idx}`]
                                  ? "border-rose-500 focus:ring-1 focus:ring-rose-500"
                                  : "border-slate-200 dark:border-slate-700"
                              }`}
                            />
                            {errors[`qty_${idx}`] && (
                              <p className="text-[10px] text-rose-500 mt-1 font-medium">
                                {errors[`qty_${idx}`]}
                              </p>
                            )}
                          </td>

                          {/* Total Preview */}
                          <td className="p-3 align-top pt-4 text-xs font-bold text-slate-900 dark:text-slate-100">
                            ${totalPreview.toFixed(2)}
                          </td>

                          {/* Action */}
                          <td className="p-3 align-top pt-4 text-right">
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
              )}
            </div>
          </div>

          {/* Summary Preview */}
          <div className="flex justify-end pt-2">
            <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 p-4 rounded-xl text-right">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                Estimated Total (Preview)
              </span>
              <span className="text-2xl font-black text-slate-900 dark:text-slate-100">
                ${previewGrandTotal.toFixed(2)}
              </span>
            </div>
          </div>
        </form>

        {/* Footer Actions */}
        <div className="p-6 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3 bg-white dark:bg-slate-900">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="px-5 py-2.5 text-xs font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading || fetchingProducts}
            className="px-6 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-95 rounded-xl shadow-md transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>Processing...</span>
              </>
            ) : (
              <span>Save Sale / Complete</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateSaleModal;