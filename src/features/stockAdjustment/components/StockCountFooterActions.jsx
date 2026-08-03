import React from 'react';
import { MessageSquare, Plus, FileSpreadsheet, Eye } from 'lucide-react';

export default function StockCountFooterActions({ noteText, onNoteChange }) {
  return (
    <div className="flex flex-col gap-4">
      
      {/* Contextual Text Note Records Area */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs p-4 space-y-3">
        <label className="text-xs font-bold uppercase text-slate-400 tracking-wider flex items-center gap-2">
          <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
          Count Records Notes
        </label>
        <textarea
          rows={3}
          value={noteText}
          onChange={(e) => onNoteChange(e.target.value)}
          placeholder="Add comments, observations, or special discrepancy records regarding this specific session..."
          className="w-full bg-slate-50/50 border border-slate-200 rounded-lg p-3 text-xs font-medium text-slate-700 placeholder:text-slate-400 focus:outline-hidden focus:border-blue-500 focus:bg-white transition-all resize-none"
        />
      </div>

      {/* Bottom Utility Workflow Bar Buttons Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-100/60 border border-slate-200 p-3 rounded-xl shadow-xs">
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs px-3 py-1.5 rounded-lg shadow-xs transition-colors">
            <Plus className="w-3.5 h-3.5 text-slate-400" />
            Add Item Manually
          </button>
          <button className="inline-flex items-center gap-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs px-3 py-1.5 rounded-lg shadow-xs transition-colors">
            <Eye className="w-3.5 h-3.5 text-slate-400" />
            View Variances Only
          </button>
        </div>

        <button className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-1.5 rounded-lg shadow-sm transition-colors">
          <FileSpreadsheet className="w-3.5 h-3.5" />
          Export Count (.xlsx)
        </button>
      </div>

    </div>
  );
}