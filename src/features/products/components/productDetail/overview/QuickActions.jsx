import React from 'react';
import { Zap, Sliders, ShoppingBag, PlusCircle, Barcode } from 'lucide-react';

const QuickActions = () => {
  const primaryActions = [
    { label: "Adjust Stock", icon: Sliders, color: "text-purple-600", bg: "hover:bg-purple-50/40 hover:border-purple-200" },
    { label: "Record Sale", icon: ShoppingBag, color: "text-emerald-600", bg: "hover:bg-emerald-50/40 hover:border-emerald-200" },
    { label: "Add Purchase", icon: PlusCircle, color: "text-blue-600", bg: "hover:bg-blue-50/40 hover:border-blue-200" },
    { label: "Print Barcode Label", icon: Barcode, color: "text-slate-700", bg: "hover:bg-slate-100/60 hover:border-slate-300" }
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6 space-y-4">
      {/* Header Container Section */}
      <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
        <div className="p-1.5 bg-amber-50 text-amber-500 rounded-lg">
          <Zap size={15} fill="currentColor" />
        </div>
        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Quick Actions</h4>
      </div>

      {/* Button Action List Grid */}
      <div className="flex flex-col gap-2">
        {primaryActions.map((action, idx) => {
          const Icon = action.icon;
          return (
            <button
              key={idx}
              className={`w-full h-11 border border-slate-200 rounded-xl px-4 flex items-center gap-3 text-xs font-bold text-slate-700 bg-white shadow-2xs transition duration-150 active:scale-[0.99] cursor-pointer text-left ${action.bg}`}
            >
              <Icon size={15} className={`${action.color} shrink-0`} strokeWidth={2.2} />
              <span>{action.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;