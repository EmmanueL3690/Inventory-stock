import React from 'react';

export default function StockInSummaryCard({ title, value, subtitle, variant = 'indigo' }) {
  const styles = {
    indigo: {
      border: 'border-indigo-100',
      badge: 'bg-indigo-50 text-indigo-700 border-indigo-200/50',
    },
    emerald: {
      border: 'border-emerald-100',
      badge: 'bg-emerald-50 text-emerald-700 border-emerald-200/50',
    },
    amber: {
      border: 'border-amber-100',
      badge: 'bg-amber-50 text-amber-700 border-amber-200/50',
    }
  };

  const selectedStyle = styles[variant] || styles.indigo;

  return (
    <div className={`p-6 rounded-xl border bg-white shadow-sm flex flex-col justify-between transition-shadow duration-200 hover:shadow-md ${selectedStyle.border}`}>
      <div>
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          {title}
        </h2>
        <p className="text-3xl font-black text-slate-900 mt-2 tracking-tight">
          {value}
        </p>
      </div>
      <div className="mt-4 pt-3 border-t border-slate-50">
        <span className={`inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-md border ${selectedStyle.badge}`}>
          {subtitle}
        </span>
      </div>
    </div>
  );
}