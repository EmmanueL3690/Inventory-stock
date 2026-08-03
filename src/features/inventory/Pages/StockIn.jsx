import React, { useState } from 'react';
import StockInHeader from '../../inventoryDashboard/Stock In/components/StockInHeader';
import StockInForm from '../../inventoryDashboard/Stock In/components/StockInForm';
import RecentStockInTable from '../../inventoryDashboard/Stock In/components/RecentStockInTable';
import StockInSummaryCard from '../../inventoryDashboard/Stock In/components/StockInSummaryCard';
import useStockIn from '../../inventoryDashboard/Stock In/hooks/useStockIn';

export default function StockIn() {
  const {
    formData,
    searchQuery,
    setSearchQuery,
    isDropdownOpen,
    setIsDropdownOpen,
    selectedProduct,
    recentRecords,
    handleInputChange,
    handleProductSelect,
    handleReset,
    handleSubmit,
    products,
    loadingProducts,
    errorProducts
  } = useStockIn();

  return (
    <main className="min-h-screen bg-slate-50 p-4 sm:p-6 md:p-8 space-y-8 text-slate-800 antialiased">
      
      {/* 1. Header Section */}
      <StockInHeader />

      {/* 2. Summary Metrics Cards Section */}
      <section 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
        aria-label="Stock-in Summary Metrics"
      >
        <StockInSummaryCard 
          title="Total Batches Today" 
          value="3" 
          subtitle="Batches received today" 
          variant="indigo" 
        />
        <StockInSummaryCard 
          title="Total Items Received" 
          value="75" 
          subtitle="Units added today" 
          variant="emerald" 
        />
        <StockInSummaryCard 
          title="Pending Verification" 
          value="1" 
          subtitle="Awaiting warehouse review" 
          variant="amber" 
        />
      </section>

      {/* 3. Main Workspace Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 md:gap-8 items-start">
        
        {/* Form Column */}
        <section className="xl:col-span-1" aria-label="Register Stock Form">
          <StockInForm 
            formData={formData}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            isDropdownOpen={isDropdownOpen}
            setIsDropdownOpen={setIsDropdownOpen}
            selectedProduct={selectedProduct}
            onInputChange={handleInputChange}
            onProductSelect={handleProductSelect}
            onReset={handleReset}
            onSubmit={handleSubmit}
            products={products}
            loadingProducts={loadingProducts}
            errorProducts={errorProducts}
          />
        </section>

        {/* Recent Records Table Column */}
        <section className="xl:col-span-2 h-full" aria-label="Recent Records">
          <RecentStockInTable records={recentRecords} />
        </section>
        
      </div>
    </main>
  );
}