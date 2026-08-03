import React from "react";

const StockMovementRow = ({ movement }) => {
  if (!movement) return null;

  // Destructure with fallbacks to handle varied data models safely
  const {
    date = "—",
    productName,
    product,
    sku = "—",
    movementType,
    type,
    quantity = 0,
    batchNumber,
    batch,
    performedBy,
    user,
  } = movement;

  const displayProduct = productName || product || "Unknown Product";
  const displayType = movementType || type || "Unknown";
  const displayBatch = batchNumber || batch || "—";
  const displayUser = performedBy || user || "System Process";

  // Normalize string for accurate helper matching
  const normalizedType = displayType.toLowerCase().replace(/[^a-z]/g, "");

  // Generate badge styling based on type mapping requirements
  const getBadgeStyles = () => {
    switch (normalizedType) {
      case "stockin":
        return "bg-emerald-50 text-emerald-700 border-emerald-200 ring-emerald-500/20";
      case "stockout":
        return "bg-rose-50 text-rose-700 border-rose-200 ring-rose-500/20";
      case "adjustment":
        return "bg-amber-50 text-amber-700 border-amber-200 ring-amber-500/20";
      case "transfer":
        return "bg-blue-50 text-blue-700 border-blue-200 ring-blue-500/20";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200 ring-slate-500/20";
    }
  };

  // Generate sign indicator color for quantity metrics
  const getQuantityColor = () => {
    if (normalizedType === "stockin") return "text-emerald-600 font-semibold";
    if (normalizedType === "stockout") return "text-rose-600 font-semibold";
    return "text-slate-700 font-medium";
  };

  return (
    <tr className="hover:bg-slate-50/80 transition-colors duration-150 ease-in-out border-b border-slate-200/60 text-sm text-slate-700">
      
      {/* 1. Date */}
      <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-500 font-mono tracking-tight">
        {date}
      </td>

      {/* 2. Product Name */}
      <td className="px-6 py-4 font-medium text-slate-900 max-w-xs truncate">
        {displayProduct}
      </td>

      {/* 3. SKU */}
      <td className="px-6 py-4 whitespace-nowrap text-xs font-mono text-slate-600">
        {sku}
      </td>

      {/* 4. Movement Type Badge */}
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border ring-1 ring-inset ${getBadgeStyles()}`}>
          <span className={`w-1.5 h-1.5 mr-1.5 rounded-full ${
            normalizedType === "stockin" ? "bg-emerald-500" :
            normalizedType === "stockout" ? "bg-rose-500" :
            normalizedType === "adjustment" ? "bg-amber-500" :
            normalizedType === "transfer" ? "bg-blue-500" : "bg-slate-400"
          }`}></span>
          {displayType}
        </span>
      </td>

      {/* 5. Quantity */}
      <td className={`px-6 py-4 whitespace-nowrap tabular-nums ${getQuantityColor()}`}>
        {normalizedType === "stockin" && "+"}
        {quantity.toLocaleString()}
      </td>

      {/* 6. Batch Number */}
      <td className="px-6 py-4 whitespace-nowrap text-xs font-mono text-slate-500">
        {displayBatch}
      </td>

      {/* 7. Performed By / User */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center space-x-2.5">
          <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-600 uppercase border border-slate-200 select-none shadow-sm">
            {displayUser.substring(0, 2)}
          </div>
          <span className="text-slate-600 font-medium max-w-[150px] truncate">
            {displayUser}
          </span>
        </div>
      </td>

    </tr>
  );
};

export default StockMovementRow;