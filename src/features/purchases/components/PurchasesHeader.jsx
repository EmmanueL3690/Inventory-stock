import React from 'react';
import { 
  Plus, 
  Download, 
  Upload, 
  RotateCw, 
  PackageCheck, 
  RotateCcw, 
  ChevronRight, 
  Radio 
} from 'lucide-react';

const PurchasesHeader = ({
  onNewPurchase,
  onImport,
  onExport,
  onRefresh,
  onReceiveItems,
  onPurchaseReturns,
  loading = false,
}) => {
  return (
    <div className="w-full space-y-4">
      {/* Top Bar: Breadcrumb & Live Updates Badge */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <nav className="flex items-center space-x-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
          <span>Dashboard</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span>Procurement</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 dark:text-slate-100 font-semibold">Purchase Orders</span>
        </nav>

        {/* Live Updates Badge */}
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60">
          <Radio className="w-3 h-3 text-emerald-500 animate-pulse" />
          <span>Live Updates</span>
        </div>
      </div>

      {/* Main Header Content & Action Cluster */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        
        {/* Title & Description */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Purchase Orders
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage vendor procurements, track incoming inventory, and oversee purchase returns.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Refresh Button */}
          <button
            type="button"
            onClick={() => onRefresh?.()}
            disabled={loading}
            title="Refresh Data"
            className="inline-flex items-center justify-center p-2 text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/80 focus:outline-none focus:ring-2 focus:ring-slate-400/20 transition-all disabled:opacity-50 cursor-pointer"
          >
            <RotateCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

          {/* Import Button */}
          <button
            type="button"
            onClick={() => onImport?.()}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/80 focus:outline-none focus:ring-2 focus:ring-slate-400/20 transition-all cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5 text-slate-500" />
            <span>Import</span>
          </button>

          {/* Export Button */}
          <button
            type="button"
            onClick={() => onExport?.()}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/80 focus:outline-none focus:ring-2 focus:ring-slate-400/20 transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export</span>
          </button>

          {/* Purchase Returns Button */}
          <button
            type="button"
            onClick={() => onPurchaseReturns?.()}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 rounded-lg hover:bg-rose-100 dark:hover:bg-rose-950/70 focus:outline-none focus:ring-2 focus:ring-rose-500/20 transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Purchase Returns</span>
          </button>

          {/* Receive Items Button */}
          <button
            type="button"
            onClick={() => onReceiveItems?.()}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-950/70 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all cursor-pointer"
          >
            <PackageCheck className="w-3.5 h-3.5" />
            <span>Receive Items</span>
          </button>

          {/* Primary Action: New Purchase */}
          <button
            type="button"
            onClick={() => onNewPurchase?.()}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-lg shadow-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>New Purchase</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default PurchasesHeader;