import React from 'react';
import { ArrowLeft, RotateCw } from 'lucide-react';

export default function StockOutHeader({ onRefresh }) {
  return (
    <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-6 border-b border-slate-200">
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
          Stock Out Dispatch
        </h1>
        <p className="text-sm sm:text-base text-slate-500 max-w-2xl">
          Process inventory departures, define audit-compliant reasons, and review real-time remaining stock.
        </p>
      </div>
      
      <div className="flex items-center gap-3 self-start md:self-center">
        <button 
          type="button" 
          className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:bg-slate-50 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 active:bg-slate-100"
        >
          <ArrowLeft className="h-4 w-4 shrink-0 text-slate-500" />
          <span>Back to Inventory</span>
        </button>
        
        <button 
          type="button" 
          onClick={onRefresh}
          title="Refresh Data"
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 shadow-sm transition-all duration-200 hover:bg-slate-50 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 active:bg-slate-100"
        >
          <RotateCw className="h-4 w-4 shrink-0" />
        </button>
      </div>
    </header>
  );
}