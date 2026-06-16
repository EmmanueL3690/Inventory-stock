import React from "react";
import { salesData } from "../data/mockSales";

const SalesTable = () => {
  // Dynamic color utility for a modern, semantic UI
  const getStatusStyles = (status) => {
    switch (status?.toLowerCase()) {
      case "paid":
      case "completed":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "pending":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "cancelled":
      case "failed":
        return "bg-rose-50 text-rose-700 border-rose-200";
      default:
        return "bg-slate-50 text-slate-600 border-slate-200";
    }
  };

  return (
    <div className="w-full">
      {/* 1. MOBILE & TABLET VIEW: Displays as clean, stacked cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:hidden">
        {salesData.map((sale) => (
          <div 
            key={sale.invoice} 
            className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow relative"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                  {sale.invoice}
                </span>
                <h3 className="font-bold text-slate-800 text-base mt-0.5">
                  {sale.customer}
                </h3>
                <span className="inline-block text-[11px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md mt-1">
                  {sale.type}
                </span>
              </div>
              <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusStyles(sale.status)}`}>
                <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 opacity-80" />
                {sale.status}
              </span>
            </div>

            <hr className="border-slate-100 my-3" />

            <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-sm mb-4">
              <div>
                <span className="text-xs text-slate-400 block">Date & Time</span>
                <span className="text-slate-700 font-medium">{sale.date}</span>
                <span className="text-xs text-slate-400 ml-1">({sale.time})</span>
              </div>
              <div>
                <span className="text-xs text-slate-400 block">Amount</span>
                <span className="text-slate-900 font-semibold">{sale.amount}</span>
              </div>
              <div>
                <span className="text-xs text-slate-400 block">Items</span>
                <span className="text-slate-600">{sale.items} {sale.items === 1 ? 'item' : 'items'}</span>
              </div>
              <div>
                <span className="text-xs text-slate-400 block">Method</span>
                <span className="text-slate-600">{sale.payment}</span>
              </div>
            </div>

            <div className="flex gap-2 items-center justify-between pt-2 border-t border-slate-50">
              <div className="text-xs text-slate-400">
                Rep: <span className="text-slate-600 font-medium">{sale.salesperson}</span>
              </div>
              <button className="px-4 py-2 text-xs font-bold text-slate-700 bg-slate-50 rounded-xl hover:bg-slate-100 active:scale-95 transition-all">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 2. DESKTOP VIEW: Displays as a luxury, high-density data table */}
      <div className="hidden lg:block bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-slate-50/75 border-b border-slate-100">
              <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-400">Invoice</th>
              <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-400">Date</th>
              <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-400">Customer</th>
              <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-400">Items</th>
              <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-400">Amount</th>
              <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-400">Payment</th>
              <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-400">Status</th>
              <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-400">Salesperson</th>
              <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-400 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {salesData.map((sale) => (
              <tr
                key={sale.invoice}
                className="hover:bg-slate-50/40 transition-colors group"
              >
                <td className="p-4 text-sm font-semibold text-slate-900">
                  {sale.invoice}
                </td>
                <td className="p-4">
                  <div className="text-sm font-medium text-slate-700">{sale.date}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{sale.time}</div>
                </td>
                <td className="p-4">
                  <div className="text-sm font-bold text-slate-800">{sale.customer}</div>
                  <span className="inline-flex text-[10px] font-bold bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded mt-1 uppercase tracking-wide">
                    {sale.type}
                  </span>
                </td>
                <td className="p-4 text-sm text-slate-600">
                  {sale.items}
                </td>
                <td className="p-4 text-sm font-bold text-slate-900">
                  {sale.amount}
                </td>
                <td className="p-4 text-sm text-slate-500">
                  {sale.payment}
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusStyles(sale.status)}`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 opacity-80" />
                    {sale.status}
                  </span>
                </td>
                <td className="p-4 text-sm text-slate-600">
                  {sale.salesperson}
                </td>
                <td className="p-4 text-right">
                  <button className="inline-flex items-center justify-center px-3 py-1.5 text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-xl shadow-sm hover:bg-slate-50 hover:text-slate-900 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-slate-200">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesTable;