import React from 'react';
import { HelpCircle } from 'lucide-react';
import AdjustmentRow from './AdjustmentRow';
import AdjustmentPagination from './AdjustmentPagination';

const AdjustmentTable = ({ engine }) => {
  return (
    <div className="space-y-4">
      {/* Scrollable Context Base Wrapper Panel */}
      <div className="overflow-x-auto -mx-5 sm:mx-0 border border-slate-100 rounded-xl bg-white">
        <table className="w-full border-collapse text-left min-w-[900px]">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/60 select-none">
              <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Product</th>
              <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">SKU / Barcode</th>
              <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <span>System Qty</span>
                <HelpCircle size={12} className="text-slate-400 cursor-help" />
              </th>
              <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Physical Qty</th>
              <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Difference</th>
              <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Reason</th>
              <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Value Impact</th>
              <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-center w-12">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {engine.items.length === 0 ? (
              <tr>
                <td colSpan="9" className="px-4 py-12 text-center text-xs font-semibold text-slate-400 bg-slate-50/30">
                  No matching record adjustments found in this scope session.
                </td>
              </tr>
            ) : (
              engine.items.map((item, index) => (
                <AdjustmentRow
                  key={item.id}
                  item={item}
                  index={index}
                  onQtyChange={engine.updatePhysicalQty}
                  onReasonChange={engine.updateReason}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Integrated Pagination Navigation Frame */}
      <AdjustmentPagination engine={engine} />
    </div>
  );
};

export default AdjustmentTable;