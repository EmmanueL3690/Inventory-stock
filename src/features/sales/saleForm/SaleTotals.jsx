import React, { useMemo } from "react";

export const SaleTotals = ({ items = [], availableProducts = [] }) => {
  // Compute totals for UI preview using useMemo
  const { totalItems, subtotal, grandTotal } = useMemo(() => {
    let count = 0;
    let sum = 0;

    items.forEach((item) => {
      const qty = Number(item.quantity) || 0;
      count += qty;

      // Find selected product to obtain price preview
      const product =
        item.selectedProduct ||
        availableProducts.find(
          (p) => String(p.id || p._id) === String(item.productId)
        );

      const price =
        product?.sellingPrice || product?.price || 0;

      sum += price * qty;
    });

    return {
      totalItems: count,
      subtotal: sum,
      grandTotal: sum, // Preview grand total (Backend will compute final fees/taxes/discounts)
    };
  }, [items, availableProducts]);

  return (
    <div className="flex justify-end pt-4">
      <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 p-4 rounded-xl text-right min-w-[240px] space-y-2">
        
        {/* Total Items Count */}
        <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
          <span>Items Count (Preview):</span>
          <span className="font-bold text-slate-700 dark:text-slate-300">
            {totalItems} {totalItems === 1 ? "item" : "items"}
          </span>
        </div>

        {/* Subtotal */}
        <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
          <span>Subtotal (Preview):</span>
          <span className="font-bold text-slate-700 dark:text-slate-300">
            ${subtotal.toFixed(2)}
          </span>
        </div>

        <hr className="border-slate-200 dark:border-slate-700 my-1" />

        {/* Grand Total */}
        <div className="flex justify-between items-baseline pt-1">
          <span className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
            Grand Total:
          </span>
          <span className="text-2xl font-black text-slate-900 dark:text-slate-100">
            ${grandTotal.toFixed(2)}
          </span>
        </div>

        <p className="text-[10px] text-slate-400 dark:text-slate-500 italic pt-1">
          * Estimated preview. Final amounts calculated on backend.
        </p>
      </div>
    </div>
  );
};

export default SaleTotals;