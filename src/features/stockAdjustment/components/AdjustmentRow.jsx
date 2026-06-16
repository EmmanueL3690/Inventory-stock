import React from 'react';
import { MoreVertical } from 'lucide-react';
import AdjustmentStatusBadge from './AdjustmentStatusBadge';
import AdjustmentReasonSelect from './AdjustmentReasonSelect';

const AdjustmentRow = ({ item, index, onQtyChange, onReasonChange }) => {
  const difference = item.physicalQty - item.systemQty;
  const valueImpact = difference * item.unitCost;
  const isPending = item.status === 'Pending';

  // Format currencies matching the UI pattern (e.g., +₦5,000.00, -₦3,750.00)
  const formatImpact = (val) => {
    if (val === 0) return '₦0.00';
    const sign = val > 0 ? '+' : '-';
    return `${sign}₦${Math.abs(val).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatDiff = (diff) => {
    if (diff === 0) return '0';
    return diff > 0 ? `+${diff}` : `${diff}`;
  };

  return (
    <tr className="hover:bg-slate-50/40 transition duration-150 border-b border-slate-100 last:border-0 group">
      {/* Product Image & Meta Context Column */}
      <td className="px-4 py-3.5">
        <div className="flex items-center gap-3 min-w-[200px]">
          <div className="w-9 h-9 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center font-bold text-[10px] text-slate-400 uppercase select-none shrink-0 group-hover:border-slate-200 transition">
            {item.category.slice(0, 3)}
          </div>
          <div className="space-y-0.5">
            <span className="text-xs font-bold text-slate-800 block truncate max-w-[180px]">{item.name}</span>
            <span className="inline-block px-1.5 py-0.5 text-[9px] font-extrabold text-slate-400 bg-slate-100 rounded-md uppercase tracking-wider">{item.category}</span>
          </div>
        </div>
      </td>

      {/* Identifiers Column */}
      <td className="px-4 py-3.5 text-xs font-semibold text-slate-500">
        <div className="space-y-0.5">
          <span className="text-slate-800 font-bold block">{item.sku}</span>
          <span className="text-[10px] text-slate-400 block">{item.barcode}</span>
        </div>
      </td>

      {/* System Registered Quantity Anchor */}
      <td className="px-4 py-3.5 text-xs font-bold text-slate-800">
        {item.systemQty.toLocaleString()}
      </td>

      {/* Live Operational Input Field */}
      <td className="px-4 py-3.5">
        <input
          type="number"
          value={item.physicalQty === 0 && isPending ? '' : item.physicalQty}
          onChange={(e) => onQtyChange(item.id, e.target.value)}
          disabled={!isPending}
          placeholder="0"
          className="w-20 h-8 px-2 border border-slate-200 text-xs font-bold text-slate-800 rounded-lg text-center bg-white focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition outline-none disabled:bg-slate-50/80 disabled:text-slate-400 disabled:cursor-not-allowed"
        />
      </td>

      {/* Difference Indicator Output Column */}
      <td className={`px-4 py-3.5 text-xs font-black ${difference > 0 ? 'text-emerald-600' : difference < 0 ? 'text-rose-600' : 'text-slate-400'}`}>
        {formatDiff(difference)}
      </td>

      {/* Reason Categorization Action Dropdown Row Element */}
      <td className="px-4 py-3.5">
        <AdjustmentReasonSelect
          value={item.reason}
          onChange={(val) => onReasonChange(item.id, val)}
          isDisabled={!isPending || difference === 0}
        />
      </td>

      {/* Mathematical Variance Impact Column */}
      <td className={`px-4 py-3.5 text-xs font-black ${valueImpact > 0 ? 'text-emerald-600' : valueImpact < 0 ? 'text-rose-600' : 'text-slate-800'}`}>
        {formatImpact(valueImpact)}
      </td>

      {/* Verification Badge Column */}
      <td className="px-4 py-3.5">
        <AdjustmentStatusBadge status={item.status} />
      </td>

      {/* Context Options Anchor Trigger Trigger Button */}
      <td className="px-4 py-3.5 text-center">
        <button className="p-1.5 rounded-lg border border-slate-200 text-slate-400 bg-white hover:bg-slate-50 hover:text-slate-700 shadow-2xs transition active:scale-95 cursor-pointer">
          <MoreVertical size={13} strokeWidth={2.5} />
        </button>
      </td>
    </tr>
  );
};

export default AdjustmentRow;