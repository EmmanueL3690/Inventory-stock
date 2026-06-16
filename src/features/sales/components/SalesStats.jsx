import React from "react";
import { salesStats } from "../data/mockSales";

const SalesStats = () => {
  return (
    /* RESPONSIVE GRID:
      - 1 column on mobile (default)
      - 2 columns on small/medium screens (sm:)
      - 4 columns on large desktop screens (lg:)
    */
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8">
      {salesStats.map((item) => {
        // Dynamic trending checker (assumes negative growth starts with a minus sign)
        const isNegative = item.growth?.trim().startsWith("-");
        const isNeutral = item.growth?.trim().startsWith("0") || !item.growth;

        return (
          <div
            key={item.title}
            className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200 group relative overflow-hidden"
          >
            {/* Top Row: Title */}
            <div className="flex items-center justify-between">
              <p className="text-xs sm:text-sm font-semibold text-slate-400 uppercase tracking-wider">
                {item.title}
              </p>
              
              {/* Optional: Simple modern decorative accent dot that highlights on hover */}
              <span className="w-1.5 h-1.5 rounded-full bg-slate-200 group-hover:bg-blue-500 transition-colors duration-300" />
            </div>

            {/* Middle Row: Main Value */}
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 mt-2.5">
              {item.value}
            </h3>

            {/* Bottom Row: Dynamic Growth Indicator */}
            <div className="mt-3 flex items-center gap-1.5">
              <span
                className={`inline-flex items-center text-xs font-bold px-2 py-0.5 rounded-md ${
                  isNegative
                    ? "bg-rose-50 text-rose-600"
                    : isNeutral
                    ? "bg-slate-50 text-slate-500"
                    : "bg-emerald-50 text-emerald-600"
                }`}
              >
                {/* Visual arrow indicator matching the trend direction */}
                <span className="mr-0.5 text-[10px]">
                  {isNegative ? "↓" : isNeutral ? "•" : "↑"}
                </span>
                {item.growth}
              </span>
              
              <span className="text-[11px] font-medium text-slate-400">
                vs last month
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SalesStats;