import React from 'react';
import { 
  Eye, 
  CreditCard, 
  Printer, 
  PackageX, 
  Building2, 
  UserCheck 
} from 'lucide-react';

const PurchasesTable = ({
  purchases = [],
  loading = false,
  onViewPurchase,
  onUpdatePayment,
  onPrint,
}) => {
  // Badge styling helpers based on payment status
  const getPaymentStatusBadge = (status = '') => {
    const uppercaseStatus = String(status).toUpperCase();
    switch (uppercaseStatus) {
      case 'PAID':
        return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800';
      case 'PENDING':
        return 'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400 border-amber-200 dark:border-amber-800';
      case 'PARTIALLY_PAID':
      case 'PARTIAL':
        return 'bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400 border-blue-200 dark:border-blue-800';
      case 'OVERDUE':
        return 'bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-400 border-rose-200 dark:border-rose-800';
      default:
        return 'bg-slate-50 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700';
    }
  };

  // Format currency (NGN)
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 2,
    }).format(amount || 0);
  };

  // Format date safely
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-NG', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleRowClick = (purchase) => {
    if (onViewPurchase) {
      onViewPurchase(purchase);
    }
  };

  return (
    <div className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          {/* Table Header */}
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <th className="py-3.5 px-4">Purchase Order #</th>
              <th className="py-3.5 px-4">Supplier</th>
              <th className="py-3.5 px-4">Supplier Type</th>
              <th className="py-3.5 px-4">Grand Total</th>
              <th className="py-3.5 px-4">Payment Status</th>
              <th className="py-3.5 px-4">Created Date</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-sm">
            {/* Loading State Skeleton */}
            {loading ? (
              Array.from({ length: 5 }).map((_, idx) => (
                <tr key={idx} className="animate-pulse">
                  <td className="py-4 px-4"><div className="h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded" /></td>
                  <td className="py-4 px-4"><div className="h-4 w-32 bg-slate-200 dark:bg-slate-800 rounded" /></td>
                  <td className="py-4 px-4"><div className="h-4 w-20 bg-slate-200 dark:bg-slate-800 rounded" /></td>
                  <td className="py-4 px-4"><div className="h-4 w-20 bg-slate-200 dark:bg-slate-800 rounded" /></td>
                  <td className="py-4 px-4"><div className="h-5 w-16 bg-slate-200 dark:bg-slate-800 rounded-full" /></td>
                  <td className="py-4 px-4"><div className="h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded" /></td>
                  <td className="py-4 px-4 text-right"><div className="h-4 w-16 bg-slate-200 dark:bg-slate-800 rounded ml-auto" /></td>
                </tr>
              ))
            ) : purchases.length === 0 ? (
              /* Empty State */
              <tr>
                <td colSpan="7" className="py-12 text-center">
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-400">
                      <PackageX className="w-8 h-8" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-base font-semibold text-slate-800 dark:text-slate-200">
                        No purchase orders found
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Try adjusting your filters or create a new purchase order.
                      </p>
                    </div>
                  </div>
                </td>
              </tr>
            ) : (
              /* Purchases Rows Mapping Backend Data */
              purchases.map((purchase) => {
                const poNumber = purchase.purchaseOrderNumber || 'N/A';
                
                // Map supplier details directly from backend supplierId object or fallbacks
                const supplierObj = typeof purchase.supplierId === 'object' ? purchase.supplierId : purchase.supplier;
                const supplierName = supplierObj?.name || 'N/A';
                const supplierType = supplierObj?.type || 'Standard';

                return (
                  <tr
                    key={purchase._id || purchase.id}
                    onClick={() => handleRowClick(purchase)}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors duration-150 group cursor-pointer"
                  >
                    {/* PO Number */}
                    <td className="py-3.5 px-4 font-semibold text-indigo-600 dark:text-indigo-400">
                      <button 
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRowClick(purchase);
                        }}
                        className="hover:underline focus:outline-none cursor-pointer"
                      >
                        #{poNumber}
                      </button>
                    </td>

                    {/* Supplier Name */}
                    <td className="py-3.5 px-4 text-slate-900 dark:text-slate-100 font-medium">
                      {supplierName}
                    </td>

                    {/* Supplier Type */}
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">
                      <span className="inline-flex items-center gap-1.5 capitalize text-xs font-medium">
                        {String(supplierType).toLowerCase() === 'vendor' ? (
                          <Building2 className="w-3.5 h-3.5 text-slate-400" />
                        ) : (
                          <UserCheck className="w-3.5 h-3.5 text-slate-400" />
                        )}
                        {supplierType}
                      </span>
                    </td>

                    {/* Grand Total */}
                    <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-slate-100">
                      {formatCurrency(purchase.grandTotal)}
                    </td>

                    {/* Payment Status */}
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPaymentStatusBadge(
                          purchase.paymentStatus
                        )}`}
                      >
                        {purchase.paymentStatus ? String(purchase.paymentStatus).toUpperCase() : 'UNPAID'}
                      </span>
                    </td>

                    {/* Created Date */}
                    <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400 text-xs">
                      {formatDate(purchase.createdAt)}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div 
                        className="flex items-center justify-end space-x-1 opacity-90 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {/* View Action */}
                        <button
                          type="button"
                          onClick={() => handleRowClick(purchase)}
                          title="View Details"
                          className="p-1.5 text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors cursor-pointer"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        {/* Update Payment Action */}
                        {onUpdatePayment && (
                          <button
                            type="button"
                            onClick={() => onUpdatePayment(purchase)}
                            title="Update Payment"
                            className="p-1.5 text-slate-600 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors cursor-pointer"
                          >
                            <CreditCard className="w-4 h-4" />
                          </button>
                        )}

                        {/* Print Action */}
                        {onPrint && (
                          <button
                            type="button"
                            onClick={() => onPrint(purchase)}
                            title="Print PO"
                            className="p-1.5 text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors cursor-pointer"
                          >
                            <Printer className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PurchasesTable;