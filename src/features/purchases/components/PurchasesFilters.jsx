import React from "react";
import PurchaseSearch from "./PurchaseSearch";
import PurchaseDateFilter from "./PurchaseDateFilter";
import SupplierFilter from "./SupplierFilter";
import PurchaseStatusFilter from "./PurchaseStatusFilter";
import { Filter, Grid2X2, List } from "lucide-react";

const PurchasesFilters = ({
  searchQuery,
  onSearchChange,
  selectedSupplier,
  onSupplierChange,
  selectedStatus,
  onStatusChange,
  viewMode,
  setViewMode,
}) => {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      {/* Left Segment: Search Box Module */}
      <PurchaseSearch value={searchQuery} onChange={onSearchChange} />

      {/* Right Segment: Dropdowns & Controls Grid */}
      <div className="grid grid-cols-2 flex-wrap items-center gap-3 sm:flex w-full lg:w-auto">
        <PurchaseDateFilter />
        
        <SupplierFilter 
          value={selectedSupplier} 
          onChange={onSupplierChange} 
        />
        
        <PurchaseStatusFilter 
          value={selectedStatus} 
          onChange={onStatusChange} 
        />

        {/* Global Filter Button */}
        <button className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition active:scale-[0.98]">
          <Filter size={16} className="text-slate-400" />
          <span>Filters</span>
        </button>

        {/* Layout Engine View Toggles */}
        <div className="col-span-2 flex h-11 items-center gap-1 rounded-xl bg-slate-100 p-1 sm:col-span-1">
          <button
            onClick={() => setViewMode("grid")}
            className={`flex flex-1 items-center justify-center rounded-lg px-3 py-1.5 transition sm:flex-none ${
              viewMode === "grid"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <Grid2X2 size={16} />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`flex flex-1 items-center justify-center rounded-lg px-3 py-1.5 transition sm:flex-none ${
              viewMode === "list"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <List size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PurchasesFilters;