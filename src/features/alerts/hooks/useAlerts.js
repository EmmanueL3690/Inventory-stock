import { useState, useMemo } from 'react';
import { mockAlerts } from '../data/mockAlerts';

export const useAlerts = () => {
  const [alerts, setAlerts] = useState(mockAlerts);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All Types');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAlert, setSelectedAlert] = useState(null);

  const itemsPerPage = 7;

  // Real-time compound searching and multi-dropdown filtering
  const filteredAlerts = useMemo(() => {
    return alerts.filter((alert) => {
      const matchesSearch = 
        alert.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
        alert.message.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType = 
        selectedType === 'All Types' || alert.type === selectedType;

      const matchesStatus = 
        selectedStatus === 'All Status' || alert.status === selectedStatus;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [alerts, searchQuery, selectedType, selectedStatus]);

  // Derived contextual summary dashboard analytics
  const stats = useMemo(() => {
    return {
      critical: alerts.filter(a => a.type === 'Critical' && a.status === 'New').length,
      lowStock: alerts.filter(a => a.type === 'Low Stock' && a.status === 'New').length,
      info: alerts.filter(a => a.type === 'Info').length,
      resolved: alerts.filter(a => a.type === 'Resolved' || a.status === 'Resolved').length
    };
  }, [alerts]);

  // Bulk action engine updates state mutations directly
  const markAllAsRead = () => {
    setAlerts(prevAlerts => 
      prevAlerts.map(alert => 
        alert.status === 'New' ? { ...alert, status: 'Read' } : alert
      )
    );
  };

  // Computes active page windows
  const paginatedAlerts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAlerts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAlerts, currentPage]);

  const totalPages = Math.ceil(filteredAlerts.length / itemsPerPage);

  return {
    alerts: paginatedAlerts,
    totalCount: filteredAlerts.length,
    searchQuery,
    setSearchQuery,
    selectedType,
    setSelectedType,
    selectedStatus,
    setSelectedStatus,
    currentPage,
    setCurrentPage,
    totalPages,
    stats,
    markAllAsRead,
    selectedAlert,
    setSelectedAlert,
  };
};