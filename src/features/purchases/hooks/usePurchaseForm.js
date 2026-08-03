import { useState, useCallback, useMemo, useEffect } from 'react';
import { purchaseService } from '../services/purchaseService';
import { fetchSuppliers } from '../services/supplierService';
import { fetchProducts } from '../../../routes/services/productService';  
import { validatePurchase } from '../utils/purchaseValidation'; 

/**
 * Custom Hook to manage state, calculation, validation, and submission 
 * logic for the Create Purchase Order form.
 */
export const usePurchaseForm = (onSuccess) => {
  // Option lists fetched from API
  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([]);

  // Form Field States
  const [supplierId, setSupplierId] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('PENDING');
  const [notes, setNotes] = useState('');
  const [items, setItems] = useState([
    {
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      productId: '',
      quantity: 1,
      costPrice: 0,
      totalPrice: 0,
    },
  ]);

  // Request & Validation States
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  /**
   * Resets form fields to initial default values.
   */
  const resetForm = useCallback(() => {
    setSupplierId('');
    setPaymentStatus('PENDING');
    setNotes('');
    setItems([
      {
        id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
        productId: '',
        quantity: 1,
        costPrice: 0,
        totalPrice: 0,
      },
    ]);
    setErrors({});
  }, []);

  /**
   * Loads suppliers and products simultaneously from backend services.
   */
  const loadInitialData = useCallback(async () => {
    setLoading(true);
    setErrors({});
    try {
      const [suppliersData, productsData] = await Promise.all([
        fetchSuppliers(),
        fetchProducts(),
      ]);

      setSuppliers(suppliersData?.data || suppliersData || []);
      setProducts(productsData?.data || productsData || []);
    } catch (err) {
      console.error('Failed to load initial purchase form data:', err);
      setErrors((prev) => ({
        ...prev,
        form: err.message || 'Failed to load initial suppliers or products data.',
      }));
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch initial option lists on mount
  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  /**
   * Adds a new blank purchase item row.
   */
  const addItem = useCallback(() => {
    const newItem = {
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      productId: '',
      quantity: 1,
      costPrice: 0,
      totalPrice: 0,
    };
    setItems((prevItems) => [...prevItems, newItem]);
  }, []);

  /**
   * Removes a purchase item row by its ID.
   */
  const removeItem = useCallback((id) => {
    setItems((prevItems) => {
      if (prevItems.length <= 1) return prevItems; // Enforce at least one line item
      return prevItems.filter((item) => item.id !== id);
    });
  }, []);

  /**
   * Updates a specific field on a purchase item and automatically recalculates totalPrice.
   */
  const updateItem = useCallback((id, field, value) => {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id !== id) return item;

        const updatedItem = { ...item, [field]: value };

        // If product was selected, auto-populate default cost price if available
        if (field === 'productId') {
          const selectedProduct = products.find(
            (p) => (p.id || p._id) === value
          );
          if (selectedProduct && selectedProduct.costPrice !== undefined) {
            updatedItem.costPrice = selectedProduct.costPrice;
          }
        }

        // Calculate line item total price
        const quantity = field === 'quantity' ? Number(value) : Number(updatedItem.quantity);
        const costPrice = field === 'costPrice' ? Number(value) : Number(updatedItem.costPrice);

        updatedItem.quantity = isNaN(quantity) ? 0 : quantity;
        updatedItem.costPrice = isNaN(costPrice) ? 0 : costPrice;
        updatedItem.totalPrice = Math.max(0, updatedItem.quantity) * Math.max(0, updatedItem.costPrice);

        return updatedItem;
      })
    );
  }, [products]);

  /**
   * Computes grand total for all line items using useMemo.
   */
  const grandTotal = useMemo(() => {
    return items.reduce((sum, item) => sum + (item.totalPrice || 0), 0);
  }, [items]);

  /**
   * Prepares the cleaned request payload using useMemo.
   */
  const purchasePayload = useMemo(() => {
    return {
      supplierId,
      paymentStatus,
      notes: notes ? notes.trim() : '',
      items: items.map(({ id, ...rest }) => ({
        ...rest,
        quantity: Number(rest.quantity),
        costPrice: Number(rest.costPrice),
        totalPrice: Number(rest.totalPrice),
      })),
      grandTotal,
    };
  }, [supplierId, paymentStatus, notes, items, grandTotal]);

  /**
   * Validates form and triggers purchase creation endpoint.
   */
  const submitPurchase = useCallback(async () => {
    setErrors({});

    // Validate form inputs
    const validation = validatePurchase(purchasePayload);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return { success: false, errors: validation.errors };
    }

    setSubmitting(true);
    try {
      const response = await purchaseService.createPurchase(purchasePayload);
      
      resetForm();

      if (onSuccess) {
        onSuccess(response?.data || response);
      }

      return { success: true, data: response };
    } catch (err) {
      console.error('Error submitting purchase order:', err);
      const apiErrors = {
        form: err.response?.data?.message || err.message || 'Failed to submit purchase order.',
      };
      setErrors(apiErrors);
      return { success: false, errors: apiErrors };
    } finally {
      setSubmitting(false);
    }
  }, [purchasePayload, resetForm, onSuccess]);

  return {
    // Form States
    supplierId,
    setSupplierId,
    paymentStatus,
    setPaymentStatus,
    notes,
    setNotes,
    items,
    
    // Data Options
    suppliers,
    products,

    // Status States
    loading,
    submitting,
    errors,

    // Calculated Memorized Values
    grandTotal,
    purchasePayload,

    // Form Handlers
    addItem,
    removeItem,
    updateItem,
    resetForm,
    submitPurchase,
    loadInitialData,
  };
};

export default usePurchaseForm;