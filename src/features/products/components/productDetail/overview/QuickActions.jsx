import React from 'react';
import { Zap, Sliders, ShoppingBag, PlusCircle, Barcode, Trash2 } from 'lucide-react';

const QuickActions = ({ product, onEdit, onDelete }) => {
  // Handle action button clicks with backend fallbacks or confirmation prompts
  const handleActionClick = (label) => {
    switch (label) {
      case "Adjust Stock":
        alert("Stock adjustment will be available when the inventory module is connected.");
        break;
      case "Record Sale":
        alert("Sales module coming soon.");
        break;
      case "Add Purchase":
        alert("Purchase module coming soon.");
        break;
      case "Print Barcode Label":
        alert("Barcode printing will be available in a future update.");
        break;
      case "Delete Product":
        if (!product?._id) return;
        const confirmDelete = window.confirm("Are you sure you want to delete this product?");
        if (confirmDelete && onDelete) {
          onDelete(product._id);
        }
        break;
      default:
        break;
    }
  };

  // Primary operational button list
  const primaryActions = [
    { 
      label: "Adjust Stock", 
      icon: Sliders, 
      color: "text-purple-600", 
      bg: "hover:bg-purple-50/40 hover:border-purple-200" 
    },
    { 
      label: "Record Sale", 
      icon: ShoppingBag, 
      color: "text-emerald-600", 
      bg: "hover:bg-emerald-50/40 hover:border-emerald-200" 
    },
    { 
      label: "Add Purchase", 
      icon: PlusCircle, 
      color: "text-blue-600", 
      bg: "hover:bg-blue-50/40 hover:border-blue-200" 
    },
    { 
      label: "Print Barcode Label", 
      icon: Barcode, 
      color: "text-slate-700", 
      bg: "hover:bg-slate-100/60 hover:border-slate-300" 
    }
  ];

  // Safely inject Delete Product option if onDelete callback prop is defined
  if (onDelete) {
    primaryActions.push({
      label: "Delete Product",
      icon: Trash2,
      color: "text-rose-600",
      bg: "hover:bg-rose-50/40 hover:border-rose-200"
    });
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6 space-y-4">
      {/* Header Container Section */}
      <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
        <div className="p-1.5 bg-amber-50 text-amber-500 rounded-lg">
          <Zap size={15} fill="currentColor" />
        </div>
        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Quick Actions</h4>
      </div>

      {/* Button Action List Grid */}
      <div className="flex flex-col gap-2">
        {primaryActions.map((action, idx) => {
          const Icon = action.icon;
          return (
            <button
              key={idx}
              onClick={() => handleActionClick(action.label)}
              className={`w-full h-11 border border-slate-200 rounded-xl px-4 flex items-center gap-3 text-xs font-bold text-slate-700 bg-white shadow-2xs transition duration-150 active:scale-[0.99] cursor-pointer text-left ${action.bg}`}
            >
              <Icon size={15} className={`${action.color} shrink-0`} strokeWidth={2.2} />
              <span>{action.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;