import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { day: "May 1", sales: 150000, previous: 60000 },
  { day: "May 2", sales: 220000, previous: 130000 },
  { day: "May 3", sales: 180000, previous: 70000 },
  { day: "May 4", sales: 330000, previous: 140000 },
  { day: "May 5", sales: 160000, previous: 70000 },
  { day: "May 6", sales: 250000, previous: 120000 },
  { day: "May 7", sales: 180000, previous: 90000 },
  { day: "May 8", sales: 320000, previous: 170000 },
  { day: "May 9", sales: 210000, previous: 120000 },
  { day: "May 10", sales: 220000, previous: 130000 },
  { day: "May 11", sales: 400000, previous: 260000 },
];

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0
  }).format(value);
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 backdrop-blur-sm border border-slate-100 p-3 rounded-xl shadow-xl space-y-1.5">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">{label}</p>
        <div className="space-y-1">
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center gap-4 justify-between">
              <div className="flex items-center gap-1.5">
                <span 
                  className="w-2 h-2 rounded-full shrink-0" 
                  style={{ backgroundColor: entry.stroke }}
                />
                <span className="text-[11px] font-medium text-slate-600">
                  {entry.name === "sales" ? "Current" : "Previous"}
                </span>
              </div>
              <span className="text-[11px] font-bold text-slate-900">
                {formatCurrency(entry.value)}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

const SalesOverviewChart = () => {
  // Simple viewport listener to prevent label mashups on mobile screen scales
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    handleResize(); // Initialize state mapping on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    /* RESPONSIVE DESIGN TRICK: 
       Instead of a hard locked height, we let the container naturally size itself 
       via aspect-square or aspect-video on mobile screen scales, and anchor it 
       to a comfortable h-[440px] on desktop laptop systems.
    */
    <div className="w-full bg-white border border-slate-100 rounded-2xl p-4 sm:p-5 md:p-6 aspect-[4/3] sm:aspect-auto sm:h-[400px] md:h-[440px] flex flex-col justify-between shadow-sm">
      
      {/* Top Header Row Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-6">
        <div className="space-y-0.5">
          <h3 className="font-bold tracking-tight text-base sm:text-lg text-slate-900">
            Sales Overview
          </h3>
          <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
            Monitor real-time revenue cycles compared directly against baseline targets.
          </p>
        </div>

        {/* Dashboard Actions and Custom Built-in Legends */}
        <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto pt-2 sm:pt-0 border-t border-slate-50 sm:border-0">
          
          {/* Dynamic Color Indicators Inline Labels */}
          <div className="flex items-center gap-3 text-[11px] font-semibold select-none">
            <div className="flex items-center gap-1.5 text-slate-600">
              <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
              <span>Current</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400">
              <span className="w-2 h-2 rounded-full bg-slate-200 shrink-0" />
              <span>Previous</span>
            </div>
          </div>

          {/* Timeframe Filter Dropdown Menu */}
          <div className="relative">
            <select className="h-8 pl-2.5 pr-7 appearance-none bg-slate-50/50 hover:bg-slate-50 border border-slate-200 rounded-lg text-[11px] font-bold text-slate-700 transition-all outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 cursor-pointer">
              <option>Daily</option>
              <option>Weekly</option>
              <option>Monthly</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none text-slate-400">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

        </div>
      </div>

      {/* Chart Engine Container Block */}
      <div className="flex-1 w-full min-h-0 text-[10px] sm:text-[11px] font-semibold text-slate-400">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart 
            data={data} 
            margin={{ 
              top: 5, 
              right: isMobile ? 5 : 10, 
              left: isMobile ? -25 : -10, 
              bottom: 0 
            }}
          >
            <CartesianGrid vertical={false} stroke="#f1f5f9" />

            <XAxis 
              dataKey="day" 
              axisLine={false} 
              tickLine={false}
              dy={10}
              stroke="#94a3b8"
              /* RESPONSIVE DESIGN TRICK: 
                 If it's a mobile screen scale, only show every second date tick (interval={1}) 
                 so text tags don't smash horizontally into each other!
              */
              interval={isMobile ? 1 : 0}
            />

            <YAxis 
              axisLine={false} 
              tickLine={false}
              dx={-5}
              stroke="#94a3b8"
              tickFormatter={(v) => v >= 1000 ? `₦${v / 1000}k` : `₦${v}`}
              /* If screen space gets critically narrow, hide the Y-Axis 
                 to offer max layout rendering area for vectors */
              hide={window.innerWidth < 360}
            />

            <Tooltip 
              content={<CustomTooltip />} 
              cursor={{ stroke: '#f1f5f9', strokeWidth: 1.5 }}
              /* Prevents mouse track sticking bugs on touchscreen panels */
              trigger={isMobile ? "click" : "hover"}
            />

            {/* Previous Period Baseline Vector Line */}
            <Line
              type="monotone"
              dataKey="previous"
              name="previous"
              stroke="#e2e8f0"
              strokeWidth={isMobile ? 2 : 2.5}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 0, fill: '#cbd5e1' }}
            />

            {/* Current Period Accent Line */}
            <Line
              type="monotone"
              dataKey="sales"
              name="sales"
              stroke="#2563eb"
              strokeWidth={isMobile ? 2.5 : 3}
              dot={false}
              activeDot={{ r: 5, strokeWidth: 2, stroke: '#fff', fill: '#2563eb' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default SalesOverviewChart;