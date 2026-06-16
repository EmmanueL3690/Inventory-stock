import React from 'react';
import PurchaseStatCard from './PurchaseStatCard';
import { ShoppingCart, Calendar, FileText, Truck, CreditCard } from 'lucide-react';

const PurchasesStats = () => {
  const metrics = [
    {
      title: "Total Purchases",
      value: "₦2,450,000",
      change: "12.6%",
      isPositive: true,
      timeframe: "vs last month",
      icon: ShoppingCart,
      iconColor: "text-blue-600 bg-blue-50",
    },
    {
      title: "This Month",
      value: "₦1,250,000",
      change: "15.3%",
      isPositive: true,
      timeframe: "vs last month",
      icon: Calendar,
      iconColor: "text-emerald-600 bg-emerald-50",
    },
    {
      title: "Total Orders",
      value: "48",
      change: "9.1%",
      isPositive: true,
      timeframe: "vs last month",
      icon: FileText,
      iconColor: "text-indigo-600 bg-indigo-50",
    },
    {
      title: "Pending Orders",
      value: "6",
      change: "25.0%",
      isPositive: false,
      timeframe: "vs last month",
      icon: Truck,
      iconColor: "text-amber-600 bg-amber-50",
    },
    {
      title: "Total Paid",
      value: "₦2,100,000",
      change: "13.7%",
      isPositive: true,
      timeframe: "vs last month",
      icon: CreditCard,
      iconColor: "text-cyan-600 bg-cyan-50",
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      {metrics.map((stat, idx) => (
        <PurchaseStatCard key={idx} {...stat} />
      ))}
    </div>
  );
};

export default PurchasesStats;