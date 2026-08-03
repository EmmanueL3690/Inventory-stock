import React from 'react';
import { CalendarRange, MoreVertical, Inbox, AlertCircle, Loader2 } from 'lucide-react';

const statusBadgeStyles = {
  "Good": "bg-emerald-50 text-emerald-600 border-emerald-100",
  "Active": "bg-emerald-50 text-emerald-600 border-emerald-100",
  "Expiring Soon": "bg-amber-50 text-amber-600 border-amber-100",
  "Expired": "bg-rose-50 text-rose-600 border-rose-100",
};

const BatchExpiryTable = ({ 
  batches = [], 
  loading = false, 
  error = null, 
  unit = "Unit" 
}) => {

  // Helper to format currency values safely
  const formatCostPrice = (val) => {
    if (val === undefined || val === null || isNaN(Number(val))) return "₦0.00";
    return `₦${Number(val).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // Helper to format timestamps safely
  const formatDate = (dateString) => {
    if (!dateString) return "--";
    try {
      const parsedDate = new Date(dateString);
      if (isNaN(parsedDate.getTime())) return "--";
      return parsedDate.toLocaleDateString();
    } catch {
      return "--";
    }
  };

  // Calculate total remaining batch stock
  const totalStock = batches.reduce((sum, batch) => {
    const qty = Number(
      batch?.remainingQuantity ?? 
      batch?.quantity ?? 
      batch?.currentQuantity ?? 
      0
    );
    return sum + (isNaN(qty) ? 0 : qty);
  }, 0);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6 space-y-5">
      
      {/* Header Block Section */}
      <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
        <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
          <CalendarRange size={16} />
        </div>
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
          Batch & Expiry Information
        </h3>
      </div>

      {/* 1. Loading State Display */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-12 px-4 border border-slate-100 rounded-xl bg-slate-50/30 text-center">
          <Loader2 className="h-8 w-8 text-blue-600 animate-spin mb-3" />
          <p className="text-xs font-semibold text-slate-500">
            Fetching product batch records...
          </p>
        </div>
      ) : error ? (
        /* 2. Error State Display */
        <div className="flex flex-col items-center justify-center py-12 px-4 border border-rose-100 rounded-xl bg-rose-50/20 text-center">
          <AlertCircle className="h-9 w-9 text-rose-500 mb-2" />
          <h4 className="text-sm font-bold text-slate-800">Failed to load batches</h4>
          <p className="text-xs text-rose-500 max-w-sm mt-1">
            {error || "An error occurred while communicating with the server."}
          </p>
        </div>
      ) : batches.length === 0 ? (
        /* 3. Empty State Display */
        <div className="flex flex-col items-center justify-center py-12 px-4 border border-dashed border-slate-200 rounded-xl bg-slate-50/30 text-center">
          <Inbox className="h-10 w-10 text-slate-300 mb-3" />
          <h4 className="text-sm font-bold text-slate-700">No batch information available.</h4>
          <p className="text-xs text-slate-400 max-w-sm mt-1 leading-relaxed">
            There are currently no active or historical batch records logged for this product.
          </p>
        </div>
      ) : (
        /* 4. Batch Table Display */
        <div className="overflow-x-auto -mx-5 sm:mx-0 border border-slate-100 rounded-xl">
          <table className="w-full border-collapse text-left min-w-[700px]">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/60">
                <th className="px-5 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Batch Number</th>
                <th className="px-5 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Remaining Qty</th>
                <th className="px-5 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Cost Price</th>
                <th className="px-5 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Expiry Date</th>
                <th className="px-5 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Created Date</th>
                <th className="px-5 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-5 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider text-center w-10">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm font-medium">
              {batches.map((batch, index) => {
                const batchNum = batch?.batchNumber || batch?.batchCode || batch?.code || "--";
                const remainingQty = Number(
                  batch?.remainingQuantity ?? 
                  batch?.quantity ?? 
                  batch?.currentQuantity ?? 
                  0
                );
                const costPrice = batch?.costPrice ?? batch?.unitCost;
                const expiryDate = batch?.expiryDate;
                const createdDate = batch?.createdAt || batch?.manufacturingDate;
                const status = batch?.status || "Active";

                return (
                  <tr key={batch?._id || batch?.id || batchNum || index} className="hover:bg-slate-50/50 transition duration-150">
                    {/* Batch Number */}
                    <td className="px-5 py-4 text-slate-800 font-semibold">{batchNum}</td>
                    
                    {/* Remaining Quantity */}
                    <td className="px-5 py-4 text-slate-800 font-bold">
                      {remainingQty.toLocaleString()} {unit}s
                    </td>

                    {/* Cost Price */}
                    <td className="px-5 py-4 text-slate-600 font-medium">
                      {formatCostPrice(costPrice)}
                    </td>

                    {/* Expiry Date */}
                    <td className="px-5 py-4 text-slate-500">
                      {formatDate(expiryDate)}
                    </td>

                    {/* Created Date */}
                    <td className="px-5 py-4 text-slate-500">
                      {formatDate(createdDate)}
                    </td>
                    
                    {/* Status Badge */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-bold border ${statusBadgeStyles[status] || "bg-slate-50 text-slate-600 border-slate-200"}`}>
                        {status}
                      </span>
                    </td>
                    
                    {/* Actions Anchor Trigger */}
                    <td className="px-5 py-4 text-center">
                      <button className="p-1.5 rounded-lg border border-slate-200 text-slate-400 bg-white hover:bg-slate-50 hover:text-slate-700 shadow-2xs transition active:scale-95 cursor-pointer">
                        <MoreVertical size={14} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Aggregate Summary Footer */}
      <div className="flex justify-between items-center bg-slate-50/70 border border-slate-100 px-4 py-3 rounded-xl">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Summary Aggregation</span>
        <div className="text-sm font-semibold text-slate-500">
          Total Batch Stock: <span className="text-blue-600 font-extrabold">{totalStock.toLocaleString()} {unit}s</span>
        </div>
      </div>

    </div>
  );
};

export default BatchExpiryTable;