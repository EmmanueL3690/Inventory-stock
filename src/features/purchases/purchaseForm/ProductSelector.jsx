import React, { useState, useMemo, useRef, useEffect, useCallback, memo } from "react";
import { Search, ChevronDown, Check, Loader2, Package, X } from "lucide-react";

/**
 * Helper to format currency accurately.
 */
const formatMoney = (amount = 0) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
  }).format(Number(amount) || 0);
};

const ProductSelector = memo(({
  products = [],
  selectedProductId = "",
  selectedProduct = "", // Fallback prop support
  onSelect,
  onChange,
  disabled = false,
  isLoading = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  // Normalize selected identifier prop
  const currentSelectedId = useMemo(() => {
    return String(selectedProductId || selectedProduct || "");
  }, [selectedProductId, selectedProduct]);

  // Handle invalid/undefined product arrays safely
  const safeProducts = useMemo(() => {
    if (!Array.isArray(products)) return [];
    return products.filter((p) => p && typeof p === "object");
  }, [products]);

  // Find currently selected product object
  const selectedObj = useMemo(() => {
    if (!currentSelectedId) return null;
    return (
      safeProducts.find((p) => String(p._id || p.id) === currentSelectedId) || null
    );
  }, [safeProducts, currentSelectedId]);

  // Filter products by Name or SKU with strict text matching
  const filteredProducts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return safeProducts;

    return safeProducts.filter((product) => {
      const name = String(product.name || "").toLowerCase();
      const sku = String(product.sku || "").toLowerCase();
      return name.includes(query) || sku.includes(query);
    });
  }, [safeProducts, searchTerm]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Auto-focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  // Emit changes upward without mutating or creating extra rows
  const handleSelect = useCallback(
    (product) => {
      const prodId = product ? String(product._id || product.id) : "";

      // Support both onSelect and onChange callbacks
      if (typeof onSelect === "function") {
        onSelect(product || prodId);
      }
      if (typeof onChange === "function") {
        onChange(prodId);
      }

      setIsOpen(false);
      setSearchTerm("");
    },
    [onSelect, onChange]
  );

  const handleClear = useCallback(
    (e) => {
      e.stopPropagation();
      handleSelect(null);
    },
    [handleSelect]
  );

  return (
    <div className="relative w-full text-left" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        disabled={disabled || isLoading}
        onClick={() => setIsOpen((prev) => !prev)}
        className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg border transition-all outline-none ${
          disabled
            ? "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed border-slate-200 dark:border-slate-700"
            : "bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-slate-900 dark:text-slate-100 shadow-sm"
        }`}
      >
        <div className="flex items-center gap-2 truncate pr-2">
          <Package className="h-4 w-4 shrink-0 text-slate-400 dark:text-slate-500" />
          {selectedObj ? (
            <span className="font-medium truncate">{selectedObj.name}</span>
          ) : (
            <span className="text-slate-400 dark:text-slate-500">
              Select a product...
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {isLoading && (
            <Loader2 className="h-4 w-4 animate-spin text-indigo-500" />
          )}
          {selectedObj && !disabled && (
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

      {/* Floating Searchable Dropdown */}
      {isOpen && !disabled && (
        <div className="absolute z-50 mt-1 w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lg outline-none overflow-hidden">
          {/* Search Box */}
          <div className="p-2 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400 dark:text-slate-500" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name or SKU..."
                className="w-full rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 pl-8 pr-3 py-1.5 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Product List Menu */}
          <div className="max-h-60 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
            {filteredProducts.length === 0 ? (
              <div className="px-4 py-6 text-center text-xs text-slate-400 dark:text-slate-500">
                {safeProducts.length === 0
                  ? "No products available."
                  : "No products matching search."}
              </div>
            ) : (
              filteredProducts.map((product) => {
                const prodId = String(product._id || product.id);
                const isSelected = prodId === currentSelectedId;
                const stock = Number(
                  product.currentStock ?? product.stock ?? 0
                );
                const price = Number(
                  product.costPrice ?? product.purchasePrice ?? 0
                );

                return (
                  <div
                    key={prodId}
                    onClick={() => handleSelect(product)}
                    className={`flex items-start justify-between p-2.5 cursor-pointer text-xs transition-colors ${
                      isSelected
                        ? "bg-indigo-50/70 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-200"
                        : "hover:bg-slate-50 dark:hover:bg-slate-800/70 text-slate-800 dark:text-slate-200"
                    }`}
                  >
                    <div className="space-y-0.5 pr-2">
                      <div className="font-semibold flex items-center gap-1.5">
                        <span>{product.name || "Unnamed Product"}</span>
                        {isSelected && (
                          <Check className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                        <span>
                          SKU:{" "}
                          <span className="font-mono">{product.sku || "N/A"}</span>
                        </span>
                        <span>•</span>
                        <span>
                          Stock:{" "}
                          <span
                            className={
                              stock <= 0
                                ? "text-red-500 font-medium"
                                : "text-slate-700 dark:text-slate-300"
                            }
                          >
                            {stock}
                          </span>
                        </span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="font-semibold text-slate-900 dark:text-slate-100">
                        {formatMoney(price)}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
});

ProductSelector.displayName = "ProductSelector";

export default ProductSelector;