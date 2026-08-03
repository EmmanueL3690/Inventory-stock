import { useState, useCallback, useMemo } from 'react';

export const useReceiveItems = () => {
  // --------------------------------------------------
  // STATE
  // --------------------------------------------------
  const [purchase, setPurchase] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // --------------------------------------------------
  // LOADERS & RESET
  // --------------------------------------------------
  /**
   * Initializes state with purchase data provided by parent/caller.
   * Sanitizes items to ensure receive inputs are controlled.
   */
  const loadPurchase = useCallback((purchaseData) => {
    if (!purchaseData) return;

    setPurchase(purchaseData);

    const initialItems = (purchaseData.items || []).map((item) => ({
      ...item,
      receiveQuantity: item.receiveQuantity !== undefined ? item.receiveQuantity : '',
      batchNumber: item.batchNumber || '',
      expiryDate: item.expiryDate || '',
    }));

    setItems(initialItems);
    setErrors({});
  }, []);

  /**
   * Resets hook back to default state.
   */
  const reset = useCallback(() => {
    setPurchase(null);
    setItems([]);
    setLoading(false);
    setErrors({});
  }, []);

  // --------------------------------------------------
  // INPUT HANDLERS
  // --------------------------------------------------
  /**
   * Updates receiving quantity for a specific item with validation checks.
   */
  const updateReceiveQuantity = useCallback((itemId, value) => {
    setItems((prevItems) =>
      prevItems.map((item) => {
        const id = item._id || item.id;
        if (id !== itemId) return item;

        const orderedQty = Number(item.quantity || item.orderedQuantity || 0);
        const alreadyReceivedQty = Number(item.receivedQuantity || item.alreadyReceived || 0);
        const remainingQty = Math.max(0, orderedQty - alreadyReceivedQty);

        const numericValue = Number(value);
        let errorMsg = null;

        if (value !== '' && isNaN(numericValue)) {
          errorMsg = 'Invalid number format';
        } else if (numericValue < 0) {
          errorMsg = 'Receive quantity cannot be negative';
        } else if (numericValue > remainingQty) {
          errorMsg = `Cannot exceed remaining quantity (${remainingQty})`;
        }

        // Store or clear errors per item
        setErrors((prev) => {
          const next = { ...prev };
          if (errorMsg) {
            next[itemId] = errorMsg;
          } else {
            delete next[itemId];
          }
          return next;
        });

        return {
          ...item,
          receiveQuantity: value,
        };
      })
    );
  }, []);

  /**
   * Updates batch number for a specific item.
   */
  const updateBatchNumber = useCallback((itemId, value) => {
    setItems((prevItems) =>
      prevItems.map((item) => {
        const id = item._id || item.id;
        if (id === itemId) {
          return { ...item, batchNumber: value };
        }
        return item;
      })
    );
  }, []);

  /**
   * Updates expiry date for a specific item.
   */
  const updateExpiryDate = useCallback((itemId, value) => {
    setItems((prevItems) =>
      prevItems.map((item) => {
        const id = item._id || item.id;
        if (id === itemId) {
          return { ...item, expiryDate: value };
        }
        return item;
      })
    );
  }, []);

  // --------------------------------------------------
  // SUMMARY CALCULATIONS
  // --------------------------------------------------
  const summary = useMemo(() => {
    let totalProducts = items.length;
    let orderedUnits = 0;
    let receivingUnits = 0;
    let remainingUnits = 0;

    items.forEach((item) => {
      const ordered = Number(item.quantity || item.orderedQuantity || 0);
      const alreadyReceived = Number(item.receivedQuantity || item.alreadyReceived || 0);
      
      const receiveInput = Number(item.receiveQuantity);
      const currentReceiving = !isNaN(receiveInput) && receiveInput > 0 ? receiveInput : 0;

      const remaining = Math.max(0, ordered - (alreadyReceived + currentReceiving));

      orderedUnits += ordered;
      receivingUnits += currentReceiving;
      remainingUnits += remaining;
    });

    return {
      totalProducts,
      orderedUnits,
      receivingUnits,
      remainingUnits,
    };
  }, [items]);

  // Alias helper function for explicit calculation calls
  const calculateSummary = useCallback(() => summary, [summary]);

  // --------------------------------------------------
  // SUBMISSION LOGIC (Mock/Isolated)
  // --------------------------------------------------
  /**
   * Formats payload and prepares submission object.
   * Service API call will be hooked up here later.
   */
  const submitReceiving = useCallback(async () => {
    // Check for validation errors
    if (Object.keys(errors).length > 0) {
      throw new Error('Please resolve item validation errors before submitting.');
    }

    // Filter items with a valid receiving quantity
    const itemsToReceive = items
      .filter((item) => {
        const qty = Number(item.receiveQuantity);
        return !isNaN(qty) && qty > 0;
      })
      .map((item) => ({
        itemId: item._id || item.id,
        productId: item.productId?._id || item.productId || item.id,
        receiveQuantity: Number(item.receiveQuantity),
        batchNumber: item.batchNumber?.trim() || null,
        expiryDate: item.expiryDate || null,
      }));

    if (itemsToReceive.length === 0) {
      throw new Error('At least one item must have a receive quantity greater than 0.');
    }

    const payload = {
      purchaseId: purchase?._id || purchase?.id,
      receivedItems: itemsToReceive,
    };

    return payload;
  }, [items, purchase, errors]);

  // --------------------------------------------------
  // RETURN CONTRACT
  // --------------------------------------------------
  return {
    purchase,
    items,
    loading,
    errors,
    summary,

    loadPurchase,
    updateReceiveQuantity,
    updateBatchNumber,
    updateExpiryDate,
    calculateSummary,
    submitReceiving,
    reset,

    setLoading,
  };
};

export default useReceiveItems;