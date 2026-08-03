import React from 'react';
import { Search, MapPin, AlertCircle, Eye, RotateCcw } from 'lucide-react';

const AdjustmentFilters = ({ engine }) => {
  const handleReset = () => {
    engine.setSearchQuery('');
    engine.handleSelectProduct(null);
    engine.setLocationFilter('All Locations');
    engine.setReasonFilter('All Reasons');
    engine.setStatusFilter('All Status');
  };

  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between border-b border-slate-100 pb-4">
      {/* Search Bar / Product Search */}
      <div className="relative flex-1 max-w-md w-full">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={15} strokeWidth={2.5} />
        <input
          type="text"
          value={engine.searchQuery}
          onChange={(e) => engine.setSearchQuery(e.target.value)}
          placeholder="Search product by name, SKU or barcode..."
          className="w-full h-10 pl-10 pr-4 bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold rounded-xl placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition outline-none"
        />
      </div>

      {/* Select Filter Controls Suite */}
      <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto justify-start sm:justify-end">
        {/* Product Selector Dropdown */}
        <select
          value={engine.selectedProductId || ''}
          onChange={(e) => {
            const selectedId = e.target.value;
            if (!selectedId) {
              engine.handleSelectProduct(null);
            } else {
              const prod = engine.products.find((p) => (p.id || p._id) === selectedId);
              engine.handleSelectProduct(prod || null);
            }
          }}
          className="h-10 px-3 bg-white border border-slate-200 text-xs font-bold text-slate-700 rounded-xl hover:border-slate-300 transition outline-none cursor-pointer max-w-[200px]"
        >
          <option value="">All Products</option>
          {engine.products.map((p) => (
            <option key={p.id || p._id} value={p.id || p._id}>
              {p.name} ({p.sku || 'No SKU'})
            </option>
          ))}
        </select>

        {/* Warehouse Dropdown */}
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={13} />
          <select
            value={engine.locationFilter}
            onChange={(e) => engine.setLocationFilter(e.target.value)}
            className="h-10 pl-8 pr-8 bg-white border border-slate-200 text-xs font-bold text-slate-700 rounded-xl hover:border-slate-300 transition outline-none cursor-pointer appearance-none min-w-[125px]"
          >
            <option>All Locations</option>
            <option>Main Warehouse</option>
            <option>Annex Pharmacy</option>
          </select>
        </div>

        {/* Operational Variance Category Dropdown */}
        <div className="relative">
          <AlertCircle className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={13} />
          <select
            value={engine.reasonFilter}
            onChange={(e) => engine.setReasonFilter(e.target.value)}
            className="h-10 pl-8 pr-8 bg-white border border-slate-200 text-xs font-bold text-slate-700 rounded-xl hover:border-slate-300 transition outline-none cursor-pointer appearance-none min-w-[120px]"
          >
            <option>All Reasons</option>
            <option value="DAMAGE">DAMAGE</option>
            <option value="LOST">LOST</option>
          </select>
        </div>

        {/* Verification Tracking Dropdown */}
        <div className="relative">
          <Eye className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={13} />
          <select
            value={engine.statusFilter}
            onChange={(e) => engine.setStatusFilter(e.target.value)}
            className="h-10 pl-8 pr-8 bg-white border border-slate-200 text-xs font-bold text-slate-700 rounded-xl hover:border-slate-300 transition outline-none cursor-pointer appearance-none min-w-[115px]"
          >
            <option>All Status</option>
            <option>Pending</option>
            <option>Confirmed</option>
          </select>
        </div>

        {/* Global Reset Button */}
        <button
          onClick={handleReset}
          className="h-10 px-3 border border-slate-200 bg-white rounded-xl text-slate-500 hover:text-slate-800 hover:border-slate-300 transition active:scale-[0.97] cursor-pointer flex items-center justify-center gap-1.5 text-xs font-bold"
          title="Reset Filters"
        >
          <RotateCcw size={13} strokeWidth={2.5} />
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>
    </div>
  );
};

export default AdjustmentFilters;