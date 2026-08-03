import React from 'react';
import { 
  CreditCard, 
  PackageCheck, 
  Printer, 
  X 
} from 'lucide-react';

const PurchaseActionButtons = ({
  purchase = null,
  onUpdatePayment,
  onReceiveItems,
  onPrintInvoice,
  onClose,
}) => {
  return (
    <div className="w-full flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
      
      {/* Secondary/Left Action Group: Close & Print */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium text-xs rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-slate-400/20"
        >
          <X className="w-4 h-4 text-slate-500 dark:text-slate-400" />
          <span>Close</span>
        </button>

        {/* Print Invoice Button */}
        <button
          type="button"
          onClick={() => onPrintInvoice && onPrintInvoice(purchase)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium text-xs rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-slate-400/20"
        >
          <Printer className="w-4 h-4 text-slate-500 dark:text-slate-400" />
          <span>Print Invoice</span>
        </button>
      </div>

      {/* Primary/Right Action Group: Receive Items & Update Payment */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
        {/* Receive Items Button (Secondary Gray Style) */}
        <button
          type="button"
          onClick={() => onReceiveItems && onReceiveItems(purchase)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium text-xs rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-slate-400/20"
        >
          <PackageCheck className="w-4 h-4 text-slate-500 dark:text-slate-400" />
          <span>Receive Items</span>
        </button>

        {/* Update Payment Button (Blue Primary Style) */}
        <button
          type="button"
          onClick={() => onUpdatePayment && onUpdatePayment(purchase)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium text-xs rounded-lg shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/40"
        >
          <CreditCard className="w-4 h-4" />
          <span>Update Payment</span>
        </button>
      </div>

    </div>
  );
};

export default PurchaseActionButtons;