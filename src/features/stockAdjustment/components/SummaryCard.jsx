import React from 'react';
import { ArrowUpRight, ArrowDownRight, Scale } from 'lucide-react';

const SummaryCard = ({ stats, items }) => {
  const adjustedLinesCount = items.filter(item => item.physicalQty !== item.systemQty).length;
  const netValueIsPositive = stats.varianceValue >= 0;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
        Adjustment Summary
      </h4>

      {/* Numerical Data Rows Stack */}
      <div className="space-y-3 border-b border-slate-100 pb-4">
        <div className="flex justify-between items-center text-xs">
          <span className="text-slate-400 font-medium">Total Lines Adjusted</span>
          <span className="text-slate-800 font-bold">{adjustedLinesCount} / {items.length}</span>
        </div>
        
        <div className="flex justify-between items-center text-xs">
          <span className="text-slate-400 font-medium">Total Added Volume</span>
          <span className="text-emerald-600 font-bold inline-flex items-center gap-0.5">
            <ArrowUpRight size={12} strokeWidth={2.5} />
            {stats.positiveAdjustments.toLocaleString()} units
          </span>
        </div>

        <div className="flex justify-between items-center text-xs">
          <span className="text-slate-400 font-medium">Total Removed Volume</span>
          <span className="text-rose-600 font-bold inline-flex items-center gap-0.5">
            <ArrowDownRight size={12} strokeWidth={2.5} />
            {stats.negativeAdjustments.toLocaleString()} units
          </span>
        </div>
      </div>

      {/* Visual Net Impact Valuation Display Block */}
      <div className="pt-1 space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-slate-500">
          <span>Net Valuation Impact</span>
          <Scale size={14} className="text-slate-400" />
        </div>
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex flex-col justify-center items-center gap-0.5">
          <h2 className={`text-lg font-black tracking-tight ${netValueIsPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
            {netValueIsPositive ? '+' : '-'}${Math.abs(stats.varianceValue).toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </h2>
          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${netValueIsPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
            {netValueIsPositive ? '+' : ''}{stats.variancePercentage.toFixed(2)}% Stock Shift
          </span>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;