import { useState, useMemo } from 'react';
import { mockAdjustmentSession } from '../data/mockAdjustments';

export const useAdjustments = () => {
  const [items, setItems] = useState(mockAdjustmentSession.products);
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('All Locations');
  const [reasonFilter, setReasonFilter] = useState('All Reasons');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Dynamic mutation callback handle for data-table entry cells
  const updatePhysicalQty = (id, newQty) => {
    const val = newQty === '' ? 0 : parseInt(newQty, 10);
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, physicalQty: isNaN(val) ? 0 : val } : item
    ));
  };

  const updateReason = (id, newReason) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, reason: newReason } : item
    ));
  };

  // Computes system aggregates dynamically to update the top metric summary rows
  const stats = useMemo(() => {
    let totalCounted = 0;
    let positiveCount = 0;
    let negativeCount = 0;
    let totalVarianceValue = 0;
    let totalSystemValue = 0;

    items.forEach(item => {
      const diff = item.physicalQty - item.systemQty;
      const valueImpact = diff * item.unitCost;
      
      totalCounted += item.physicalQty;
      totalSystemValue += item.systemQty * item.unitCost;
      totalVarianceValue += valueImpact;

      if (diff > 0) positiveCount += diff;
      if (diff < 0) negativeCount += Math.abs(diff);
    });

    const variancePercentage = totalSystemValue ? (totalVarianceValue / totalSystemValue) * 100 : 0;

    return {
      totalItemsCounted: totalCounted,
      positiveAdjustments: positiveCount,
      negativeAdjustments: negativeCount,
      varianceValue: totalVarianceValue,
      variancePercentage: variancePercentage
    };
  }, [items]);

  // Integrated workspace pipeline filter matching query states
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.barcode.includes(searchQuery);
      
      const matchesReason = reasonFilter === 'All Reasons' || item.reason === reasonFilter;
      const matchesStatus = statusFilter === 'All Status' || item.status === statusFilter;

      return matchesSearch && matchesReason && matchesStatus;
    });
  }, [items, searchQuery, reasonFilter, statusFilter]);

  return {
    sessionMeta: mockAdjustmentSession.sessionMeta,
    aiInsights: mockAdjustmentSession.aiInsights,
    items: filteredItems,
    allItemsRaw: items,
    stats,
    searchQuery,
    setSearchQuery,
    locationFilter,
    setLocationFilter,
    reasonFilter,
    setReasonFilter,
    statusFilter,
    setStatusFilter,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    updatePhysicalQty,
    updateReason
  };
};