import React from 'react';
import { RotateCcw, ArrowUpRight, AlertCircle } from 'lucide-react';
import ProductSearchDropdown from './ProductSearchDropdown';
import { STOCK_OUT_REASONS } from '../constants/stockOutConstants';

export default function StockOutForm({
  formData,
  searchQuery,
  setSearchQuery,
  isDropdownOpen,
  setIsDropdownOpen,
  selectedProductId,
  selectedProduct,
  errors,
  loading,
  products = [],
  loadingProducts = false,
  errorProducts = null,
  expectedRemainingStock,
  onInputChange,
  onProductSelect,
  onReset,
  onSubmit,
}) {
  const isInsufficient = expectedRemainingStock !== null && expectedRemainingStock < 0;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden transition-shadow duration-200 hover:shadow-md">
      <div className="p-5 border-b border-slate-100 bg-slate-50/50">
        <h2 className="font-bold text-slate-900 tracking-tight text-base">
          Stock Out Dispatch Form
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Perform stock exits. Remaining stock metric updates dynamically.
        </p>
      </div>

      <form onSubmit={onSubmit} className="p-6 space-y-6">
        
        {/* API-connected Searchable selector component wrapper */}
        <ProductSearchDropdown 
          products={products}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          isDropdownOpen={isDropdownOpen}
          onToggleDropdown={setIsDropdownOpen}
          onProductSelect={onProductSelect}
          selectedProductId={selectedProductId}
          selectedProduct={selectedProduct}
          error={errors.product}
          loadingProducts={loadingProducts}
          errorProducts={errorProducts}
        />

        {/* Live Inventory Preview Metrics */}
        {selectedProduct && (
          <div className="grid grid-cols-2 gap-4 p-4 rounded-lg border border-slate-100 bg-slate-50/50 text-xs">
            <div>
              <span className="text-slate-400 font-bold block uppercase tracking-wider">Current Stock:</span>
              <span className="text-[15px] font-black text-slate-900 block mt-1">{selectedProduct.currentStock ?? 0} Units</span>
            </div>
            <div>
              <span className="text-slate-400 font-bold block uppercase tracking-wider">Expected Remaining:</span>
              <span className={`text-[15px] font-black block mt-1 ${isInsufficient ? 'text-rose-600' : 'text-emerald-600'}`}>
                {expectedRemainingStock !== null ? `${expectedRemainingStock} Units` : '--'}
              </span>
            </div>
          </div>
        )}

        {/* Insufficient Stock Warning Alert Box */}
        {isInsufficient && (
          <div className="flex gap-2.5 p-3.5 bg-rose-50 border border-rose-100 rounded-lg text-rose-700 text-xs font-semibold animate-pulse">
            <AlertCircle className="h-4 w-4 shrink-0 text-rose-500" />
            <span>Warning: Insufficient stock. You cannot output more stock than currently available.</span>
          </div>
        )}

        {/* Quantity & Reason */}
        <div className="grid grid-cols-1 gap-5">
          <div>
            <label 
              htmlFor="out-quantity" 
              className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2"
            >
              Quantity <span className="text-rose-500">*</span>
            </label>
            <input
              id="out-quantity"
              type="number"
              name="quantity"
              placeholder="0"
              min="1"
              value={formData.quantity}
              onChange={onInputChange}
              className={`w-full h-11 px-3.5 py-2.5 border rounded-lg text-sm bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all shadow-sm ${
                errors.quantity ? 'border-rose-300 ring-2 ring-rose-600/5' : 'border-slate-200'
              }`}
              required
            />
            {errors.quantity && <p className="text-xs text-rose-600 font-semibold mt-1.5">{errors.quantity}</p>}
          </div>

          <div>
            <label 
              htmlFor="out-reason" 
              className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2"
            >
              Reason <span className="text-rose-500">*</span>
            </label>
            <select
              id="out-reason"
              name="reason"
              value={formData.reason}
              onChange={onInputChange}
              className={`w-full h-11 px-3 py-2.5 border rounded-lg text-sm bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all shadow-sm cursor-pointer ${
                errors.reason ? 'border-rose-300 ring-2 ring-rose-600/5' : 'border-slate-200'
              }`}
              required
            >
              <option value="">Select Reason</option>
              {STOCK_OUT_REASONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            {errors.reason && <p className="text-xs text-rose-600 font-semibold mt-1.5">{errors.reason}</p>}
          </div>
        </div>

        {/* Notes */}
        <div>
          <label 
            htmlFor="out-notes" 
            className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2"
          >
            Notes
          </label>
          <textarea
            id="out-notes"
            name="notes"
            rows="4"
            placeholder="Add dispatch logs, reference parameters, or warehouse instructions..."
            value={formData.notes}
            onChange={onInputChange}
            className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all resize-none shadow-sm"
          ></textarea>
        </div>

        {/* Form Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            type="button"
            onClick={onReset}
            disabled={loading}
            className="w-full sm:flex-1 h-11 inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-200 bg-white text-slate-700 text-sm font-bold rounded-lg hover:bg-slate-50 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 active:bg-slate-100 disabled:opacity-55 transition-all"
          >
            <RotateCcw className="h-4 w-4 shrink-0 text-slate-500" />
            Cancel
          </button>
          
          <button
            type="submit"
            disabled={loading || isInsufficient}
            className="w-full sm:flex-1 h-11 inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white text-sm font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 disabled:opacity-55 disabled:pointer-events-none transition-all shadow-sm whitespace-nowrap"
          >
            <ArrowUpRight className="h-4 w-4 shrink-0" />
            <span>{loading ? 'Processing...' : 'Process Stock Out'}</span>
          </button>
        </div>

      </form>
    </div>
  );
}