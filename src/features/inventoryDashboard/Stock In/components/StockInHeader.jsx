import React from 'react';
import { ArrowLeft, RotateCw } from 'lucide-react';

export default function StockInHeader({ onRefresh }) {
  return (
    <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-200">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950">
          Stock In        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Receive inventory from suppliers and create new stock batches for warehouse tracking.
        </p>
      </div>
      
      <div className="flex items-center gap-3">
        <button 
          type="button" 
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:bg-slate-50 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 active:bg-slate-100"
          aria-label="Navigate back to Inventory module"
        >
          <ArrowLeft className="h-4 w-4 shrink-0 text-slate-500" />
          Back to Inventory
        </button>
        
        <button 
          type="button" 
          onClick={onRefresh}
          title="Refresh Data"
          aria-label="Refresh stock-in statistics and table data"
          className="p-2.5 rounded-lg border border-slate-200 bg-white text-slate-500 shadow-sm transition-all duration-200 hover:bg-slate-50 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-slate-100"
        >
          <RotateCw className="h-4 w-4 shrink-0" />
        </button>
      </div>
    </header>
  );
}