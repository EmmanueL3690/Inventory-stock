import React from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import StockOutHeader from '../../../features/inventoryDashboard/Stock Out/components/StockOutHeader';
import StockSummaryCard from '../../../features/inventoryDashboard/Stock Out/components/StockSummaryCard';
import StockOutForm from '../../../features/inventoryDashboard/Stock Out/components/StockOutForm';
import RecentStockOutTable from '../../../features/inventoryDashboard/Stock Out/components/RecentStockOutTable';
import useStockOut from '../../../features/inventoryDashboard/Stock Out/hooks/useStockOut';

export default function StockOut() {
  const {
    formData,
    searchQuery,
    setSearchQuery,
    isDropdownOpen,
    setIsDropdownOpen,
    selectedProductId,
    selectedProduct,
    errors,
    loading,
    products,
    loadingProducts,
    errorProducts,
    recentRecords,
    expectedRemainingStock,
    toast,
    handleInputChange,
    handleProductSelect,
    handleReset,
    handleSubmit,
  } = useStockOut();

  return (
    <main className="min-h-screen bg-slate-50/50 py-8 px-4 sm:px-6 lg:px-8 space-y-10 text-slate-800 antialiased relative">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Feedback Alert Toast */}
        {toast && (
          <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3.5 rounded-lg border shadow-xl text-sm font-semibold transition-all duration-300 animate-slide-in ${
            toast.type === 'error' 
              ? 'bg-rose-50 border-rose-200 text-rose-800' 
              : 'bg-emerald-50 border-emerald-200 text-emerald-800'
          }`}>
            {toast.type === 'error' ? (
              <AlertCircle className="h-5 w-5 text-rose-500 shrink-0" />
            ) : (
              <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
            )}
            <span>{toast.message}</span>
          </div>
        )}

        {/* 1. Page Header */}
        <StockOutHeader />

        {/* 2. Three Premium Metrics Summary Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <StockSummaryCard
            title="Today's Stock Outs"
            value="3"
            description="Number of stock-out transactions today"
            iconName="trending-down"
            variant="rose"
          />
          <StockSummaryCard
            title="Items Removed"
            value="8"
            description="Total quantity removed today"
            iconName="package-minus"
            variant="indigo"
          />
          <StockSummaryCard
            title="Pending Approval"
            value="1"
            description="Awaiting manager verification"
            iconName="clock"
            variant="amber"
          />
        </section>

        {/* 3. Main Split Workspace */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
          <section className="xl:col-span-1" aria-label="Transaction Dispatcher">
            <StockOutForm
              formData={formData}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              isDropdownOpen={isDropdownOpen}
              setIsDropdownOpen={setIsDropdownOpen}
              selectedProductId={selectedProductId}
              selectedProduct={selectedProduct}
              errors={errors}
              loading={loading}
              products={products}
              loadingProducts={loadingProducts}
              errorProducts={errorProducts}
              expectedRemainingStock={expectedRemainingStock}
              onInputChange={handleInputChange}
              onProductSelect={handleProductSelect}
              onReset={handleReset}
              onSubmit={handleSubmit}
            />
          </section>

          <section className="xl:col-span-2 h-full" aria-label="Dispatch Log History">
            <RecentStockOutTable records={recentRecords} />
          </section>
        </div>
      </div>
    </main>
  );
}