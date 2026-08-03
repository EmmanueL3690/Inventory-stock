import React from 'react';
import { Search, Loader2, AlertCircle } from 'lucide-react';

export default function ProductSearchDropdown({
  products = [],
  searchQuery,
  onSearchChange,
  isDropdownOpen,
  onToggleDropdown,
  onProductSelect,
  selectedProductId,
  error,
  loadingProducts = false,
  errorProducts = null,
}) {
  const filteredProducts = products.filter((p) =>
    p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.sku?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative">
      <label 
        htmlFor="prod-search" 
        className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2"
      >
        Select Product <span className="text-rose-500">*</span>
      </label>
      <div className="relative">
        <input
          id="prod-search"
          type="text"
          placeholder="Search product by name or SKU..."
          value={searchQuery}
          onChange={(e) => {
            onSearchChange(e.target.value);
            onToggleDropdown(true);
          }}
          onFocus={() => onToggleDropdown(true)}
          className={`w-full h-11 pl-10 pr-4 py-2.5 border rounded-lg text-sm bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all shadow-sm ${
            error ? 'border-rose-300 ring-2 ring-rose-600/5' : 'border-slate-200'
          }`}
          aria-expanded={isDropdownOpen}
          aria-haspopup="listbox"
          required
        />
        <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400 pointer-events-none" />
      </div>

      {error && <p className="text-xs text-rose-600 font-semibold mt-1.5">{error}</p>}

      {isDropdownOpen && (
        <div 
          className="absolute z-20 w-full mt-2 bg-white border border-slate-200 rounded-lg shadow-lg max-h-60 overflow-y-auto divide-y divide-slate-100 focus:outline-none"
          role="listbox"
        >
          {/* Active Loading State */}
          {loadingProducts && (
            <div className="p-4 flex items-center justify-center gap-2 text-xs text-slate-500">
              <Loader2 className="h-4 w-4 animate-spin text-indigo-600" />
              <span>Loading products...</span>
            </div>
          )}

          {/* Error Fetching Products */}
          {!loadingProducts && errorProducts && (
            <div className="p-4 flex items-center gap-2 text-xs text-rose-600 font-semibold bg-rose-50/50">
              <AlertCircle className="h-4 w-4 text-rose-500 shrink-0" />
              <span>Unable to load products.</span>
            </div>
          )}

          {/* List Display */}
          {!loadingProducts && !errorProducts && (
            filteredProducts.length > 0 ? (
              filteredProducts.map((p) => (
                <button
                  key={p._id}
                  type="button"
                  role="option"
                  aria-selected={selectedProductId === p._id}
                  onClick={() => onProductSelect(p)}
                  className="w-full text-left px-4 py-3 hover:bg-slate-50 focus:bg-slate-50 focus:outline-none transition-colors flex justify-between items-center text-sm"
                >
                  <div className="pr-2">
                    <span className="font-bold text-slate-900 block text-[14px] leading-tight tracking-tight">
                      {p.name}
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono mt-1 block">
                      SKU: {p.sku} • {p.category || 'No Category'}
                    </span>
                  </div>
                  <span className="shrink-0 text-xs bg-slate-100 text-slate-600 border border-slate-200/50 px-2.5 py-1 rounded-full font-bold">
                    Stock: {p.currentStock ?? 0}
                  </span>
                </button>
              ))
            ) : (
              <div className="p-4 text-center text-xs text-slate-400 font-medium">
                No matching products found
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}