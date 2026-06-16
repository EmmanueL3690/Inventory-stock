import PurchaseRow from "./PurchaseRow";

const PurchaseTable = ({ purchases = [] }) => {
  // Graceful fallback if purchases is empty
  if (!purchases || purchases.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center bg-white border border-slate-200 rounded-2xl shadow-sm">
        <p className="text-slate-500 font-medium">No purchase orders found.</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      
      {/* 🖥️ Desktop & Tablet Table View (Hidden on Mobile) */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full table-auto border-collapse text-left">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/75 text-xs font-semibold tracking-wider text-slate-500 uppercase">
              <th className="px-6 py-4">PO No.</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Supplier</th>
              <th className="px-6 py-4">Items</th>
              <th className="px-6 py-4">Total Amount</th>
              <th className="px-6 py-4">Payment Status</th>
              <th className="px-6 py-4">Order Status</th>
              <th className="px-6 py-4">Received On</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200 bg-white">
            {purchases.map((purchase) => (
              <PurchaseRow 
                key={purchase.id} 
                purchase={purchase} 
                view="desktop"
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* 📱 Mobile Card View (Hidden on Desktop) */}
      <div className="block md:hidden divide-y divide-slate-100">
        {purchases.map((purchase) => (
          <PurchaseRow 
            key={purchase.id} 
            purchase={purchase} 
            view="mobile"
          />
        ))}
      </div>

    </div>
  );
};

export default PurchaseTable;