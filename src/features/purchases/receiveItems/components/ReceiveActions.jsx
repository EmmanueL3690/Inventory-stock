import React from 'react';
import { CheckCircle2, RotateCw, X } from 'lucide-react';

const ReceiveActions = ({
  loading = false,
  onReceive,
  onCancel,
}) => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs w-full flex flex-col sm:flex-row items-center justify-between gap-3">
      {/* Informational Hint / Note */}
      <p className="text-xs text-slate-500 dark:text-slate-400">
        Review all entries carefully before confirming inventory receipt.
      </p>

      {/* Button Group */}
      <div className="flex items-center gap-3 w-full sm:w-auto">
        {/* Cancel Button */}
        <button
          type="button"
          onClick={() => onCancel?.()}
          disabled={loading}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/80 focus:outline-none focus:ring-2 focus:ring-slate-400/20 transition-all disabled:opacity-50 cursor-pointer"
        >
          <X className="w-4 h-4 text-slate-400" />
          <span>Cancel</span>
        </button>

        {/* Primary Submit Button */}
        <button
          type="button"
          onClick={() => onReceive?.()}
          disabled={loading}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-500 rounded-lg shadow-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all disabled:opacity-60 cursor-pointer"
        >
          {loading ? (
            <>
              <RotateCw className="w-4 h-4 animate-spin text-white" />
              <span>Receiving Items...</span>
            </>
          ) : (
            <>
              <CheckCircle2 className="w-4 h-4 text-white" />
              <span>Receive Items</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ReceiveActions;