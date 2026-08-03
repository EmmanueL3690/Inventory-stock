import React from "react";
import {
  Package,
  Layers,
  AlertTriangle,
  XCircle,
  Coins,
} from "lucide-react";

import {
  Card,
  CardContent,
} from "../../../components/ui/Card";

const InventoryStats = ({ stats, loading }) => {
  // Format currency value as Nigerian Naira (NGN)
  const formatNaira = (value) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(value || 0);
  };

  // Maps the requested structure into a clear key-value iteration layout
  const statsConfig = [
    {
      title: "Total Products",
      value: stats?.totalProducts?.toLocaleString() ?? "0",
      icon: Package,
      color: "text-blue-600",
      bg: "bg-blue-50/80",
    },
    {
      title: "Total Stock Units",
      value: stats?.totalUnits?.toLocaleString() ?? "0",
      icon: Layers,
      color: "text-emerald-600",
      bg: "bg-emerald-50/80",
    },
    {
      title: "Low Stock Items",
      value: stats?.lowStock?.toLocaleString() ?? "0",
      icon: AlertTriangle,
      color: "text-amber-600",
      bg: "bg-amber-50/80",
    },
    {
      title: "Out of Stock",
      value: stats?.outOfStock?.toLocaleString() ?? "0",
      icon: XCircle,
      color: "text-rose-600",
      bg: "bg-rose-50/80",
    },
    {
      title: "Inventory Value",
      value: formatNaira(stats?.inventoryValue),
      icon: Coins,
      color: "text-violet-600",
      bg: "bg-violet-50/80",
    },
  ];

  // 1. Loading Skeleton Layout State
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
        {[...Array(5)].map((_, idx) => (
          <Card key={idx} className="bg-white border border-slate-200 shadow-sm rounded-xl">
            <CardContent className="flex items-center justify-between p-5 animate-pulse">
              <div className="space-y-2 flex-1">
                <div className="h-4 bg-slate-200 rounded w-2/3"></div>
                <div className="h-7 bg-slate-200 rounded w-1/2 mt-1"></div>
              </div>
              <div className="h-12 w-12 rounded-xl bg-slate-100 flex-shrink-0 ml-4"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  // 2. Production Render State
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
      {statsConfig.map((stat) => {
        const Icon = stat.icon;

        return (
          <Card
            key={stat.title}
            className="bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-200 rounded-xl overflow-hidden group"
          >
            <CardContent className="flex items-center justify-between p-5">
              <div className="min-w-0">
                <p className="text-xs md:text-sm font-medium text-slate-500 truncate tracking-tight">
                  {stat.title}
                </p>
                <h3 className="mt-1.5 text-xl md:text-2xl font-bold text-slate-900 tracking-tight truncate tabular-nums">
                  {stat.value}
                </h3>
              </div>

              <div
                className={`h-12 w-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-105 ${stat.bg}`}
              >
                <Icon
                  size={22}
                  className={`${stat.color} stroke-[2.2]`}
                />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default InventoryStats;