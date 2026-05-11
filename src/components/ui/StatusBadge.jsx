import { cn } from "../../Lib/utils";

const StatusBadge = ({ status, className }) => {
  const key = status?.toLowerCase() || "inactive";

  const variants = {
    active: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
    inactive: "bg-slate-50 text-slate-600 ring-slate-500/10",
    archived: "bg-rose-50 text-rose-700 ring-rose-600/10",
    pending: "bg-amber-50 text-amber-700 ring-amber-600/10", 
  };

  const dots = {
    active: "bg-emerald-500",
    inactive: "bg-slate-400",
    archived: "bg-rose-500",
    pending: "bg-amber-500",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset",
        variants[key] || variants.inactive,
        className
      )}
    >
      {/* The Status Dot */}
      <span className={cn("h-1.5 w-1.5 rounded-full", dots[key] || dots.inactive)} />
      
      {/* Capitalize first letter */}
      <span className="capitalize">{key}</span>
    </span>
  );
};

export default StatusBadge; 