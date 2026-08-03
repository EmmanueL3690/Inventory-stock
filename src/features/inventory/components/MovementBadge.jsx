import React from "react";

const MovementBadge = ({ type }) => {
  // Normalize string for safe lookup against variations in casing, spaces, or underscores
  const normalizedType = type?.toLowerCase().replace(/[^a-z]/g, "") || "";

  switch (normalizedType) {
    case "stockin":
      return (
        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 ring-1 ring-inset ring-emerald-500/10 select-none">
          <span className="w-1.5 h-1.5 mr-1.5 rounded-full bg-emerald-500"></span>
          Stock In
        </span>
      );
    case "stockout":
      return (
        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-rose-50 text-rose-700 border border-rose-200 ring-1 ring-inset ring-rose-500/10 select-none">
          <span className="w-1.5 h-1.5 mr-1.5 rounded-full bg-rose-500"></span>
          Stock Out
        </span>
      );
    case "adjustment":
      return (
        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200 ring-1 ring-inset ring-amber-500/10 select-none">
          <span className="w-1.5 h-1.5 mr-1.5 rounded-full bg-amber-500"></span>
          Adjustment
        </span>
      );
    case "transfer":
      return (
        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200 ring-1 ring-inset ring-blue-500/10 select-none">
          <span className="w-1.5 h-1.5 mr-1.5 rounded-full bg-blue-500"></span>
          Transfer
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200 select-none">
          <span className="w-1.5 h-1.5 mr-1.5 rounded-full bg-slate-400"></span>
          {type || "Unknown"}
        </span>
      );
  }
};

export default MovementBadge;