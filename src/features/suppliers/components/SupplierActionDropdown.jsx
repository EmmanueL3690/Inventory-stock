import React, { useState, Fragment } from 'react';
import { Menu, Transition, Dialog } from '@headlessui/react';
import { 
  MoreVertical, 
  Eye, 
  Edit3, 
  Copy, 
  Trash2, 
  Check, 
  AlertTriangle 
} from 'lucide-react';

const SupplierActionDropdown = ({
  supplier,
  onView,
  onEdit,
  onDeactivate,
  onCopyId,
}) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const supplierId = supplier?._id || supplier?.id || '';

  // Copy ID Handler
  const handleCopyId = (e) => {
    e?.stopPropagation();
    if (!supplierId) return;

    if (onCopyId) {
      onCopyId(supplierId);
    } else {
      navigator.clipboard.writeText(supplierId);
    }

    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Confirm Deactivate
  const handleConfirmDeactivate = () => {
    setIsConfirmOpen(false);
    onDeactivate?.(supplier);
  };

  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        {({ open }) => (
          <>
            <div>
              <Menu.Button
                onClick={(e) => e.stopPropagation()}
                className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer"
                title="Supplier Options"
              >
                <MoreVertical className="w-4 h-4" />
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items
                onClick={(e) => e.stopPropagation()}
                className="absolute right-0 mt-1 w-48 origin-top-right bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-lg ring-1 ring-black/5 focus:outline-none z-30 py-1.5 divide-y divide-slate-100 dark:divide-slate-800/80"
              >
                {/* Main Actions Group */}
                <div className="px-1 py-1 space-y-0.5">
                  {/* View Supplier */}
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        type="button"
                        onClick={() => onView?.(supplier)}
                        className={`${
                          active ? 'bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-200'
                        } group flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium transition-colors cursor-pointer`}
                      >
                        <Eye className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                        <span>View Supplier</span>
                      </button>
                    )}
                  </Menu.Item>

                  {/* Edit Supplier */}
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        type="button"
                        onClick={() => onEdit?.(supplier)}
                        className={`${
                          active ? 'bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-200'
                        } group flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium transition-colors cursor-pointer`}
                      >
                        <Edit3 className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                        <span>Edit Supplier</span>
                      </button>
                    )}
                  </Menu.Item>

                  {/* Copy Supplier ID */}
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        type="button"
                        onClick={handleCopyId}
                        className={`${
                          active ? 'bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-200'
                        } group flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium transition-colors cursor-pointer`}
                      >
                        {copied ? (
                          <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        ) : (
                          <Copy className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                        )}
                        <span>{copied ? 'ID Copied!' : 'Copy Supplier ID'}</span>
                      </button>
                    )}
                  </Menu.Item>
                </div>

                {/* Destructive Actions Group */}
                <div className="px-1 py-1">
                  {/* Deactivate Supplier */}
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        type="button"
                        onClick={() => setIsConfirmOpen(true)}
                        className={`${
                          active ? 'bg-rose-50 dark:bg-rose-950/40' : ''
                        } text-rose-600 dark:text-rose-400 group flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium transition-colors cursor-pointer`}
                      >
                        <Trash2 className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
                        <span>Deactivate Supplier</span>
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>

      {/* Confirmation Dialog Modal */}
      <Transition appear show={isConfirmOpen} as={Fragment}>
        <Dialog 
          as="div" 
          className="relative z-50" 
          onClose={() => setIsConfirmOpen(false)}
        >
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-slate-900 p-6 text-left align-middle shadow-xl border border-slate-200 dark:border-slate-800 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-rose-50 dark:bg-rose-950/60 rounded-xl text-rose-600 dark:text-rose-400 shrink-0">
                      <AlertTriangle className="w-6 h-6" />
                    </div>
                    <div>
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-slate-900 dark:text-white"
                      >
                        Deactivate Supplier
                      </Dialog.Title>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        Are you sure you want to deactivate{' '}
                        <span className="font-semibold text-slate-800 dark:text-slate-200">
                          {supplier?.name || supplier?.companyName || 'this supplier'}
                        </span>
                        ?
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-4 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
                    Deactivating this supplier will mark them as inactive. You will still be able to view their historical purchase records.
                  </p>

                  <div className="mt-6 flex items-center justify-end gap-2.5">
                    <button
                      type="button"
                      onClick={() => setIsConfirmOpen(false)}
                      className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-all cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleConfirmDeactivate}
                      className="px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 dark:bg-rose-600 dark:hover:bg-rose-500 rounded-lg transition-all cursor-pointer"
                    >
                      Deactivate
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default SupplierActionDropdown;