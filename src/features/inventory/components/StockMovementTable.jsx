import React from "react";

const StockMovementTable = ({ movements = [], loading, error }) => {
  
  // Helper to render colored badges based on movement type
  const renderMovementBadge = (type) => {
    const normalizedType = type?.toLowerCase().replace(/[^a-z]/g, "") || "";

    switch (normalizedType) {
      case "stockin":
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-1.5 h-1.5 mr-1.5 rounded-full bg-emerald-500"></span>
            Stock In
          </span>
        );
      case "stockout":
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-rose-50 text-rose-700 border border-rose-200">
            <span className="w-1.5 h-1.5 mr-1.5 rounded-full bg-rose-500"></span>
            Stock Out
          </span>
        );
      case "adjustment":
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
            <span className="w-1.5 h-1.5 mr-1.5 rounded-full bg-amber-500"></span>
            Adjustment
          </span>
        );
      case "transfer":
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
            <span className="w-1.5 h-1.5 mr-1.5 rounded-full bg-blue-500"></span>
            Transfer
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
            {type || "Unknown"}
          </span>
        );
    }
  };

  // 1. Error State
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8 border border-dashed border-red-200 rounded-xl bg-red-50/50">
        <svg className="w-8 h-8 text-red-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <p className="text-sm font-medium text-red-800">Error loading stock movements</p>
        <p className="text-xs text-red-600 mt-1">{error?.message || String(error)}</p>
      </div>
    );
  }

  // 2. Loading State (Skeleton Rows)
  if (loading) {
    return (
      <div className="w-full overflow-x-auto border border-slate-200 rounded-lg">
        <table className="w-full min-w-[800px] divide-y divide-slate-200 text-left">
          <thead className="bg-slate-50">
            <tr>
              {["Date", "Product", "SKU", "Movement Type", "Quantity", "Batch Number", "Performed By"].map((head) => (
                <th key={head} className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">{head}</th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-100">
            {[...Array(5)].map((_, index) => (
              <tr key={index} className="animate-pulse">
                <td className="px-6 py-4"><div className="h-4 bg-slate-200 rounded w-24"></div></td>
                <td className="px-6 py-4"><div className="h-4 bg-slate-200 rounded w-40"></div></td>
                <td className="px-6 py-4"><div className="h-4 bg-slate-200 rounded w-20"></div></td>
                <td className="px-6 py-4"><div className="h-6 bg-slate-200 rounded w-24"></div></td>
                <td className="px-6 py-4"><div className="h-4 bg-slate-200 rounded w-12"></div></td>
                <td className="px-6 py-4"><div className="h-4 bg-slate-200 rounded w-28"></div></td>
                <td className="px-6 py-4"><div className="h-4 bg-slate-200 rounded w-32"></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // 3. Empty State
  if (!movements || movements.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 border border-dashed border-slate-200 rounded-xl bg-slate-50/50">
        <svg className="w-10 h-10 text-slate-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
        <p className="text-sm font-medium text-slate-700">No stock movements recorded</p>
        <p className="text-xs text-slate-400 mt-1">New inventory events or lifecycle adjustments will populate here.</p>
      </div>
    );
  }

  // 4. Data Content State
  return (
    <div className="w-full border border-slate-200 rounded-lg overflow-hidden shadow-sm">
      <div className="overflow-x-auto w-full">
        <table className="w-full min-w-[950px] divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-slate-50 text-xs font-semibold text-slate-600 uppercase tracking-wider">
            <tr>
              <th scope="col" className="px-6 py-3.5">Date</th>
              <th scope="col" className="px-6 py-3.5">Product</th>
              <th scope="col" className="px-6 py-3.5">SKU</th>
              <th scope="col" className="px-6 py-3.5">Movement Type</th>
              <th scope="col" className="px-6 py-3.5">Quantity</th>
              <th scope="col" className="px-6 py-3.5">Batch Number</th>
              <th scope="col" className="px-6 py-3.5">Performed By</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200/60 text-slate-700">
            {movements.map((movement, idx) => (
              <tr 
                key={movement.id || idx} 
                className="hover:bg-slate-50/70 transition-colors duration-150 ease-in-out"
              >
                {/* Date */}
                <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-500 font-mono">
                  {movement.date || "N/A"}
                </td>
                
                {/* Product Name */}
                <td className="px-6 py-4 font-medium text-slate-900 max-w-xs truncate">
                  {movement.productName || movement.product || "Unknown Product"}
                </td>
                
                {/* SKU */}
                <td className="px-6 py-4 whitespace-nowrap text-xs font-mono text-slate-600">
                  {movement.sku || "—"}
                </td>
                
                {/* Movement Type Badge */}
                <td className="px-6 py-4 whitespace-nowrap">
                  {renderMovementBadge(movement.movementType || movement.type)}
                </td>
                
                {/* Quantity */}
                <td className="px-6 py-4 whitespace-nowrap font-semibold">
                  <span className={
                    movement.movementType?.toLowerCase().replace(/[^a-z]/g, "") === "stockin" 
                      ? "text-emerald-600" 
                      : movement.movementType?.toLowerCase().replace(/[^a-z]/g, "") === "stockout"
                      ? "text-rose-600"
                      : "text-slate-700"
                  }>
                    {movement.movementType?.toLowerCase().replace(/[^a-z]/g, "") === "stockin" ? "+" : ""}
                    {movement.quantity?.toLocaleString() || 0}
                  </span>
                </td>
                
                {/* Batch Number */}
                <td className="px-6 py-4 whitespace-nowrap text-xs font-mono text-slate-500">
                  {movement.batchNumber || movement.batch || "—"}
                </td>
                
                {/* Performed By */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-600 uppercase border border-slate-200">
                      {(movement.performedBy || "U").substring(0, 2)}
                    </div>
                    <span className="text-slate-600 font-medium">
                      {movement.performedBy || "System Process"}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockMovementTable;