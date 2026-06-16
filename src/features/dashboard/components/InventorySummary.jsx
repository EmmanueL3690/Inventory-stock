// src/features/dashboard/components/InventorySummary.jsx
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export const InventorySummary = ({ summary }) => (
  <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex flex-col h-full justify-between">
    <h2 className="font-bold text-slate-900 text-base mb-4">Inventory Summary</h2>
    <div className="flex flex-col items-center justify-center flex-1 gap-6">
      <div className="relative w-36 h-36 flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={summary.breakdown} cx="50%" cy="50%" innerRadius={50} outerRadius={65} paddingAngle={2} dataKey="value">
              {summary.breakdown.map((entry, idx) => <Cell key={idx} fill={entry.color} />)}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute text-center">
          <span className="text-2xl font-black text-slate-800 block">{summary.totalItems}</span>
          <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 block">Total Items</span>
        </div>
      </div>
      <div className="w-full space-y-2 text-xs">
        {summary.breakdown.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between py-1 border-b border-slate-50 last:border-none">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
              <span className="text-slate-600">{item.name}</span>
            </div>
            <span className="font-semibold text-slate-800">{item.value} ({item.percentage})</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);