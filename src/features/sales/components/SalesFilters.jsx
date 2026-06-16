import React from "react";

const SalesFilters = () => {
  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-4 sm:p-5 mb-6 shadow-sm">
      {/* Grid system adapts fluidly: 1 col on mobile, 2 on tablet, full row on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:flex lg:items-center gap-3.5">
        
        {/* Search Input - Expands to take remaining space on desktop */}
        <div className="relative md:col-span-2 lg:flex-1">
          <input
            type="text"
            placeholder="Search by invoice, customer, product..."
            className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all focus:outline-none"
          />
        </div>

        {/* Date Input */}
        <div className="w-full lg:w-auto">
          <input
            type="date"
            className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-600 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all focus:outline-none"
          />
        </div>

        {/* Customer Select */}
        <div className="w-full lg:w-auto">
          <select className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-600 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all focus:outline-none appearance-none cursor-pointer">
            <option>All Customers</option>
          </select>
        </div>

        {/* Status Select */}
        <div className="w-full lg:w-auto">
          <select className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-600 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all focus:outline-none appearance-none cursor-pointer">
            <option>All Status</option>
          </select>
        </div>

        {/* More Filters Button */}
        <div className="w-full lg:w-auto md:col-span-2 lg:col-span-1">
          <button className="w-full inline-flex justify-center items-center px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-200">
            <span>Filters</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default SalesFilters;