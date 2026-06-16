import React from 'react';
import PurchasesHeader from '../../features/purchases/components/PurchasesHeader';
import PurchasesStats from '../../features/purchases/components/PurchasesStats';
import PurchasesFilters from '../../features/purchases/components/PurchasesFilters';
import PurchasesTable from '../../features/purchases/components/PurchasesTable';
import PurchasesPagination from '../../features/purchases/components/PurchasesPagination';
import NewPurchaseModal from '../../features/purchases/components/NewPurchaseModal';
import PurchaseDetailsDrawer from '../../features/purchases/components/PurchaseDetailsDrawer';
import { usePurchases } from '../../features/purchases/hooks/usePurchases';

const Purchases = () => {
  const {
    purchases,
    totalCount,
    searchQuery,
    setSearchQuery,
    selectedSupplier,
    setSelectedSupplier,
    selectedStatus,
    setSelectedStatus,
    viewMode,
    setViewMode,
    currentPage,
    setCurrentPage,
    totalPages,
    isNewModalOpen,
    setIsNewModalOpen,
    selectedPurchase,
    setSelectedPurchase,
  } = usePurchases();

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1600px] mx-auto antialiased">
      {/* Upper Module Action Row */}
      <PurchasesHeader onNewPurchaseClick={() => setIsNewModalOpen(true)} />

      {/* Metrics Dashboards Cards Grid Wrapper */}
      <PurchasesStats />

      {/* Content Engine Box */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6 space-y-6">
        <PurchasesFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedSupplier={selectedSupplier}
          onSupplierChange={setSelectedSupplier}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />

        <PurchasesTable 
          purchases={purchases} 
          onRowClick={(purchase) => setSelectedPurchase(purchase)}
        />

        <PurchasesPagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalCount={totalCount}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Conditional Overlays */}
      {isNewModalOpen && (
        <NewPurchaseModal onClose={() => setIsNewModalOpen(false)} />
      )}
      
      {selectedPurchase && (
        <PurchaseDetailsDrawer
          purchase={selectedPurchase}
          onClose={() => setSelectedPurchase(null)}
        />
      )}
    </div>
  );
};

export default Purchases;