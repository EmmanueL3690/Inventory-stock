import React, { useState, useEffect, useCallback, useMemo } from "react";
import { SaleDetailsDrawer } from "../saleDetails/SaleDetailsDrawer";

const SalesTable = ({
  searchQuery = "",
  filters = {},
  onSaleCreated = false,
  fetchSalesApi = async () => ({ sales: [], totalPages: 1 }),
  onPrintInvoice = (sale) => window.print(),
}) => {
  // State Management
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedSale, setSelectedSale] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Dynamic color utility matching backend lowercase status values
  const getStatusStyles = useCallback((status) => {
    switch (status?.toLowerCase()) {
      case "paid":
      case "completed":
        return "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800";
      case "pending":
      case "partially_paid":
        return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800";
      case "voided":
      case "cancelled":
      case "failed":
        return "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-800";
      default:
        return "bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700";
    }
  }, []);

  // Fetch data from backend API
  const fetchSalesData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchSalesApi({
        page: currentPage,
        search: searchQuery,
        ...filters,
      });

      if (response) {
        const rawList = Array.isArray(response)
          ? response
          : response.sales || response.data || [];
        setSales(rawList);
        setTotalPages(response.totalPages || response.last_page || 1);
      }
    } catch (err) {
      console.error("Error loading sales:", err);
      setError(err?.message || "Failed to load sales data. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [fetchSalesApi, currentPage, searchQuery, filters]);

  // Load sales when dependencies trigger updates
  useEffect(() => {
    fetchSalesData();
  }, [fetchSalesData, onSaleCreated]);

  // Reset page counter when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filters]);

  // View action
  const handleViewDetails = useCallback((sale) => {
    setSelectedSale(sale);
    setIsDrawerOpen(true);
  }, []);

  // Print action
  const handlePrint = useCallback(
    (e, sale) => {
      e.stopPropagation();
      if (onPrintInvoice) {
        onPrintInvoice(sale);
      } else {
        window.print();
      }
    },
    [onPrintInvoice]
  );

  // Pagination handlers
  const handleNextPage = useCallback(() => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  }, [currentPage, totalPages]);

  const handlePrevPage = useCallback(() => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  }, [currentPage]);

  // Memoized Render Helpers
  const renderedSkeleton = useMemo(() => {
    return (
      <div className="animate-pulse space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:hidden">
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              className="h-48 bg-slate-100 dark:bg-slate-800 rounded-2xl p-5"
            />
          ))}
        </div>
        <div className="hidden lg:block bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6">
          <div className="h-6 bg-slate-100 dark:bg-slate-800 rounded mb-4 w-full" />
          {[1, 2, 3, 4, 5].map((n) => (
            <div
              key={n}
              className="h-12 bg-slate-50 dark:bg-slate-800/50 rounded mb-2 w-full"
            />
          ))}
        </div>
      </div>
    );
  }, []);

  const renderedEmptyState = useMemo(() => {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl text-center">
        <svg
          className="w-12 h-12 text-slate-300 dark:text-slate-600 mb-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <p className="text-base font-semibold text-slate-700 dark:text-slate-300">
          No Sales Found
        </p>
        <p className="text-xs text-slate-400 mt-1">
          There are no transaction records matching your current filter.
        </p>
        <button
          onClick={fetchSalesData}
          className="mt-4 px-4 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
        >
          Refresh Data
        </button>
      </div>
    );
  }, [fetchSalesData]);

  if (loading) return renderedSkeleton;

  if (error) {
    return (
      <div className="p-6 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 rounded-2xl text-center">
        <p className="text-sm font-semibold text-rose-700 dark:text-rose-400">
          {error}
        </p>
        <button
          onClick={fetchSalesData}
          className="mt-3 px-4 py-2 text-xs font-bold text-rose-700 bg-rose-100 dark:bg-rose-900/50 rounded-xl hover:bg-rose-200 transition-all"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!sales || sales.length === 0) return renderedEmptyState;

  return (
    <div className="w-full space-y-4">
      {/* Refresh Button */}
      <div className="flex justify-end">
        <button
          onClick={fetchSalesData}
          className="px-3 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center gap-1.5 shadow-sm"
        >
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Refresh
        </button>
      </div>

      {/* MOBILE & TABLET VIEW */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:hidden">
        {sales.map((sale) => {
          const invoiceNum = sale.invoiceNumber || sale.invoice || sale.id;
          const customer = sale.customerName || sale.customer || "N/A";
          const grandTotal = Number(sale.grandTotal || sale.amount || 0).toFixed(2);
          const status = sale.paymentStatus || sale.status || "pending";
          const method = sale.paymentMethod || sale.payment || "-";
          const itemCount = sale.items ? sale.items.length : sale.items_count || 0;
          const createdDate = new Date(sale.createdAt || sale.date || Date.now()).toLocaleDateString();

          return (
            <div
              key={sale.id || invoiceNum}
              className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow relative"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                    {invoiceNum}
                  </span>
                  <h3 className="font-bold text-slate-800 dark:text-slate-100 text-base mt-0.5">
                    {customer}
                  </h3>
                </div>
                <span
                  className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusStyles(
                    status
                  )}`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 opacity-80" />
                  {status}
                </span>
              </div>

              <hr className="border-slate-100 dark:border-slate-800 my-3" />

              <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-sm mb-4">
                <div>
                  <span className="text-xs text-slate-400 block">Date</span>
                  <span className="text-slate-700 dark:text-slate-300 font-medium">
                    {createdDate}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-slate-400 block">Grand Total</span>
                  <span className="text-slate-900 dark:text-slate-100 font-semibold">
                    ${grandTotal}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-slate-400 block">Items</span>
                  <span className="text-slate-600 dark:text-slate-400">
                    {itemCount} {itemCount === 1 ? "item" : "items"}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-slate-400 block">Method</span>
                  <span className="text-slate-600 dark:text-slate-400 capitalize">
                    {method}
                  </span>
                </div>
              </div>

              <div className="flex gap-2 items-center justify-end pt-2 border-t border-slate-50 dark:border-slate-800">
                <button
                  onClick={(e) => handlePrint(e, sale)}
                  className="px-3 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-xl hover:bg-slate-200 transition-all"
                >
                  Print
                </button>
                <button
                  onClick={() => handleViewDetails(sale)}
                  className="px-4 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 active:scale-95 transition-all"
                >
                  View Details
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* DESKTOP TABLE VIEW */}
      <div className="hidden lg:block bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-slate-50/75 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
              <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                Invoice
              </th>
              <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                Customer
              </th>
              <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                Items
              </th>
              <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                Grand Total
              </th>
              <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                Method
              </th>
              <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                Status
              </th>
              <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                Date
              </th>
              <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-400 text-right">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {sales.map((sale) => {
              const invoiceNum = sale.invoiceNumber || sale.invoice || sale.id;
              const customer = sale.customerName || sale.customer || "N/A";
              const grandTotal = Number(sale.grandTotal || sale.amount || 0).toFixed(2);
              const status = sale.paymentStatus || sale.status || "pending";
              const method = sale.paymentMethod || sale.payment || "-";
              const itemCount = sale.items ? sale.items.length : sale.items_count || 0;
              const createdDate = new Date(sale.createdAt || sale.date || Date.now()).toLocaleDateString();

              return (
                <tr
                  key={sale.id || invoiceNum}
                  className="hover:bg-slate-50/40 dark:hover:bg-slate-800/40 transition-colors group"
                >
                  <td className="p-4 text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {invoiceNum}
                  </td>
                  <td className="p-4 text-sm font-bold text-slate-800 dark:text-slate-200">
                    {customer}
                  </td>
                  <td className="p-4 text-sm text-slate-600 dark:text-slate-400">
                    {itemCount}
                  </td>
                  <td className="p-4 text-sm font-bold text-slate-900 dark:text-slate-100">
                    ${grandTotal}
                  </td>
                  <td className="p-4 text-sm text-slate-500 dark:text-slate-400 capitalize">
                    {method}
                  </td>
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusStyles(
                        status
                      )}`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 opacity-80" />
                      {status}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-slate-600 dark:text-slate-400">
                    {createdDate}
                  </td>
                  <td className="p-4 text-right">
                    <div className="inline-flex gap-2">
                      <button
                        onClick={(e) => handlePrint(e, sale)}
                        className="inline-flex items-center justify-center px-2.5 py-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 active:scale-95 transition-all"
                      >
                        Print
                      </button>
                      <button
                        onClick={() => handleViewDetails(sale)}
                        className="inline-flex items-center justify-center px-3 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 active:scale-95 transition-all"
                      >
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* PAGINATION FOOTER */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm">
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Page <span className="font-bold">{currentPage}</span> of{" "}
            <span className="font-bold">{totalPages}</span>
          </span>
          <div className="flex gap-2">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="px-3 py-1.5 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Previous
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* DETAILS DRAWER */}
      {isDrawerOpen && (
        <SaleDetailsDrawer
          sale={selectedSale}
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
        />
      )}
    </div>
  );
};

export default SalesTable;