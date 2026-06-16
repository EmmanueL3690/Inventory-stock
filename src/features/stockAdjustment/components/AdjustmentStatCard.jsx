import React from 'react';

const AdjustmentStatCard = ({ title, value, subtext, icon: Icon, iconBg, iconColor, valueColor }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-2xs group hover:border-slate-300 transition duration-150">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            {title}
          </span>
          <h3 className={`text-xl sm:text-2xl font-black tracking-tight ${valueColor || 'text-slate-900'}`}>
            {value}
          </h3>
        </div>
        {/* Dynamic Structural Indicator Visual Badge */}
        <div className={`p-2.5 rounded-xl shrink-0 transition-transform group-hover:scale-105 duration-200 ${iconBg} ${iconColor}`}>
          <Icon size={16} strokeWidth={2.5} />
        </div>
      </div>
      <span className="text-xs font-medium text-slate-400 mt-3 block">
        {subtext}
      </span>
    </div>
  );
};

export default AdjustmentStatCard;