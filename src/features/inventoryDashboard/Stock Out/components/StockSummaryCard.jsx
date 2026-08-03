import React from 'react';
import { TrendingDown, PackageMinus, Clock } from 'lucide-react';

const icons = {
  'trending-down': TrendingDown,
  'package-minus': PackageMinus,
  'clock': Clock,
};

export default function StockSummaryCard({ title, value, description, iconName, variant = 'indigo' }) {
  const IconComponent = icons[iconName];

  const variantStyles = {
    indigo: 'border-indigo-100 bg-indigo-50/30 text-indigo-700',
    rose: 'border-rose-100 bg-rose-50/30 text-rose-700',
    amber: 'border-amber-100 bg-amber-50/30 text-amber-700',
  };

  return (
    <div className="group h-32 p-6 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-between">
      <div className="flex items-center gap-5">
        {/* Centered Icon Container */}
        <div className={`p-3 rounded-xl border shrink-0 transition-transform duration-300 group-hover:scale-105 ${variantStyles[variant] || variantStyles.indigo}`}>
          {IconComponent && <IconComponent className="h-6 w-6 shrink-0" />}
        </div>
        
        {/* Metadata Stack */}
        <div className="space-y-0.5">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            {title}
          </h2>
          <p className="text-3xl font-black text-slate-900 tracking-tight">
            {value}
          </p>
          <p className="text-[11px] text-slate-500">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}