// src/features/dashboard/components/StatCard.jsx
import React from 'react';

export const StatCard = ({ title, value, subtitle, change, isPositive, icon: Icon, iconBg, iconColor }) => (
  <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex items-start justify-between">
    <div className="space-y-2">
      <span className="text-sm font-medium text-slate-500">{title}</span>
      <h3 className={`text-2xl font-bold ${title.includes('Alert') ? 'text-rose-600' : 'text-slate-900'}`}>{value}</h3>
      {change ? (
        <span className={`text-xs font-semibold ${isPositive ? 'text-emerald-600' : 'text-rose-600'} flex items-center gap-1`}>
          {isPositive ? '↑' : '↓'} {change} <span className="text-slate-400 font-normal">{subtitle}</span>
        </span>
      ) : (
        <span className="text-xs text-slate-400 font-normal block">{subtitle}</span>
      )}
    </div>
    <div className={`p-2.5 rounded-lg ${iconBg} ${iconColor}`}>
      <Icon size={20} />
    </div>
  </div>
);