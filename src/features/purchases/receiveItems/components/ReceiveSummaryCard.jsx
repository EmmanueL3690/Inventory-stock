import React, { useMemo } from 'react';
import { 
  Package, 
  ShoppingCart, 
  ArrowDownRight, 
  Clock 
} from 'lucide-react';

const ReceiveSummaryCard = ({ items = [] }) => {
  // Calculated summary metrics from items prop
  const summary = useMemo(() => {
    let totalProducts = items.length;
    let orderedUnits = 0;
    let receivingUnits = 0;
    let remainingUnits = 0;

    items.forEach((item) => {
      const ordered = Number(item.quantity || item.orderedQuantity || 0);
      const alreadyReceived = Number(item.receivedQuantity || item.alreadyReceived || 0);
      
      // Parsed receiving input value
      const receiveInput = Number(item.receiveQuantity);
      const currentReceiving = !isNaN(receiveInput) && receiveInput > 0 ? receiveInput : 0;

      const remaining = Math.max(0, ordered - (alreadyReceived + currentReceiving));

      orderedUnits += ordered;
      receivingUnits += currentReceiving;
      remainingUnits += remaining;
    });

    return {
      totalProducts,
      orderedUnits,
      receivingUnits,
      remainingUnits,
    };
  }, [items]);

  // Formatter helper for numbers
  const formatNumber = (val) => new Intl.NumberFormat('en-NG').format(val || 0);

  const stats = [
    {
      id: 'total-products',
      label: 'Total Products',
      value: formatNumber(summary.totalProducts),
      icon: Package,
      color: 'text-slate-600 dark:text-slate-400',
      bgColor: 'bg-slate-100 dark:bg-slate-800',
    },
    {
      id: 'ordered-units',
      label: 'Total Ordered Units',
      value: formatNumber(summary.orderedUnits),
      icon: ShoppingCart,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-950/50',
    },
    {
      id: 'receiving-units',
      label: 'Receiving Units',
      value: formatNumber(summary.receivingUnits),
      icon: ArrowDownRight,
      color: 'text-emerald-600 dark:text-emerald-400',
      bgColor: 'bg-emerald-50 dark:bg-emerald-950/50',
    },
    {
      id: 'remaining-units',
      label: 'Remaining Units',
      value: formatNumber(summary.remainingUnits),
      icon: Clock,
      color: 'text-amber-600 dark:text-amber-400',
      bgColor: 'bg-amber-50 dark:bg-amber-950/50',
    },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs w-full space-y-4">
      <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
        <h2 className="text-base font-semibold text-slate-900 dark:text-white">
          Receiving Summary
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Real-time calculation based on table inputs.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.id}
              className="p-3.5 rounded-lg border border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-800/20 flex items-center gap-3"
            >
              <div className={`p-2.5 rounded-md ${stat.bgColor} shrink-0`}>
                <Icon className={`w-4 h-4 ${stat.color}`} />
              </div>
              <div>
                <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                  {stat.label}
                </p>
                <p className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                  {stat.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReceiveSummaryCard;