import React from 'react';
import { 
  FileText, 
  User, 
  Calendar, 
  Mail, 
  Phone, 
  CreditCard, 
  DollarSign 
} from 'lucide-react';

const ReceivePurchaseCard = ({ purchase = {} }) => {
  // Safe extraction of fields handling populated objects or fallback defaults
  const poNumber = purchase.purchaseOrderNumber || 'N/A';
  const createdAt = purchase.createdAt ? new Date(purchase.createdAt).toLocaleDateString('en-NG', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }) : 'N/A';
  
  const supplierObj = typeof purchase.supplierId === 'object' ? purchase.supplierId : {};
  const supplierName = supplierObj.name || purchase.supplierName || 'N/A';
  const supplierEmail = supplierObj.email || 'N/A';
  const supplierPhone = supplierObj.phone || 'N/A';

  const paymentStatus = (purchase.paymentStatus || 'Pending').toLowerCase();
  const grandTotal = purchase.grandTotal || purchase.totalAmount || 0;

  // Currency Formatter
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 2,
    }).format(amount);
  };

  // Helper for Payment Status Badge Styles
  const getStatusBadge = (status) => {
    switch (status) {
      case 'paid':
        return 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/60';
      case 'partial':
      case 'partially paid':
        return 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800/60';
      case 'unpaid':
      default:
        return 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-800/60';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs w-full transition-all">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 divide-y md:divide-y-0 md:divide-x divide-slate-100 dark:divide-slate-800">
        
        {/* Section 1: Purchase Information */}
        <div className="space-y-4 pb-4 md:pb-0">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800/80">
            <FileText className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-100">
              Purchase Order Information
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* PO Number */}
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">PO Number</p>
              <p className="text-sm font-semibold text-slate-900 dark:text-white mt-0.5">
                {poNumber}
              </p>
            </div>

            {/* Purchase Date */}
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1">
                <Calendar className="w-3 h-3 text-slate-400" />
                <span>Purchase Date</span>
              </p>
              <p className="text-sm font-medium text-slate-800 dark:text-slate-200 mt-0.5">
                {createdAt}
              </p>
            </div>

            {/* Payment Status */}
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1 mb-1">
                <CreditCard className="w-3 h-3 text-slate-400" />
                <span>Payment Status</span>
              </p>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border capitalize ${getStatusBadge(paymentStatus)}`}>
                {paymentStatus}
              </span>
            </div>

            {/* Grand Total */}
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1">
                <DollarSign className="w-3 h-3 text-slate-400" />
                <span>Grand Total</span>
              </p>
              <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                {formatCurrency(grandTotal)}
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Supplier Information */}
        <div className="space-y-4 pt-4 md:pt-0 md:pl-6">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800/80">
            <User className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-100">
              Supplier Details
            </h2>
          </div>

          <div className="space-y-3">
            {/* Supplier Name */}
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Supplier Name</p>
              <p className="text-sm font-semibold text-slate-900 dark:text-white mt-0.5">
                {supplierName}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              {/* Supplier Email */}
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1">
                  <Mail className="w-3 h-3 text-slate-400" />
                  <span>Email</span>
                </p>
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200 mt-0.5 truncate" title={supplierEmail}>
                  {supplierEmail}
                </p>
              </div>

              {/* Supplier Phone */}
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1">
                  <Phone className="w-3 h-3 text-slate-400" />
                  <span>Phone</span>
                </p>
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200 mt-0.5">
                  {supplierPhone}
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ReceivePurchaseCard;