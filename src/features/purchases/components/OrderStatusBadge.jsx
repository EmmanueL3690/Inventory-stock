const colorStyles = {
  Completed: "bg-emerald-100 text-emerald-800",
  Pending: "bg-amber-100 text-amber-800",
  "Partially Received": "bg-indigo-100 text-indigo-800",
};

const OrderStatusBadge = ({ status = "Pending" }) => {
  const currentStyle = colorStyles[status] || "bg-slate-100 text-slate-700";

  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap ${currentStyle}`}
    >
      {status}
    </span>
  );
};

export default OrderStatusBadge;