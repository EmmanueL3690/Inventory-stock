import PaymentStatusBadge from "./PaymentStatusBadge";
import OrderStatusBadge from "./OrderStatusBadge";
import PurchaseActions from "./PurchaseActions";

const PurchaseRow = ({ purchase, view = "desktop" }) => {
  
  // 📱 Mobile Card Layout (Renders inside the mobile container)
  if (view === "mobile") {
    return (
      <div className="p-5 flex flex-col gap-4 bg-white hover:bg-slate-50/50 transition duration-200">
        {/* Header: PO Number & Date */}
        <div className="flex items-start justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">PO Number</span>
            <p className="font-bold text-slate-900 text-base">{purchase.poNo}</p>
          </div>
          <div className="text-right">
            <p className="font-medium text-slate-700 text-sm">{purchase.date}</p>
            <p className="text-xs text-slate-400 mt-0.5">{purchase.time}</p>
          </div>
        </div>

        {/* Body: Supplier, Category & Items */}
        <div className="flex justify-between items-end bg-slate-50 p-3 rounded-xl border border-slate-100">
          <div>
            <p className="font-semibold text-slate-800 text-sm">{purchase.supplier}</p>
            <span className="mt-1 inline-block rounded-md bg-white border border-slate-200 px-2 py-0.5 text-xs font-medium text-slate-600">
              {purchase.category}
            </span>
          </div>
          <p className="text-sm font-medium text-slate-500">
            {purchase.items} items
          </p>
        </div>

        {/* Status Badges & Pricing */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</span>
            <div className="flex flex-wrap gap-2">
              <PaymentStatusBadge status={purchase.paymentStatus} />
              <OrderStatusBadge status={purchase.orderStatus} />
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Total</span>
            <span className="text-lg font-black text-slate-900">
              ₦{purchase.amount.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Footer: Metadata & Action Items */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100 mt-1">
          <div className="text-xs text-slate-500">
            {purchase.receivedOn && (
              <>
                <span className="font-medium">Received:</span> {purchase.receivedOn}
              </>
            )}
          </div>
          <div>
            <PurchaseActions />
          </div>
        </div>
      </div>
    );
  }

  // 🖥️ Desktop Row Layout (Renders inside standard <table> markup)
  return (
    <tr className="border-b border-slate-100 last:border-0 hover:bg-slate-50/70 transition duration-150 ease-in-out group">
      {/* PO Number */}
      <td className="px-6 py-4.5 font-bold text-slate-900">
        {purchase.poNo}
      </td>

      {/* Date & Time */}
      <td className="px-6 py-4.5">
        <div className="font-semibold text-slate-700 text-sm">
          {purchase.date}
        </div>
        <div className="text-xs text-slate-400 mt-0.5">
          {purchase.time}
        </div>
      </td>

      {/* Supplier & Category */}
      <td className="px-6 py-4.5">
        <div className="font-semibold text-slate-800 text-sm">
          {purchase.supplier}
        </div>
        <span className="mt-1 inline-block rounded-md bg-slate-100/80 px-2 py-0.5 text-xs font-medium text-slate-600">
          {purchase.category}
        </span>
      </td>

      {/* Item count */}
      <td className="px-6 py-4.5 text-sm font-medium text-slate-600">
        {purchase.items} items
      </td>

      {/* Formatted Currency */}
      <td className="px-6 py-4.5 font-extrabold text-slate-900 text-base">
        ₦{purchase.amount.toLocaleString()}
      </td>

      {/* Payment Status Component */}
      <td className="px-6 py-4.5">
        <PaymentStatusBadge status={purchase.paymentStatus} />
      </td>

      {/* Order Status Component */}
      <td className="px-6 py-4.5">
        <OrderStatusBadge status={purchase.orderStatus} />
      </td>

      {/* Delivery Date */}
      <td className="px-6 py-4.5 text-sm font-medium text-slate-600">
        {purchase.receivedOn || <span className="text-slate-300">—</span>}
      </td>

      {/* Interactive Action Menu */}
      <td className="px-6 py-4.5 text-right opacity-80 group-hover:opacity-100 transition-opacity">
        <PurchaseActions />
      </td>
    </tr>
  );
};

export default PurchaseRow;