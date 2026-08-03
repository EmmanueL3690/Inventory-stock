import React from 'react';
import { Inbox, ArrowUpRight, ArrowLeft } from 'lucide-react';

export default function EmptyRecentRecords() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center bg-white rounded-xl">
      {/* Decorative Icon Wrapper */}
      <div className="p-4 bg-slate-50 border border-slate-100 text-slate-400 rounded-full mb-5 shadow-sm">
        <Inbox className="h-10 w-10 shrink-0 text-slate-400" />
      </div>
      
      <h3 className="font-extrabold text-slate-900 text-lg tracking-tight">
        No Stock-Out Records
      </h3>
      <p className="text-sm text-slate-500 max-w-sm mt-2 leading-relaxed">
        Stock dispatched from warehouses will appear here once transactions are recorded.
      </p>

      {/* Recommended Recovery Actions */}
      <div className="flex flex-col sm:flex-row items-center gap-3 mt-8 w-full sm:w-auto">
        <button
          type="button"
          className="w-full sm:w-auto inline-flex h-11 items-center justify-center gap-2 px-5 bg-indigo-600 text-white text-sm font-bold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 active:bg-indigo-800 transition-all shadow-sm"
          onClick={() => {
            const input = document.getElementById('prod-search');
            if (input) input.focus();
          }}
        >
          <ArrowUpRight className="h-4 w-4 shrink-0" />
          <span>Dispatch Stock</span>
        </button>

        <button
          type="button"
          className="w-full sm:w-auto inline-flex h-11 items-center justify-center gap-2 px-5 border border-slate-200 bg-white text-slate-700 text-sm font-bold rounded-lg hover:bg-slate-50 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 active:bg-slate-100 transition-all shadow-sm"
        >
          <ArrowLeft className="h-4 w-4 shrink-0 text-slate-500" />
          <span>Back to Inventory</span>
        </button>
      </div>
    </div>
  );
}