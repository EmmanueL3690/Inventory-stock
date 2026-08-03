import { useState, useEffect, useCallback, useMemo } from 'react';
import { productService } from '../../../../routes/services/productService';
import inventoryService from '../../../../routes/services/inventoryService';
import { validateStockOut } from '../utils/stockOutValidation';
import { MOCK_RECENT_STOCK_OUT } from '../constants/stockOutConstants';

const INITIAL_FORM_STATE = {
  quantity: '',
  reason: '', 
  notes: '',
};

export default function useStockOut() {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [errorProducts, setErrorProducts] = useState(null);
  const [toast, setToast] = useState(null);

  const [recentRecords, setRecentRecords] = useState(MOCK_RECENT_STOCK_OUT);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const refreshProducts = useCallback(async () => {
    setLoadingProducts(true);
    setErrorProducts(null);
    try {
      const data = await productService.getProducts();
      setProducts(data || []);
    } catch (err) {
      console.error(err);
      setErrorProducts(err.message || 'Unable to load products.');
    } finally {
      setLoadingProducts(false);
    }
  }, []);

  useEffect(() => {
    refreshProducts();
  }, [refreshProducts]);

  const selectedProduct = useMemo(() => {
    return products.find((p) => p._id === selectedProductId) || null;
  }, [products, selectedProductId]);

  const expectedRemainingStock = useMemo(() => {
    if (!selectedProduct) return null;
    const qty = parseInt(formData.quantity, 10) || 0;
    return selectedProduct.currentStock - qty;
  }, [selectedProduct, formData.quantity]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleProductSelect = (product) => {
    setSelectedProductId(product._id);
    setSearchQuery(`${product.name} (${product.sku})`);
    setIsDropdownOpen(false);
    setErrors((prev) => ({ ...prev, product: null }));
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM_STATE);
    setSearchQuery('');
    setSelectedProductId(null);
    setIsDropdownOpen(false);
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const { isValid, errors: validationErrors } = validateStockOut(formData, selectedProduct);
    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    const payload = {
      productId: selectedProductId,
      quantity: Number(formData.quantity),
      notes: formData.notes,
    };

    console.log("Selected Product:", selectedProduct);
    console.log("Payload:", payload);

    try {
      await inventoryService.stockOut(payload);
      
      showToast('Stock successfully dispatched!', 'success');

      // Add to recent records
      const newMockRecord = {
        id: `STK-OUT-${Date.now().toString().slice(-3)}`,
        reference: `REF-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
        productName: selectedProduct?.name || '',
        sku: selectedProduct?.sku || '',
        quantity: payload.quantity,
        reason: formData.reason || 'Sale',
        processedBy: 'Current User',
        date: new Date().toLocaleString(),
        status: 'Completed',
      };
      setRecentRecords((prev) => [newMockRecord, ...prev]);

      // Reset form and sync inventory
      handleReset();
      await refreshProducts(); 

    } catch (err) {
      console.error(err);
      console.log("Backend Response:", err.response?.data);
      showToast(err.message || 'Unable to complete transaction.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    searchQuery,
    setSearchQuery,
    isDropdownOpen,
    setIsDropdownOpen,
    selectedProductId,
    selectedProduct,
    errors,
    loading,
    recentRecords,
    expectedRemainingStock,
    toast,
    products,
    loadingProducts,
    errorProducts,
    refreshProducts,
    handleInputChange,
    handleProductSelect,
    handleReset,
    handleSubmit,
  };
}