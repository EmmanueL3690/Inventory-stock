import { useState, useMemo } from 'react';
import { mockPurchases } from '../data/mockPurchases';

// Notice the explicit "export const" here
export const usePurchases = () => {
  const [purchases, setPurchases] = useState(mockPurchases);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSupplier, setSelectedSupplier] = useState('All Suppliers');
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');
  const [dateRange, setDateRange] = useState({ start: '2026-05-01', end: '2026-05-11' });
  const [viewMode, setViewMode] = useState('list'); 
  const [currentPage, setCurrentPage] = useState(1);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [selectedPurchase, setSelectedPurchase] = useState(null);

  const itemsPerPage = 7;

  const filteredPurchases = useMemo(() => {
    return purchases.filter((item) => {
      const matchesSearch = 
        item.poNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.supplier.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesSupplier = 
        selectedSupplier === 'All Suppliers' || item.supplier === selectedSupplier;
        
      const matchesStatus = 
        selectedStatus === 'All Statuses' || 
        item.paymentStatus === selectedStatus || 
        item.orderStatus === selectedStatus;

      return matchesSearch && matchesSupplier && matchesStatus;
    });
  }, [purchases, searchQuery, selectedSupplier, selectedStatus]);

  const paginatedPurchases = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredPurchases.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredPurchases, currentPage]);

  const totalPages = Math.ceil(filteredPurchases.length / itemsPerPage);

  return {
    purchases: paginatedPurchases,
    totalCount: filteredPurchases.length,
    searchQuery,
    setSearchQuery,
    selectedSupplier,
    setSelectedSupplier,
    selectedStatus,
    setSelectedStatus,
    viewMode,
    setViewMode,
    currentPage,
    setCurrentPage,
    totalPages,
    isNewModalOpen,
    setIsNewModalOpen,
    selectedPurchase,
    setSelectedPurchase,
  };
};