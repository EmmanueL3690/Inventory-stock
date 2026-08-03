import React, { useState, useMemo, useRef, useEffect, useCallback, memo } from "react";
import { Search, ChevronDown, Check, Loader2, Truck, X, AlertCircle } from "lucide-react";

const SupplierSelector = memo(({
  suppliers = [],
  value = "",
  onChange = () => {},
  loading = false,
  error = "",
  disabled = false,
  label = "Supplier",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  // Safely normalize suppliers array
  const safeSuppliers = useMemo(() => {
    if (!Array.isArray(suppliers)) return [];
    return suppliers.filter((s) => s && typeof s === "object");
  }, [suppliers]);

  // Find currently selected supplier
  const selectedSupplier = useMemo(() => {
    if (!value) return null;
    return (
      safeSuppliers.find(
        (s) => String(s._id || s.id) === String(value)
      ) || null
    );
  }, [safeSuppliers, value]);

  // Filter suppliers by Name, Email, Phone, or Code
  const filteredSuppliers = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return safeSuppliers;

    return safeSuppliers.filter((s) => {
      const name = String(s.name || s.supplierName || "").toLowerCase();
      const email = String(s.email || "").toLowerCase();
      const phone = String(s.phone || s.phoneNumber || "").toLowerCase();
      const code = String(s.code || s.supplierCode || "").toLowerCase();

      return (
        name.includes(query) ||
        email.includes(query) ||
        phone.includes(query) ||
        code.includes(query)
      );
    });
  }, [safeSuppliers, searchTerm]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Auto focus search field when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  // Select supplier handler
  const handleSelect = useCallback(
    (supplier) => {
      const supplierId = supplier ? String(supplier._id || supplier.id) : "";
      onChange(supplierId);
      setIsOpen(false);
      setSearchTerm("");
    },
    [onChange]
  );

  // Clear current selection
  const handleClear = useCallback(
    (e) => {
      e.stopPropagation();
      handleSelect(null);
    },
    [handleSelect]
  );

  return (
    <div className="w-full space-y-1.5 text-left" ref={dropdownRef}>
      {/* Label */}
      {label && (
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          {label}
        </label>
      )}

      {/* Main Select Button */}
      <div className="relative">
        <button
          type="button"
          disabled={disabled || loading}
          onClick={() => setIsOpen((prev) => !prev)}
          className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg border transition-all outline-none ${
            error
              ? "border-red-500 ring-1 ring-red-500/20"
              : "border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          } ${
            disabled || loading
              ? "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed"
              : "bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-sm"
          }`}
        >
          <div className="flex items-center gap-2 truncate pr-2">
            <Truck className="h-4 w-4 shrink-0 text-slate-400 dark:text-slate-500" />
            {loading ? (
              <span className="text-slate-400 dark:text-slate-500 flex items-center gap-2">
                <Loader2 className="h-3.5 w-3.5 animate-spin text-indigo-500" />
                Loading suppliers...
              </span>
            ) : selectedSupplier ? (
              <span className="font-medium truncate">
                {selectedSupplier.name || selectedSupplier.supplierName}
              </span>
            ) : (
              <span className="text-slate-400 dark:text-slate-500">
                Select a supplier...
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {selectedSupplier && !disabled && !loading && (
              <span
                role="button"
                tabIndex={0}
                onClick={handleClear}
                className="p-0.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition"
                title="Clear selection"
              >
                <X className="h-3.5 w-3.5" />
              </span>
            )}
            <ChevronDown
              className={`h-4 w-4 text-slate-400 dark:text-slate-500 transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </div>
        </button>

        {/* Floating Searchable Menu */}
        {isOpen && !loading && !disabled && (
          <div className="absolute z-50 mt-1 w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-xl outline-none overflow-hidden">
            {/* Search Input */}
            <div className="p-2 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400 dark:text-slate-500" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search supplier..."
                  className="w-full rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 pl-8 pr-3 py-1.5 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* List */}
            <div className="max-h-60 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
              {filteredSuppliers.length === 0 ? (
                <div className="px-4 py-6 text-center text-xs text-slate-400 dark:text-slate-500">
                  {safeSuppliers.length === 0
                    ? "No suppliers available."
                    : "No matching supplier found."}
                </div>
              ) : (
                filteredSuppliers.map((supplier) => {
                  const sId = String(supplier._id || supplier.id);
                  const isSelected = sId === String(value);
                  const sName = supplier.name || supplier.supplierName || "Unnamed Supplier";
                  const sPhone = supplier.phone || supplier.phoneNumber;
                  const sEmail = supplier.email;

                  return (
                    <div
                      key={sId}
                      onClick={() => handleSelect(supplier)}
                      className={`flex items-start justify-between p-2.5 cursor-pointer text-xs transition-colors ${
                        isSelected
                          ? "bg-indigo-50/70 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-200"
                          : "hover:bg-slate-50 dark:hover:bg-slate-800/70 text-slate-800 dark:text-slate-200"
                      }`}
                    >
                      <div className="space-y-0.5 pr-2">
                        <div className="font-semibold flex items-center gap-1.5">
                          <span>{sName}</span>
                          {isSelected && (
                            <Check className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                          )}
                        </div>
                        {(sEmail || sPhone) && (
                          <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 truncate">
                            {sPhone && <span>{sPhone}</span>}
                            {sPhone && sEmail && <span>•</span>}
                            {sEmail && <span className="truncate">{sEmail}</span>}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>

      {/* Selected Supplier Summary Preview */}
      {selectedSupplier && !loading && (
        <div className="mt-2 rounded-lg border border-slate-200 dark:border-slate-800 p-3 bg-slate-50 dark:bg-slate-800/50 flex items-center gap-3">
          <div className="p-2 rounded-md bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">
            <Truck className="h-4 w-4" />
          </div>
          <div className="text-xs truncate">
            <p className="font-semibold text-slate-800 dark:text-slate-200 truncate">
              {selectedSupplier.name || selectedSupplier.supplierName}
            </p>
            <p className="text-slate-500 dark:text-slate-400 text-[11px]">
              {selectedSupplier.phone || selectedSupplier.phoneNumber || selectedSupplier.email || "Supplier Selected"}
            </p>
          </div>
        </div>
      )}

      {/* Validation Error Message */}
      {error && (
        <div className="flex items-center gap-1.5 text-xs text-red-600 dark:text-red-400 mt-1">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
});

SupplierSelector.displayName = "SupplierSelector";

export default SupplierSelector;