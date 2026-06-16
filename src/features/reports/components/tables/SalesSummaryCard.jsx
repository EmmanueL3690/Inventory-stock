import React from 'react';

const summary = [
  {
    label: "Total Sales",
    value: "₦3,450,000",
  },
  {
    label: "Total Cost",
    value: "₦2,450,000",
  },
  {
    label: "Gross Profit",
    value: "₦1,000,000",
  },
  {
    label: "Gross Profit Margin",
    value: "28.99%",
    green: true,
  },
  {
    label: "Total Expenses",
    value: "₦350,000",
  },
  {
    label: "Net Profit",
    value: "₦650,000",
    green: true,
    highlight: true, // Special class flag for your main bottom-line metric
  },
  {
    label: "Net Profit Margin",
    value: "18.84%",
    green: true,
  },
  {
    label: "Average Order Value",
    value: "₦22,115",
  },
];

const SalesSummaryCard = () => {
  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-5 md:p-6 shadow-sm w-full flex flex-col justify-between gap-5 h-full">
      
      {/* Title Meta Header */}
      <div className="space-y-0.5">
        <h3 className="font-bold tracking-tight text-lg text-slate-900">
          Sales Summary
        </h3>
        <p className="text-xs text-slate-500 font-medium">
          Quick baseline overview of net earnings, margins, and operational costs.
        </p>
      </div>

      {/* Main Metric Grid Block
          RESPONSIVE DESIGN TRICK: 
          Uses single column on mobile, drops into a grid-cols-2 on screens >= 640px 
          so long desktop screens display metrics symmetrically side-by-side! */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 select-none my-2">
        {summary.map((item) => (
          <div
            key={item.label}
            className={`flex justify-between items-center text-xs px-2.5 py-3 rounded-xl transition-all border border-transparent ${
              item.highlight 
                ? "bg-blue-50/40 border-blue-100/50 sm:col-span-2 font-bold my-1" 
                : "hover:bg-slate-50/60 hover:border-slate-100/50"
            }`}
          >
            {/* Metric Label Title */}
            <span className={`font-semibold ${item.highlight ? "text-slate-900" : "text-slate-600"}`}>
              {item.label}
            </span>

            {/* Dynamic Value Render (Standard vs Premium Emerald Badges) */}
            {item.green ? (
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100/60 px-2 py-0.5 rounded-lg shrink-0">
                {item.value}
              </span>
            ) : (
              <span className={`font-bold shrink-0 ${item.highlight ? "text-blue-600 text-sm" : "text-slate-900"}`}>
                {item.value}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Dynamic Action Trigger Footer */}
      <div className="flex items-center justify-end pt-3 border-t border-slate-50">
        <button className="h-9 px-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-all outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 flex items-center gap-1.5 active:scale-[0.98]">
          <span>View Full Report</span>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

    </div>
  );
};

export default SalesSummaryCard;