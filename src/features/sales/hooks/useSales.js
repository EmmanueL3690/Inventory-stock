import { useState, useEffect, useCallback, useMemo } from 'react';
import salesService from '../services/salesService';

export const useSales = () => {
  const [sales, setSales] = useState([]);
  const [selectedSale, setSelectedSale] = useState(null);
  const [loading, setLoading] = useState(false);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Pagination State
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Filters State
  const [filters, setFilters] = useState({
    search: '',
    paymentStatus: '',
    paymentMethod: '',
    startDate: '',
    endDate: '',
  });

  // Fetch Sales List
  const fetchSales = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await salesService.getSales();
      // Unify array response vs paginated wrapper { data: [] } / { sales: [] }
      const list = Array.isArray(response)
        ? response
        : response?.sales || response?.data || [];
      setSales(list);
    } catch (err) {
      console.error('Failed to fetch sales:', err);
      const msg =
        err.response?.data?.message ||
        err.message ||
        'Failed to fetch sales records.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchSales();
  }, [fetchSales]);

  // Fetch Sale Details by ID
  const getSaleById = async (id) => {
    if (!id) return null;
    setDetailsLoading(true);
    setError(null);
    try {
      const response = await salesService.getSaleById(id);
      const detail = response?.data || response;
      setSelectedSale(detail);
      return detail;
    } catch (err) {
      console.error('Failed to fetch sale details:', err);
      const msg =
        err.response?.data?.message ||
        err.message ||
        'Failed to load sale details.';
      setError(msg);
      return null;
    } finally {
      setDetailsLoading(false);
    }
  };

  // Create Sale
  const createSale = async (formData) => {
    setSubmitting(true);
    setError(null);
    try {
      const response = await salesService.createSale(formData);
      await fetchSales(); // Automatically refresh list
      return { success: true, data: response?.data || response };
    } catch (err) {
      console.error('Error creating sale:', err);
      const msg =
        err.response?.data?.message ||
        err.message ||
        'Error processing sale.';
      setError(msg);
      return { success: false, error: msg };
    } finally {
      setSubmitting(false);
    }
  };

  // Void Sale
  const voidSale = async (id) => {
    if (!id) return { success: false, error: 'No sale ID provided.' };
    setSubmitting(true);
    setError(null);
    try {
      await salesService.voidSale(id);

      // Immutably update local state
      setSales((prevSales) =>
        prevSales.map((sale) => {
          const currentId = sale.id || sale._id;
          if (String(currentId) === String(id)) {
            return { ...sale, paymentStatus: 'voided' };
          }
          return sale;
        })
      );

      // Update selected drawer sale if open
      if (
        selectedSale &&
        String(selectedSale.id || selectedSale._id) === String(id)
      ) {
        setSelectedSale((prev) => ({ ...prev, paymentStatus: 'voided' }));
      }

      await fetchSales(); // Automatically refresh list
      return { success: true };
    } catch (err) {
      console.error('Failed to void sale:', err);
      const msg =
        err.response?.data?.message ||
        err.message ||
        'Failed to void sale.';
      setError(msg);
      return { success: false, error: msg };
    } finally {
      setSubmitting(false);
    }
  };

  // Local Filter Logic
  const filteredSales = useMemo(() => {
    return sales.filter((sale) => {
      const searchLower = filters.search.toLowerCase();
      const matchesSearch =
        !filters.search ||
        sale.customerName?.toLowerCase().includes(searchLower) ||
        sale.invoiceNumber?.toLowerCase().includes(searchLower) ||
        sale.items?.some(
          (item) =>
            item.productName?.toLowerCase().includes(searchLower) ||
            item.sku?.toLowerCase().includes(searchLower)
        );

      const matchesStatus =
        !filters.paymentStatus || sale.paymentStatus === filters.paymentStatus;

      const matchesMethod =
        !filters.paymentMethod || sale.paymentMethod === filters.paymentMethod;

      const saleDate = new Date(sale.createdAt || sale.createdDate);
      const matchesStartDate =
        !filters.startDate || saleDate >= new Date(filters.startDate);
      const matchesEndDate =
        !filters.endDate ||
        saleDate <= new Date(new Date(filters.endDate).setHours(23, 59, 59));

      return (
        matchesSearch &&
        matchesStatus &&
        matchesMethod &&
        matchesStartDate &&
        matchesEndDate
      );
    });
  }, [sales, filters]);

  // Client-Side Paginated Sales Output
  const paginatedSales = useMemo(() => {
    const startIndex = (page - 1) * pageSize;
    return filteredSales.slice(startIndex, startIndex + pageSize);
  }, [filteredSales, page, pageSize]);

  // Statistics Calculation
  const stats = useMemo(() => {
    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];

    return sales.reduce(
      (acc, sale) => {
        const grandTotal = Number(sale.grandTotal || 0);
        const saleDate = new Date(sale.createdAt || sale.createdDate);
        const saleDateStr = !isNaN(saleDate.getTime())
          ? saleDate.toISOString().split('T')[0]
          : '';
        const isToday = saleDateStr === todayStr;

        acc.totalOrders += 1;

        if (isToday) acc.todayOrders += 1;

        if (sale.paymentStatus !== 'voided') {
          acc.totalRevenue += grandTotal;
          if (isToday) acc.todayRevenue += grandTotal;
        }

        if (sale.paymentStatus === 'paid') acc.paidOrders += 1;
        if (sale.paymentStatus === 'pending') acc.pendingOrders += 1;
        if (sale.paymentStatus === 'voided') acc.voidOrders += 1;

        return acc;
      },
      {
        totalRevenue: 0,
        totalOrders: 0,
        paidOrders: 0,
        pendingOrders: 0,
        voidOrders: 0,
        todayRevenue: 0,
        todayOrders: 0,
      }
    );
  }, [sales]);

  return {
    sales: paginatedSales,
    rawSales: sales,
    filteredSales,
    loading,
    detailsLoading,
    submitting,
    error,
    stats,
    filters,
    setFilters,
    pagination: {
      currentPage: page,
      pageSize,
      totalItems: filteredSales.length,
      totalPages: Math.ceil(filteredSales.length / pageSize) || 1,
    },
    setPage,
    setPageSize,
    fetchSales,
    refresh: fetchSales,
    fetchSaleDetails: getSaleById,
    getSaleById,
    createSale,
    voidSale,
    selectedSale,
    setSelectedSale,
  };
};

export default useSales;