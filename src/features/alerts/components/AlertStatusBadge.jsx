import React from 'react';

const statusStyles = {
  "New": "bg-rose-50 text-rose-600 border-rose-100",
  "Read": "bg-blue-50 text-blue-600 border-blue-100",
  "Resolved": "bg-emerald-50 text-emerald-600 border-emerald-100"
};

const AlertStatusBadge = ({ status }) => {
  const baseStyle = "inline-flex items-center justify-center px-2.5 py-0.5 rounded-md text-xs font-bold border";
  const conditionalStyle = statusStyles[status] || "bg-slate-50 text-slate-600 border-slate-100";

  return (
    <span className={`${baseStyle} ${conditionalStyle}`}>
      {status}
    </span>
  );
};

export default AlertStatusBadge;