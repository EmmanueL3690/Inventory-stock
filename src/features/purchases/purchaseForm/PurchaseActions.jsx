import React, { memo } from "react";
import { Loader2, CheckCircle2, X } from "lucide-react";

/**
 * Formats numeric values to standard NGN currency strings.
 */
const formatCurrency = (amount = 0) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
  }).format(Number(amount) || 0);
};

/**
 * PurchaseActions Component
 * * @param {Function} onCancel - Function to execute when cancel is clicked.
 * @param {boolean} isSubmitting - Loading state for submit action.
 * @param {number} grandTotal - Calculated total amount to display.
 * @param {string} submitText - Text label for the submit button.
 * @param {string} cancelText - Text label for the cancel button.
 * @param {Function} onSubmit - Optional explicit click handler if not using form submit events.
 * @param {string} formId - Optional HTML form ID to link this submit button to a form declared elsewhere in the DOM.
 */
const PurchaseActions = memo(({
  onCancel,
  isSubmitting = false,
  grandTotal = 0,
  submitText = "Save Purchase",
  cancelText = "Cancel",
  onSubmit,
  formId,
}) => {
  return (
    <div className="sticky bottom-0 z-40 w-full bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-4 py-3 sm:px-6 sm:py-4 shadow-lg transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Grand Total Display */}
        <div className="w-full sm:w-auto flex items-center justify-between sm:justify-start gap-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Grand Total
          </span>
          <span className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            {formatCurrency(grandTotal)}
          </span>
        </div>

        {/* Form Actions */}
        <div className="w-full sm:w-auto flex items-center justify-end gap-3">
          {/* Cancel Button */}
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700/60 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:focus:ring-offset-slate-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            <X className="h-4 w-4 shrink-0 text-slate-500 dark:text-slate-400" />
            <span>{cancelText}</span>
          </button>

          {/* Form Submit Button */}
          <button
            type="submit"
            form={formId}
            onClick={onSubmit}
            disabled={isSubmitting}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 shrink-0 animate-spin text-white/80" />
                <span>Saving Purchase...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span>{submitText}</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
});

PurchaseActions.displayName = "PurchaseActions";

export default PurchaseActions;