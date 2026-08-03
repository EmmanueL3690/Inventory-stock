import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowDownLeft, ArrowUpRight, Sliders } from "lucide-react";
import Button from "../../../components/ui/Button";

const InventoryHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/60 pb-5">
      
      {/* Left Column: Heading Context */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
          Inventory Dashboard
        </h1>
        <p className="text-xs md:text-sm text-slate-500 mt-1 font-normal">
          Monitor stock levels, movements, and warehouse activity.
        </p>
      </div>

      {/* Right Column: Transactional Action Controls */}
      <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
        
        {/* Stock In Button */}
        <Button
          variant="outline"
          onClick={() => navigate("/inventory/stock-in")}
          className="inline-flex items-center text-xs md:text-sm font-semibold border border-slate-200 hover:bg-slate-50 active:bg-slate-100 text-slate-700 h-10 px-4 rounded-xl transition-colors"
        >
          <ArrowDownLeft size={16} className="mr-1.5 text-emerald-600 stroke-[2.5]" />
          Stock In
        </Button>

        {/* Stock Out Button */}
        <Button
          variant="outline"
          onClick={() => navigate("/inventory/stock-out")}
          className="inline-flex items-center text-xs md:text-sm font-semibold border border-slate-200 hover:bg-slate-50 active:bg-slate-100 text-slate-700 h-10 px-4 rounded-xl transition-colors"
        >
          <ArrowUpRight size={16} className="mr-1.5 text-rose-600 stroke-[2.5]" />
          Stock Out
        </Button>

        {/* Adjustment Button */}
        <Button
          variant="primary"
          onClick={() => navigate("/inventory/adjustments")}
          className="inline-flex items-center text-xs md:text-sm font-semibold bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white h-10 px-4 rounded-xl shadow-sm transition-colors"
        >
          <Sliders size={15} className="mr-1.5 text-slate-300 stroke-[2.5]" />
          Adjustment
        </Button>

      </div>

    </div>
  );
};

export default InventoryHeader;