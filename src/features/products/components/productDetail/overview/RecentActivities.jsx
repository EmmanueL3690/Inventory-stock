import React from 'react';
import { 
  History, 
  Plus, 
  Minus, 
  RefreshCw, 
  RotateCcw, 
  FileText, 
  Activity, 
  AlertCircle, 
  Loader2 
} from 'lucide-react';

// Icon & style configuration matching backend movement types
const getMovementConfig = (type = '') => {
  const normalizedType = String(type).toLowerCase().replace(/[\s_-]+/g, '');

  switch (normalizedType) {
    case 'stockin':
    case 'in':
      return {
        label: 'Stock In',
        icon: Plus,
        style: 'bg-emerald-50 text-emerald-600 border-emerald-100',
        badge: 'bg-emerald-50 text-emerald-700 border-emerald-200'
      };
    case 'stockout':
    case 'out':
    case 'sale':
      return {
        label: 'Stock Out',
        icon: Minus,
        style: 'bg-blue-50 text-blue-600 border-blue-100',
        badge: 'bg-blue-50 text-blue-700 border-blue-200'
      };
    case 'adjustment':
    case 'adjust':
      return {
        label: 'Adjustment',
        icon: RefreshCw,
        style: 'bg-amber-50 text-amber-600 border-amber-100',
        badge: 'bg-amber-50 text-amber-700 border-amber-200'
      };
    case 'reversal':
    case 'reverse':
      return {
        label: 'Reversal',
        icon: RotateCcw,
        style: 'bg-rose-50 text-rose-600 border-rose-100',
        badge: 'bg-rose-50 text-rose-700 border-rose-200'
      };
    default:
      return {
        label: type || 'Movement',
        icon: FileText,
        style: 'bg-purple-50 text-purple-600 border-purple-100',
        badge: 'bg-purple-50 text-purple-700 border-purple-200'
      };
  }
};

const RecentActivities = ({ 
  movements = [], 
  loading = false, 
  error = null 
}) => {
  const hasMovements = movements.length > 0;

  // Safe date conversion helper
  const formatDate = (dateString) => {
    if (!dateString) return "--";
    try {
      const parsedDate = new Date(dateString);
      if (isNaN(parsedDate.getTime())) return dateString;
      return parsedDate.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6 space-y-4">
      {/* Header Block Rows */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-slate-100 text-slate-600 rounded-lg">
            <History size={15} />
          </div>
          <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Recent Activities</h4>
        </div>
        {hasMovements && (
          <button className="text-xs font-bold text-blue-600 hover:text-blue-700 transition cursor-pointer">
            View all
          </button>
        )}
      </div>

      {/* 1. Loading State */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-10 px-4 border border-slate-100 rounded-xl bg-slate-50/30 text-center">
          <Loader2 className="h-7 w-7 text-blue-600 animate-spin mb-2" />
          <p className="text-xs font-semibold text-slate-500">Loading recent inventory movements...</p>
        </div>
      ) : error ? (
        /* 2. Error State */
        <div className="flex flex-col items-center justify-center py-10 px-4 border border-rose-100 rounded-xl bg-rose-50/20 text-center">
          <AlertCircle className="h-8 w-8 text-rose-500 mb-2" />
          <h5 className="text-xs font-bold text-slate-800">Failed to load activity log</h5>
          <p className="text-[11px] text-rose-500 max-w-xs mt-1">{error}</p>
        </div>
      ) : !hasMovements ? (
        /* 3. Empty State */
        <div className="flex flex-col items-center justify-center py-12 px-4 border border-dashed border-slate-200 rounded-xl bg-slate-50/30 text-center">
          <Activity className="h-8 w-8 text-slate-300 mb-2.5" />
          <h5 className="text-xs font-bold text-slate-700">No recent activity.</h5>
          <p className="text-[11px] text-slate-400 max-w-xs mt-1 leading-relaxed">
            Activity history will appear once inventory events are recorded.
          </p>
        </div>
      ) : (
        /* 4. Timeline List */
        <div className="relative pl-3 space-y-5 before:content-[''] before:absolute before:left-[23px] before:top-2 before:bottom-2 before:w-[1.5px] before:bg-slate-100">
          {movements.map((movement, index) => {
            const rawType = movement?.type || movement?.movementType || "update";
            const config = getMovementConfig(rawType);
            const Icon = config.icon;

            const quantity = Number(movement?.quantity ?? movement?.qty ?? 0);
            const notes = movement?.notes || movement?.reason || movement?.description;
            const userName = movement?.user?.name || movement?.user || movement?.createdByName || "System";
            const batchNum = movement?.batchNumber || movement?.batch?.batchNumber || movement?.batchId;
            const timestamp = movement?.createdAt || movement?.timestamp || movement?.date;

            return (
              <div key={movement?._id || movement?.id || index} className="relative flex items-start gap-4 group">
                
                {/* Dynamic Timeline Icon Node */}
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 relative z-10 bg-white transition group-hover:scale-105 duration-150 ${config.style}`}>
                  <Icon size={10} strokeWidth={3} />
                </div>

                {/* Data Content Block */}
                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold text-slate-400 block tracking-wide">
                      {formatDate(timestamp)}
                    </span>
                    {/* Movement Type Badge */}
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold border ${config.badge}`}>
                      {config.label}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-bold text-slate-700 leading-normal truncate">
                      Quantity: <span className="font-extrabold text-slate-900">{quantity > 0 ? `+${quantity}` : quantity}</span>
                    </p>
                    {batchNum && (
                      <span className="text-[10px] font-mono font-medium text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                        Batch: {batchNum}
                      </span>
                    )}
                  </div>

                  {notes && (
                    <p className="text-[11px] text-slate-500 truncate">
                      {notes}
                    </p>
                  )}

                  <span className="text-[10px] font-semibold text-slate-400 block">
                    by {userName}
                  </span>
                </div>

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RecentActivities;