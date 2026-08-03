import React from 'react';

const Badge = ({ variant = 'active', children, className = '' }) => {
  const variations = {
    active: "bg-emerald-50 text-emerald-700 border border-emerald-100",
    inactive: "bg-rose-50 text-rose-600 border border-rose-100",
    // Adding category badges as well since they are used heavily in the view layout
    Medicines: "bg-blue-50 text-blue-600 font-medium text-xs rounded-lg px-2.5 py-1",
    "Health & Beauty": "bg-emerald-50 text-emerald-600 font-medium text-xs rounded-lg px-2.5 py-1",
    "Baby Care": "bg-purple-50 text-purple-600 font-medium text-xs rounded-lg px-2.5 py-1",
  };

  const isStatus = variant === 'active' || variant === 'inactive';

  return (
    <span 
      className={`inline-flex items-center gap-1.5 font-medium ${
        isStatus ? 'text-xs rounded-full px-2.5 py-1 capitalize' : ''
      } ${variations[variant] || 'bg-slate-50 text-slate-600 text-xs rounded-lg px-2.5 py-1'} ${className}`}
    >
      {isStatus && (
        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
          variant === 'active' ? 'bg-emerald-500' : 'bg-rose-500'
        }`} />
      )}
      {children}
    </span>
  );
};

export default Badge;