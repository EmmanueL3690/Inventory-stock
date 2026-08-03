import React, { useEffect, useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { 
  X, 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  Tag, 
  Calendar, 
  Edit3, 
  Trash2, 
  RotateCw, 
  User 
} from 'lucide-react';
import supplierService from '../services/supplierService';

const SupplierDetailsDrawer = ({
  isOpen = false,
  supplierId = null,
  supplier: initialSupplier = null,
  onClose,
  onEdit,
  onDeactivate,
}) => {
  const [supplier, setSupplier] = useState(initialSupplier);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Sync initial prop or fetch fresh data when drawer opens or supplierId changes
  useEffect(() => {
    if (!isOpen) return;

    if (initialSupplier) {
      setSupplier(initialSupplier);
    }

    const fetchDetails = async () => {
      const activeId = supplierId || initialSupplier?._id || initialSupplier?.id;
      if (!activeId) return;

      setLoading(true);
      setError(null);
      try {
        const response = await supplierService.getSupplierById(activeId);
        const data = response?.data || response;
        setSupplier(data);
      } catch (err) {
        console.error('Failed to fetch supplier details:', err);
        setError('Could not load supplier details.');
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [isOpen, supplierId, initialSupplier]);

  // Status Badge Helper
  const renderStatusBadge = () => {
    const rawStatus = String(supplier?.status || '').toLowerCase();
    const isActiveBool = supplier?.isActive;
    const isActive = rawStatus === 'active' || isActiveBool === true;

    return isActive ? (
      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60">
        Active
      </span>
    ) : (
      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800/60">
        Inactive
      </span>
    );
  };

  // Address Formatter
  const formatAddress = (addr) => {
    if (!addr) return 'N/A';
    if (typeof addr === 'string') return addr;
    const parts = [addr.street, addr.city, addr.state, addr.country].filter(Boolean);
    return parts.length > 0 ? parts.join(', ') : 'N/A';
  };

  // Date Formatter
  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    return isNaN(date.getTime())
      ? 'N/A'
      : date.toLocaleDateString('en-NG', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        });
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Overlay Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-300 sm:duration-400"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-300 sm:duration-400"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col justify-between">
                  
                  {/* Header */}
                  <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2.5 bg-indigo-50 dark:bg-indigo-950/60 rounded-xl text-indigo-600 dark:text-indigo-400">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <div>
                        <Dialog.Title className="text-base font-bold text-slate-900 dark:text-white">
                          Supplier Details
                        </Dialog.Title>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          ID: {supplier?._id || supplier?.id || 'N/A'}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={onClose}
                      className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 overflow-y-auto flex-1 space-y-6">
                    {loading ? (
                      <div className="flex flex-col items-center justify-center py-16 text-slate-400">
                        <RotateCw className="w-6 h-6 animate-spin mb-2 text-indigo-600 dark:text-indigo-400" />
                        <span className="text-xs font-medium">Loading supplier details...</span>
                      </div>
                    ) : error ? (
                      <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-rose-600 dark:text-rose-400 text-xs">
                        {error}
                      </div>
                    ) : (
                      <>
                        {/* Title & Status */}
                        <div className="flex items-start justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                          <div>
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                              {supplier?.name || supplier?.companyName || 'Unassigned Vendor'}
                            </h2>
                            {supplier?.contactPerson && (
                              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1.5">
                                <User className="w-3.5 h-3.5 text-slate-400" />
                                <span>Contact Person: {supplier.contactPerson}</span>
                              </p>
                            )}
                          </div>
                          <div>{renderStatusBadge()}</div>
                        </div>

                        {/* Details List */}
                        <div className="space-y-4 text-xs">
                          {/* Supplier Type */}
                          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                            <Tag className="w-4 h-4 text-indigo-600 dark:text-indigo-400 mt-0.5 shrink-0" />
                            <div>
                              <p className="text-slate-500 dark:text-slate-400 font-medium">Supplier Type</p>
                              <p className="text-slate-900 dark:text-white font-semibold mt-0.5">
                                {supplier?.type || supplier?.supplierType || 'Generic'}
                              </p>
                            </div>
                          </div>

                          {/* Email */}
                          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                            <Mail className="w-4 h-4 text-indigo-600 dark:text-indigo-400 mt-0.5 shrink-0" />
                            <div className="truncate">
                              <p className="text-slate-500 dark:text-slate-400 font-medium">Email Address</p>
                              <p className="text-slate-900 dark:text-white font-semibold mt-0.5 truncate">
                                {supplier?.email || 'N/A'}
                              </p>
                            </div>
                          </div>

                          {/* Phone */}
                          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                            <Phone className="w-4 h-4 text-indigo-600 dark:text-indigo-400 mt-0.5 shrink-0" />
                            <div>
                              <p className="text-slate-500 dark:text-slate-400 font-medium">Phone Number</p>
                              <p className="text-slate-900 dark:text-white font-semibold mt-0.5">
                                {supplier?.phone || 'N/A'}
                              </p>
                            </div>
                          </div>

                          {/* Address */}
                          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                            <MapPin className="w-4 h-4 text-indigo-600 dark:text-indigo-400 mt-0.5 shrink-0" />
                            <div>
                              <p className="text-slate-500 dark:text-slate-400 font-medium">Address</p>
                              <p className="text-slate-900 dark:text-white font-semibold mt-0.5">
                                {formatAddress(supplier?.address)}
                              </p>
                            </div>
                          </div>

                          {/* Created Date */}
                          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                            <Calendar className="w-4 h-4 text-indigo-600 dark:text-indigo-400 mt-0.5 shrink-0" />
                            <div>
                              <p className="text-slate-500 dark:text-slate-400 font-medium">Created Date</p>
                              <p className="text-slate-900 dark:text-white font-semibold mt-0.5">
                                {formatDate(supplier?.createdAt)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Footer Action Buttons */}
                  <div className="p-5 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 bg-slate-50/50 dark:bg-slate-900">
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onDeactivate?.(supplier);
                      }}
                      className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 rounded-lg hover:bg-rose-100 dark:hover:bg-rose-900/60 transition-all cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Deactivate</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={onClose}
                        className="px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-all cursor-pointer"
                      >
                        Close
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onEdit?.(supplier);
                        }}
                        className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-500 rounded-lg shadow-xs transition-all cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit Supplier</span>
                      </button>
                    </div>
                  </div>

                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default SupplierDetailsDrawer;