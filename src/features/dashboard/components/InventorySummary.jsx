// src/features/dashboard/components/InventorySummary.jsx

import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

export const InventorySummary = ({ summary }) => {

  const inventory = summary?.inventoryStatus || {};

  const totalStock =
    inventory.totalStockQuantity || 0;

  const lowStock =
    inventory.lowStockAlertsCount || 0;

  const outOfStock =
    inventory.outOfStockAlertsCount || 0;

  const chartData = [
    {
      name: "Available",
      value: Math.max(totalStock - lowStock - outOfStock, 0),
      color: "#10B981",
    },
    {
      name: "Low Stock",
      value: lowStock,
      color: "#F59E0B",
    },
    {
      name: "Out of Stock",
      value: outOfStock,
      color: "#EF4444",
    },
  ];

  return (
    <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex flex-col h-full">

      <h2 className="font-bold text-slate-900 text-base mb-5">
        Inventory Summary
      </h2>

      <div className="flex flex-col items-center flex-1">

        {/* Chart */}

        <div className="relative w-40 h-40">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <PieChart>

              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={52}
                outerRadius={70}
                paddingAngle={3}
                dataKey="value"
              >

                {chartData.map((item, index) => (
                  <Cell
                    key={index}
                    fill={item.color}
                  />
                ))}

              </Pie>

            </PieChart>

          </ResponsiveContainer>

          <div className="absolute inset-0 flex flex-col items-center justify-center">

            <span className="text-3xl font-bold text-slate-900">
              {totalStock}
            </span>

            <span className="text-xs uppercase text-slate-400 font-semibold">
              Total Stock
            </span>

          </div>

        </div>

        {/* Summary */}

        <div className="w-full mt-8 space-y-3">

          {chartData.map((item) => (

            <div
              key={item.name}
              className="flex items-center justify-between"
            >

              <div className="flex items-center gap-2">

                <span
                  className="w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: item.color,
                  }}
                />

                <span className="text-sm text-slate-600">
                  {item.name}
                </span>

              </div>

              <span className="font-semibold text-slate-800">
                {item.value}
              </span>

            </div>

          ))}

          <div className="border-t pt-3 mt-4">

            <div className="flex justify-between text-sm">

              <span className="text-slate-500">
                Inventory Value
              </span>

              <span className="font-bold text-slate-900">
                ₦
                {inventory.totalStockAssetValue?.toLocaleString() ||
                  0}
              </span>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default InventorySummary;