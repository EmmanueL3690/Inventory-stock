import React from "react";
import { Search } from "lucide-react";

const PurchaseSearch = ({ value, onChange }) => {
  return (
    <div className="relative w-full lg:max-w-xs xl:max-w-md">
      <Search
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by PO no., supplier, or product..."
        className="w-full h-11 bg-white border border-slate-200 rounded-xl pl-11 pr-4 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 transition duration-150"
      />
    </div>
  );
};

export default PurchaseSearch;