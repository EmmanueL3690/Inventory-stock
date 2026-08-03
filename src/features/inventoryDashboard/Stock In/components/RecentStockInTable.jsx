import React from 'react';
import { CheckCircle2, Clock, ShieldCheck } from 'lucide-react';
import EmptyStockIn from './EmptyStockIn';

export default function RecentStockInTable({ records = [] }) {
  
  // Custom status configuration map matching the enterprise system
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
      icon: <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full transition-shadow duration-200 hover:shadow-md">
      {/* Card Header */}
      <div className="p-5 border-b border-slate-100 bg-slate-50/50">
        <h2 className="font-bold text-slate-900 tracking-tight text-base">
          Recent Incoming Batches
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Audit log of your lately created stock in transactions.
        </p>
      </div>

      <div className="flex-1 overflow-x-auto">
        {records.length > 0 ? (
          <table className="w-full text-left border-collapse min-w-[700px]" aria-label="Recent Stock In Transactions">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-100">
                <th scope="col" className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Product
                </th>
                <th scope="col" className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Batch Number
                </th>
                <th scope="col" className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">
                  Quantity
                </th>
                <th scope="col" className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">
                  Cost Price
                </th>
                <th scope="col" className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {records.map((record) => {
                // Handle fallback status configuration
                const statusInfo = statusConfig[record.status] || statusConfig.Pending;

                return (
                  <tr key={record.id} className="hover:bg-slate-50/40 transition-colors">
                    {/* Product Name and SKU */}
                    <td className="px-6 py-4">
                      <div className="max-w-[220px]">
                        <p className="font-bold text-slate-900 truncate tracking-tight">
                          {record.productName}
                        </p>
                        <p className="text-xs text-slate-500 font-mono mt-0.5">
                          {record.sku}
                        </p>
                      </div>
                    </td>

                    {/* Batch Number */}
                    <td className="px-6 py-4 font-mono text-xs font-semibold text-slate-700">
                      {record.batchNumber}
                    </td>

                    {/* Quantity */}
                    <td className="px-6 py-4 text-right font-bold text-slate-950">
                      {record.quantity.toLocaleString()}
                    </td>

                    {/* Cost Price in Naira (₦) */}
                    <td className="px-6 py-4 text-right font-medium text-slate-800">
                      ₦{record.costPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>

                    {/* Received Date */}
                    <td className="px-6 py-4 text-slate-500 text-xs font-medium whitespace-nowrap">
                      {record.date}
                    </td>

                    {/* Status Badge */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${statusInfo.bg}`}>
                        {statusInfo.icon}
                        {record.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <EmptyStockIn />
        )}
      </div>
    </div>
  );
}