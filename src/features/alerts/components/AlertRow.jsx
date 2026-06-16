import React from 'react';
import AlertTypeBadge from './AlertTypeBadge';
import AlertStatusBadge from './AlertStatusBadge';
import AlertActions from './AlertActions';

const AlertRow = ({ alert, onClick }) => {
  return (
    <tr className="hover:bg-slate-50/60 transition group duration-150 cursor-pointer">
      {/* Alert Type Column */}
      <td className="px-6 py-4.5 whitespace-nowrap" onClick={onClick}>
        <AlertTypeBadge type={alert.type} />
      </td>

      {/* Product Node Target */}
      <td className="px-6 py-4.5 text-sm font-semibold text-slate-800" onClick={onClick}>
        {alert.product}
      </td>

      {/* System Warning Messaging Row */}
      <td className="px-6 py-4.5 text-sm font-medium text-slate-600 max-w-[320px] truncate" onClick={onClick}>
        {alert.message}
      </td>

      {/* Timestamp Profiles */}
      <td className="px-6 py-4.5 text-sm font-medium text-slate-400 whitespace-nowrap" onClick={onClick}>
        {alert.dateTime}
      </td>

      {/* Process Badges status */}
      <td className="px-6 py-4.5 whitespace-nowrap" onClick={onClick}>
        <AlertStatusBadge status={alert.status} />
      </td>

      {/* Actions Trigger Nodes Column */}
      <td className="px-6 py-4.5 text-center whitespace-nowrap">
        <AlertActions onViewClick={onClick} />
      </td>
    </tr>
  );
};

export default AlertRow;