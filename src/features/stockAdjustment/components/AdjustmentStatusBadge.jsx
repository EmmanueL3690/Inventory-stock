import React from 'react';

const statusStyles = {
  Pending: "bg-amber-50 text-amber-600 border-amber-100",
  Confirmed: "bg-emerald-50 text-emerald-600 border-emerald-100"
};

const AdjustmentStatusBadge = ({ status }) => {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 text-[11px] font-bold border rounded-md transition duration-150 select-none ${statusStyles[status] || "bg-slate-50 text-slate-500 border-slate-100"}`}>
      {status}
    </span>
  );
};

export default AdjustmentStatusBadge;