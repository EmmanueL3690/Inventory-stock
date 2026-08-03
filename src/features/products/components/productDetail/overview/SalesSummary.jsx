import React from 'react';
import { ChevronDown, BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// Minimalist sales value inspector module
const CustomSalesTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 text-white text-[10px] font-black px-2 py-1 rounded-md shadow-md">
        <span>{payload[0].value.toLocaleString()} Units</span>
      </div>
    );
  }
  return null;
};

const SalesSummary = ({ product }) => {
  const salesSummary = product?.salesSummary;
  const hasSalesData = !!salesSummary;

  // Safeguard calculations and fallbacks
  const unitsSold = salesSummary?.unitsSold ?? null;
  const revenue = salesSummary?.revenue ?? null;
  const chartData = salesSummary?.monthlySales || [];
  const hasChartData = chartData.length > 0;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 space-y-5">
      {/* Header Container Actions */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Sales Summary</h4>
        <button className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 text-xs font-bold text-slate-600 shadow-2xs hover:bg-slate-50 transition cursor-pointer">
          <span>This Month</span>
          <ChevronDown size={12} className="text-slate-400" />
        </button>
      </div>

      {!hasSalesData ? (
        /* Professional Empty State Wrapper matching card boundaries */
        <div className="flex flex-col items-center justify-center py-20 px-4 border border-dashed border-slate-200 rounded-xl bg-slate-50/30 text-center">
          <BarChart3 className="h-9 w-9 text-slate-300 mb-2.5" />
          <h5 className="text-xs font-bold text-slate-700">No sales analytics available.</h5>
          <p className="text-[11px] text-slate-400 max-w-xs mt-0.5 leading-relaxed">
            Sales insights will appear after sales transactions are recorded.
          </p>
        </div>
      ) : (
        <>
          {/* Numerical Data Splitting Metric Cards Blocks */}
          <div className="grid grid-cols-2 gap-4 bg-slate-50/60 p-3.5 rounded-xl border border-slate-100">
            <div className="space-y-0.5">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide block">Total Units Sold</span>
              <h3 className="text-base font-extrabold text-slate-900">
                {unitsSold !== null ? unitsSold.toLocaleString() : "--"}
              </h3>
              <span className="inline-flex items-center text-[10px] font-bold text-slate-400">
                <span className="w-1 h-1 rounded-full bg-slate-300 mr-1.5" /> Live Data
              </span>
            </div>
            <div className="space-y-0.5 border-l border-slate-200 pl-4">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide block">Total Revenue</span>
              <h3 className="text-base font-extrabold text-slate-900">
                {revenue !== null ? `₦${revenue.toLocaleString()}` : "--"}
              </h3>
              <span className="inline-flex items-center text-[10px] font-bold text-slate-400">
                <span className="w-1 h-1 rounded-full bg-slate-300 mr-1.5" /> Live Data
              </span>
            </div>
          </div>

          {/* Bar Chart Section */}
          <div className="space-y-2">
            <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Top Selling Periods</h5>
            
            {/* Recharts Bar Canvas Containment Deck */}
            <div className="w-full h-32 pt-2">
              {!hasChartData ? (
                <div className="w-full h-full flex items-center justify-center border border-dashed border-slate-100 bg-slate-50/20 rounded-lg">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">No chart data available</span>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }} barSize={32}>
                    {/* Timeline Axis Markers */}
                    <XAxis 
                      dataKey="period" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#94a3b8', fontSize: 9, fontWeight: 700 }}
                      dy={8}
                    />
                    
                    {/* Value Axis remains hidden for visual neatness */}
                    <YAxis hide />
                    
                    {/* Interactive Inspector Overlay Hook */}
                    <Tooltip content={<CustomSalesTooltip />} cursor={{ fill: '#f8fafc', opacity: 0.6 }} />
                    
                    {/* Unified Rounded Column Element Node */}
                    <Bar 
                      dataKey="value" 
                      fill="#2563eb" 
                      radius={[6, 6, 0, 0]}
                      className="hover:fill-blue-700 transition-colors duration-150"
                    />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SalesSummary;