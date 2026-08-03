import React from 'react';
import { Layers, Warehouse, Calendar, User, ClipboardList, RefreshCw } from 'lucide-react';

export default function StockCountOverviewCard({ overview, metrics }) {
  const parameters = [
    { label: "Count Reference", value: overview.countReference, icon: Layers, isMono: true },
    { label: "Warehouse", value: overview.warehouse, icon: Warehouse },
    { label: "Count Date", value: overview.countDate, icon: Calendar },
    { label: "Counted By", value: overview.countedBy, icon: User },
    { label: "Count Method", value: overview.countMethod, icon: ClipboardList },
    { label: "Status", value: overview.status, icon: RefreshCw, isStatus: true }
  ];

  return (
    <div className="bg-white border border-slate-200/80 rounded-xl shadow-xs p-5 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-6 relative overflow-hidden">
      {parameters.map((param, index) => {
        const Icon = param.icon;
        return (
          <div key={index} className="space-y-1.5 min-w-0">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              {param.label}
            </span>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 shrink-0">
                <Icon className="w-3.5 h-3.5" />
              </div>
              
              {param.isStatus ? (
                <span className="text-xs font-bold text-amber-700 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-md">
                  {param.value}
                </span>
              ) : (
                <p className={`text-xs font-bold text-slate-800 truncate ${param.isMono ? 'font-mono tracking-tight' : ''}`}>
                  {param.value}
                </p>
              )}
            </div>
          </div>
        );
      })}

      {/* Embedded Real-time Progress Strip Indicator */}
      <div className="col-span-2 md:col-span-3 xl:col-span-6 border-t border-slate-100 pt-4 mt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Items Counted</span>
          <p className="text-xs font-black text-slate-700">
            {metrics.countedItemsCount} <span className="text-slate-400 font-normal">/ {metrics.totalItems}</span>
          </p>
        </div>
        <div className="flex-1 max-w-xs w-full bg-slate-100 h-2 rounded-full overflow-hidden relative">
          <div 
            className="bg-blue-600 h-full rounded-full transition-all duration-500 ease-out" 
            style={{ width: `${metrics.progressPercentage}%` }}
          />
        </div>
        <span className="text-xs font-mono font-bold text-blue-600 sm:text-right min-w-[32px]">
          {metrics.progressPercentage}%
        </span>
      </div>
    </div>
  );
}