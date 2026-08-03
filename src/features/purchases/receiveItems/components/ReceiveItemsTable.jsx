import React from 'react';
import { AlertCircle, PackageCheck } from 'lucide-react';

const ReceiveItemsTable = ({
  items = [],
  onQuantityChange,
  onBatchChange,
  onExpiryChange,
}) => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xs overflow-hidden w-full">
      {/* Table Header / Title */}
      <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2">
        <PackageCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        <h2 className="text-base font-semibold text-slate-900 dark:text-white">
          Receive Products
        </h2>
      </div>

      {/* Table Area */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
              <th scope="col" className="py-3.5 px-4 font-semibold">Product & SKU</th>
              <th scope="col" className="py-3.5 px-3 font-semibold text-center">Ordered</th>
              <th scope="col" className="py-3.5 px-3 font-semibold text-center">Received</th>
              <th scope="col" className="py-3.5 px-3 font-semibold text-center">Remaining</th>
              <th scope="col" className="py-3.5 px-4 font-semibold w-36">Receive Qty</th>
              <th scope="col" className="py-3.5 px-4 font-semibold w-40">Batch Number</th>
              <th scope="col" className="py-3.5 px-4 font-semibold w-40">Expiry Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {items.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-8 text-slate-500 dark:text-slate-400">
                  No line items found for this purchase order.
                </td>
              </tr>
            ) : (
              items.map((item, index) => {
                const itemId = item._id || item.id || index;
                
                // Quantities Calculation
                const orderedQty = Number(item.quantity || item.orderedQuantity || 0);
                const alreadyReceivedQty = Number(item.receivedQuantity || item.alreadyReceived || 0);
                const remainingQty = Math.max(0, orderedQty - alreadyReceivedQty);

                // Controlled Input Values
                const receiveQty = item.receiveQuantity !== undefined ? item.receiveQuantity : '';
                const numericReceiveQty = Number(receiveQty);

                // Validation Rules
                const isNegative = numericReceiveQty < 0;
                const exceedsRemaining = numericReceiveQty > remainingQty;
                const isInvalid = (receiveQty !== '' && isNaN(numericReceiveQty)) || isNegative || exceedsRemaining;

                return (
                  <tr 
                    key={itemId}
                    className={`transition-colors ${
                      isInvalid 
                        ? 'bg-rose-50/60 dark:bg-rose-950/20' 
                        : 'hover:bg-slate-50/80 dark:hover:bg-slate-800/40'
                    }`}
                  >
                    {/* Product Name & SKU */}
                    <td className="py-4 px-4 align-middle">
                      <div className="font-semibold text-slate-900 dark:text-slate-100">
                        {item.name || item.productName || item.productId?.name || 'Unassigned Product'}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-mono">
                        SKU: {item.sku || item.productId?.sku || 'N/A'}
                      </div>
                    </td>

                    {/* Ordered Quantity */}
                    <td className="py-4 px-3 text-center align-middle font-medium text-slate-700 dark:text-slate-300">
                      {orderedQty.toLocaleString('en-NG')}
                    </td>

                    {/* Already Received */}
                    <td className="py-4 px-3 text-center align-middle font-medium text-slate-600 dark:text-slate-400">
                      {alreadyReceivedQty.toLocaleString('en-NG')}
                    </td>

                    {/* Remaining Quantity */}
                    <td className="py-4 px-3 text-center align-middle">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {remainingQty.toLocaleString('en-NG')}
                      </span>
                    </td>

                    {/* Receive Quantity Input */}
                    <td className="py-4 px-4 align-middle">
                      <div className="relative">
                        <input
                          type="number"
                          min="0"
                          max={remainingQty}
                          value={receiveQty}
                          onChange={(e) => onQuantityChange?.(itemId, e.target.value)}
                          placeholder="0"
                          className={`w-full px-3 py-1.5 text-sm rounded-lg border bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 transition-all ${
                            isInvalid
                              ? 'border-rose-300 dark:border-rose-700 focus:ring-rose-500/20 text-rose-600 dark:text-rose-400'
                              : 'border-slate-200 dark:border-slate-700 focus:ring-indigo-500/20 focus:border-indigo-500'
                          }`}
                        />
                        {isInvalid && (
                          <div className="flex items-center gap-1 text-[11px] text-rose-600 dark:text-rose-400 mt-1 font-medium">
                            <AlertCircle className="w-3 h-3 shrink-0" />
                            <span>
                              {isNegative 
                                ? 'Cannot be negative' 
                                : `Max allowed: ${remainingQty}`}
                            </span>
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Batch Number Input */}
                    <td className="py-4 px-4 align-middle">
                      <input
                        type="text"
                        value={item.batchNumber || ''}
                        onChange={(e) => onBatchChange?.(itemId, e.target.value)}
                        placeholder="e.g. BATCH-001"
                        className="w-full px-3 py-1.5 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
                      />
                    </td>

                    {/* Expiry Date Picker */}
                    <td className="py-4 px-4 align-middle">
                      <input
                        type="date"
                        value={item.expiryDate || ''}
                        onChange={(e) => onExpiryChange?.(itemId, e.target.value)}
                        className="w-full px-3 py-1.5 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                      />
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReceiveItemsTable;