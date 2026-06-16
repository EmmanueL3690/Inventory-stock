import React from 'react';

const AdjustmentReasonSelect = ({ value, onChange, isDisabled }) => {
  const reasons = ["-", "Manual Correction", "Damaged", "Expired", "Missing"];

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={isDisabled}
      className="h-8 px-2.5 bg-white border border-slate-200 text-xs font-semibold text-slate-700 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 hover:border-slate-300 transition cursor-pointer disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed appearance-none pr-6 relative"
      style={{
        backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 6px center',
        backgroundSize: '12px'
      }}
    >
      {reasons.map((reason) => (
        <option key={reason} value={reason}>
          {reason}
        </option>
      ))}
    </select>
  );
};

export default AdjustmentReasonSelect;