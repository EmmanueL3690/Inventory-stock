import React, { useEffect } from "react";
import { X, Calendar, FileText, ShoppingCart, Tag, Clock } from "lucide-react";
import PaymentStatusBadge from "./PaymentStatusBadge";
import OrderStatusBadge from "./OrderStatusBadge";

const PurchaseDetailsDrawer = ({ purchase, onClose }) => {
  // Handle escape key configurations
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Dynamic Drawer Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/20 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Slide-out Sidebar Shell */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-300 ease-out">
        
        {/* Upper Meta-Row */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Transaction Profile</span>
            <h2 className="text-xl font-bold text-slate-900 mt-0.5">{purchase.poNo}</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-xl border border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition"
          >
            <X size={16} />
          </button>
        </div>

        {/* Info Grid Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Main Pricing Core Section */}
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 text-center space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Purchase Value</span>
            <p className="text-3xl font-black text-slate-900">₦{purchase.amount.toLocaleString()}</p>
          </div>

          {/* Core Structured Meta Grouping */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-2">Log Details</h4>
            
            {/* Row Node: Supplier info */}
            <div className="flex items-start gap-3">
              <FileText size={16} className="text-slate-400 mt-0.5" />
              <div>
                <span className="text-xs text-slate-400 block">Supplier</span>
                <span className="text-sm font-bold text-slate-800">{purchase.supplier}</span>
              </div>
            </div>

            {/* Row Node: Categories */}
            <div className="flex items-start gap-3">
              <Tag size={16} className="text-slate-400 mt-0.5" />
              <div>
                <span className="text-xs text-slate-400 block">Category Focus</span>
                <span className="inline-block mt-0.5 bg-slate-100 text-slate-700 font-medium text-xs px-2 py-0.5 rounded-md">
                  {purchase.category}
                </span>
              </div>
            </div>

            {/* Row Node: Temporal entries */}
            <div className="flex items-start gap-3">
              <Calendar size={16} className="text-slate-400 mt-0.5" />
              <div>
                <span className="text-xs text-slate-400 block">Order Timeline</span>
                <span className="text-sm font-semibold text-slate-700">{purchase.date}</span>
                <span className="text-xs text-slate-400 block mt-0.5 flex items-center gap-1">
                  <Clock size={12} /> {purchase.time}
                </span>
              </div>
            </div>

            {/* Row Node: Items Quantities */}
            <div className="flex items-start gap-3">
              <ShoppingCart size={16} className="text-slate-400 mt-0.5" />
              <div>
                <span className="text-xs text-slate-400 block">Volume Count</span>
                <span className="text-sm font-semibold text-slate-700">{purchase.items} items listed</span>
              </div>
            </div>

          </div>

          {/* Badges Tracking Framework */}
          <div className="space-y-4 border-t border-slate-100 pt-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Verification Status</h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-50/50 p-3 rounded-xl border border-slate-100 flex flex-col gap-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Settlement</span>
                <PaymentStatusBadge status={purchase.paymentStatus} />
              </div>
              <div className="bg-slate-50/50 p-3 rounded-xl border border-slate-100 flex flex-col gap-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Fulfillment</span>
                <OrderStatusBadge status={purchase.orderStatus} />
              </div>
            </div>
          </div>

          {/* Delivery tracking metadata segment */}
          {purchase.receivedOn && (
            <div className="p-4 bg-emerald-50/40 border border-emerald-100 rounded-xl flex flex-col gap-1 text-xs">
              <span className="font-bold text-emerald-800 uppercase tracking-wide">Inbound Delivery Log</span>
              <p className="text-emerald-700 font-medium">
                Shipment verified and received on site on <span className="font-bold">{purchase.receivedOn}</span>.
              </p>
            </div>
          )}

        </div>

        {/* Drawer Base Actions Block */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 grid grid-cols-2 gap-3">
          <button className="h-10 rounded-xl text-sm font-bold border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition active:scale-95">
            Print Invoice
          </button>
          <button className="h-10 rounded-xl text-sm font-bold bg-blue-600 text-white shadow-sm hover:bg-blue-700 transition active:scale-95">
            Modify Order
          </button>
        </div>

      </div>
    </div>
  );
};

export default PurchaseDetailsDrawer;