import React from "react";
import { ChevronDown } from "lucide-react";

const PurchaseStatusFilter = ({ value, onChange }) => {
  const statuses = ["All Statuses", "Paid", "Partial", "Unpaid", "Completed", "Pending", "Partially Received"];

  return (
    <div className="relative h-11 bg-white border border-slate-200 rounded-xl flex items-center px-3 hover:bg-slate-50 transition group cursor-pointer shadow-sm">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent text-sm font-semibold text-slate-700 outline-none pr-7 appearance-none cursor-pointer z-10"
      >
        {statuses.map((status) => (
          <option key={status} value={status}>{status === "All Statuses" ? "All Status" : status}</option>
        ))}
      </select>
      <ChevronDown size={16} className="absolute right-3 text-slate-400 group-hover:text-slate-600 transition pointer-events-none" />
    </div>
  );
};

export default PurchaseStatusFilter;