import React from 'react';
import { Search, RotateCcw, Plus, Loader2, AlertCircle } from 'lucide-react';

export default function StockInForm({
  formData,
  searchQuery,
  setSearchQuery,
  isDropdownOpen,
  setIsDropdownOpen,
  selectedProductId,
  onInputChange,
  onProductSelect,
  onReset,
  onSubmit,
  products = [],
  loadingProducts,
  errorProducts,
}) {

  // Filter dynamic catalog matching client query parameters
  const filteredProducts = products.filter((product) =>
    product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.sku?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden transition-shadow duration-200 hover:shadow-md">
      {/* Form Title banner */}
      <div className="p-5 border-b border-slate-100 bg-slate-50/50">
        <h2 className="font-bold text-slate-900 tracking-tight text-base">
          Incoming Stock Registration
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Enter details of received batch item. All marked fields are required.
        </p>
      </div>

      <form onSubmit={onSubmit} className="p-6 space-y-6">
        
        {/* Searchable Select Product Input */}
        <div className="relative">
          <label 
            htmlFor="product-search" 
            className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2"
          >
            Product <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          <div className="relative">
            <input
              id="product-search"
              type="text"
              placeholder="Search product by name or SKU..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsDropdownOpen(true);
              }}
              onFocus={() => setIsDropdownOpen(true)}
              className="w-full h-11 pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition-all shadow-sm"
              aria-expanded={isDropdownOpen}
              aria-haspopup="listbox"
              required
            />
            <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400 pointer-events-none" />
          </div>

          {/* Dropdown Box Menu overlay */}
          {isDropdownOpen && (
            <div 
              className="absolute z-20 w-full mt-1.5 bg-white border border-slate-200 rounded-lg shadow-lg max-h-60 overflow-y-auto divide-y divide-slate-100 focus:outline-none"
              role="listbox"
            >
              {/* API Loading State Display */}
              {loadingProducts && (
                <div className="p-4 flex items-center justify-center gap-2 text-sm text-slate-500 font-medium">
                  <Loader2 className="h-4 w-4 animate-spin text-indigo-600" />
                  <span>Loading products...</span>
                </div>
              )}

              {/* API Error State Display */}
              {!loadingProducts && errorProducts && (
                <div className="p-4 flex items-center justify-center gap-2 text-sm text-red-600 font-semibold bg-red-50/50">
                  <AlertCircle className="h-4 w-4 text-red-500 shrink-0" />
                  <span>{errorProducts}</span>
                </div>
              )}

              {/* Products List Rendering */}
              {!loadingProducts && !errorProducts && (
                filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <button
                      key={product._id}
                      type="button"
                      role="option"
                      aria-selected={selectedProductId === product._id}
                      onClick={() => onProductSelect(product)}
                      className="w-full text-left px-4 py-3 hover:bg-slate-50 focus:bg-slate-50 focus:outline-none transition-colors flex justify-between items-center text-sm"
                    >
                      <div className="pr-2">
                        <span className="font-semibold text-slate-900 block tracking-tight">{product.name}</span>
                        <span className="text-xs text-slate-500 font-mono mt-0.5 block">{product.sku}</span>
                      </div>
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

        {/* Quantity & Cost Price Input fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label 
              htmlFor="stock-quantity" 
              className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2"
            >
              Quantity <span className="text-red-500" aria-hidden="true">*</span>
            </label>
            <input
              id="stock-quantity"
              type="number"
              name="quantity"
              placeholder="0"
              min="1"
              value={formData.quantity}
              onChange={onInputChange}
              className="w-full h-11 px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition-all shadow-sm"
              required
            />
          </div>

          <div>
            <label 
              htmlFor="stock-cost-price" 
              className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2"
            >
              Cost Price (₦) <span className="text-red-500" aria-hidden="true">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-3 text-sm font-semibold text-slate-400 pointer-events-none">₦</span>
              <input
                id="stock-cost-price"
                type="number"
                name="costPrice"
                placeholder="0.00"
                step="0.01"
                min="0"
                value={formData.costPrice}
                onChange={onInputChange}
                className="w-full h-11 pl-8 pr-3.5 py-2.5 border border-slate-200 rounded-lg text-sm bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition-all shadow-sm"
                required
              />
            </div>
          </div>
        </div>

        {/* Batch Number Input */}
        <div>
          <label 
            htmlFor="stock-batch" 
            className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2"
          >
            Batch Number <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          <input
            id="stock-batch"
            type="text"
            name="batchNumber"
            placeholder="e.g. BAT-2026-X"
            value={formData.batchNumber}
            onChange={onInputChange}
            className="w-full h-11 px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition-all shadow-sm"
            required
          />
        </div>

        {/* Notes Textarea */}
        <div>
          <label 
            htmlFor="stock-notes" 
            className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2"
          >
            Notes
          </label>
          <textarea
            id="stock-notes"
            name="notes"
            rows="3"
            placeholder="Add delivery notes, supplier remarks, or warehouse comments..."
            value={formData.notes}
            onChange={onInputChange}
            className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition-all resize-none shadow-sm"
          ></textarea>
        </div>

        {/* Standardized Form Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            type="button"
            onClick={onReset}
            className="w-full sm:flex-1 h-11 inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-200 text-slate-700 text-sm font-semibold rounded-lg hover:bg-slate-50 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 active:bg-slate-100 transition-all"
          >
            <RotateCcw className="h-4 w-4 shrink-0" />
            Reset Form
          </button>
          
          <button
            type="submit"
            className="w-full sm:flex-1 h-11 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 active:bg-indigo-800 transition-all shadow-sm"
          >
            <Plus className="h-4 w-4 shrink-0" />
            Save Stock
          </button>
        </div>

      </form>
    </div>
  );
}