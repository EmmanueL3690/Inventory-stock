// src/features/dashboard/components/StatsGrid.jsx

import React from "react";
import {
  TrendingUp,
  Package,
  AlertTriangle,
  Star,
} from "lucide-react";

import { StatCard } from "./StatCard";

export const StatsGrid = ({ stats }) => {
  const financials = stats?.financials || {};
  const inventory = stats?.inventoryStatus || {};
  const topProduct =
    stats?.insights?.topSellingProducts?.[0];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

      {/* Today's Revenue */}

      <StatCard
        title="Today's Revenue"
        value={`₦${financials.todayRevenue ?? 0}`}
        change={`${financials.todayTransactionsCount ?? 0} Transactions`}
        subtitle="Today's Sales"
        isPositive={true}
        icon={TrendingUp}
        iconBg="bg-emerald-50"
        iconColor="text-emerald-600"
      />

      {/* Inventory Value */}

      <StatCard
        title="Inventory Value"
        value={`₦${inventory.totalStockAssetValue ?? 0}`}
        change={`${inventory.totalStockQuantity ?? 0} Items`}
        subtitle="Current Stock"
        isPositive={true}
        icon={Package}
        iconBg="bg-blue-50"
        iconColor="text-blue-600"
      />

      {/* Low Stock */}

      <StatCard
        title="Low Stock Alert"
        value={`${inventory.lowStockAlertsCount ?? 0} Items`}
        subtitle="Need Restocking"
        icon={AlertTriangle}
        iconBg="bg-orange-50"
        iconColor="text-orange-500"
      />

      {/* Top Product */}

      <StatCard
        title="Top Selling Product"
        value={topProduct?.name || "No Sales Yet"}
        subtitle={
          topProduct
            ? `${topProduct.totalSold} Units Sold`
            : "Waiting for sales"
        }
        icon={Star}
        iconBg="bg-purple-50"
        iconColor="text-purple-600"
      />

    </div>
  );
};

export default StatsGrid;