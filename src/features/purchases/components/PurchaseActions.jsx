import { Eye, MoreVertical } from "lucide-react";

const PurchaseActions = ({ onView, onMenuOpen }) => {
  return (
    <div className="flex items-center justify-end gap-2">
      <button
        onClick={onView}
        aria-label="View purchase details"
        className="h-9 w-9 rounded-xl border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-50 active:scale-[0.95] transition duration-150 shadow-sm"
      >
        <Eye size={16} />
      </button>

      <button
        onClick={onMenuOpen}
        aria-label="More options"
        className="h-9 w-9 rounded-xl border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-50 active:scale-[0.95] transition duration-150 shadow-sm"
      >
        <MoreVertical size={16} />
      </button>
    </div>
  );
};

export default PurchaseActions;