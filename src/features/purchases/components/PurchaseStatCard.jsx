import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const PurchaseStatCard = ({ title, value, change, isPositive, timeframe, icon: Icon, iconColor }) => {
  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between hover:border-slate-300 transition duration-200">
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-medium text-slate-500 truncate">{title}</span>
        <div className={`p-2.5 rounded-xl shrink-0 ${iconColor}`}>
          <Icon size={18} />
        </div>
      </div>
      
      <div className="mt-4 space-y-1.5">
        <h3 className="text-2xl font-bold tracking-tight text-slate-900">{value}</h3>
        <div className="flex items-center flex-wrap gap-1 text-xs">
          <span className={`inline-flex items-center font-semibold rounded-md px-1.5 py-0.5 ${
            isPositive ? 'text-emerald-700 bg-emerald-50' : 'text-rose-700 bg-rose-50'
          }`}>
            {isPositive ? <ArrowUpRight size={14} className="mr-0.5" /> : <ArrowDownRight size={14} className="mr-0.5" />}
            {change}
          </span>
          <span className="text-slate-400 font-medium whitespace-nowrap">{timeframe}</span>
        </div>
      </div>
    </div>
  );
};

export default PurchaseStatCard;