import React, { useEffect } from "react";
import { X, Calendar, Package, AlertCircle, ShieldAlert, CheckCircle2 } from "lucide-react";
import AlertTypeBadge from "./AlertTypeBadge";
import AlertStatusBadge from "./AlertStatusBadge";

const AlertDetailsDrawer = ({ alert, onClose }) => {
  // Gracefully clear window contexts if the user hits Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Background Micro-Overlay Blur */}
      <div 
        className="absolute inset-0 bg-slate-900/20 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Sliding Sliding structural drawer containment layer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-300 ease-out">
        
        {/* Upper metadata identity header info */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">Notification Node</span>
            <h2 className="text-lg font-bold text-slate-900 mt-0.5">System Alert Log</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-xl border border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition"
          >
            <X size={16} />
          </button>
        </div>

        {/* Structured Data Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Main Visual Profile Section */}
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Classification</span>
              <AlertTypeBadge type={alert.type} />
            </div>
            <div className="border-t border-slate-200/60 pt-3">
              <span className="text-xs text-slate-400 block font-medium">Affected Target Product</span>
              <p className="text-base font-bold text-slate-900 mt-0.5">{alert.product}</p>
            </div>
          </div>

          {/* Descriptive Information Block */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-2">Log Parameters</h4>
            
            {/* Row Detail Item: Warning description */}
            <div className="flex items-start gap-3">
              <AlertCircle size={16} className="text-slate-400 mt-0.5" />
              <div>
                <span className="text-xs text-slate-400 block">System Message</span>
                <p className="text-sm font-semibold text-slate-700 mt-0.5 leading-relaxed">{alert.message}</p>
              </div>
            </div>

            {/* Row Detail Item: Time markers */}
            <div className="flex items-start gap-3">
              <Calendar size={16} className="text-slate-400 mt-0.5" />
              <div>
                <span className="text-xs text-slate-400 block">Timestamp</span>
                <span className="text-sm font-bold text-slate-800 mt-0.5 block">{alert.dateTime}</span>
              </div>
            </div>

            {/* Row Detail Item: Operations lifecycle metrics */}
            <div className="flex items-start gap-3">
              <ShieldAlert size={16} className="text-slate-400 mt-0.5" />
              <div>
                <span className="text-xs text-slate-400 block">Verification Status</span>
                <div className="mt-1 block">
                  <AlertStatusBadge status={alert.status} />
                </div>
              </div>
            </div>
          </div>

          {/* Smart Resolution Recommendation Cards */}
          {alert.type === "Critical" && (
            <div className="p-4 bg-rose-50/50 border border-rose-100 rounded-xl flex flex-col gap-1 text-xs">
              <span className="font-bold text-rose-800 uppercase tracking-wide">Action Required</span>
              <p className="text-rose-700 font-medium leading-relaxed">
                Stock metrics have fallen past critical thresholds. Please verify outstanding supplier invoices or initiate an emergency reorder request.
              </p>
            </div>
          )}

          {alert.type === "Low Stock" && (
            <div className="p-4 bg-amber-50/50 border border-amber-100 rounded-xl flex flex-col gap-1 text-xs">
              <span className="font-bold text-amber-800 uppercase tracking-wide">Procurement Notice</span>
              <p className="text-amber-700 font-medium leading-relaxed">
                Item velocity trends indicate depletion risks within 5 business days. Check active purchase requisitions.
              </p>
            </div>
          )}
        </div>

        {/* Fixed Base Operations Controller Dock */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 grid grid-cols-2 gap-3">
          <button 
            onClick={onClose}
            className="h-10 rounded-xl text-sm font-bold border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition active:scale-95"
          >
            Dismiss Log
          </button>
          <button 
            onClick={onClose}
            className="h-10 rounded-xl text-sm font-bold bg-blue-600 text-white shadow-xs hover:bg-blue-700 transition flex items-center justify-center gap-1.5 active:scale-95"
          >
            <CheckCircle2 size={15} />
            <span>Mark Resolved</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default AlertDetailsDrawer;