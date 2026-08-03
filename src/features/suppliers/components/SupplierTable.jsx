import React, { useState } from 'react';
import { 
  Building2, 
  MoreVertical, 
  Eye, 
  Edit3, 
  Trash2, 
  Mail, 
  Phone as PhoneIcon, 
  MapPin 
} from 'lucide-react';

/* -------------------------------------------------------------------------- */
/* ACTION DROPDOWN COMPONENT                         */
/* -------------------------------------------------------------------------- */
const SupplierActionDropdown = ({ supplier, onView, onEdit, onDeactivate }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = (e) => {
    e.stopPropagation(); // Prevents row click (Drawer trigger)
    setIsOpen((prev) => !prev);
  };

  const handleAction = (e, callback) => {
    e.stopPropagation();
    setIsOpen(false);
    callback?.(supplier);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={toggleDropdown}
        className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all focus:outline-none cursor-pointer"
        title="Supplier Options"
      >
        <MoreVertical className="w-4 h-4" />
      </button>

      {isOpen && (
        <>
          {/* Backdrop listener to close menu on outside click */}
          <div 
            className="fixed inset-0 z-20" 
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }} 
          />

          <div className="absolute right-0 mt-1 w-40 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-lg z-30 py-1.5 text-xs">
            {/* View Details */}
            <button
              type="button"
              onClick={(e) => handleAction(e, onView)}
              className="w-full flex items-center gap-2 px-3.5 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-slate-400" />
              <span>View Details</span>
            </button>

            {/* Edit Supplier */}
            <button
              type="button"
              onClick={(e) => handleAction(e, onEdit)}
              className="w-full flex items-center gap-2 px-3.5 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5 text-slate-400" />
              <span>Edit Supplier</span>
            </button>

            <div className="my-1 border-t border-slate-100 dark:border-slate-800" />

            {/* Deactivate Supplier */}
            <button
              type="button"
              onClick={(e) => handleAction(e, onDeactivate)}
              className="w-full flex items-center gap-2 px-3.5 py-2 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Deactivate</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* MAIN TABLE COMPONENT                             */
/* -------------------------------------------------------------------------- */
const SupplierTable = ({
  suppliers = [],
  loading = false,
  onView,
  onEdit,
  onDeactivate,
}) => {
  // Helper for status badge styling
  const getStatusBadge = (supplier) => {
    const rawStatus = String(supplier?.status || '').toLowerCase();
    const isActiveBool = supplier?.isActive;

    const isActive = rawStatus === 'active' || isActiveBool === true;

    return isActive ? (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60">
        Active
      </span>
    ) : (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800/60">
        Inactive
      </span>
    );
  };

  // Date Formatter
  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    const parsed = new Date(dateStr);
    return isNaN(parsed.getTime())
      ? 'N/A'
      : parsed.toLocaleDateString('en-NG', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        });
  };

  // Helper to resolve address display cleanly
  const formatAddress = (address) => {
    if (!address) return 'N/A';
    if (typeof address === 'string') return address;
    
    // If address is an object from backend
    const parts = [address.street, address.city, address.state].filter(Boolean);
    return parts.length > 0 ? parts.join(', ') : 'N/A';
  };

  /* -------------------------------------------------------------------------- */
  /* SKELETON LOADER                               */
  /* -------------------------------------------------------------------------- */
  if (loading) {
    return (
      <div className="w-full overflow-hidden border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900">
        <div className="divide-y divide-slate-100 dark:divide-slate-800 animate-pulse">
          <div className="h-11 bg-slate-100 dark:bg-slate-800/60" />
          {[...Array(5)].map((_, i) => (
            <div key={i} className="p-4 flex items-center justify-between gap-4">
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/4" />
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/6" />
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/6" />
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/12" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* -------------------------------------------------------------------------- */
  /* EMPTY STATE                                 */
  /* -------------------------------------------------------------------------- */
  if (!suppliers || suppliers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900">
        <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-full mb-3 text-slate-400">
          <Building2 className="w-6 h-6" />
        </div>
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
          No suppliers found
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm">
          There are no vendor records matching your criteria. Try adjusting your filters or adding a new supplier.
        </p>
      </div>
    );
  }

  /* -------------------------------------------------------------------------- */
  /* TABLE RENDER                                */
  /* -------------------------------------------------------------------------- */
  return (
    <div className="w-full overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 shadow-xs">
      <table className="w-full text-left text-xs border-collapse">
        {/* Sticky Table Header */}
        <thead>
          <tr className="sticky top-0 z-10 bg-slate-50 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-200 dark:border-slate-800 backdrop-blur-xs">
            <th scope="col" className="py-3.5 px-4">Supplier</th>
            <th scope="col" className="py-3.5 px-4">Phone</th>
            <th scope="col" className="py-3.5 px-4">Email</th>
            <th scope="col" className="py-3.5 px-4">Supplier Type</th>
            <th scope="col" className="py-3.5 px-4">Address</th>
            <th scope="col" className="py-3.5 px-4">Status</th>
            <th scope="col" className="py-3.5 px-4">Created Date</th>
            <th scope="col" className="py-3.5 px-4 text-right">Actions</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
          {suppliers.map((supplier, index) => {
            const supplierId = supplier._id || supplier.id || index;
            const supplierName = supplier.name || supplier.companyName || 'Unassigned Vendor';
            const contactPerson = supplier.contactPerson;
            const supplierType = supplier.type || supplier.supplierType || 'Generic';
            const addressFormatted = formatAddress(supplier.address);

            return (
              <tr
                key={supplierId}
                onClick={() => onView?.(supplier)}
                className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors cursor-pointer group"
              >
                {/* Supplier Name & Contact Person */}
                <td className="py-3.5 px-4 align-middle">
                  <div className="font-semibold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {supplierName}
                  </div>
                  {contactPerson && (
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      Contact: {contactPerson}
                    </div>
                  )}
                </td>

                {/* Phone */}
                <td className="py-3.5 px-4 align-middle text-slate-700 dark:text-slate-300">
                  <div className="flex items-center gap-1.5 whitespace-nowrap">
                    <PhoneIcon className="w-3 h-3 text-slate-400 shrink-0" />
                    <span>{supplier.phone || 'N/A'}</span>
                  </div>
                </td>

                {/* Email */}
                <td className="py-3.5 px-4 align-middle text-slate-700 dark:text-slate-300">
                  <div className="flex items-center gap-1.5 whitespace-nowrap max-w-[200px] truncate" title={supplier.email}>
                    <Mail className="w-3 h-3 text-slate-400 shrink-0" />
                    <span className="truncate">{supplier.email || 'N/A'}</span>
                  </div>
                </td>

                {/* Supplier Type */}
                <td className="py-3.5 px-4 align-middle">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    {supplierType}
                  </span>
                </td>

                {/* Address */}
                <td className="py-3.5 px-4 align-middle text-slate-600 dark:text-slate-400 max-w-[220px]">
                  <div className="flex items-center gap-1.5 truncate" title={addressFormatted}>
                    <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                    <span className="truncate">{addressFormatted}</span>
                  </div>
                </td>

                {/* Status Badge */}
                <td className="py-3.5 px-4 align-middle">
                  {getStatusBadge(supplier)}
                </td>

                {/* Created Date */}
                <td className="py-3.5 px-4 align-middle text-slate-600 dark:text-slate-400 whitespace-nowrap">
                  {formatDate(supplier.createdAt)}
                </td>

                {/* Actions Dropdown */}
                <td className="py-3.5 px-4 align-middle text-right">
                  <SupplierActionDropdown
                    supplier={supplier}
                    onView={onView}
                    onEdit={onEdit}
                    onDeactivate={onDeactivate}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SupplierTable;