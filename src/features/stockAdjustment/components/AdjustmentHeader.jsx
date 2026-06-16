import React from 'react';
import { ChevronRight, Scan, Upload, Plus } from 'lucide-react';

const AdjustmentHeader = ({ referenceId }) => {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between border-b border-slate-100 pb-2">
      {/* Breadcrumb Navigation History & Title Tracks */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 tracking-wide uppercase">
          <span className="hover:text-slate-600 transition cursor-pointer">Inventory</span>
          <ChevronRight size={12} strokeWidth={3} className="text-slate-300" />
          <span className="text-slate-600 font-extrabold">Stock Adjustment</span>
        </div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight sm:text-3xl">
          Stock Adjustment
        </h1>
        <p className="text-xs sm:text-sm font-medium text-slate-500 leading-relaxed max-w-xl">
          Adjust your inventory by comparing system quantity with physical count.
        </p>
      </div>

      {/* Global Session Execution Control Suite */}
      <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
        <button className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-50 transition active:scale-[0.98] cursor-pointer">
          <Scan size={14} className="text-slate-500" strokeWidth={2.5} />
          <span>Scan Product</span>
        </button>

        <button className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-50 transition active:scale-[0.98] cursor-pointer">
          <Upload size={14} className="text-slate-500" strokeWidth={2.5} />
          <span>Import from File</span>
        </button>

        <button className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition active:scale-[0.98] cursor-pointer">
          <Plus size={15} strokeWidth={2.5} />
          <span>New Adjustment</span>
        </button>
      </div>
    </div>
  );
};

export default AdjustmentHeader;