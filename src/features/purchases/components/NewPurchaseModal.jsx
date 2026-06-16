import React, { useEffect } from "react";
import { X, DollarSign, Calendar, User, ShoppingBag } from "lucide-react";

const NewPurchaseModal = ({ onClose }) => {
  // Lock background scroll when modal is active
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop Blur Overlay */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Surface Box */}
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-slate-100 flex flex-col max-h-[90vh] overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header Segment */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Create New Purchase Order</h2>
            <p className="text-xs text-slate-500 mt-0.5">Generate a new PO record within your procurement log.</p>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form className="overflow-y-auto p-6 space-y-5 flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Input field: PO Number */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">PO Number</label>
              <input 
                type="text" 
                placeholder="e.g. PO-10049" 
                className="w-full h-11 border border-slate-200 rounded-xl px-3 text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 outline-none transition"
              />
            </div>

            {/* Input field: Date */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Order Date</label>
              <div className="relative">
                <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="date" 
                  className="w-full h-11 border border-slate-200 rounded-xl pl-10 pr-3 text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 outline-none transition"
                />
              </div>
            </div>

            {/* Input field: Supplier */}
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Supplier Name</label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Enter or select supplier profile" 
                  className="w-full h-11 border border-slate-200 rounded-xl pl-10 pr-3 text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 outline-none transition"
                />
              </div>
            </div>

            {/* Input field: Product Category */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Category</label>
              <input 
                type="text" 
                placeholder="e.g. Medicines" 
                className="w-full h-11 border border-slate-200 rounded-xl px-3 text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 outline-none transition"
              />
            </div>

            {/* Input field: Item count */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Items</label>
              <div className="relative">
                <ShoppingBag size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="number" 
                  placeholder="0" 
                  className="w-full h-11 border border-slate-200 rounded-xl pl-10 pr-3 text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 outline-none transition"
                />
              </div>
            </div>

            {/* Input field: Total cost */}
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Amount</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">₦</span>
                <input 
                  type="text" 
                  placeholder="0.00" 
                  className="w-full h-11 border border-slate-200 rounded-xl pl-8 pr-3 text-sm font-semibold focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 outline-none transition"
                />
              </div>
            </div>

          </div>
        </form>

        {/* Footer Actions Row */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-100 bg-slate-50/50">
          <button 
            type="button"
            onClick={onClose}
            className="h-10 px-4 border border-slate-200 bg-white rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition active:scale-95"
          >
            Cancel
          </button>
          <button 
            type="submit"
            className="h-10 px-5 bg-blue-600 rounded-xl text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition active:scale-95"
          >
            Save Purchase
          </button>
        </div>

      </div>
    </div>
  );
};

export default NewPurchaseModal;