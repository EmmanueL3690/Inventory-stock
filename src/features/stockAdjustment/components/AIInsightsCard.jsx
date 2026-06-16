import React from 'react';
import { Sparkles, AlertTriangle, CheckCircle2, Info } from 'lucide-react';

const insightConfig = {
  critical: { icon: AlertTriangle, bg: "bg-rose-50", text: "text-rose-600", border: "border-rose-100" },
  success: { icon: CheckCircle2, bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-100" },
  info: { icon: Info, bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-100" }
};

const AIInsightsCard = ({ insights }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
      {/* Widget Header */}
      <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
        <div className="p-1.5 bg-purple-50 text-purple-600 rounded-lg shrink-0">
          <Sparkles size={14} fill="currentColor" />
        </div>
        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          AI Automated Insights
        </h4>
      </div>

      {/* Dynamic Warnings Stream */}
      <div className="space-y-2.5">
        {insights.map((item) => {
          const cfg = insightConfig[item.type] || insightConfig.info;
          const Icon = cfg.icon;

          return (
            <div key={item.id} className={`p-3 border rounded-xl flex items-start gap-2.5 transition hover:bg-slate-50/50 duration-150 ${cfg.border}`}>
              <div className={`p-1.5 rounded-lg shrink-0 ${cfg.bg} ${cfg.text}`}>
                <Icon size={13} strokeWidth={2.5} />
              </div>
              <p className="text-[11px] font-semibold text-slate-600 leading-relaxed pt-0.5">
                {item.text}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AIInsightsCard;