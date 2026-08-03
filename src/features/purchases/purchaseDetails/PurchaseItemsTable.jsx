import React from 'react';
import { Package, Layers } from 'lucide-react';

const PurchaseItemsTable = ({ items = [] }) => {
  // Currency formatter helper
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 2,
    }).format(amount || 0);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden flex flex-col">
      {/* Section Header */}
      <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800/60 rounded-md text-indigo-600 dark:text-indigo-400">
            <Package className="w-4 h-4" />
          </div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Purchased Line Items ({items.length})
          </h3>
        </div>
      </div>

      {/* Scrollable Container for Table with Sticky Header */}
      <div className="overflow-x-auto max-h-[360px]">
        <table className="w-full text-left border-collapse">
          {/* Sticky Header */}
          <thead className="sticky top-0 z-10 bg-slate-50 dark:bg-slate-800/90 backdrop-blur-xs border-b border-slate-200 dark:border-slate-800 text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            <tr>
              <th className="py-3 px-4">Product</th>
              <th className="py-3 px-4">SKU</th>
              <th className="py-3 px-4 text-center">Quantity</th>
              <th className="py-3 px-4 text-right">Cost Price</th>
              <th className="py-3 px-4 text-right">Total Price</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-xs">
            {items.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-8 text-center text-slate-400 dark:text-slate-500">
                  <div className="flex flex-col items-center gap-1.5">
                    <Layers className="w-6 h-6 stroke-[1.5]" />
                    <span>No line items found for this purchase order.</span>
                  </div>
                </td>
              </tr>
            ) : (
              items.map((item, index) => {
                const productName =
                  item.productId?.name ||
                  item.product?.name ||
                  item.productName ||
                  item.name ||
                  'Unnamed Product';

                const sku =
                  item.productId?.sku ||
                  item.product?.sku ||
                  item.sku ||
                  'N/A';

                const quantity = item.quantity || 0;
                const costPrice = item.costPrice || item.unitPrice || 0;
                const totalPrice =
                  item.totalPrice !== undefined
                    ? item.totalPrice
                    : quantity * costPrice;

                return (
                  <tr
                    key={item.id || item._id || index}
                    className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    {/* Product Name */}
                    <td className="py-3 px-4 font-medium text-slate-900 dark:text-slate-100">
                      {productName}
                    </td>

                    {/* SKU */}
                    <td className="py-3 px-4 font-mono text-slate-500 dark:text-slate-400">
                      {sku}
                    </td>

                    {/* Quantity */}
                    <td className="py-3 px-4 text-center font-semibold text-slate-800 dark:text-slate-200">
                      {quantity}
                    </td>

                    {/* Cost Price */}
                    <td className="py-3 px-4 text-right text-slate-600 dark:text-slate-400">
                      {formatCurrency(costPrice)}
                    </td>

                    {/* Total Price */}
                    <td className="py-3 px-4 text-right font-semibold text-slate-900 dark:text-slate-100">
                      {formatCurrency(totalPrice)}
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

export default PurchaseItemsTable;