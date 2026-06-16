import React from "react";
import { Download, Upload, Plus } from "lucide-react";

const PurchasesHeader = ({ onNewPurchaseClick }) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Purchases
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Track and manage all your purchase orders and receipts.
        </p>
      </div>

      {/* Action Buttons Group */}
      <div className="flex items-center gap-3 self-start sm:self-auto">
        <button className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 hover:text-slate-900 transition active:scale-[0.98]">
          <Download size={16} className="text-slate-500" />
          <span>Import</span>
        </button>

        <button className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 hover:text-slate-900 transition active:scale-[0.98]">
          <Upload size={16} className="text-slate-500" />
          <span>Export</span>
        </button>

        <button
          onClick={onNewPurchaseClick}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition active:scale-[0.98]"
        >
          <Plus size={16} />
          <span>New Purchase</span>
        </button>
      </div>
    </div>
  );
};

export default PurchasesHeader;