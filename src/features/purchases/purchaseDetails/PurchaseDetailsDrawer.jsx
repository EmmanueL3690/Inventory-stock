import React, { useState } from 'react';
import { X, RefreshCw, AlertCircle } from 'lucide-react';

import usePurchaseDetails from '../hooks/usePurchaseDetails';
import usePurchasePayment from '../hooks/usePurchasePayment';
import DrawerSkeleton from './DrawerSkeleton';

import PurchaseSupplierCard from './PurchaseSupplierCard';
import PurchaseSummaryDetailsCard from './PurchaseSummaryDetailsCard';
import PurchaseItemsTable from './PurchaseItemsTable';
import PurchaseNotesCard from './PurchaseNotesCard';
import PurchaseActionButtons from './PurchaseActionButtons';
import UpdatePaymentModal from '../modals/UpdatePaymentModal';

const PurchaseDetailsDrawer = ({
  isOpen = false,
  purchaseId = null,
  onClose,
  onUpdatePaymentSuccess,
  onReceiveItems,
  onPrintInvoice,
  showToast,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch details hook
  const { purchase, loading, error, refetch } = usePurchaseDetails(
    isOpen ? purchaseId : null
  );

  // Payment hook
  const { loading: paymentLoading, updatePayment } = usePurchasePayment({
    showToast,
    onSuccess: (updatedPurchase) => {
      refetch(); // Refresh drawer data
      if (onUpdatePaymentSuccess) {
        onUpdatePaymentSuccess(updatedPurchase); // Refresh parent table without page reload
      }
      setIsModalOpen(false);
    },
  });

  if (!isOpen) return null;

  const handleModalSubmit = async (id, newStatus) => {
    return await updatePayment(id, newStatus);
  };

  const getStatusBadge = (status = '') => {
    switch (String(status).toLowerCase()) {
      case 'paid':
        return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800';
      case 'pending':
        return 'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400 border-amber-200 dark:border-amber-800';
      case 'partially_paid':
      case 'partial':
        return 'bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400 border-blue-200 dark:border-blue-800';
      default:
        return 'bg-slate-50 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-slate-900/40 dark:bg-slate-950/60 backdrop-blur-xs transition-opacity" 
          onClick={onClose} 
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <div className="w-screen max-w-2xl bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col">
            
            {/* Header Section */}
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-start justify-between bg-slate-50/50 dark:bg-slate-900/50">
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    Purchase Order #{purchase?.purchaseOrderNumber || '—'}
                  </h2>
                  {purchase?.paymentStatus && (
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getStatusBadge(purchase.paymentStatus)}`}>
                      {purchase.paymentStatus}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Created on {formatDate(purchase?.createdAt)}
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {loading ? (
                <DrawerSkeleton />
              ) : error ? (
                <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
                  <div className="p-3 bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 rounded-full border border-rose-200 dark:border-rose-800">
                    <AlertCircle className="w-8 h-8" />
                  </div>
                  <div className="space-y-1 max-w-sm">
                    <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                      Failed to load purchase details
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {error}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={refetch}
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 rounded-lg transition-colors cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Try Again</span>
                  </button>
                </div>
              ) : purchase ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <PurchaseSupplierCard supplier={purchase.supplierId} />
                    <PurchaseSummaryDetailsCard 
                      purchaseOrderNumber={purchase.purchaseOrderNumber}
                      createdAt={purchase.createdAt}
                      paymentStatus={purchase.paymentStatus}
                      grandTotal={purchase.grandTotal}
                      createdBy={purchase.createdBy}
                    />
                  </div>

                  <PurchaseItemsTable items={purchase.items || []} />
                  <PurchaseNotesCard notes={purchase.notes} />
                </>
              ) : null}
            </div>

            {/* Footer Actions */}
            {!loading && !error && purchase && (
              <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
                <PurchaseActionButtons
                  purchase={purchase}
                  onUpdatePayment={() => setIsModalOpen(true)}
                  onReceiveItems={onReceiveItems}
                  onPrintInvoice={onPrintInvoice}
                  onClose={onClose}
                />
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Update Payment Modal */}
      <UpdatePaymentModal
        isOpen={isModalOpen}
        purchase={purchase}
        loading={paymentLoading}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
      />
    </>
  );
};

export default PurchaseDetailsDrawer;