import React from 'react';
import AlertRow from './AlertRow';

const AlertsTable = ({ alerts, onRowClick }) => {
  return (
    <div className="overflow-x-auto -mx-4 sm:mx-0 border border-slate-100 rounded-xl">
      <table className="w-full border-collapse text-left min-w-[800px]">
        <thead>
          <tr className="border-b border-slate-100 bg-slate-50/70">
            <th className="px-6 py-4.5 text-xs font-bold text-slate-500 uppercase tracking-wider w-[15%]">Alert Type</th>
            <th className="px-6 py-4.5 text-xs font-bold text-slate-500 uppercase tracking-wider w-[20%]">Product</th>
            <th className="px-6 py-4.5 text-xs font-bold text-slate-500 uppercase tracking-wider w-[35%]">Message</th>
            <th className="px-6 py-4.5 text-xs font-bold text-slate-500 uppercase tracking-wider w-[15%]">Date & Time</th>
            <th className="px-6 py-4.5 text-xs font-bold text-slate-500 uppercase tracking-wider w-[10%]">Status</th>
            <th className="px-6 py-4.5 text-xs font-bold text-slate-500 uppercase tracking-wider w-[5%] text-center">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {alerts.length === 0 ? (
            <tr>
              <td colSpan="6" className="px-6 py-12 text-center text-sm font-medium text-slate-400">
                No system notification alerts discovered matching criteria.
              </td>
            </tr>
          ) : (
            alerts.map((alert) => (
              <AlertRow 
                key={alert.id} 
                alert={alert} 
                onClick={() => onRowClick(alert)} 
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AlertsTable;