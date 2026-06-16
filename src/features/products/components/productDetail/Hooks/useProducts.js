import { useState, useMemo } from 'react';
import { mockProductDetail } from '../Data/mockProducts';

export const useProducts = () => {
  const [product, setProduct] = useState(mockProductDetail);
  const [activeTab, setActiveTab] = useState('Overview');

  const tabs = useMemo(() => [
    'Overview', 
    'Stock Movement', 
    'Sales History', 
    'Batch & Expiry', 
    'Suppliers', 
    'AI Insights'
  ], []);

  const handleAddStock = (quantity, batchNumber) => {
    // Custom functional hook hook context placeholder for backend API integration
    console.log(`Adding ${quantity} to batch ${batchNumber}`);
  };

  return {
    product,
    activeTab,
    setActiveTab,
    tabs,
    handleAddStock
  };
};