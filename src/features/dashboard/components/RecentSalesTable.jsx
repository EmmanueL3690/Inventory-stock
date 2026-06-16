// src/features/dashboard/components/RecentSalesTable.jsx
import React from 'react';

export const RecentSalesTable = ({ sales }) => (
  <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden flex flex-col h-full justify-between">
    <div>
      <div className="p-5 flex items-center justify-between border-b border-slate-50">
        <h2 className="font-bold text-slate-900 text-base">Recent Sales</h2>
        <button className="text-xs font-semibold text-blue-600 hover:underline">View all</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="bg-slate-50/70 border-b border-slate-100 text-slate-400 font-medium text-xs">
              <th className="p-4">Date</th>
              <th className="p-4">Invoice #</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {sales.map((sale, i) => (
              <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                <td className="p-4 text-xs text-slate-500">{sale.date}</td>
                <td className="p-4 font-medium text-slate-900 text-xs">{sale.invoice}</td>
                <td className="p-4 text-xs">{sale.customer}</td>
                <td className="p-4 font-semibold text-slate-900 text-xs">{sale.amount}</td>
                <td className="p-4">
                  <span className="px-2 py-1 text-[10px] font-bold bg-emerald-50 text-emerald-600 rounded-md">{sale.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);