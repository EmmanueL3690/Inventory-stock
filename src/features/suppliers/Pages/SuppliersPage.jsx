import React, { useState } from 'react';
import useSuppliers from '../hooks/useSuppliers';

import SupplierHeader from '../components/SuppliersHeader';
import SupplierKpis from '../components/SupplierKpis';
import SupplierFilters from '../components/SupplierFilters';
import SupplierTable from '../components/SupplierTable';
import SupplierDetailsDrawer from '../supplierDetails/SupplierDetailsDrawer';
import SupplierFormModal from '../supplierForm/SupplierFormModal';

const SuppliersPage = () => {
  // Custom Hook for State & API Actions
  const {
    suppliers,
    filteredSuppliers,
    filters,
    loading,
    error,
    updateFilters,
    createSupplier,
    updateSupplier,
    deactivateSupplier,
    refetch,
    selectedSupplier,
    selectedSupplierId,
    isDrawerOpen,
    openSupplierDetails,
    closeSupplierDetails,
  } = useSuppliers();

  // Local Modal States
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState(null);

  // --------------------------------------------------
  // HANDLERS
  // --------------------------------------------------
  // Open modal for creating a new supplier
  const handleOpenCreateModal = () => {
    setEditingSupplier(null);
    setIsFormModalOpen(true);
  };

  // Open modal for editing an existing supplier
  const handleOpenEditModal = (supplier) => {
    setEditingSupplier(supplier);
    setIsFormModalOpen(true);
  };

  // Close form modal and reset edit target
  const handleCloseFormModal = () => {
    setIsFormModalOpen(false);
    setEditingSupplier(null);
  };

  // Submit Create or Update
  const handleSaveSupplier = async (formData) => {
    try {
      if (editingSupplier) {
        const id = editingSupplier._id || editingSupplier.id;
        await updateSupplier(id, formData);
      } else {
        await createSupplier(formData);
      }
      handleCloseFormModal();
    } catch (err) {
      console.error('Failed to save supplier:', err);
      // Keeps modal open on error
    }
  };

  // Deactivate Handler
  const handleDeactivateSupplier = async (supplier) => {
    const id = typeof supplier === 'object' ? supplier?._id || supplier?.id : supplier;
    if (!id) return;

    if (window.confirm('Are you sure you want to deactivate this supplier?')) {
      try {
        await deactivateSupplier(id);
      } catch (err) {
        console.error('Failed to deactivate supplier:', err);
      }
    }
  };

  if (error) {
    return (
      <div className="p-6 text-center text-rose-600 dark:text-rose-400">
        <p>Failed to load suppliers. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto text-slate-900 dark:text-slate-100">
      
      {/* Page Header */}
      <SupplierHeader 
        onAddSupplier={handleOpenCreateModal}
        onRefresh={refetch}
        loading={loading}
      />

      {/* KPI Stats Section */}
      <SupplierKpis 
        suppliers={suppliers} 
        loading={loading} 
      />

      {/* Main Content Area Container */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-5">
        
        {/* Filters and Search Bar */}
        <SupplierFilters 
          filters={filters} 
          onFilterChange={updateFilters} 
        />

        {/* Suppliers Data Table */}
        <SupplierTable 
          suppliers={suppliers} 
          loading={loading} 
          onView={openSupplierDetails}
          onEdit={handleOpenEditModal}
          onDeactivate={handleDeactivateSupplier}
        />
      </div>

      {/* Supplier Details Drawer */}
      <SupplierDetailsDrawer 
        isOpen={isDrawerOpen} 
        supplierId={selectedSupplierId} 
        supplier={selectedSupplier}
        onClose={closeSupplierDetails} 
        onEdit={handleOpenEditModal}
        onDeactivate={handleDeactivateSupplier}
      />

      {/* Supplier Create / Edit Modal */}
      <SupplierFormModal 
        isOpen={isFormModalOpen} 
        supplier={editingSupplier}
        onClose={handleCloseFormModal} 
        onSubmit={handleSaveSupplier} 
      />

    </div>
  );
};

export default SuppliersPage;