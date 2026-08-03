// src/features/dashboard/components/RecentAlerts.jsx

import React from "react";
import {
  AlertTriangle,
  PackageX,
  Package,
} from "lucide-react";

export const RecentAlerts = ({ alerts }) => {

  const inventory = alerts?.inventoryStatus || {};

  const lowStock = inventory.lowStockAlertsCount || 0;
  const outOfStock = inventory.outOfStockAlertsCount || 0;

  const alertList = [];

  if (lowStock > 0) {
    alertList.push({
      title: "Low Stock Products",
      detail: `${lowStock} product(s) are below the reorder level.`,
      type: "low",
      time: "Now",
    });
  }

  if (outOfStock > 0) {
    alertList.push({
      title: "Out of Stock",
      detail: `${outOfStock} product(s) are completely out of stock.`,
      type: "out",
      time: "Now",
    });
  }

  if (alertList.length === 0) {
    alertList.push({
      title: "Inventory Healthy",
      detail: "No stock alerts at the moment.",
      type: "success",
      time: "Updated",
    });
  }

  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm flex flex-col h-full">

      {/* Header */}

      <div className="p-5 flex items-center justify-between border-b border-slate-100">

        <h2 className="font-bold text-slate-900 text-base">
          Inventory Alerts
        </h2>

        <button className="text-xs font-semibold text-blue-600 hover:underline">
          View All
        </button>

      </div>

      {/* Alerts */}

      <div className="flex-1 divide-y divide-slate-100">

        {alertList.map((alert, index) => {

          const Icon =
            alert.type === "out"
              ? PackageX
              : alert.type === "low"
              ? AlertTriangle
              : Package;

          const iconBg =
            alert.type === "out"
              ? "bg-red-100 text-red-600"
              : alert.type === "low"
              ? "bg-yellow-100 text-yellow-600"
              : "bg-emerald-100 text-emerald-600";

          return (
            <div
              key={index}
              className="p-5 flex gap-3 hover:bg-slate-50 transition"
            >

              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center ${iconBg}`}
              >
                <Icon size={18} />
              </div>

              <div className="flex-1">

                <div className="flex justify-between items-center">

                  <h4 className="font-semibold text-sm text-slate-900">
                    {alert.title}
                  </h4>

                  <span className="text-xs text-slate-400">
                    {alert.time}
                  </span>

                </div>

                <p className="text-sm text-slate-500 mt-1">
                  {alert.detail}
                </p>

              </div>

            </div>
          );
        })}

      </div>

      {/* Footer */}

      <div className="border-t border-slate-100">

        <button className="w-full py-3 text-sm font-semibold text-blue-600 hover:bg-slate-50 transition">
          View All Alerts
        </button>

      </div>

    </div>
  );
};

export default RecentAlerts;