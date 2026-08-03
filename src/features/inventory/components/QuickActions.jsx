import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowUpRight,
  ArrowDownLeft,
  Sliders,
  ClipboardCheck,
  Package,
  Tags,
  ChevronRight
} from "lucide-react";

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: "Stock In",
      description: "Receive inventory shipments and log supplier deliveries.",
      path: "/inventory/stock-in",
      icon: ArrowDownLeft,
      color: "text-emerald-600",
      bg: "bg-emerald-50/70 border-emerald-100",
    },
    {
      title: "Stock Out",
      description: "Record customer dispatches, usage, or outgoing order fulfillments.",
      path: "/inventory/stock-out",
      icon: ArrowUpRight,
      color: "text-rose-600",
      bg: "bg-rose-50/70 border-rose-100",
    },
    {
      title: "Stock Adjustment",
      description: "Correct stock discrepancies, damages, or manual variances.",
      path: "/inventory/adjustments",
      icon: Sliders,
      color: "text-amber-600",
      bg: "bg-amber-50/70 border-amber-100",
    },
    {
      title: "Stock Count",
      description: "Initiate cycle counts, physical audits, and stocktaking schedules.",
      path: "/inventory/stock-count",
      icon: ClipboardCheck,
      color: "text-blue-600",
      bg: "bg-blue-50/70 border-blue-100",
    },
    {
      title: "Products",
      description: "Manage core catalog definitions, system SKUs, and variants.",
      path: "/inventory/products",
      icon: Package,
      color: "text-violet-600",
      bg: "bg-violet-50/70 border-violet-100",
    },
    {
      title: "Categories",
      description: "Configure merchandise hierarchies and system tracking labels.",
      path: "/inventory/categories",
      icon: Tags,
      color: "text-slate-600",
      bg: "bg-slate-100/70 border-slate-200/60",
    },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-bold text-slate-900 tracking-tight">
          Quick Operations
        </h2>
        <p className="text-xs md:text-sm text-slate-500 mt-0.5">
          Accelerate your daily workflow with direct access to critical inventory ledgers.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {actions.map((action) => {
          const Icon = action.icon;
          
          return (
            <div
              key={action.path}
              onClick={() => navigate(action.path)}
              className="group relative bg-white border border-slate-200 p-5 rounded-xl shadow-sm hover:shadow-md hover:border-slate-300 cursor-pointer transition-all duration-200 ease-in-out flex flex-col justify-between"
            >
              <div>
                {/* Header Icon Block */}
                <div className={`h-11 w-11 rounded-xl border flex items-center justify-center ${action.bg} transition-transform duration-200 group-hover:scale-105`}>
                  <Icon size={20} className={`${action.color} stroke-[2.2]`} />
                </div>

                {/* Text Content */}
                <h3 className="mt-4 text-base font-bold text-slate-800 tracking-tight group-hover:text-slate-950 transition-colors">
                  {action.title}
                </h3>
                
                <p className="mt-1 text-xs md:text-sm text-slate-500 leading-relaxed font-normal">
                  {action.description}
                </p>
              </div>

              {/* Action Link Footer indicator */}
              <div className="mt-5 pt-3 border-t border-slate-50 flex items-center justify-between text-xs font-semibold text-slate-600 group-hover:text-slate-900 transition-colors">
                <span>Launch panel</span>
                <ChevronRight 
                  size={15} 
                  className="transform translate-x-0 group-hover:translate-x-1 transition-transform duration-200 ease-out text-slate-400 group-hover:text-slate-600" 
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;