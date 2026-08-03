import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import usePurchases from "../../features/purchases/hooks/usePurchases";

import PurchasesHeader from "../../features/purchases/components/PurchasesHeader";
import PurchasesStats from "../../features/purchases/components/PurchasesStats";
import PurchasesFilters from "../../features/purchases/components/PurchasesFilters";
import PurchasesTable from "../../features/purchases/components/PurchasesTable";
import PurchaseDetailsDrawer from "../../features/purchases/purchaseDetails/PurchaseDetailsDrawer";
import PurchaseFormModal from "../../features/purchases/purchaseForm/PurchaseFormModal";
import UpdatePaymentModal from "../../features/purchases/modals/UpdatePaymentModal";

const Purchases = () => {
  const navigate = useNavigate();

  // =====================================
  // LOCAL STATE
  // =====================================

  const [selectedPurchaseId, setSelectedPurchaseId] = useState(null);
  const [newPurchaseModal, setNewPurchaseModal] = useState(false);
  const [activePaymentPurchase, setActivePaymentPurchase] = useState(null);
  const [isTablePaymentModalOpen, setIsTablePaymentModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // =====================================
  // HOOK
  // =====================================

  const {
    purchases,
    products,
    suppliers,
    stats,
    filters,
    loading,
    error,

    updateFilters,

    createPurchase,
    updatePaymentStatus,

    refetch,
  } = usePurchases();

  // =====================================
  // HELPERS
  // =====================================

  const getPurchaseId = (purchase) =>
    purchase?._id || purchase?.id;

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // =====================================
  // DETAILS DRAWER
  // =====================================

  const handleViewPurchase = (purchase) => {
    setSelectedPurchaseId(getPurchaseId(purchase));
  };

  const handleCloseDrawer = () => {
    setSelectedPurchaseId(null);
  };

  // =====================================
  // NEW PURCHASE
  // =====================================

  const handleOpenPurchaseModal = () => {
    setNewPurchaseModal(true);
  };

  const handleClosePurchaseModal = () => {
    setNewPurchaseModal(false);
  };

  const handlePurchaseCreated = async () => {
    handleClosePurchaseModal();
    await refetch();
    showToast("Purchase created successfully.");
  };

  // =====================================
  // PAYMENT (TABLE & DIRECT ACTION)
  // =====================================

  const handleOpenTablePaymentModal = (purchase) => {
    setActivePaymentPurchase(purchase);
    setIsTablePaymentModalOpen(true);
  };

  const handleCloseTablePaymentModal = () => {
    setActivePaymentPurchase(null);
    setIsTablePaymentModalOpen(false);
  };

  const handleDirectPaymentSubmit = async (id, paymentStatus) => {
    try {
      await updatePaymentStatus(id, paymentStatus);
      showToast("Payment status updated successfully.");
      handleCloseTablePaymentModal();
      await refetch();
    } catch (err) {
      console.error("Direct payment update failed:", err);
      throw err;
    }
  };

  // =====================================
  // RECEIVE ITEMS
  // =====================================

  const handleReceiveItems = (purchase) => {
    navigate(
      `/purchases/receive?id=${getPurchaseId(
        purchase
      )}`
    );
  };

  // =====================================
  // PRINT
  // =====================================

  const handlePrint = () => {
    window.print();
  };

  // =====================================
  // ERROR
  // =====================================

  if (error && !purchases.length) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="text-center">
          <h2 className="text-red-600 font-semibold text-lg">
            Failed to load purchases
          </h2>

          <p className="text-gray-500 mt-2">
            {error}
          </p>

          <button
            onClick={refetch}
            className="mt-5 px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // =====================================
  // PAGE
  // =====================================

  return (
    <div className="space-y-6 p-6 relative">

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-emerald-600 text-white px-4 py-2.5 rounded-lg shadow-xl text-xs font-semibold animate-bounce">
          {toastMessage}
        </div>
      )}

      {/* Header */}

      <PurchasesHeader
        loading={loading}
        onRefresh={refetch}
        onNewPurchase={handleOpenPurchaseModal}
        onImport={() => {}}
        onExport={() => {}}
        onReceiveItems={() =>
          navigate("/purchases/receive")
        }
        onPurchaseReturns={() =>
          navigate("/purchases/returns")
        }
      />

      {/* Stats */}

      <PurchasesStats
        loading={loading}
        stats={stats}
      />

      {/* Filters */}

      <PurchasesFilters
        filters={filters}
        onFilterChange={updateFilters}
      />

      {/* Table */}

      <PurchasesTable
        purchases={purchases}
        loading={loading}
        onViewPurchase={handleViewPurchase}
        onUpdatePayment={handleOpenTablePaymentModal}
        onReceiveItems={handleReceiveItems}
        onPrint={handlePrint}
      />

      {/* Details Drawer */}

      <PurchaseDetailsDrawer
        isOpen={Boolean(selectedPurchaseId)}
        purchaseId={selectedPurchaseId}
        onClose={handleCloseDrawer}
        onUpdatePaymentSuccess={() => {
          showToast("Payment status updated successfully.");
          refetch();
        }}
        showToast={showToast}
      />

      {/* Standalone Table Payment Modal */}

      <UpdatePaymentModal
        isOpen={isTablePaymentModalOpen}
        purchase={activePaymentPurchase}
        loading={loading}
        onClose={handleCloseTablePaymentModal}
        onSubmit={handleDirectPaymentSubmit}
      />

      {/* Create Purchase */}

      <PurchaseFormModal
        isOpen={newPurchaseModal}
        onClose={handleClosePurchaseModal}
        onSubmitSuccess={handlePurchaseCreated}
        suppliers={suppliers}
        products={products}
      />

    </div>
  );
};

export default Purchases;