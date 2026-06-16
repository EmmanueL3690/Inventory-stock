import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const data = [
  { name: "Medicines", value: 1450000 },
  { name: "Health & Beauty", value: 850000 },
  { name: "Baby Care", value: 550000 },
  { name: "Personal Care", value: 350000 },
  { name: "Other", value: 250000 },
];

const COLORS = [
  "#0070f3", // Vibrant Royal Blue (Medicines)
  "#22c55e", // Green (Health & Beauty)
  "#8b5cf6", // Purple (Baby Care)
  "#ff9900", // Orange (Personal Care)
  "#33b5e5", // Light Blue (Other)
];

const formatCurrency = (val) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0
  }).format(val);
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-100 p-2.5 rounded-xl shadow-md">
        <div className="flex items-center gap-2">
          <span 
            className="w-2.5 h-2.5 rounded-full" 
            style={{ backgroundColor: payload[0].payload.fill }} 
          />
          <span className="text-xs font-semibold text-slate-600">{payload[0].name}:</span>
          <span className="text-xs font-bold text-slate-900">{formatCurrency(payload[0].value)}</span>
        </div>
      </div>
    );
  }
  return null;
};

const SalesCategoryChart = () => {
  const totalSales = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-5 md:p-6 shadow-sm w-full max-w-md mx-auto">
      
      {/* Chart Title Header */}
      <div className="mb-4">
        <h3 className="font-semibold text-gray-900 text-lg">
          Sales by Category
        </h3>
      </div>

      {/* Main Container Stacked Vertically */}
      <div className="flex flex-col items-center gap-6 w-full">
        
        {/* Top Section: Interactive Pie Ring Graphic Asset */}
        <div className="relative w-[230px] h-[230px] shrink-0 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip content={<CustomTooltip />} />
              <Pie
                data={data}
                innerRadius={75}
                outerRadius={105}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    className="outline-none stroke-white stroke-2 hover:opacity-95 transition-opacity cursor-pointer"
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Absolute Center Typography Stack */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none text-center">
            <span className="text-lg font-bold text-slate-900">
              ₦{(totalSales / 1000000).toFixed(2)}M
            </span>
            <span className="text-xs text-gray-400 font-medium mt-0.5">
              Total Sales
            </span>
          </div>
        </div>

        {/* Bottom Section: Vertical Legend Data Rows */}
        <div className="w-full flex flex-col divide-y divide-slate-50 pt-2">
          {data.map((item, index) => {
            const percentage = ((item.value / totalSales) * 100).toFixed(1);
            
            return (
              <div
                key={item.name}
                className="flex items-center justify-between py-3 text-xs sm:text-sm text-slate-700 w-full first:pt-0 last:pb-0"
              >
                {/* Colored indicator pill and item identity */}
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: COLORS[index] }}
                  />
                  <span className="font-medium text-gray-700 truncate">
                    {item.name}
                  </span>
                </div>

                {/* Localized metrics structured at the right hand side */}
                <div className="flex items-center gap-2 font-medium shrink-0 pl-4">
                  <span className="text-gray-900 font-semibold">{formatCurrency(item.value)}</span>
                  <span className="text-gray-400 font-normal">({percentage}%)</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default SalesCategoryChart;