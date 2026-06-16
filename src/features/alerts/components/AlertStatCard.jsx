import React from 'react';

const colorStyles = {
  rose: { bg: "bg-rose-50", text: "text-rose-600", border: "hover:border-rose-200" },
  amber: { bg: "bg-amber-50", text: "text-amber-600", border: "hover:border-amber-200" },
  blue: { bg: "bg-blue-50", text: "text-blue-600", border: "hover:border-blue-200" },
  emerald: { bg: "bg-emerald-50", text: "text-emerald-600", border: "hover:border-emerald-200" }
};

const AlertStatCard = ({ title, value, subtext, icon: Icon, colorVariant }) => {
  const styles = colorStyles[colorVariant] || colorStyles.blue;

  return (
    <div className={`bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between transition duration-200 ${styles.border}`}>
      <div className="space-y-1.5 min-w-0">
        <span className="text-sm font-medium text-slate-500 truncate block">{title}</span>
        <h3 className="text-3xl font-bold tracking-tight text-slate-900">{value}</h3>
        <p className="text-xs text-slate-400 font-medium truncate">{subtext}</p>
      </div>

      <div className={`p-3 rounded-xl shrink-0 ${styles.bg} ${styles.text}`}>
        <Icon size={22} strokeWidth={2.5} />
      </div>
    </div>
  );
};

export default AlertStatCard;