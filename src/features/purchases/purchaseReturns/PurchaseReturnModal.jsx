import React, { useState, useEffect } from 'react';
import { X, RotateCcw, AlertCircle, Trash2 } from 'lucide-react';

const PurchaseReturnModal = ({
  isOpen = false,
  onClose,
  purchase = null,
  onSubmitReturn,
}) => {
  const [returnItems, setReturnItems] = useState([]);
  const [reason, setReason] = useState('DAMAGED');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState(null);

  // Sync purchase data into local editable state when opened
  useEffect(() => {
    if (purchase && purchase.items) {
      const initialized = purchase.items.map((item) => {
        const costPrice = item.costPrice || item.unitPrice || 0;
        const maxQty = item.quantity || 0;
        return {
          itemId: item.id || item._id,
          productId: item.productId || item.product?.id || item.product?._id,
          productName: item.product?.name || item.productName || item.name || 'Unknown Item',
          sku: item.product?.sku || item.sku || 'N/A',
          purchasedQty: maxQty,
          returnQty: 0,
          costPrice,
          refundSubtotal: 0,
        };
      });
      setReturnItems(initialized);
      setReason('DAMAGED');
      setNotes('');
      setError(null);
    }
  }, [purchase, isOpen]);

  if (!isOpen || !purchase) return null;

  // Handle return quantity update for a specific line item
  const handleQuantityChange = (itemId, value) => {
    setReturnItems((prev) =>
      prev.map((item) => {
        if (item.itemId === itemId) {
          const qty = Math.max(0, Math.min(Number(value), item.purchasedQty));
          return {
            ...item,
            returnQty: qty,
            refundSubtotal: qty * item.costPrice,
          };
        }
        return item;
      })
    );
  };

  // Calculate overall refund total
  const refundTotal = returnItems.reduce((sum, item) => sum + item.refundSubtotal, 0);

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    const activeReturns = returnItems.filter((item) => item.returnQty > 0);

    if (activeReturns.length === 0) {
      setError('Please specify a return quantity for at least one item.');
      return;
    }

    // Construct backend payload (ready for future API integration)
    const payload = {
      purchaseId: purchase.id || purchase._id,
      supplierId: purchase.supplier?.id || purchase.supplier?._id || purchase.supplierId,
      reason,
      notes,
      refundTotal,
      items: activeReturns.map((item) => ({
        itemId: item.itemId,
        productId: item.productId,
        returnQuantity: item.returnQty,
        unitCost: item.costPrice,
        refundSubtotal: item.refundSubtotal,
      })),
      createdAt: new Date().toISOString(),
    };

    if (onSubmitReturn) {
      onSubmitReturn(payload);
    }

    onClose();
  };

  const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount || 0);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/50 dark:bg-slate-950/70 backdrop-blur-xs transition-opacity" 
        onClick={onClose} 
      />

      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
          
          {/* Header */}
          <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 rounded-lg text-rose-600 dark:text-rose-400">
                <RotateCcw className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  Create Purchase Return
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Return items to supplier for PO #{purchase.purchaseOrderNumber || purchase.poNumber}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Form */}
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
            {error && (
              <div className="flex items-center gap-2 p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-lg text-rose-700 dark:text-rose-300 text-sm">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Top Cards: Supplier & Purchase Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-lg">
                <span className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 block mb-1">
                  Supplier Details
                </span>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  {purchase.supplier?.name || purchase.supplierName || 'N/A'}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Type: {purchase.supplier?.type || 'Standard'}
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-lg">
                <span className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 block mb-1">
                  Purchase Details
                </span>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  PO #{purchase.purchaseOrderNumber || purchase.poNumber}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Original Total: {formatCurrency(purchase.grandTotal || purchase.totalAmount)}
                </p>
              </div>
            </div>

            {/* Returned Items Table */}
            <div className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                Returned Line Items
              </h3>

              <div className="border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      <th className="py-2.5 px-3">Product</th>
                      <th className="py-2.5 px-3 text-center w-24">Purchased</th>
                      <th className="py-2.5 px-3 w-28">Cost Price</th>
                      <th className="py-2.5 px-3 w-28">Return Qty</th>
                      <th className="py-2.5 px-3 text-right w-32">Refund Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-sm">
                    {returnItems.map((item) => (
                      <tr key={item.itemId} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                        {/* Item Info */}
                        <td className="py-3 px-3">
                          <div className="font-medium text-slate-900 dark:text-slate-100 text-xs">
                            {item.productName}
                          </div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400">
                            SKU: {item.sku}
                          </div>
                        </td>

                        {/* Purchased Qty */}
                        <td className="py-3 px-3 text-center text-xs text-slate-600 dark:text-slate-400">
                          {item.purchasedQty}
                        </td>

                        {/* Cost Price */}
                        <td className="py-3 px-3 text-xs text-slate-700 dark:text-slate-300">
                          {formatCurrency(item.costPrice)}
                        </td>

                        {/* Return Qty Input */}
                        <td className="py-3 px-3">
                          <input
                            type="number"
                            min="0"
                            max={item.purchasedQty}
                            value={item.returnQty}
                            onChange={(e) => handleQuantityChange(item.itemId, e.target.value)}
                            className="w-full py-1.5 px-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-500"
                          />
                        </td>

                        {/* Refund Subtotal */}
                        <td className="py-3 px-3 text-right font-medium text-slate-900 dark:text-slate-100 text-xs">
                          {formatCurrency(item.refundSubtotal)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Reason & Notes Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                  Reason for Return
                </label>
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full py-2 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all cursor-pointer"
                >
                  <option value="DAMAGED">Damaged Goods</option>
                  <option value="DEFECTIVE">Defective Product</option>
                  <option value="WRONG_ITEM">Incorrect Item Shipped</option>
                  <option value="EXCESS_STOCK">Excess Stock Return</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                  Refund Total Summary
                </label>
                <div className="py-2 px-3 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 rounded-lg flex items-center justify-between">
                  <span className="text-xs font-medium text-rose-700 dark:text-rose-300">
                    Total Estimated Refund
                  </span>
                  <span className="text-base font-bold text-rose-700 dark:text-rose-300">
                    {formatCurrency(refundTotal)}
                  </span>
                </div>
              </div>
            </div>

            {/* Additional Notes */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                Notes / Internal Remarks
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Provide extra details regarding the return..."
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              />
            </div>

            <button id="purchase-return-submit" type="submit" className="hidden" />
          </form>

          {/* Footer Actions */}
          <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium text-sm rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => document.getElementById('purchase-return-submit')?.click()}
              className="inline-flex items-center gap-2 px-5 py-2 bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white font-medium text-sm rounded-lg shadow-sm transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Submit Return</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PurchaseReturnModal;