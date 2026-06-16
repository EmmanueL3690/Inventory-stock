// src/features/dashboard/components/SalesTrendChart.jsx
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChevronDown } from 'lucide-react';

export const SalesTrendChart = ({ data }) => (
  <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex flex-col h-full">
    <div className="flex items-center justify-between mb-6">
      <h2 className="font-bold text-slate-900 text-base">Sales Trend</h2>
      <button className="flex items-center gap-1.5 text-xs font-medium text-slate-600 border border-slate-200 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 transition">
        This Week <ChevronDown size={14} />
      </button>
    </div>
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="salesColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
          <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} tickFormatter={(v) => `${v / 1000}K`} />
          <Tooltip formatter={(value) => [`₦${value.toLocaleString()}`, 'Sales']} />
          <Area type="monotone" dataKey="amount" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#salesColor)" dot={{ stroke: '#3b82f6', strokeWidth: 2, r: 4, fill: '#fff' }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </div>
);