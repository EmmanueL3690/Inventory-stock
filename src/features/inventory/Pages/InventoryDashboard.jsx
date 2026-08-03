import React, { useMemo } from "react";

// Components
import InventoryHeader from "../components/InventoryHeader";
import InventoryStats from "../components/InventoryStats";
import QuickActions from "../components/QuickActions";
import StockMovementTable from "../components/StockMovementTable";
import EmptyInventory from "../components/EmptyInventory";

// Hook
import { useInventory } from "../hooks/useInventory";

const InventoryDashboard = () => {
  const {
    // Inventory Products & Async State
    products = [],
    loading,
    error,

    // Statistics Fields
    totalItems,
    inStock,
    lowStock,
    outOfStock,
    totalValue,

    // Stock Movements State
    movements = [],
    loadingMovements,
    errorMovements,
  } = useInventory();

  // Transform raw hook outputs into the specific stats shape expected by InventoryStats
  const formattedStats = useMemo(() => {
    return {
      totalProducts: totalItems ?? 0,
      totalUnits: (products ?? []).reduce((acc, item) => acc + Number(item.stock || 0), 0),
      lowStock: lowStock ?? 0,
      outOfStock: outOfStock ?? 0,
      inventoryValue: totalValue ?? 0,
    };
  }, [products, totalItems, lowStock, outOfStock, totalValue]);

  // Global Dashboard Error handling state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50 p-4">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 max-w-lg text-center shadow-sm">
          <h2 className="text-lg font-bold text-red-600 tracking-tight">
            Failed to Synchronize ERP Dashboard
          </h2>
          <p className="mt-2 text-sm text-red-500 font-medium">
            {error}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-4 md:p-6 lg:p-8 bg-slate-50 min-h-screen">
      
      {/* 1. Header Control Block */}
      <InventoryHeader />

      {/* 2. Overview Analytical Cards */}
      <InventoryStats 
        stats={formattedStats} 
        loading={loading} 
      />

      {/* 3. Conditional Empty Dashboard vs Hub Content State */}
      {!loading && products.length === 0 ? (
        <EmptyInventory />
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
          
          {/* Main Operational Ledger Column (Left 2/3 wide on Large Viewports) */}
          <div className="xl:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-100 bg-white">
                <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                  Stock Movements History
                </h2>
                <p className="text-xs md:text-sm text-slate-500 mt-0.5 font-normal">
                  Real-time immutable ledger tracking all active changes to stock counts and balances.
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

          {/* Quick Shortcuts Column (Right 1/3 wide on Large Viewports) */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-sm space-y-6">
            <QuickActions />
          </div>

        </div>
      )}

    </div>
  );
};

export default InventoryDashboard;