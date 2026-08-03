import React from 'react';
import { Search, SlidersHorizontal, Scan, Loader2, MoreVertical } from 'lucide-react';
import { calculateVariance, formatNaira } from '../utils/stockCountHelpers';

export default function StockCountItemsTable({ items, searchQuery, onSearchChange, onQtyChange }) {
  
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Match': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Overstock': return 'bg-teal-50 text-teal-700 border-teal-200';
      case 'Shortage': return 'bg-rose-50 text-rose-700 border-rose-200';
      default: return 'bg-blue-50 text-blue-700 border-blue-200';
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden flex flex-col">
      
      {/* Table Header Controls */}
      <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
          Count Items 
          <span className="bg-slate-100 text-slate-500 text-xs px-2 py-0.5 rounded-full font-medium">
            {items.length} listed
          </span>
        </h3>
        
        <div className="flex items-center gap-2 self-stretch sm:self-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder="Search by product name or SKU..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-4 py-1.5 text-xs font-medium text-slate-700 placeholder:text-slate-400 focus:outline-hidden focus:border-blue-500 focus:bg-white transition-all"
            />
          </div>
          <button className="p-2 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-lg transition-colors" title="Filters">
            <SlidersHorizontal className="w-4 h-4" />
          </button>
          <button className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-3 py-2 rounded-lg transition-colors shadow-xs">
            <Scan className="w-3.5 h-3.5" />
            Scan Item
          </button>
        </div>
      </div>

      {/* Main Grid Scroll Canvas */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-slate-50/70 border-b border-slate-100 text-[11px] font-bold uppercase text-slate-400 tracking-wider">
              <th className="py-3 px-4 w-12 text-center">#</th>
              <th className="py-3 px-4">Product</th>
              <th className="py-3 px-4">SKU</th>
              <th className="py-3 px-4 text-right">System Qty</th>
              <th className="py-3 px-4 text-center w-36">Counted Qty</th>
              <th className="py-3 px-4 text-right">Variance</th>
              <th className="py-3 px-4 text-right">Variance Value</th>
              <th className="py-3 px-4 text-center">Status</th>
              <th className="py-3 px-4 w-12 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {items.map((item, index) => {
              const isScanning = item.countedQty === "Scanning...";
              const { variance, varianceValue } = calculateVariance(item.systemQty, item.countedQty, item.unitPrice);

              return (
                <tr key={item.id} className="text-xs text-slate-600 hover:bg-slate-50/50 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-400 text-center">{index + 1}</td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200/60 flex items-center justify-center text-slate-400 text-[10px] uppercase font-bold tracking-wider shrink-0">
                        {item.category.slice(0, 2)}
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-slate-800 truncate max-w-[200px]">{item.productName}</p>
                        <span className="text-[10px] text-slate-400 tracking-tight block mt-0.5">{item.category}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-medium text-slate-500 tracking-tight">{item.sku}</td>
                  <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-700">{item.systemQty.toLocaleString()}</td>
                  <td className="py-3.5 px-4 text-center">
                    {isScanning ? (
                      <div className="inline-flex items-center justify-center gap-1.5 text-blue-600 font-medium bg-blue-50/50 border border-blue-100/80 px-3 py-1 rounded-lg text-[11px] w-full max-w-[110px]">
                        <Loader2 className="w-3 h-3 animate-spin" />
                        Scanning...
                      </div>
                    ) : (
                      <input 
                        type="number"
                        value={item.countedQty}
                        onChange={(e) => onQtyChange(item.id, e.target.value)}
                        className="w-full max-w-[110px] bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-center font-mono font-bold text-slate-800 focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500/10 transition-all shadow-xs"
                      />
                    )}
                  </td>
                  <td className={`py-3.5 px-4 text-right font-mono font-bold ${
                    variance > 0 ? 'text-teal-600' : variance < 0 ? 'text-rose-600' : 'text-slate-400'
                  }`}>
                    {variance > 0 ? `+${variance}` : variance}
                  </td>
                  <td className={`py-3.5 px-4 text-right font-mono font-bold ${
                    varianceValue > 0 ? 'text-teal-600' : varianceValue < 0 ? 'text-rose-600' : 'text-slate-700'
                  }`}>
                    {formatNaira(varianceValue)}
                  </td>
                  <td className="py-3.5 px-4 text-center whitespace-nowrap">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold border ${getStatusStyle(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <button className="p-1 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-md transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

    </div>
  );
}