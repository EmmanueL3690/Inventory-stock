import React, { useState } from "react";
import { useSales } from "../../features/sales/hooks/useSales";
import SalesHeader from "../../features/sales/components/SalesHeader";
import { SalesStats } from "../../features/sales/components/SalesStats";
import { SalesFilters } from "../../features/sales/components/SalesFilters";
import SalesTable from "../../features/sales/components/SalesTable";
import CreateSaleModal from "../../features/sales/saleForm/SaleFormModal";
import SaleDrawer from "../../features/sales/saleDetails/SaleDetailsDrawer";

export const Sales = () => {
  const {
    sales = [],
    loading,
    detailsLoading,
    submitting,
    error,
    stats,
    filters,
    setFilters,
    fetchSaleDetails,
    createSale,
    voidSale,
    selectedSale,
    setSelectedSale,
    refreshSales,
    pagination,
    setPage,
  } = useSales();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Toast Helper
  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage("");
    }, 3000);
  };

  // Callback triggered after successful creation in modal
  const handleSaleCreated = async () => {
    if (typeof refreshSales === "function") {
      await refreshSales();
    }
    setIsModalOpen(false);
    showToast("Sale created successfully!");
  };

  // Handle clicking "View Details" (GET /api/sales/:id)
  const handleViewDetails = async (saleId) => {
    if (typeof fetchSaleDetails === "function") {
      await fetchSaleDetails(saleId);
    }
  };

  // Callback handled after voiding a sale
  const handleVoidSale = async (saleId) => {
    if (typeof voidSale === "function") {
      await voidSale(saleId);
    }
    if (typeof refreshSales === "function") {
      await refreshSales();
    }
    setSelectedSale(null);
    showToast("Sale voided successfully.");
  };

  return (
    <div className="p-6">
      {/* Success Toast Banner */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-emerald-600 text-white px-4 py-2.5 rounded-xl shadow-lg text-sm font-semibold flex items-center gap-2 animate-bounce">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header & Title Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Sales Management</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded shadow transition-all"
        >
          + Create Sale
        </button>
      </div>

      {/* Global API Error Banner */}
      {error && (
        <div className="bg-red-100 border border-red-200 text-red-700 p-3 rounded mb-4 text-sm font-medium">
          {error}
        </div>
      )}

      {/* Statistics Header */}
      <SalesStats stats={stats} />

      {/* Filters and Search */}
      <SalesFilters filters={filters} setFilters={setFilters} />

      {/* Main Table Container */}
      <div className="bg-white rounded shadow overflow-x-auto">
        {loading ? (
          <div className="p-6 text-center text-gray-500 font-medium">
            Loading sales...
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b text-sm font-semibold text-gray-700">
                <th className="p-3">Invoice #</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Grand Total</th>
                <th className="p-3">Payment Method</th>
                <th className="p-3">Payment Status</th>
                <th className="p-3">Date</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sales.length === 0 ? (
                <tr>
                  <td colSpan="7" className="p-4 text-center text-gray-500">
                    No sales found.
                  </td>
                </tr>
              ) : (
                sales.map((sale) => {
                  const saleId = sale.id || sale._id;

                  return (
                    <tr
                      key={saleId}
                      className="border-b hover:bg-gray-50 text-sm transition-colors"
                    >
                      <td className="p-3 font-mono text-gray-800">
                        {sale.invoiceNumber || "N/A"}
                      </td>
                      <td className="p-3 font-medium text-gray-900">
                        {sale.customerName || "N/A"}
                      </td>
                      <td className="p-3 font-bold text-gray-900">
                        ${Number(sale.grandTotal || 0).toFixed(2)}
                      </td>
                      <td className="p-3 uppercase text-xs font-semibold text-gray-600">
                        {sale.paymentMethod || "N/A"}
                      </td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-1 text-xs rounded font-bold capitalize ${
                            sale.paymentStatus === "paid"
                              ? "bg-green-100 text-green-800"
                              : sale.paymentStatus === "voided"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {sale.paymentStatus || "N/A"}
                        </span>
                      </td>
                      <td className="p-3 text-gray-600">
                        {sale.createdAt || sale.createdDate
                          ? new Date(
                              sale.createdAt || sale.createdDate
                            ).toLocaleDateString()
                          : "N/A"}
                      </td>
                      <td className="p-3">
                        <button
                          onClick={() => handleViewDetails(saleId)}
                          disabled={detailsLoading}
                          className="text-blue-600 hover:text-blue-800 underline text-sm font-medium disabled:opacity-50"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        )}

        {/* Pagination Controls */}
        {pagination && pagination.totalPages > 1 && (
          <div className="flex justify-between items-center p-4 border-t bg-gray-50 text-xs text-gray-600">
            <span>
              Page <strong>{pagination.currentPage}</strong> of{" "}
              <strong>{pagination.totalPages}</strong>
            </span>
            <div className="flex gap-2">
              <button
                disabled={pagination.currentPage <= 1 || loading}
                onClick={() => setPage && setPage(pagination.currentPage - 1)}
                className="px-3 py-1 bg-white border rounded font-semibold disabled:opacity-40"
              >
                Previous
              </button>
              <button
                disabled={
                  pagination.currentPage >= pagination.totalPages || loading
                }
                onClick={() => setPage && setPage(pagination.currentPage + 1)}
                className="px-3 py-1 bg-white border rounded font-semibold disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Create Sale Modal (Fetches its own products) */}
      <CreateSaleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSaleCreated={handleSaleCreated}
        toast={{ success: showToast }}
      />

      {/* View/Void Details Drawer */}
      <SaleDrawer
        sale={selectedSale}
        loading={detailsLoading}
        onClose={() => setSelectedSale(null)}
        onVoid={handleVoidSale}
        submitting={submitting}
      />
    </div>
  );
};

export default Sales;