import React from 'react';
import { Layers, Calendar, Tag, AlertCircle } from 'lucide-react';

const BatchPreviewCard = ({ items = [] }) => {
  // Filter for items that have a valid receive quantity greater than 0
  const activeBatches = items.filter((item) => {
    const qty = Number(item.receiveQuantity);
    return !isNaN(qty) && qty > 0;
  });

  // Helper to safely format expiry date strings
  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    const parsedDate = new Date(dateStr);
    return isNaN(parsedDate.getTime()) 
      ? dateStr 
      : parsedDate.toLocaleDateString('en-NG', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        });
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs w-full transition-all">
      {/* Header Title */}
      <div className="flex items-center gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
        <Layers className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        <h2 className="text-base font-semibold text-slate-900 dark:text-white">
          Batch Preview
        </h2>
      </div>

      {/* Content Area */}
      <div className="mt-4">
        {activeBatches.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-8 px-4 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-800/20">
            <AlertCircle className="w-8 h-8 text-slate-400 dark:text-slate-500 mb-2" />
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
              No inventory batches will be created.
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
              Enter a receive quantity in the items table above to generate batches.
            </p>
          </div>
        ) : (
          /* Batch Grid / List */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {activeBatches.map((item, index) => {
              const itemId = item._id || item.id || index;
              const productName = item.name || item.productName || item.productId?.name || 'Unassigned Product';
              const batchNum = item.batchNumber?.trim() || 'Auto-generated';
              const receiveQty = Number(item.receiveQuantity || 0);
              const expiryFormatted = formatDate(item.expiryDate);

              return (
                <div
                  key={itemId}
                  className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-lg p-3.5 space-y-2.5 hover:border-slate-300 dark:hover:border-slate-700 transition-all"
                >
                  {/* Product Title & Status Badge */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="truncate">
                      <p className="text-xs font-semibold text-slate-900 dark:text-white truncate" title={productName}>
                        {productName}
                      </p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                        SKU: {item.sku || item.productId?.sku || 'N/A'}
                      </p>
                    </div>
                    <span className="shrink-0 inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60">
                      Ready
                    </span>
                  </div>

                  <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 grid grid-cols-2 gap-2 text-xs">
                    {/* Batch Number */}
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1">
                        <Tag className="w-3 h-3 text-slate-400" />
                        Batch
                      </span>
                      <p className="font-mono font-medium text-slate-800 dark:text-slate-200 truncate" title={batchNum}>
                        {batchNum}
                      </p>
                    </div>

                    {/* Receive Qty */}
                    <div className="space-y-0.5 text-right">
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                        Incoming Qty
                      </span>
                      <p className="font-bold text-indigo-600 dark:text-indigo-400">
                        +{receiveQty.toLocaleString('en-NG')}
                      </p>
                    </div>

                    {/* Expiry Date */}
                    <div className="col-span-2 space-y-0.5 pt-1">
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        Expiry Date
                      </span>
                      <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                        {expiryFormatted}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default BatchPreviewCard;