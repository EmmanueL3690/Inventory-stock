import React from 'react';

const ReportStatCard = ({
  title,
  value,
  change = "0%",
  icon: IconComponent, 
  color = "blue",      
}) => {
  const colorMap = {
    blue: { bg: "bg-blue-50 text-blue-600", metric: "shadow-blue-500/5" },
    emerald: { bg: "bg-emerald-50 text-emerald-600", metric: "shadow-emerald-500/5" },
    amber: { bg: "bg-amber-50 text-amber-600", metric: "shadow-amber-500/5" },
    rose: { bg: "bg-rose-50 text-rose-600", metric: "shadow-rose-500/5" },
    slate: { bg: "bg-slate-50 text-slate-600", metric: "shadow-slate-500/5" },
  };

  const selectedColor = colorMap[color] || colorMap.blue;
  const isNegative = change.toString().includes("-");

  return (
    <div className="w-full bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-slate-200/80 transition-all duration-200 flex flex-col justify-between min-h-[140px] group">
      
      {/* Top Layout Row */}
      <div className="flex items-start justify-between gap-3 w-full">
        
        {/* Left Side: Context Stack */}
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block truncate mb-1">
            {title}
          </p>
          {/* FIX: Removed whitespace-nowrap and break-all. 
            Added leading-tight so that if a massive number drops to 2 lines on compact windows, 
            it stays tightly grouped and beautifully readable.
          */}
          <h3 className="text-xl lg:text-lg xl:text-2xl font-black tracking-tight text-slate-900 leading-tight break-words">
            {value}
          </h3>
        </div>

        {/* Right Side: Icon Box */}
        <div className={`w-10 h-10 xl:w-11 xl:h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105 shadow-sm ${selectedColor.bg} ${selectedColor.metric}`}>
          {IconComponent ? (
            typeof IconComponent === 'function' || typeof IconComponent === 'object' ? (
              <IconComponent className="w-5 h-5 stroke-[2.2]" />
            ) : (
              IconComponent
            )
          ) : null}
        </div>

      </div>

      {/* Bottom Layout Row: Trend Footnote */}
      <div className="flex flex-wrap items-center gap-1.5 mt-auto pt-3 border-t border-slate-50">
        <span 
          className={`inline-flex items-center text-[10px] font-bold px-1.5 py-0.5 rounded ${
            isNegative 
              ? "bg-rose-50 text-rose-600" 
              : "bg-emerald-50 text-emerald-600"
          }`}
        >
          {isNegative ? "↓" : "↑"} {change.replace("-", "")}
        </span>
        <span className="text-[11px] text-slate-400 font-medium truncate">
          vs previous period
        </span>
      </div>

    </div>
  );
};

export default ReportStatCard;