import React from "react";
import { Calendar } from "lucide-react";

const PurchaseDateFilter = () => {
  return (
    <button className="inline-flex h-11 col-span-2 sm:col-span-1 items-center justify-center sm:justify-start gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 transition">
      <span>May 1, 2025 - May 11, 2025</span>
      <Calendar size={16} className="text-slate-400 ml-auto sm:ml-0" />
    </button>
  );
};

export default PurchaseDateFilter;