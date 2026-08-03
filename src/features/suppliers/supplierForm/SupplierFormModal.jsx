import React, { useState, useEffect, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X, Building2, RotateCw, CheckCircle2, AlertCircle } from 'lucide-react';
import supplierService from '../services/supplierService';

const SupplierFormModal = ({
  isOpen = false,
  supplier = null, // If provided, modal operates in EDIT mode
  onClose,
  onSubmitSuccess,
}) => {
  const isEditMode = Boolean(supplier?._id || supplier?.id);

  // Form Field States
  const [formData, setFormData] = useState({
    name: '',
    type: 'generic',
    phone: '',
    email: '',
    address: '',
    contactPerson: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(null);

  // Populate form fields if editing an existing supplier
  useEffect(() => {
    if (isOpen) {
      if (supplier) {
        let addrStr = supplier.address || '';
        if (typeof supplier.address === 'object' && supplier.address !== null) {
          addrStr = [
            supplier.address.street,
            supplier.address.city,
            supplier.address.state,
          ]
            .filter(Boolean)
            .join(', ');
        }

        setFormData({
          name: supplier.name || supplier.companyName || '',
          type: supplier.type || supplier.supplierType || 'generic',
          phone: supplier.phone || '',
          email: supplier.email || '',
          address: addrStr,
        });
      } else {
        // Reset form for creation
        setFormData({
          name: '',
          type: 'Generic',
          phone: '',
          email: '',
          address: '',
        });
      }
      setErrors({});
      setServerError(null);
    }
  }, [isOpen, supplier]);

  // Input Change Handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear field-specific error as user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  // Field Validation
  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Supplier Name is required.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    }

    if (formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = 'Please enter a valid email address.';
      }
    } else {
      newErrors.email = 'Email address is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setServerError(null);

    const payload = {
      name: formData.name.trim(),
      type: formData.type,
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      address: formData.address.trim(),
    };

    try {
      if (isEditMode) {
        const id = supplier._id || supplier.id;
        await supplierService.updateSupplier(id, payload);
      } else {
        await supplierService.createSupplier(payload);
      }

      // Notify parent to refresh supplier list and close modal
      onSubmitSuccess?.();
      onClose?.();
    } catch (err) {
      console.error('Failed to save supplier:', err);
      const msg =
        err.response?.data?.message ||
        err.message ||
        'Failed to save supplier details. Please try again.';
      setServerError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Transition.Root appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white dark:bg-slate-900 p-6 text-left align-middle shadow-xl border border-slate-200 dark:border-slate-800 transition-all">
                
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2.5 bg-indigo-50 dark:bg-indigo-950/60 rounded-xl text-indigo-600 dark:text-indigo-400">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <Dialog.Title
                        as="h3"
                        className="text-base font-bold text-slate-900 dark:text-white"
                      >
                        {isEditMode ? 'Edit Supplier' : 'Add New Supplier'}
                      </Dialog.Title>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {isEditMode
                          ? 'Update vendor details and contact information.'
                          : 'Register a new supplier to your procurement network.'}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Server Error Alert */}
                {serverError && (
                  <div className="mt-4 p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 flex items-center gap-2 text-rose-600 dark:text-rose-400 text-xs">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{serverError}</span>
                  </div>
                )}

                {/* Form Body */}
                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                  
                  {/* Supplier Name */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Supplier Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Acme Logistics Ltd."
                      className={`w-full px-3 py-2 text-xs rounded-lg border bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 transition-all ${
                        errors.name
                          ? 'border-rose-300 dark:border-rose-700 focus:ring-rose-500/20'
                          : 'border-slate-200 dark:border-slate-800 focus:ring-indigo-500/20 focus:border-indigo-500'
                      }`}
                    />
                    {errors.name && (
                      <p className="text-[11px] text-rose-600 dark:text-rose-400 mt-1 font-medium">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Supplier Type & Contact Person Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Supplier Type */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Supplier Type
                      </label>
                      <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer"
                      >
                       <option value="distributor">Distributor</option>
                      <option value="manufacturer">Manufacturer</option>
                      <option value="retail_store">Retail Store</option>
                      <option value="open_market">Open Market</option>
                      <option value="generic">Generic</option>
                      </select>
                    </div>

                    {/* Contact Person */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Contact Person
                      </label>
                      <input
                        type="text"
                        name="contactPerson"
                        value={formData.contactPerson}
                        onChange={handleChange}
                        placeholder="e.g. John Doe"
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                      />
                    </div>
                  </div>

                  {/* Phone & Email Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Phone */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Phone Number <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+234 800 000 0000"
                        className={`w-full px-3 py-2 text-xs rounded-lg border bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 transition-all ${
                          errors.phone
                            ? 'border-rose-300 dark:border-rose-700 focus:ring-rose-500/20'
                            : 'border-slate-200 dark:border-slate-800 focus:ring-indigo-500/20 focus:border-indigo-500'
                        }`}
                      />
                      {errors.phone && (
                        <p className="text-[11px] text-rose-600 dark:text-rose-400 mt-1 font-medium">
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="supplier@company.com"
                        className={`w-full px-3 py-2 text-xs rounded-lg border bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 transition-all ${
                          errors.email
                            ? 'border-rose-300 dark:border-rose-700 focus:ring-rose-500/20'
                            : 'border-slate-200 dark:border-slate-800 focus:ring-indigo-500/20 focus:border-indigo-500'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-[11px] text-rose-600 dark:text-rose-400 mt-1 font-medium">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Address
                    </label>
                    <textarea
                      name="address"
                      rows="2"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="123 Commercial Way, Ikeja, Lagos"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none"
                    />
                  </div>

                  {/* Footer Action Buttons */}
                  <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2.5">
                    <button
                      type="button"
                      onClick={onClose}
                      disabled={loading}
                      className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-all cursor-pointer disabled:opacity-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-500 rounded-lg shadow-xs transition-all cursor-pointer disabled:opacity-60"
                    >
                      {loading ? (
                        <>
                          <RotateCw className="w-3.5 h-3.5 animate-spin text-white" />
                          <span>Saving...</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                          <span>{isEditMode ? 'Update Supplier' : 'Save Supplier'}</span>
                        </>
                      )}
                    </button>
                  </div>

                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default SupplierFormModal;