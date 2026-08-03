import React, { useMemo, memo } from "react";
import { Calculator, Package, Layers, CreditCard } from "lucide-react";

/**
 * Currency Formatter (NGN)
 */
const formatMoney = (amount = 0) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
  }).format(Number(amount) || 0);
};

const PurchaseTotals = memo(({ items = [] }) => {
  // Single-pass memoized calculation for metrics
  const totals = useMemo(() => {
    const safeItems = Array.isArray(items) ? items : [];

    let totalProductsCount = 0;
    let totalQuantityCount = 0;
    let grandTotalAmount = 0;

    for (let i = 0; i < safeItems.length; i++) {
      const item = safeItems[i];
      if (!item || typeof item !== "object") continue;

      // Count distinct selected products
      if (item.productId) {
        totalProductsCount += 1;
      }

      // Aggregate quantities
      const qty = Number(item.quantity);
      if (!isNaN(qty) && qty > 0) {
        totalQuantityCount += qty;
      }

      // Aggregate row total or calculated item total
      const price = Number(item.totalPrice ?? (Number(item.costPrice || 0) * (Number(item.quantity) || 0)));
      if (!isNaN(price) && price > 0) {
        grandTotalAmount += price;
      }
    }

    return {
      totalProducts: totalProductsCount,
      totalQuantity: totalQuantityCount,
      grandTotal: grandTotalAmount,
    };
  }, [items]);

  return (
    <div className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm transition-colors">
      {/* Header */}
      <div className="flex items-center gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">
          <Calculator className="h-4 w-4" />
        </div>
        <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100 uppercase tracking-wider">
          Purchase Summary
        </h3>
      </div>

      {/* Metrics List */}
      <div className="py-4 space-y-3">
        {/* Total Products */}
        <div className="flex items-center justify-between text-xs sm:text-sm">
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
            <Package className="h-4 w-4 text-slate-400 dark:text-slate-500" />
            <span>Total Products</span>
          </div>
          <span className="font-semibold text-slate-900 dark:text-slate-100">
            {totals.totalProducts}
          </span>
        </div>

        {/* Total Quantity */}
        <div className="flex items-center justify-between text-xs sm:text-sm">
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
            <Layers className="h-4 w-4 text-slate-400 dark:text-slate-500" />
            <span>Total Quantity</span>
          </div>
          <span className="font-semibold text-slate-900 dark:text-slate-100">
            {totals.totalQuantity}
          </span>
        </div>
      </div>

      {/* Grand Total Footer */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CreditCard className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
            Grand Total
          </span>
        </div>
        <span className="text-lg sm:text-xl font-extrabold text-emerald-600 dark:text-emerald-400 tracking-tight">
          {formatMoney(totals.grandTotal)}
        </span>
      </div>
    </div>
  );
});

PurchaseTotals.displayName = "PurchaseTotals";

export default PurchaseTotals;