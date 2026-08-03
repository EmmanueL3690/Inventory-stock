import { useState, useMemo } from 'react';
import { mockStockCountOverview, mockStockCountItems, mockRecentActivity } from '../data/mockStockCount';
import { getStockSummaryMetrics, calculateVariance } from '../utils/stockCountHelpers';

export default function useStockCount() {
  const [overview, setOverview] = useState(mockStockCountOverview);
  const [items, setItems] = useState(mockStockCountItems);
  const [activities, setActivities] = useState(mockRecentActivity);
  const [searchQuery, setSearchQuery] = useState('');
  const [noteText, setNoteText] = useState('');

  // Update item counts dynamically from direct text node grid inputs
  const handleQtyChange = (itemId, val) => {
    setItems(prevItems =>
      prevItems.map(item => {
        if (item.id === itemId) {
          const processedVal = val === '' ? '' : Number(val);
          const computed = calculateVariance(item.systemQty, processedVal, item.unitPrice);
          return {
            ...item,
            countedQty: processedVal,
            status: computed.status
          };
        }
        return item;
      })
    );
  };

  // Filters computed presentation state layers based on table inputs
  const filteredItems = useMemo(() => {
    return items.filter(item =>
      item.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [items, searchQuery]);

  // Compute dynamic rollup calculations instantly using our standalone analytical helper
  const summaryMetrics = useMemo(() => {
    return getStockSummaryMetrics(items);
  }, [items]);

  const handleCompleteCount = () => {
    setOverview(prev => ({ ...prev, status: 'Completed' }));
    alert(`Stock Count verification logged successfully!`);
  };

  return {
    overview,
    items: filteredItems,
    activities,
    searchQuery,
    setSearchQuery,
    noteText,
    setNoteText,
    summaryMetrics,
    handleQtyChange,
    handleCompleteCount
  };
}