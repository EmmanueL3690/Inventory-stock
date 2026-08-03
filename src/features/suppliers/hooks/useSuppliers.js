import { useState, useEffect, useCallback, useMemo } from 'react';
import supplierService from '../services/supplierService';

export const useSuppliers = () => {
  // --------------------------------------------------
  // STATE
  // --------------------------------------------------
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedType, setSelectedType] = useState('');

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // UI Selection & Modal States
  const [selectedSupplierId, setSelectedSupplierId] = useState(null);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // --------------------------------------------------
  // FETCHING
  // --------------------------------------------------
  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await supplierService.getSuppliers();
      const suppliersData = response?.data || response || [];
      
      setSuppliers(Array.isArray(suppliersData) ? suppliersData : suppliersData.items || []);
    } catch (err) {
      console.error('Error fetching suppliers:', err);
      const errorMessage =
        err.response?.data?.message || err.message || 'Failed to fetch suppliers.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch on mount
  useEffect(() => {
    refetch();
  }, [refetch]);

  // Reset to page 1 whenever search or filter state changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedStatus, selectedType]);

  // --------------------------------------------------
  // FILTERING & SORTING
  // --------------------------------------------------
  const filteredSuppliers = useMemo(() => {
    if (!Array.isArray(suppliers)) return [];

    return suppliers
      .filter((supplier) => {
        // Search Matching (Name, Email, Phone, Contact Person)
        const query = searchQuery.toLowerCase().trim();
        const name = String(supplier.name || '').toLowerCase();
        const email = String(supplier.email || '').toLowerCase();
        const phone = String(supplier.phone || '').toLowerCase();
        const contactPerson = String(supplier.contactPerson || '').toLowerCase();

        const matchesSearch =
          !query ||
          name.includes(query) ||
          email.includes(query) ||
          phone.includes(query) ||
          contactPerson.includes(query);

        // Status Filter Matching
        const currentStatus = String(
          supplier.status || (supplier.isActive ? 'active' : 'inactive')
        ).toLowerCase();
        const targetStatus = String(selectedStatus || '').toLowerCase();
        const matchesStatus =
          !selectedStatus || targetStatus === 'all' || currentStatus === targetStatus;

        // Supplier Type Filter Matching
        const currentType = String(supplier.type || supplier.category || '').toLowerCase();
        const targetType = String(selectedType || '').toLowerCase();
        const matchesType =
          !selectedType || targetType === 'all' || currentType === targetType;

        return matchesSearch && matchesStatus && matchesType;
      })
      .sort((a, b) => {
        const dateA = new Date(a.createdAt || 0);
        const dateB = new Date(b.createdAt || 0);
        return dateB - dateA;
      });
  }, [suppliers, searchQuery, selectedStatus, selectedType]);

  // --------------------------------------------------
  // PAGINATION
  // --------------------------------------------------
  const totalCount = useMemo(() => filteredSuppliers.length, [filteredSuppliers]);

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(totalCount / pageSize));
  }, [totalCount, pageSize]);

  const paginatedSuppliers = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredSuppliers.slice(startIndex, startIndex + pageSize);
  }, [filteredSuppliers, currentPage, pageSize]);

  // --------------------------------------------------
  // FILTER CONTROLS OBJECT
  // --------------------------------------------------
  const filters = useMemo(() => {
    return {
      searchQuery,
      selectedStatus,
      selectedType,
      currentPage,
      pageSize,
    };
  }, [searchQuery, selectedStatus, selectedType, currentPage, pageSize]);

  const updateFilters = useCallback((partialFilters = {}) => {
    if (partialFilters.searchQuery !== undefined) {
      setSearchQuery(partialFilters.searchQuery);
    }
    if (partialFilters.selectedStatus !== undefined) {
      setSelectedStatus(partialFilters.selectedStatus);
    }
    if (partialFilters.selectedType !== undefined) {
      setSelectedType(partialFilters.selectedType);
    }
    if (partialFilters.currentPage !== undefined) {
      setCurrentPage(partialFilters.currentPage);
    }
    if (partialFilters.pageSize !== undefined) {
      setPageSize(partialFilters.pageSize);
    }
  }, []);

  // --------------------------------------------------
  // MUTATIONS (CRUD ACTIONS)
  // --------------------------------------------------
  const createSupplier = useCallback(
    async (supplierData) => {
      setLoading(true);
      try {
        const result = await supplierService.createSupplier(supplierData);
        await refetch();
        return result;
      } catch (err) {
        console.error('Error creating supplier:', err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [refetch]
  );

  const updateSupplier = useCallback(
    async (id, supplierData) => {
      setLoading(true);
      try {
        const result = await supplierService.updateSupplier(id, supplierData);
        await refetch();

        // Update selected supplier in drawer if currently open
        if (selectedSupplierId === id) {
          const updatedSupplier = result?.data || result;
          setSelectedSupplier(updatedSupplier);
        }

        return result;
      } catch (err) {
        console.error('Error updating supplier:', err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [refetch, selectedSupplierId]
  );

  const deactivateSupplier = useCallback(
    async (id) => {
      setLoading(true);
      try {
        const result = await supplierService.deactivateSupplier(id);
        await refetch();

        if (selectedSupplierId === id) {
          setIsDrawerOpen(false);
          setSelectedSupplierId(null);
          setSelectedSupplier(null);
        }

        return result;
      } catch (err) {
        console.error('Error deactivating supplier:', err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [refetch, selectedSupplierId]
  );

  // --------------------------------------------------
  // DRAWER & SELECTION HANDLERS
  // --------------------------------------------------
  const openSupplierDetails = useCallback(async (supplierOrId) => {
    const id = typeof supplierOrId === 'object' ? supplierOrId?._id || supplierOrId?.id : supplierOrId;
    setSelectedSupplierId(id);
    setIsDrawerOpen(true);

    if (typeof supplierOrId === 'object') {
      setSelectedSupplier(supplierOrId);
    } else {
      try {
        const data = await supplierService.getSupplierById(id);
        setSelectedSupplier(data?.data || data);
      } catch (err) {
        console.error('Error fetching supplier details:', err);
      }
    }
  }, []);

  const closeSupplierDetails = useCallback(() => {
    setIsDrawerOpen(false);
    setSelectedSupplierId(null);
    setSelectedSupplier(null);
  }, []);

  // --------------------------------------------------
  // RETURN CONTRACT
  // --------------------------------------------------
  return {
    // Data State
    suppliers: paginatedSuppliers,
    rawSuppliers: suppliers,
    filteredSuppliers,

    // Controls & Status
    filters,
    loading,
    error,

    // Filter Handlers
    updateFilters,

    // CRUD Handlers
    createSupplier,
    updateSupplier,
    deactivateSupplier,
    refetch,
    refreshSuppliers: refetch,

    // Pagination Info & Setters
    currentPage,
    pageSize,
    totalPages,
    totalCount,
    setCurrentPage,
    setPageSize,

    // UI Drawer & Modal State
    selectedSupplierId,
    selectedSupplier,
    isModalOpen,
    isDrawerOpen,

    // UI Setters & Handlers
    setIsModalOpen,
    setIsDrawerOpen,
    setSelectedSupplier,
    openSupplierDetails,
    closeSupplierDetails,
  };
};

export default useSuppliers;