import React from "react";

import InventoryHeader from "../../features/inventory/components/InventoryHeader";
import InventoryStats from "../../features/inventory/components/InventoryStats";
import StockMovementTable from "../../features/inventory/components/StockMovementTable";

import { useInventory } from "../../features/inventory/hooks/useInventory";

const Inventory = () => {
  const {
    // Global Dashboard States
    loading,
    error,

    // Dashboard Statistics
    totalItems = 0,
    inStock = 0,
    lowStock = 0,
    outOfStock = 0,
    totalValue = 0,

    // Stock Movements Data
    movements = [],
    loadingMovements,
    errorMovements,
  } = useInventory();

  // Global initial dashboard load state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-slate-600 font-medium">
            Loading dashboard analytics...
          </p>
        </div>
      </div>
    );
  }

  // Global dashboard error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-lg text-center">
          <h2 className="text-lg font-bold text-red-600">
            Failed to load inventory dashboard
          </h2>
          <p className="mt-2 text-red-500">
            {error}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 md:p-6 bg-slate-50 min-h-screen">
      
      {/* Dashboard Header */}
      <InventoryHeader />

      {/* Overview Analytics Statistics */}
      <InventoryStats
        totalItems={totalItems}
        inStock={inStock}
        lowStock={lowStock}
        outOfStock={outOfStock}
        totalValue={totalValue}
      />

      {/* Stock Movements Ledger Section */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 bg-white">
          <h2 className="text-lg font-bold text-slate-900">
            Stock Movements Log
          </h2>
          <p className="text-xs md:text-sm text-slate-500 mt-0.5">
            Real-time ledger tracking all incoming shipments, internal transfers, and outgoing adjustments.
          </p>
        </div>
        
        <div className="p-5 bg-white">
          <StockMovementTable 
            movements={movements}
            loading={loadingMovements}
            error={errorMovements}
          />
        </div>
      </div>

    </div>
  );
};

export default Inventory;