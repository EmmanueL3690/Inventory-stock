import { useState, useEffect, useCallback } from 'react';
import { productService } from '../../../../routes/services/productService';
import inventoryService from "../../../../routes/services/inventoryService";

const INITIAL_FORM_STATE = {
  quantity: '',
  costPrice: '',
  batchNumber: '',
  notes: '',
};

export default function useStockIn() {
  // Form and selection UI states
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  // API Integration States
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [errorProducts, setErrorProducts] = useState(null);

  // Recent Stock In UI Logs (Temporary Mock Logs - remain untouched)
  const [recentRecords, setRecentRecords] = useState([
    {
      id: 'STK-001',
      productName: 'Premium Wireless Headphones',
      sku: 'PRM-WHP-01',
      batchNumber: 'BAT-2026-001',
      quantity: 50,
      costPrice: 89.99,
      date: '2026-07-14 09:30 AM',
      status: 'Completed',
    },
    {
      id: 'STK-002',
      productName: 'Mechanical Gaming Keyboard',
      sku: 'MECH-KEY-88',
      batchNumber: 'BAT-2026-002',
      quantity: 20,
      costPrice: 45.50,
      date: '2026-07-13 02:15 PM',
      status: 'Completed',
    },
  ]);

  // Fetch products from backend on mount with detailed logging
  const refreshProducts = useCallback(async () => {
    setLoadingProducts(true);
    setErrorProducts(null);

    try {
      const data = await productService.getProducts();

      console.log("Products from API:", data);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProductSelect = (product) => {
    setSelectedProductId(product._id); // Store internal ID key
    setSearchQuery(`${product.name} (${product.sku})`);
    setIsDropdownOpen(false);

    // Auto-populate the cost price from catalog baseline default if available
    if (product.costPrice) {
      setFormData((prev) => ({ 
        ...prev, 
        costPrice: product.costPrice.toString() 
      }));
    }
  };

  const handleReset = () => {
    setSelectedProductId(null);
    setSearchQuery('');
    setIsDropdownOpen(false);
    setFormData(INITIAL_FORM_STATE);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 2. Validate fields
    if (!selectedProductId) {
      alert("Please select a valid product.");
      return;
    }
    if (!formData.quantity || Number(formData.quantity) <= 0) {
      alert("Quantity must be greater than 0.");
      return;
    }
    if (formData.costPrice === '' || Number(formData.costPrice) < 0) {
      alert("Cost Price must be greater than or equal to 0.");
      return;
    }
    if (!formData.batchNumber || !formData.batchNumber.trim()) {
      alert("Batch Number cannot be empty.");
      return;
    }

    // 3. Build payload exactly like backend documentation
    const payload = {
      productId: selectedProductId,
      quantity: Number(formData.quantity),
      costPrice: Number(formData.costPrice),
      batchNumber: formData.batchNumber.trim(),
      notes: formData.notes ? formData.notes.trim() : ""
    };

    try {
      // 4. Call backend service integration
      await inventoryService.stockIn(payload);

      // 5. On success
      alert("Stock added successfully");
      handleReset();
    } catch (error) {
      // 6. On failure
      alert(error.message || "An error occurred while saving stock.");
    }
  };

  return {
    formData,
    searchQuery,
    setSearchQuery,
    isDropdownOpen,
    setIsDropdownOpen,
    selectedProductId,
    recentRecords,
    
    // Exposed Backend Elements
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