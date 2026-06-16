// src/features/dashboard/components/RecentAlerts.jsx
import React from 'react';
import { AlertTriangle } from 'lucide-react';

export const RecentAlerts = ({ alerts }) => (
  <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden flex flex-col h-full justify-between">
    <div>
      <div className="p-5 flex items-center justify-between border-b border-slate-50">
        <h2 className="font-bold text-slate-900 text-base">Recent Alerts</h2>
        <button className="text-xs font-semibold text-blue-600 hover:underline">View all</button>
      </div>
      <div className="divide-y divide-slate-50">
        {alerts.map((alert, idx) => (
          <div key={idx} className="p-4 flex items-start gap-3 hover:bg-slate-50/50 transition">
            <div className={`p-2 rounded-lg mt-0.5 ${alert.type === 'empty' ? 'bg-rose-50 text-rose-500' : 'bg-amber-50 text-amber-500'}`}>
              <AlertTriangle size={16} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-bold text-slate-800 truncate">{alert.product}</p>
                <span className="text-[10px] text-slate-400 whitespace-nowrap">{alert.time}</span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">{alert.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    <button className="w-full text-center py-3.5 text-xs font-semibold text-blue-600 hover:bg-slate-50 border-t border-slate-50 transition">
      View all alerts
    </button>
  </div>
);