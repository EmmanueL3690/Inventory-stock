import React from "react";
import { ChevronDown } from "lucide-react";

const SupplierFilter = ({ value, onChange }) => {
  const suppliers = ["All Suppliers", "MedPlus Distributors", "LifeCare Supplies", "Pharma World Ltd.", "Global Healthcare", "Sunny Foods Ltd.", "Best Chemist Co."];

  return (
    <div className="relative h-11 bg-white border border-slate-200 rounded-xl flex items-center px-3 hover:bg-slate-50 transition group cursor-pointer shadow-sm">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent text-sm font-semibold text-slate-700 outline-none pr-7 appearance-none cursor-pointer z-10"
      >
        {suppliers.map((supplier) => (
          <option key={supplier} value={supplier}>{supplier}</option>
        ))}
      </select>
      <ChevronDown size={16} className="absolute right-3 text-slate-400 group-hover:text-slate-600 transition pointer-events-none" />
    </div>
  );
};

export default SupplierFilter;