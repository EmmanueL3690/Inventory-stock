import React from 'react';
import { Layers, CircleDollarSign, TrendingUp, Wallet, Coins } from 'lucide-react';

const ProductStats = ({ stats }) => {
  const cards = [
    {
      label: "Current Stock",
      value: `${stats.currentStock.toLocaleString()} ${stats.unitType}`,
      subtext: stats.stockStatus,
      isPositive: true,
      icon: Layers,
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      label: "Inventory Value",
      value: `₦${stats.inventoryValue.toLocaleString(undefined, {minimumFractionDigits: 2})}`,
      subtext: "Total value",
      isPositive: null,
      icon: Wallet,
      color: "text-purple-600",
      bg: "bg-purple-50"
    },
    {
      label: "Units Sold",
      value: stats.unitsSoldThisMonth.toLocaleString(),
      subtext: "This month",
      isPositive: null,
      icon: TrendingUp,
      color: "text-amber-600",
      bg: "bg-amber-50"
    },
    {
      label: "Revenue Generated",
      value: `₦${stats.revenueThisMonth.toLocaleString(undefined, {minimumFractionDigits: 2})}`,
      subtext: "This month",
      isPositive: null,
      icon: CircleDollarSign,
      color: "text-emerald-600",
      bg: "bg-emerald-50"
    },
    {
      label: "Profit Generated",
      value: `₦${stats.profitThisMonth.toLocaleString(undefined, {minimumFractionDigits: 2})}`,
      subtext: "This month",
      isPositive: null,
      icon: Coins,
      color: "text-sky-600",
      bg: "bg-sky-50"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {cards.map((card, i) => {
        const Icon = card.icon;
        return (
          <div key={i} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex items-start justify-between hover:border-slate-300 transition duration-150">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">{card.label}</span>
              <h3 className="text-lg font-bold text-slate-900 tracking-tight">{card.value}</h3>
              <p className="text-[11px] font-medium text-slate-400 flex items-center">
                {card.isPositive !== null && (
                  <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${card.isPositive ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                )}
                {card.subtext}
              </p>
            </div>
            <div className={`p-2 rounded-xl shrink-0 ${card.bg} ${card.color}`}>
              <Icon size={18} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductStats;