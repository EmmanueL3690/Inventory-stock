import React from 'react';
import { History, Plus, ShoppingCart, RefreshCw } from 'lucide-react';

const activityIconStyles = {
  "stock-in": { icon: Plus, style: "bg-emerald-50 text-emerald-600 border-emerald-100" },
  "sale": { icon: ShoppingCart, style: "bg-blue-50 text-blue-600 border-blue-100" },
  "adjustment": { icon: RefreshCw, style: "bg-amber-50 text-amber-600 border-amber-100" }
};

const RecentActivities = ({ activities }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6 space-y-4">
      {/* Header Block Rows */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-slate-100 text-slate-600 rounded-lg">
            <History size={15} />
          </div>
          <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Recent Activities</h4>
        </div>
        <button className="text-xs font-bold text-blue-600 hover:text-blue-700 transition cursor-pointer">View all</button>
      </div>

      {/* Timeline Stream Node List Container */}
      <div className="relative pl-3 space-y-5 before:content-[''] before:absolute before:left-[23px] before:top-2 before:bottom-2 before:w-[1.5px] before:bg-slate-100">
        {activities.map((activity) => {
          const config = activityIconStyles[activity.type] || activityIconStyles["stock-in"];
          const Icon = config.icon;

          return (
            <div key={activity.id} className="relative flex items-start gap-4 group">
              
              {/* Dynamic Timeline Dot/Icon Node */}
              <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 relative z-10 bg-white transition group-hover:scale-105 duration-150 ${config.style}`}>
                <Icon size={10} strokeWidth={3} />
              </div>

              {/* Data Content Block */}
              <div className="space-y-0.5 min-w-0">
                <span className="text-[10px] font-bold text-slate-400 block tracking-wide">{activity.date}</span>
                <p className="text-xs font-bold text-slate-700 leading-normal truncate">{activity.text}</p>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentActivities;