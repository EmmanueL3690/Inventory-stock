import React from 'react';
import { 
  FileText, 
  Calendar, 
  CreditCard, 
  DollarSign, 
  User 
} from 'lucide-react';

const PurchaseSummaryDetailsCard = ({ purchase = {} }) => {
  // Extract values with fallbacks
  const poNumber = purchase.purchaseOrderNumber || purchase.poNumber || purchase.id || 'N/A';
  const purchaseDate = purchase.createdAt || purchase.createdDate || purchase.date;
  const paymentStatus = purchase.paymentStatus || 'PENDING';
  const grandTotal = purchase.grandTotal || purchase.totalAmount || 0;
  const createdBy = purchase.createdBy?.name || purchase.createdBy || 'System Admin';

  // Format date helper
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Format currency helper
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 2,
    }).format(amount || 0);
  };

  // Status badge styling helper
  const getStatusBadge = (status) => {
    switch (String(status).toUpperCase()) {
      case 'PAID':
        return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800';
      case 'PENDING':
        return 'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400 border-amber-200 dark:border-amber-800';
      case 'PARTIAL':
      case 'PARTIALLY_PAID':
        return 'bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400 border-blue-200 dark:border-blue-800';
      case 'OVERDUE':
        return 'bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-400 border-rose-200 dark:border-rose-800';
      default:
        return 'bg-slate-50 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
      {/* Card Title Header */}
      <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="p-1.5 bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800/60 rounded-md text-indigo-600 dark:text-indigo-400">
          <FileText className="w-4 h-4" />
        </div>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Purchase Summary
        </h3>
      </div>

      {/* Details Grid */}
      <div className="space-y-3 text-xs">
        {/* PO Number */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
            <FileText className="w-3.5 h-3.5" />
            <span>PO Number</span>
          </div>
          <span className="font-semibold text-slate-900 dark:text-slate-100 font-mono">
            #{poNumber}
          </span>
        </div>

        {/* Purchase Date */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
            <Calendar className="w-3.5 h-3.5" />
            <span>Purchase Date</span>
          </div>
          <span className="font-medium text-slate-800 dark:text-slate-200">
            {formatDate(purchaseDate)}
          </span>
        </div>

        {/* Payment Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
            <CreditCard className="w-3.5 h-3.5" />
            <span>Payment Status</span>
          </div>
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold border ${getStatusBadge(
              paymentStatus
            )}`}
          >
            {paymentStatus.replace('_', ' ')}
          </span>
        </div>

        {/* Created By */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
            <User className="w-3.5 h-3.5" />
            <span>Created By</span>
          </div>
          <span className="font-medium text-slate-800 dark:text-slate-200">
            {createdBy}
          </span>
        </div>

        {/* Grand Total */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 font-medium">
            <DollarSign className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>Grand Total</span>
          </div>
          <span className="text-base font-bold text-slate-900 dark:text-white">
            {formatCurrency(grandTotal)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PurchaseSummaryDetailsCard;