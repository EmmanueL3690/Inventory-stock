// src/features/dashboard/components/StatsGrid.jsx
import React from 'react';
import { TrendingUp, Package, AlertTriangle, Star } from 'lucide-react';
import { StatCard } from './StatCard';

export const StatsGrid = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      <StatCard 
        title="Today's Sales" value={stats.todaySales.value} change={stats.todaySales.change}
        subtitle="vs yesterday" isPositive={stats.todaySales.isPositive} icon={TrendingUp} iconBg="bg-emerald-50" iconColor="text-emerald-600"
      />
      <StatCard 
        title="Total Inventory Value" value={stats.totalInventory.value} change={stats.totalInventory.change}
        subtitle="vs last month" isPositive={stats.totalInventory.isPositive} icon={Package} iconBg="bg-blue-50" iconColor="text-blue-600"
      />
      <StatCard 
        title="Low Stock Alert" value={`${stats.lowStock.count} Items`} subtitle={stats.lowStock.message} icon={AlertTriangle} iconBg="bg-orange-50" iconColor="text-orange-500"
      />
      <StatCard 
        title="Top Selling Product" value={stats.topProduct.name} subtitle={stats.topProduct.units} icon={Star} iconBg="bg-purple-50" iconColor="text-purple-600"
      />
    </div>
  );
};

export default StatsGrid;