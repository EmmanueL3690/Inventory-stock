import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const AdjustmentPagination = ({ engine }) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pt-2 border-t border-slate-50 select-none">
      {/* Record Index Info Markers Label */}
      <div className="text-xs font-semibold text-slate-500 text-center sm:text-left">
        Showing <span className="text-slate-800 font-bold">1–{engine.items.length}</span> of <span className="text-slate-800 font-bold">238</span> items
      </div>

      {/* Direct Configuration Command Buttons Bundle */}
      <div className="flex items-center justify-center sm:justify-end gap-4">
        {/* Page Limit Selector Menu */}
        <div className="flex items-center gap-2">
          <select
            value={engine.pageSize}
            onChange={(e) => engine.setPageSize(Number(e.target.value))}
            className="h-8 pl-2 pr-6 bg-white border border-slate-200 text-xs font-bold text-slate-700 rounded-lg outline-none cursor-pointer appearance-none"
            style={{
              backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 6px center',
              backgroundSize: '10px'
            }}
          >
            <option value={10}>10 / page</option>
            <option value={20}>20 / page</option>
            <option value={50}>50 / page</option>
          </select>
        </div>

        {/* Index Page Button Arrays */}
        <div className="flex items-center gap-1">
          <button className="w-8 h-8 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:text-slate-700 hover:border-slate-300 transition active:scale-95 cursor-not-allowed opacity-50">
            <ChevronLeft size={14} strokeWidth={2.5} />
          </button>
          
          <button className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-xs font-black text-white shadow-xs">
            1
          </button>
          
          <button className="w-8 h-8 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-xs font-bold text-slate-600 hover:bg-slate-50 transition active:scale-95 cursor-pointer">
            2
          </button>

          <button className="w-8 h-8 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-xs font-bold text-slate-600 hover:bg-slate-50 transition active:scale-95 cursor-pointer">
            3
          </button>

          <span className="w-8 h-8 flex items-center justify-center text-xs font-bold text-slate-400">...</span>

          <button className="w-8 h-8 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-xs font-bold text-slate-600 hover:bg-slate-50 transition active:scale-95 cursor-pointer">
            30
          </button>

          <button className="w-8 h-8 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-500 hover:text-slate-700 hover:border-slate-300 transition active:scale-95 cursor-pointer">
            <ChevronRight size={14} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdjustmentPagination;