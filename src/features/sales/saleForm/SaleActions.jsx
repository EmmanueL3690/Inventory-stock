import React from "react";

export const SaleActions = ({
  isSubmitting = false,
  grandTotal = 0,
  onCancel = () => {},
  onSubmit = () => {},
}) => {
  return (
    <div className="p-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900">
      {/* Total Amount Badge Preview */}
      <div className="text-left">
        <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 block">
          Total Due
        </span>
        <span className="text-lg font-black text-slate-900 dark:text-slate-100">
          ${Number(grandTotal).toFixed(2)}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3">
        {/* Cancel Button */}
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="px-5 py-2.5 text-xs font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>

        {/* Complete Sale Button */}
        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="px-6 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-95 rounded-xl shadow-md transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
        >
          {isSubmitting ? (
            <>
              {/* Spinner */}
              <svg
                className="animate-spin h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
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
              <span>Saving Sale...</span>
            </>
          ) : (
            <span>Complete Sale</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default SaleActions;