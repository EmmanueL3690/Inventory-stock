import React from "react";
import { useNavigate } from "react-router-dom";
import { Package, Plus } from "lucide-react";

const EmptyInventory = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[450px] p-8 text-center bg-white border border-slate-200/80 rounded-2xl shadow-sm max-w-xl mx-auto my-6">
      
      {/* Visual Indicator Container */}
      <div className="relative flex items-center justify-center w-20 h-20 bg-slate-50 border border-slate-100 rounded-2xl text-slate-400 mb-6 shadow-inner animate-pulse">
        <Package size={40} strokeWidth={1.5} className="text-slate-400" />
        <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1 rounded-lg border-2 border-white shadow-sm">
          <Plus size={14} strokeWidth={3} />
        </div>
      </div>

      {/* Primary Context Typography */}
      <h3 className="text-xl font-bold text-slate-900 tracking-tight">
        No Inventory Found
      </h3>
      
      <p className="mt-2 text-sm text-slate-500 max-w-sm leading-relaxed">
        You haven't added any products to inventory yet. Get started by adding your first trackable item or SKU to the database.
      </p>

      {/* Call to Action Controls */}
      <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
        <button
          type="button"
          onClick={() => navigate("/inventory/products/add")}
          className="inline-flex items-center justify-center px-5 py-2.5 w-full sm:w-auto text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-xl shadow-sm hover:shadow transition-all duration-150 group"
        >
          <Plus size={16} strokeWidth={2.5} className="mr-2" />
          Add Product
        </button>
      </div>

    </div>
  );
};

export default EmptyInventory;