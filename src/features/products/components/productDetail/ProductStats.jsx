import React from 'react';
import { Layers, Activity, Lock, Wallet, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';

const ProductStats = ({ product }) => {
  // Safe helper to format currency
  const formatCurrency = (val) => {
    if (val === undefined || val === null || isNaN(Number(val))) return "₦0.00";
    return `₦${Number(val).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // Safe helper to format numbers
  const formatNumber = (val) => {
    if (val === undefined || val === null || isNaN(Number(val))) return "0";
    return Number(val).toLocaleString();
  };

  // Extract normalized values from useProducts hook output
  const availableStock = Number(product?.availableStock ?? 0);
  const currentQuantity = Number(product?.currentQuantity ?? 0);
  const reservedStock = Number(product?.reservedStock ?? 0);
  const reorderLevel = Number(product?.reorderLevel ?? 0);
  const inventoryValue = Number(product?.inventoryValue ?? (availableStock * (product?.sellingPrice || 0)));
  const unit = product?.unit || "PCS";

  // Determine Stock Status for Available Stock Card Indicator
  const isOutOfStock = availableStock === 0;
  const isLowStock = !isOutOfStock && availableStock <= reorderLevel;

  let stockStatusLabel = "In Stock";
  let isPositive = true;

  if (isOutOfStock) {
    stockStatusLabel = "Out of Stock";
    isPositive = false;
  } else if (isLowStock) {
    stockStatusLabel = "Low Stock Alert";
    isPositive = false;
  }

  const cards = [
    {
      label: "Current Stock",
      value: `${formatNumber(currentQuantity)} ${unit}`,
      subtext: `Total Physical Units`,
      isPositive: true,
      icon: Activity,
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      label: "Available Stock",
      value: `${formatNumber(availableStock)} ${unit}`,
      subtext: stockStatusLabel,
      isPositive: isPositive,
      icon: isOutOfStock ? XCircle : isLowStock ? AlertTriangle : CheckCircle2,
      color: isOutOfStock ? "text-rose-600" : isLowStock ? "text-amber-600" : "text-emerald-600",
      bg: isOutOfStock ? "bg-rose-50" : isLowStock ? "bg-amber-50" : "bg-emerald-50"
    },
    {
      label: "Reserved Stock",
      value: `${formatNumber(reservedStock)} ${unit}`,
      subtext: "Allocated / Held",
      isPositive: null,
      icon: Lock,
      color: "text-sky-600",
      bg: "bg-sky-50"
    },
    {
      label: "Inventory Value",
      value: formatCurrency(inventoryValue),
      subtext: `@ ₦${Number(product?.sellingPrice || 0).toLocaleString()} / ${unit}`,
      isPositive: null,
      icon: Wallet,
      color: "text-purple-600",
      bg: "bg-purple-50"
    },
    {
      label: "Reorder Level",
      value: `${formatNumber(reorderLevel)} ${unit}`,
      subtext: "Restock Threshold",
      isPositive: null,
      icon: Layers,
      color: "text-amber-600",
      bg: "bg-amber-50"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {cards.map((card, i) => {
        const Icon = card.icon;
        return (
          <div key={i} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex items-start justify-between hover:border-slate-300 transition duration-150">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">{card.label}</span>
              <h3 className="text-lg font-bold text-slate-900 tracking-tight">{card.value}</h3>
              <p className="text-[11px] font-medium text-slate-400 flex items-center">
                {card.isPositive !== null && (
                  <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${card.isPositive ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                )}
                {card.subtext}
              </p>
            </div>
            <div className={`p-2 rounded-xl shrink-0 ${card.bg} ${card.color}`}>
              <Icon size={18} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductStats;