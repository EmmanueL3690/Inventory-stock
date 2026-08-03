import { useState, useMemo } from 'react';

const INITIAL_EXTRACTED_ITEMS = [
  { id: 1, name: 'Paracetamol 500mg Tablet', qty: 5000, unitPrice: 15.00, confidence: 98, img: null },
  { id: 2, name: 'Amoxicillin 250mg Capsule', qty: 2000, unitPrice: 45.00, confidence: 97, img: null },
  { id: 3, name: 'Cough Syrup 100ml', qty: 1000, unitPrice: 120.00, confidence: 96, img: null },
  { id: 4, name: 'Vitamin C 500mg Tablet', qty: 3000, unitPrice: 20.00, confidence: 95, img: null },
  { id: 5, name: 'Ibuprofen 400mg Tablet', qty: 2000, unitPrice: 25.00, confidence: 95, img: null },
  { id: 6, name: 'ORS Rehydration Sachet', qty: 1500, unitPrice: 18.00, confidence: 90, img: null },
  { id: 7, name: 'Zinc Sulphate Tablet', qty: 1000, unitPrice: 12.00, confidence: 89, img: null }
];

export const useAIInvoiceScan = () => {
  const [currentStep, setCurrentStep] = useState(2); // Step 2: AI Processing/Review
  const [items, setItems] = useState(INITIAL_EXTRACTED_ITEMS);
  const [showConfidence, setShowConfidence] = useState(true);
  const [supplier, setSupplier] = useState({
    name: 'LifeCare Supplies',
    verified: true,
    phone: '0803 123 4567',
    email: 'sales@lifecaresupplies.com'
  });

  const handleUpdateItem = (id, field, value) => {
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        return updatedItem;
      }
      return item;
    }));
  };

  const handleDeleteItem = (id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const handleAddItem = () => {
    const newItem = {
      id: Date.now(),
      name: '',
      qty: 1,
      unitPrice: 0,
      confidence: 100,
      img: null
    };
    setItems(prev => [...prev, newItem]);
  };

  // Computations
  const totals = useMemo(() => {
    const subtotal = items.reduce((acc, item) => acc + (Number(item.qty || 0) * Number(item.unitPrice || 0)), 0);
    const vat = subtotal * 0.075; // 7.5% VAT from layout image
    const total = subtotal + vat;
    return { subtotal, vat, total };
  }, [items]);

  const summaryMetrics = useMemo(() => {
    const totalFound = items.length;
    const matched = items.filter(i => i.confidence >= 90).length;
    const needsReview = items.filter(i => i.confidence < 90 && i.confidence >= 70).length;
    const notFound = items.filter(i => i.confidence < 70).length;

    return { totalFound, matched, needsReview, notFound };
  }, [items]);

  return {
    currentStep,
    setCurrentStep,
    items,
    showConfidence,
    setShowConfidence,
    supplier,
    totals,
    summaryMetrics,
    handleUpdateItem,
    handleDeleteItem,
    handleAddItem
  };
};