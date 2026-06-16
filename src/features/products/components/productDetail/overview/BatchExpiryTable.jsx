import React from 'react';
import { CalendarRange, MoreVertical } from 'lucide-react';

const statusBadgeStyles = {
  "Good": "bg-emerald-50 text-emerald-600 border-emerald-100",
  "Expiring Soon": "bg-amber-50 text-amber-600 border-amber-100",
  "Expired": "bg-rose-50 text-rose-600 border-rose-100",
};

const BatchExpiryTable = ({ batches, totalStock, unit }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6 space-y-5">
      
      {/* Header Block Section */}
      <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
        <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
          <CalendarRange size={16} />
        </div>
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Batch & Expiry Information</h3>
      </div>

      {/* Horizontally Scrollable Table Container Wrapper */}
      <div className="overflow-x-auto -mx-5 sm:mx-0 border border-slate-100 rounded-xl">
        <table className="w-full border-collapse text-left min-w-[600px]">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/60">
              <th className="px-5 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Batch Number</th>
              <th className="px-5 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Manufacturing Date</th>
              <th className="px-5 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Expiry Date</th>
              <th className="px-5 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Quantity</th>
              <th className="px-5 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-5 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider text-center w-10">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm font-medium">
            {batches.map((batch) => (
              <tr key={batch.id} className="hover:bg-slate-50/50 transition duration-150">
                {/* Batch Number Identity Tag */}
                <td className="px-5 py-4 text-slate-800 font-semibold">{batch.number}</td>
                
                {/* Date Markers */}
                <td className="px-5 py-4 text-slate-500">{batch.mfgDate}</td>
                <td className="px-5 py-4 text-slate-500">{batch.expDate}</td>
                
                {/* Unit Volumes Count */}
                <td className="px-5 py-4 text-slate-800 font-bold">
                  {batch.quantity.toLocaleString()} {unit}s
                </td>
                
                {/* Status Alerts Configuration */}
                <td className="px-5 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-bold border ${statusBadgeStyles[batch.status] || "bg-slate-50 text-slate-600"}`}>
                    {batch.status}
                  </span>
                </td>
                
                {/* Actions Menu Anchor Trigger */}
                <td className="px-5 py-4 text-center">
                  <button className="p-1.5 rounded-lg border border-slate-200 text-slate-400 bg-white hover:bg-slate-50 hover:text-slate-700 shadow-2xs transition active:scale-95 cursor-pointer">
                    <MoreVertical size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Aggregate Volume Footer Label */}
      <div className="flex justify-between items-center bg-slate-50/70 border border-slate-100 px-4 py-3 rounded-xl">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Summary Aggregation</span>
        <div className="text-sm font-semibold text-slate-500">
          Total Quantity: <span className="text-blue-600 font-extrabold">{totalStock.toLocaleString()} {unit}s</span>
        </div>
      </div>

    </div>
  );
};

export default BatchExpiryTable;