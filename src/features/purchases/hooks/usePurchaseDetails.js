import { useState, useCallback, useEffect } from 'react';
import purchaseService from '../services/purchaseService';

/**
 * Custom Hook to fetch, manage state, and handle actions for a single Purchase Order detail.
 *
 * @param {string|number|null} id - The unique ID of the purchase order.
 * @returns {Object} { purchase, loading, error, refresh, refetch, clear, fetchPurchaseDetails }
 */
export const usePurchaseDetails = (id) => {
  const [purchase, setPurchase] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Resets the purchase details state back to clean initial state.
   */
  const clear = useCallback(() => {
    setPurchase(null);
    setError(null);
    setLoading(false);
  }, []);

  /**
   * Fetches purchase order details from backend API by ID.
   * Accepts optional targetId override.
   */
  const fetchPurchaseDetails = useCallback(async (purchaseId) => {
    const targetId = purchaseId || id;

    if (!targetId) {
      clear();
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Support purchaseService getPurchaseById or getPurchaseDetails fallback
      const serviceCall = purchaseService.getPurchaseById || purchaseService.getPurchaseDetails;
      
      if (typeof serviceCall !== 'function') {
        throw new Error('purchaseService does not expose getPurchaseById or getPurchaseDetails method.');
      }

      const response = await serviceCall(targetId);
      const data = response?.data || response;
      
      setPurchase(data);
    } catch (err) {
      console.error(`Error fetching purchase details for ID ${targetId}:`, err);
      const message =
        err.response?.data?.message || err.message || 'Failed to load purchase details.';
      setError(message);
      setPurchase(null);
    } finally {
      setLoading(false);
    }
  }, [id, clear]);

  /**
   * Re-fetches current purchase order details.
   */
  const refresh = useCallback(() => {
    if (id) {
      fetchPurchaseDetails(id);
    }
  }, [id, fetchPurchaseDetails]);

  // Sync state automatically when target ID changes
  useEffect(() => {
    if (id) {
      fetchPurchaseDetails(id);
    } else {
      clear();
    }
  }, [id, fetchPurchaseDetails, clear]);

  return {
    purchase,
    loading,
    error,
    refresh,
    refetch: refresh, // Alias for component compatibility
    clear,
    fetchPurchaseDetails,
  };
};

export default usePurchaseDetails;