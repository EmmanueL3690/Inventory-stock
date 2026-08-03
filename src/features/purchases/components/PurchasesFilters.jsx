import React from 'react';
import { 
  Search, 
  RotateCw, 
  Plus 
} from 'lucide-react';

const PurchasesFilters = ({
  searchQuery = '',
  setSearchQuery,
  selectedSupplier = '',
  setSelectedSupplier,
  selectedStatus = '',
  setSelectedStatus,
  suppliers = [],
  onRefresh,
  onOpenNewModal,
  loading = false,
}) => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs space-y-4 lg:space-y-0">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        
        {/* Left Side: Search & Filter Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
          
          {/* Search Input (PO Number or Supplier Name) */}
          <div className="relative flex-1 min-w-[240px]">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
              placeholder="Search PO # or supplier..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 rounded-lg text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:focus:border-indigo-500 transition-all"
            />
          </div>

          {/* Supplier Dropdown */}
          <div className="w-full sm:w-48">
            <select
              value={selectedSupplier}
              onChange={(e) => setSelectedSupplier && setSelectedSupplier(e.target.value)}
              className="w-full py-2 px-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 rounded-lg text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:focus:border-indigo-500 transition-all cursor-pointer"
            >
              <option value="">All Suppliers</option>
              {suppliers.map((sup) => {
                const id = sup._id || sup.id;
                const name = sup.name || sup.supplierName || 'Unnamed Supplier';
                return (
                  <option key={id} value={id}>
                    {name}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Payment Status Dropdown */}
          <div className="w-full sm:w-44">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus && setSelectedStatus(e.target.value)}
              className="w-full py-2 px-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 rounded-lg text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:focus:border-indigo-500 transition-all cursor-pointer"
            >
              <option value="">All</option>
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="partially_paid">Partially Paid</option>
            </select>
          </div>
        </div>

        {/* Right Side: Action Buttons */}
        <div className="flex items-center gap-2 self-end lg:self-auto w-full sm:w-auto">
          
          {/* Refresh Button */}
          {onRefresh && (
            <button
              type="button"
              onClick={onRefresh}
              disabled={loading}
              title="Refresh Data"
              className="p-2 text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/60 focus:outline-none focus:ring-2 focus:ring-slate-400/20 transition-all disabled:opacity-50 cursor-pointer"
            >
              <RotateCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          )}

          {/* New Purchase Button */}
          {onOpenNewModal && (
            <button
              type="button"
              onClick={onOpenNewModal}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-medium text-sm rounded-lg shadow-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>New Purchase</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

export default PurchasesFilters;