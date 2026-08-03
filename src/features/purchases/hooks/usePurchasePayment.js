import { useState, useCallback } from 'react';
import { updatePurchasePaymentStatus } from '../services/purchasePaymentService';

/**
 * Custom Hook to handle payment status updates, loading states, and error handling.
 * * @param {Object} options
 * @param {Function} [options.onSuccess] - Callback to handle post-update actions (refetching drawer/table).
 * @param {Function} [options.showToast] - Toast display callback function.
 */
export const usePurchasePayment = ({ onSuccess, showToast } = {}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updatePayment = useCallback(
    async (purchaseId, paymentStatus) => {
      if (!purchaseId) {
        const errMessage = 'Purchase ID is required.';
        setError(errMessage);
        if (showToast) showToast(errMessage, 'error');
        return { success: false, error: errMessage };
      }

      setLoading(true);
      setError(null);

      try {
        const updatedPurchase = await updatePurchasePaymentStatus(purchaseId, paymentStatus);

        if (showToast) {
          showToast('Payment status updated successfully', 'success');
        }

        if (onSuccess) {
          onSuccess(updatedPurchase);
        }

        return { success: true, data: updatedPurchase };
      } catch (err) {
        const errorMessage = err.message || 'Failed to update payment status.';
        setError(errorMessage);

        if (showToast) {
          showToast(errorMessage, 'error');
        }

        return { success: false, error: errorMessage };
      } finally {
        setLoading(false);
      }
    },
    [onSuccess, showToast]
  );

  return {
    loading,
    error,
    updatePayment,
  };
};

export default usePurchasePayment;