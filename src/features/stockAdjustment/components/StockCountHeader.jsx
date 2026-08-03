import React from 'react';
import { ChevronRight, Printer, MoreVertical, CheckCircle2 } from 'lucide-react';

export default function StockCountHeader({ overview, onComplete }) {
  const isCompleted = overview.status === 'Completed';

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      
      {/* Structural Metadata Path Tracking */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
          <span>Inventory</span>
          <ChevronRight className="w-3 h-3 text-slate-300" />
          <span>Stock Count</span>
          <ChevronRight className="w-3 h-3 text-slate-300" />
          <span className="text-slate-600 font-mono font-semibold">{overview.countReference}</span>
        </div>
        
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Stock Count</h1>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-bold border ${
            isCompleted 
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
              : 'bg-amber-50 text-amber-700 border-amber-200'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${isCompleted ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`} />
            {overview.status}
          </span>
        </div>
        <p className="text-xs text-slate-500">
          Count your stock, compare with system quantity and adjust any differences.
        </p>
      </div>

      {/* Action Control Button Ribbons */}
      <div className="flex items-center gap-2.5 self-start md:self-auto">
        <button className="inline-flex items-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs px-3.5 py-2 rounded-lg shadow-xs transition-colors">
          <Printer className="w-4 h-4 text-slate-400" />
          Print
        </button>
        
        <div className="relative inline-block">
          <button className="inline-flex items-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs px-3.5 py-2 rounded-lg shadow-xs transition-colors">
            More Actions
            <ChevronRight className="w-3.5 h-3.5 rotate-90 text-slate-400" />
          </button>
        </div>

        <button 
          onClick={onComplete}
          disabled={isCompleted}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 text-white disabled:text-slate-400 font-bold text-xs px-4 py-2 rounded-lg shadow-sm transition-all"
        >
          <CheckCircle2 className="w-4 h-4" />
          Complete Count
        </button>
      </div>

    </div>
  );
}