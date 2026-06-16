import React from 'react';
import { Search, ChevronDown, Calendar, CheckCircle2 } from 'lucide-react';

const AlertsFilters = ({
  searchQuery,
  onSearchChange,
  selectedType,
  onTypeChange,
  selectedStatus,
  onStatusChange,
  onMarkAllRead
}) => {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      {/* Search Input Container */}
      <div className="relative w-full lg:max-w-xs xl:max-w-sm">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search alerts..."
          className="w-full h-11 bg-white border border-slate-200 rounded-xl pl-11 pr-4 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 transition duration-150"
        />
      </div>

      {/* Selectors and Control Modifiers Grid */}
      <div className="grid grid-cols-2 flex-wrap items-center gap-3 sm:flex w-full lg:w-auto">
        {/* Type Selector Dropdown */}
        <div className="relative h-11 bg-white border border-slate-200 rounded-xl flex items-center px-3 hover:bg-slate-50 transition group cursor-pointer shadow-sm min-w-[120px]">
          <select
            value={selectedType}
            onChange={(e) => onTypeChange(e.target.value)}
            className="w-full bg-transparent text-sm font-semibold text-slate-700 outline-none pr-7 appearance-none cursor-pointer z-10"
          >
            <option value="All Types">All Types</option>
            <option value="Critical">Critical</option>
            <option value="Low Stock">Low Stock</option>
            <option value="Info">Info</option>
            <option value="Resolved">Resolved</option>
          </select>
          <ChevronDown size={16} className="absolute right-3 text-slate-400 group-hover:text-slate-600 transition pointer-events-none" />
        </div>

        {/* Status Selector Dropdown */}
        <div className="relative h-11 bg-white border border-slate-200 rounded-xl flex items-center px-3 hover:bg-slate-50 transition group cursor-pointer shadow-sm min-w-[120px]">
          <select
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full bg-transparent text-sm font-semibold text-slate-700 outline-none pr-7 appearance-none cursor-pointer z-10"
          >
            <option value="All Status">All Status</option>
            <option value="New">New</option>
            <option value="Read">Read</option>
            <option value="Resolved">Resolved</option>
          </select>
          <ChevronDown size={16} className="absolute right-3 text-slate-400 group-hover:text-slate-600 transition pointer-events-none" />
        </div>

        {/* Date Filter Triggers */}
        <button className="inline-flex h-11 col-span-2 sm:col-span-1 items-center justify-center sm:justify-start gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-600 shadow-sm hover:bg-slate-50 transition">
          <Calendar size={16} className="text-slate-400" />
          <span>Select Date Range</span>
          <ChevronDown size={16} className="text-slate-400 ml-auto sm:ml-1" />
        </button>

        {/* Bulk System Action Button */}
        <button
          onClick={onMarkAllRead}
          className="col-span-2 sm:col-span-1 inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50/50 px-4 text-sm font-bold text-blue-600 shadow-xs hover:bg-blue-100/70 transition active:scale-[0.98]"
        >
          <CheckCircle2 size={16} />
          <span>Mark all as read</span>
        </button>
      </div>
    </div>
  );
};

export default AlertsFilters;