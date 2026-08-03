import React from 'react';
import { 
  ChevronRight, 
  RotateCw, 
  Download, 
  Upload, 
  Plus 
} from 'lucide-react';

const SupplierHeader = ({
  onAddSupplier,
  onRefresh,
  onImport,
  onExport,
  loading = false,
}) => {
  return (
    <div className="w-full space-y-4">
      {/* Top Bar: Breadcrumb Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <nav className="flex items-center space-x-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
          <span>Dashboard</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span>Procurement</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 dark:text-slate-100 font-semibold">
            Suppliers
          </span>
        </nav>
      </div>

      {/* Main Header Content & Action Cluster */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        {/* Title & Subtitle */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Supplier Management
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage vendor relationships, contacts, performance, and procurement sources.
          </p>
        </div>

        {/* Right Side Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Refresh Button */}
          <button
            type="button"
            onClick={() => onRefresh?.()}
            disabled={loading}
            title="Refresh Suppliers"
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

          {/* Add Supplier Primary Button */}
          <button
            type="button"
            onClick={() => onAddSupplier?.()}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-500 rounded-lg shadow-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 text-white" />
            <span>Add Supplier</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SupplierHeader;