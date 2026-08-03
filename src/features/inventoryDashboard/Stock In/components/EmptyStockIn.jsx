import React from 'react';
import { Inbox, Plus, ArrowLeft } from 'lucide-react';

export default function EmptyStockIn() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      {/* Decorative Icon Wrapper */}
      <div className="p-4 bg-slate-50 border border-slate-100 text-slate-400 rounded-full mb-5 shadow-sm">
        <Inbox className="h-10 w-10 shrink-0 text-slate-400" />
      </div>
      
      <h3 className="font-bold text-slate-900 text-lg tracking-tight">
        No Stock-In Records
      </h3>
      <p className="text-sm text-slate-500 max-w-sm mt-2 leading-relaxed">
        Stock received from suppliers will appear here once transactions are recorded.
      </p>

      {/* Recommended Recovery Actions */}
      <div className="flex flex-col sm:flex-row items-center gap-3 mt-8 w-full sm:w-auto">
        <button
          type="button"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 active:bg-indigo-800 transition-all shadow-sm"
          onClick={() => {
            const searchInput = document.getElementById('product-search');
            if (searchInput) searchInput.focus();
          }}
        >
          <Plus className="h-4 w-4 shrink-0" />
          Receive Stock
        </button>

        <button
          type="button"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-slate-200 bg-white text-slate-700 text-sm font-semibold rounded-lg hover:bg-slate-50 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 active:bg-slate-100 transition-all shadow-sm"
        >
          <ArrowLeft className="h-4 w-4 shrink-0 text-slate-500" />
          Back to Inventory
        </button>
      </div>
    </div>
  );
}