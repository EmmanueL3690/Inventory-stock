import React, { useState, useEffect } from "react";
import salesService from "../services/salesService"; // Adjust import path if needed

export const SaleDetailsDrawer = ({
  saleId,
  isOpen,
  onClose,
  onSaleVoided,
  toast, // Optional toast prop for success/error notifications
}) => {
  const [sale, setSale] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Fetch full sale details when drawer opens or saleId changes
  useEffect(() => {
    if (isOpen && saleId) {
      fetchSaleDetails(saleId);
    } else {
      setSale(null);
      setError(null);
    }
  }, [isOpen, saleId]);

  const fetchSaleDetails = async (id) => {
    setLoading(true);
    setError(null);
    try {
      // Calls GET /api/sales/:id
      const data = await salesService.getSaleById(id);
      setSale(data?.data || data);
    } catch (err) {
      console.error("Failed to fetch sale details:", err);
      const errMsg =
        err.response?.data?.message || "Failed to load sale details.";
      setError(errMsg);
      if (toast) toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleVoidSale = async () => {
    if (!sale) return;

    const confirmed = window.confirm(
      `Are you sure you want to void sale #${sale.invoiceNumber || sale._id || sale.id}?`
    );

    if (!confirmed) return;

    setSubmitting(true);
    try {
      // Calls POST /api/sales/:id/void
      const currentId = sale.id || sale._id || saleId;
      await salesService.voidSale(currentId);

      if (toast) {
        toast.success("Sale voided successfully!");
      }

      // Trigger table refresh in parent component
      if (typeof onSaleVoided === "function") {
        onSaleVoided();
      }

      onClose();
    } catch (err) {
      console.error("Failed to void sale:", err);
      const errMsg =
        err.response?.data?.message ||
        "An error occurred while attempting to void the sale.";
      setError(errMsg);
      if (toast) toast.error(errMsg);
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen && !saleId) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-white shadow-xl z-50 p-6 overflow-y-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Sale Details</h2>
        <button
          onClick={onClose}
          disabled={submitting}
          className="text-gray-500 font-bold hover:text-gray-700 transition-colors"
        >
          X
        </button>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="py-8 text-center text-gray-500 font-medium">
          Loading details...
        </div>
      ) : error ? (
        <div className="p-3 bg-red-50 text-red-600 rounded text-sm font-medium mb-4">
          {error}
        </div>
      ) : sale ? (
        <div className="space-y-4">
          {/* Sale Info */}
          <div>
            <strong>Invoice:</strong> {sale.invoiceNumber || "N/A"}
          </div>
          <div>
            <strong>Customer:</strong> {sale.customerName || "N/A"}
          </div>
          <div>
            <strong>Payment Method:</strong>{" "}
            <span className="capitalize">{sale.paymentMethod || "N/A"}</span>
          </div>
          <div>
            <strong>Payment Status:</strong>{" "}
            <span
              className={`capitalize font-bold ${
                sale.paymentStatus === "voided"
                  ? "text-red-600"
                  : sale.paymentStatus === "paid"
                  ? "text-emerald-600"
                  : "text-amber-600"
              }`}
            >
              {sale.paymentStatus || "N/A"}
            </span>
          </div>
          <div>
            <strong>Grand Total:</strong> $
            {Number(sale.grandTotal || 0).toFixed(2)}
          </div>
          <div>
            <strong>Date:</strong>{" "}
            {sale.createdAt || sale.createdDate
              ? new Date(sale.createdAt || sale.createdDate).toLocaleDateString()
              : "N/A"}
          </div>
          <div>
            <strong>Notes:</strong> {sale.notes || "None"}
          </div>

          <hr />

          {/* Items Table */}
          <h3 className="font-bold">Items</h3>
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b">
                <th className="pb-1">Product</th>
                <th className="pb-1">SKU</th>
                <th className="pb-1">Qty</th>
                <th className="pb-1">Unit Price</th>
                <th className="pb-1">Total</th>
              </tr>
            </thead>
            <tbody>
              {sale.items && sale.items.length > 0 ? (
                sale.items.map((item, idx) => {
                  const name =
                    item.productName || item.product?.name || "Unknown Product";
                  const sku = item.sku || item.product?.sku || "-";
                  const qty = Number(item.quantity) || 0;
                  const unitPrice =
                    Number(item.unitPrice || item.price || item.sellingPrice) ||
                    0;
                  const totalPrice =
                    Number(item.totalPrice) || unitPrice * qty;

                  return (
                    <tr key={item.id || item._id || idx} className="border-b">
                      <td className="py-2">{name}</td>
                      <td className="py-2">{sku}</td>
                      <td className="py-2">{qty}</td>
                      <td className="py-2">${unitPrice.toFixed(2)}</td>
                      <td className="py-2">${totalPrice.toFixed(2)}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5" className="py-4 text-center text-gray-400">
                    No items found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Void Sale Action */}
          {sale.paymentStatus !== "voided" && (
            <div className="pt-4 border-t">
              <button
                className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={submitting}
                onClick={handleVoidSale}
              >
                {submitting ? "Voiding..." : "Void Sale"}
              </button>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default SaleDetailsDrawer;