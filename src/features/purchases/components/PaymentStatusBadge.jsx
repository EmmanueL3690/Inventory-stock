import { Wallet } from "lucide-react";

const colorStyles = {
  Paid: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
  Partial: "bg-amber-50 text-amber-700 border-amber-200/60",
  Unpaid: "bg-rose-50 text-rose-700 border-rose-200/60",
};

const PaymentStatusBadge = ({ status = "Unpaid" }) => {
  // Graceful fallback for custom or unexpected status values
  const currentStyle = colorStyles[status] || "bg-slate-50 text-slate-600 border-slate-200";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider ${currentStyle}`}
    >
      <Wallet size={12} className="opacity-80" />
      {status}
    </span>
  );
};

export default PaymentStatusBadge;