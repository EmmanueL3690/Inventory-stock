import React from 'react';
import { ClipboardList, AlertTriangle, History, ArrowUpRight, ArrowDownRight, CheckCircle2 } from 'lucide-react';
import { formatNaira } from '../utils/stockCountHelpers';

export default function StockCountSummaryPanels({ metrics, activities }) {
  return (
    <div className="space-y-6 w-full">
      
      {/* Panel 1: Count Overview Metrics Summary */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs p-4 space-y-4">
        <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider flex items-center gap-2 border-b border-slate-50 pb-2.5">
          <ClipboardList className="w-3.5 h-3.5 text-slate-400" />
          Count Summary
        </h4>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">Total Items Listed</span>
            <span className="text-xs font-bold text-slate-800 font-mono bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-md">
              {metrics.totalItems}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">Counted Items</span>
            <span className="text-xs font-bold text-slate-800 font-mono bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-md">
              {metrics.countedItemsCount}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">Remaining Items</span>
            <span className="text-xs font-bold text-slate-800 font-mono bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-md">
              {metrics.totalItems - metrics.countedItemsCount}
            </span>
          </div>
        </div>
      </div>

      {/* Panel 2: Financial Delta & Variance Tracking Summary */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs p-4 space-y-4">
        <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider flex items-center gap-2 border-b border-slate-50 pb-2.5">
          <AlertTriangle className="w-3.5 h-3.5 text-slate-400" />
          Variance Summary
        </h4>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500" /> Overstock Value
            </span>
            <span className="text-xs font-bold text-teal-600 font-mono flex items-center gap-0.5">
              <ArrowUpRight className="w-3 h-3" /> {formatNaira(metrics.overstockValue)}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" /> Shortage Value
            </span>
            <span className="text-xs font-bold text-rose-600 font-mono flex items-center gap-0.5">
              <ArrowDownRight className="w-3 h-3" /> -{formatNaira(metrics.shortageValue)}
            </span>
          </div>
          
          <div className="border-t border-slate-100 pt-3 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700">Net Variance Delta</span>
            <span className={`text-xs font-black font-mono ${
              metrics.totalVarianceValue > 0 ? 'text-teal-600' : metrics.totalVarianceValue < 0 ? 'text-rose-600' : 'text-slate-800'
            }`}>
              {formatNaira(metrics.totalVarianceValue)}
            </span>
          </div>
        </div>
      </div>

      {/* Panel 3: Recent Activity Trail Log */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs p-4 space-y-4">
        <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider flex items-center gap-2 border-b border-slate-50 pb-2.5">
          <History className="w-3.5 h-3.5 text-slate-400" />
          Recent Activity
        </h4>
        
        <div className="relative border-l border-slate-100 pl-4 ml-2 space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="relative space-y-1">
              {/* Bullet Node marker matching image spec timeline traces */}
              <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-white border-2 border-blue-500 ring-4 ring-white" />
              
              <p className="text-xs font-bold text-slate-700 leading-tight">
                {activity.message}
              </p>
              <div className="flex items-center gap-1 text-[10px] text-slate-400 font-medium">
                <span>{activity.timestamp}</span>
                <span>•</span>
                <span className="text-slate-500 font-semibold">{activity.user}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}