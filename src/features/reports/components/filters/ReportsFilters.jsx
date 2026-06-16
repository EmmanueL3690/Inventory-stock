import React from 'react';
import {
  Calendar,
  Filter,
  RotateCcw,
} from "lucide-react";

const ReportsFilters = () => {
  return (
    /* Layout Layer: Uses flex-wrap to stack elegantly on mobile viewports 
       while remaining a single clean horizontal bar on desktop.
    */
    <div className="bg-white border border-slate-100 rounded-2xl p-4 flex flex-wrap items-center gap-3 w-full shadow-sm">
      
      {/* Date Picker Trigger Button */}
      <button className="h-10 px-3.5 bg-slate-50/50 hover:bg-slate-50 active:scale-[0.98] border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 flex items-center gap-2 transition-all outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
        <Calendar size={15} className="text-slate-400 stroke-[2.2]" />
        <span className="truncate">May 1, 2026 - May 11, 2026</span>
      </button>

      {/* Categories Select Dropdown */}
      <div className="relative flex-1 min-w-[140px] sm:flex-none">
        <select className="w-full h-10 pl-3.5 pr-9 appearance-none bg-slate-50/50 hover:bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 transition-all outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
          <option>All Categories</option>
          <option>Sales</option>
          <option>Inventory</option>
          <option>Expenses</option>
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2.5 pointer-events-none text-slate-400">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Sub-categories Select Dropdown */}
      <div className="relative flex-1 min-w-[140px] sm:flex-none">
        <select className="w-full h-10 pl-3.5 pr-9 appearance-none bg-slate-50/50 hover:bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 transition-all outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
          <option>All Sub-categories</option>
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2.5 pointer-events-none text-slate-400">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Locations Select Dropdown */}
      <div className="relative flex-1 min-w-[140px] sm:flex-none">
        <select className="w-full h-10 pl-3.5 pr-9 appearance-none bg-slate-50/50 hover:bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 transition-all outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
          <option>All Locations</option>
          <option>Warehouse A</option>
          <option>Store Front</option>
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2.5 pointer-events-none text-slate-400">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Advanced Filters Callout Button */}
      <button className="h-10 px-3.5 bg-slate-50/50 hover:bg-slate-50 active:scale-[0.98] border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 flex items-center gap-2 transition-all outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
        <Filter size={15} className="text-slate-400 stroke-[2.2]" />
        <span>More Filters</span>
      </button>

      {/* Reset Action Button: Aligns to right side on desktop layouts via md:ml-auto */}
      <button className="w-full sm:w-auto md:ml-auto h-10 px-4 bg-white hover:bg-rose-50 hover:text-rose-600 hover:border-rose-100 active:scale-[0.98] border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 flex items-center justify-center gap-2 transition-all outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 group">
        <RotateCcw size={14} className="text-slate-400 group-hover:text-rose-500 group-hover:rotate-[-45deg] transition-all stroke-[2.2]" />
        <span>Reset Filters</span>
      </button>

    </div>
  );
};

export default ReportsFilters;