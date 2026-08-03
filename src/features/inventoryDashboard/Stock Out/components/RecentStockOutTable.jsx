import React from 'react';
import { CheckCircle2, Clock, AlertTriangle } from 'lucide-react';
import EmptyRecentRecords from './EmptyRecentRecords';

export default function RecentStockOutTable({ records = [] }) {
  // Status configuration mapping exactly to your main dashboard styling
  const statusConfig = {
    Completed: {
      bg: 'bg-emerald-50 text-emerald-700 border-emerald-200/50',
      icon: <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
    },
    Pending: {
      bg: 'bg-amber-50 text-amber-700 border-amber-200/50',
      icon: <Clock className="h-3.5 w-3.5 shrink-0" />
    },
    Verified: {
      bg: 'bg-blue-50 text-blue-700 border-blue-200/50',
      icon: <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full transition-shadow duration-200 hover:shadow-md">
      {/* Table Header Section */}
      <div className="p-5 border-b border-slate-100 bg-slate-50/50">
        <h2 className="font-bold text-slate-900 tracking-tight text-base">
          Recent Dispatches
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Audit logs of currently completed stock exit events.
        </p>
      </div>

      {/* Responsive Horizontal Container - Only scrolls when narrow */}
      <div className="flex-1 overflow-x-auto">
        {records.length > 0 ? (
          <table className="w-full text-left border-collapse min-w-[650px] lg:min-w-0" aria-label="Recent Stock Out Actions">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th scope="col" className="px-5 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Reference</th>
                <th scope="col" className="px-5 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Product</th>
                <th scope="col" className="px-5 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Quantity</th>
                <th scope="col" className="px-5 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Reason</th>
                <th scope="col" className="px-5 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Processed By</th>
                <th scope="col" className="px-5 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Date</th>
                <th scope="col" className="px-5 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-[13px]">
              {records.map((r) => {
                const statusInfo = statusConfig[r.status] || statusConfig.Pending;
                return (
                  <tr key={r.id} className="hover:bg-slate-50/60 transition-colors duration-150">
                    
                    {/* Reference Identifier */}
                    <td className="px-5 py-5 font-mono font-bold text-indigo-600 whitespace-nowrap">
                      {r.reference}
                    </td>
                    
                    {/* Product Name Stack */}
                    <td className="px-5 py-5">
                      <div className="max-w-[180px] sm:max-w-[220px]">
                        <p className="font-extrabold text-slate-900 truncate tracking-tight">
                          {r.productName}
                        </p>
                        <p className="text-[11px] text-slate-400 font-mono mt-0.5 tracking-tight">
                          {r.sku}
                        </p>
                      </div>
                    </td>
                    
                    {/* Quantity Value */}
                    <td className="px-5 py-5 text-right font-black text-slate-900 whitespace-nowrap">
                      {r.quantity.toLocaleString()}
                    </td>
                    
                    {/* Reason badge style */}
                    <td className="px-5 py-5 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200/40">
                        {r.reason}
                      </span>
                    </td>
                    
                    {/* Operator */}
                    <td className="px-5 py-5 text-slate-600 font-semibold whitespace-nowrap">
                      {r.processedBy}
                    </td>
                    
                    {/* Datetime Stamp */}
                    <td className="px-5 py-5 text-slate-400 font-medium whitespace-nowrap">
                      {r.date}
                    </td>
                    
                    {/* Verified Dashboard Status Badge */}
                    <td className="px-5 py-5 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${statusInfo.bg}`}>
                        {statusInfo.icon}
                        <span>{r.status}</span>
                      </span>
                    </td>
                    
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <EmptyRecentRecords />
        )}
      </div>
    </div>
  );
}