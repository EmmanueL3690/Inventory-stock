import React from 'react';
import { Sparkles, ArrowUpRight, AlertTriangle, Clock } from 'lucide-react';

const insightIcons = {
  growth: { icon: ArrowUpRight, bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-100/70" },
  warning: { icon: AlertTriangle, bg: "bg-amber-50", text: "text-amber-500", border: "border-amber-100/70" },
  expiry: { icon: Clock, bg: "bg-purple-50", text: "text-purple-500", border: "border-purple-100/70" }
};

const AIInsights = ({ insights }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6 space-y-4">
      {/* Header Panel Title Bar */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-purple-50 text-purple-600 rounded-lg">
            <Sparkles size={15} fill="currentColor" />
          </div>
          <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">AI Insights</h4>
        </div>
        <button className="text-xs font-bold text-blue-600 hover:text-blue-700 transition cursor-pointer">View all</button>
      </div>

      {/* Rendered Log Collection Pipeline */}
      <div className="space-y-3">
        {insights.map((item) => {
          const config = insightIcons[item.type] || insightIcons.growth;
          const Icon = config.icon;

          return (
            <div key={item.id} className={`p-3.5 border rounded-xl flex items-start gap-3 transition hover:bg-slate-50/50 duration-150 ${config.border}`}>
              <div className={`p-2 rounded-lg shrink-0 ${config.bg} ${config.text}`}>
                <Icon size={14} strokeWidth={2.5} />
              </div>
              <p className="text-xs font-semibold text-slate-600 leading-relaxed pt-0.5">
                {item.text}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AIInsights;