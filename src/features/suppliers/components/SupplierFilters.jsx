import React from 'react';
import { 
  Search, 
  Filter, 
  RotateCcw, 
  LayoutGrid, 
  List 
} from 'lucide-react';

const SupplierFilters = ({
  filters = {},
  onFilterChange,
  viewMode = 'table',
  onViewModeChange,
}) => {
  const {
    searchQuery = '',
    selectedStatus = '',
    selectedType = '',
  } = filters;

  // Supplier Types as specified in backend documentation
  const supplierTypes = [
    { label: 'All Types', value: '' },
    { label: 'Distributor', value: 'Distributor' },
    { label: 'Manufacturer', value: 'Manufacturer' },
    { label: 'Retail Store', value: 'Retail Store' },
    { label: 'Open Market', value: 'Open Market' },
    { label: 'Generic', value: 'Generic' },
  ];

  // Status Filter options
  const statusOptions = [
    { label: 'All Statuses', value: '' },
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' },
  ];

  // Reset all filters back to default empty values
  const handleReset = () => {
    onFilterChange?.({
      searchQuery: '',
      selectedStatus: '',
      selectedType: '',
      currentPage: 1,
    });
  };

  const hasActiveFilters = Boolean(searchQuery || selectedStatus || selectedType);

  return (
    <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 w-full">
      {/* Left Cluster: Search Input & Dropdown Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
        
        {/* Search Input */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) =>
              onFilterChange?.({ searchQuery: e.target.value, currentPage: 1 })
            }
            placeholder="Search by name, email, phone, or contact..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          />
        </div>

        {/* Status Filter */}
        <div className="sm:w-40">
          <select
            value={selectedStatus}
            onChange={(e) =>
              onFilterChange?.({ selectedStatus: e.target.value, currentPage: 1 })
            }
            className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer"
          >
            {statusOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Supplier Type Filter */}
        <div className="sm:w-44">
          <select
            value={selectedType}
            onChange={(e) =>
              onFilterChange?.({ selectedType: e.target.value, currentPage: 1 })
            }
            className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer"
          >
            {supplierTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        {/* Reset Filters Button */}
        {hasActiveFilters && (
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 rounded-lg hover:bg-rose-100 dark:hover:bg-rose-900/60 transition-all cursor-pointer shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Right Cluster: Table / Grid View Toggle */}
      <div className="flex items-center justify-end gap-1 shrink-0 self-end lg:self-auto border-t lg:border-t-0 pt-2 lg:pt-0 border-slate-100 dark:border-slate-800">
        <button
          type="button"
          onClick={() => onViewModeChange?.('table')}
          title="Table View"
          className={`p-2 rounded-lg border transition-all cursor-pointer ${
            viewMode === 'table'
              ? 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-indigo-600 dark:text-indigo-400'
              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
          }`}
        >
          <List className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => onViewModeChange?.('grid')}
          title="Grid View"
          className={`p-2 rounded-lg border transition-all cursor-pointer ${
            viewMode === 'grid'
              ? 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-indigo-600 dark:text-indigo-400'
              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
          }`}
        >
          <LayoutGrid className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default SupplierFilters;