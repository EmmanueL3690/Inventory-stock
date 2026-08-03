import React from 'react';
import { 
  DollarSign, 
  ShoppingBag, 
  Clock 
} from 'lucide-react';

const PurchasesStats = ({ stats = {}, loading = false }) => {
  // Extract properties directly from stats object
  const {
    totalCapitalSpent = 0,
    totalOrders = 0,
    pendingPayments = 0,
  } = stats;

  // Formatter helpers using Nigerian currency (NGN)
  const formatCurrency = (value) => 
    new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 2,
    }).format(value || 0);

  const formatNumber = (value) => 
    new Intl.NumberFormat('en-NG').format(value || 0);

  const statCards = [
    {
      id: 'total-capital-spent',
      title: 'Total Capital Spent',
      value: formatCurrency(totalCapitalSpent),
      icon: DollarSign,
      color: 'text-emerald-600 dark:text-emerald-400',
      bgColor: 'bg-emerald-50 dark:bg-emerald-950/40',
      borderColor: 'border-emerald-200 dark:border-emerald-800/50',
    },
    {
      id: 'total-purchase-orders',
      title: 'Total Purchase Orders',
      value: formatNumber(totalOrders),
      icon: ShoppingBag,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-950/40',
      borderColor: 'border-blue-200 dark:border-blue-800/50',
    },
    {
      id: 'pending-payments',
      title: 'Pending Payments',
      value: typeof pendingPayments === 'number' 
        ? formatCurrency(pendingPayments) 
        : formatNumber(pendingPayments),
      icon: Clock,
      color: 'text-amber-600 dark:text-amber-400',
      bgColor: 'bg-amber-50 dark:bg-amber-950/40',
      borderColor: 'border-amber-200 dark:border-amber-800/50',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
      {statCards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.id}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs hover:shadow-md transition-shadow duration-200 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {card.title}
              </span>
              <div className={`p-2.5 rounded-lg border ${card.bgColor} ${card.borderColor}`}>
                <Icon className={`w-5 h-5 ${card.color}`} />
              </div>
            </div>

            <div className="mt-4">
              {loading ? (
                <div className="h-8 w-36 bg-slate-200 dark:bg-slate-800 animate-pulse rounded-md" />
              ) : (
                <div className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                  {card.value}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PurchasesStats;