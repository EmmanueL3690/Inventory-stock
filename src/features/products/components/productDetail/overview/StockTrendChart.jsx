import React from 'react';
import { ChevronDown, BarChart3 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

// Custom pristine design tooltip matching your UI spec exactly
const CustomStockTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-xl flex flex-col items-center border border-slate-800">
        <span>{payload[0].value.toLocaleString()} Units</span>
        <span className="text-[9px] text-slate-400 font-medium">{payload[0].payload.date}</span>
      </div>
    );
  }
  return null;
};

const StockTrendChart = ({ product }) => {
  const stockHistory = product?.stockHistory || [];
  const hasHistory = stockHistory.length > 0;

  // Map internal structural data safely for Recharts consumption
  // Expecting future format: { date, stock }
  const chartData = stockHistory.map(item => ({
    date: item?.date || '',
    amount: item?.stock || 0
  }));

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 space-y-4">
      {/* Header Widget Actions */}
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <h4 className="text-sm font-bold text-slate-900 tracking-tight">
            Stock Trend <span className="text-slate-400 font-medium">(Last 30 Days)</span>
          </h4>
        </div>
        <button className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 text-xs font-bold text-slate-600 shadow-2xs hover:bg-slate-50 transition cursor-pointer">
          <span>Last 30 Days</span>
          <ChevronDown size={12} className="text-slate-400" />
        </button>
      </div>

      {/* Chart Canvas / Empty State Area */}
      <div className="w-full h-44 pt-2">
        {!hasHistory ? (
          /* Professional Empty State Container matching the exact card size */
          <div className="w-full h-full flex flex-col items-center justify-center border border-dashed border-slate-200 rounded-xl bg-slate-50/30 text-center px-4">
            <BarChart3 className="h-8 w-8 text-slate-300 mb-2" />
            <h5 className="text-xs font-bold text-slate-700">No stock history available.</h5>
            <p className="text-[11px] text-slate-400 max-w-xs mt-0.5 leading-relaxed">
              Stock movement charts will appear after inventory tracking is enabled.
            </p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 5, left: 5, bottom: 0 }}>
              <defs>
                <linearGradient id="stockAreaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2563eb" stopOpacity={0.14} />
                  <stop offset="100%" stopColor="#2563eb" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              
              {/* Background Grid Pattern Lines */}
              <CartesianGrid strokeDasharray="4 4" stroke="#f1f5f9" vertical={false} />
              
              {/* Horizontal Axis Configuration - visible only when data exists */}
              <XAxis 
                dataKey="date" 
                hide={false}
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }}
                dy={10}
              />
              
              {/* Hidden Vertical Value Scale Axis to protect padding geometry */}
              <YAxis hide domain={['dataMin - 100', 'dataMax + 100']} />
              
              {/* Custom Interactive Tooltip Hover Focus Hook */}
              <Tooltip content={<CustomStockTooltip />} cursor={{ stroke: '#e2e8f0', strokeWidth: 1 }} />
              
              {/* Beautiful Monotone Spline Curve Area */}
              <Area
                type="monotone"
                dataKey="amount"
                stroke="#2563eb"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#stockAreaGradient)"
                activeDot={{ r: 5, fill: '#2563eb', stroke: '#fff', strokeWidth: 2, className: "shadow-sm" }}
                dot={{ r: 3, fill: '#fff', stroke: '#2563eb', strokeWidth: 1.5 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default StockTrendChart;