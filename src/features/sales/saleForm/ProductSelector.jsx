import React, { useState, useMemo, useCallback } from "react";

// Reusable helper function to safely resolve stock count
const getStock = (product) => {
  if (!product) return 0;
  return Number(
    product.availableStock ??
      product.currentQuantity ??
      product.stock ??
      0
  );
};

export const ProductSelector = ({
  availableProducts = [],
  selectedProductId = "",
  onSelectProduct = () => {},
  alreadySelectedIds = [],
  loading = false,
  error = null,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Get selling price dynamically from backend
  const getSellingPrice = useCallback((product) => {
    if (!product) return 0;
    return product.sellingPrice ?? product.price ?? 0;
  }, []);

  // Safely find the currently selected product object for preview using _id or id
  const selectedProduct = useMemo(() => {
    if (!selectedProductId) return null;
    return (
      availableProducts.find(
        (p) => String(p._id || p.id) === String(selectedProductId)
      ) || null
    );
  }, [availableProducts, selectedProductId]);

  // Filter products by Name, SKU, or Barcode
  const filteredProducts = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return availableProducts;

    return availableProducts.filter((p) => {
      const name = String(p.name || p.title || "").toLowerCase();
      const sku = String(p.sku || "").toLowerCase();
      const barcode = String(p.barcode || p.upc || p.code || "").toLowerCase();

      return name.includes(term) || sku.includes(term) || barcode.includes(term);
    });
  }, [availableProducts, searchTerm]);

  // Handle dropdown choice and send ONLY the productId string to parent
  const handleDropdownChange = (e) => {
    onSelectProduct(e.target.value);
  };

  return (
    <div className="space-y-3">
      {/* Search Bar & Dropdown Container */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
          Select Product
        </label>

        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Name, SKU, or Barcode..."
            disabled={loading || availableProducts.length === 0}
            className="w-full px-3.5 py-2 pl-9 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-medium bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-200 transition-all disabled:opacity-50"
          />
          <svg
            className="w-4 h-4 text-slate-400 absolute left-3 top-2.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Product Select Dropdown */}
        <select
          value={selectedProductId}
          onChange={handleDropdownChange}
          disabled={loading || availableProducts.length === 0}
          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-medium bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-200 transition-all disabled:opacity-50"
        >
          {loading ? (
            <option value="">Loading products...</option>
          ) : availableProducts.length === 0 ? (
            <option value="">No products available</option>
          ) : filteredProducts.length === 0 ? (
            <option value="">No matching products found</option>
          ) : (
            <>
              <option value="">-- Choose a product --</option>
              {filteredProducts.map((p, index) => {
                const pId = String(p._id || p.id || index);
                const isSelectedElsewhere =
                  alreadySelectedIds.map(String).includes(pId) &&
                  pId !== String(selectedProductId);
                const isOutOfStock = getStock(p) <= 0;
                const isDisabled = isSelectedElsewhere || isOutOfStock;

                const name = p.name || p.title || "Unknown Product";
                const sku = p.sku ? ` (${p.sku})` : "";
                const price = getSellingPrice(p);
                const currentStock = getStock(p);

                let statusSuffix = "";
                if (isOutOfStock) {
                  statusSuffix = " [Out of Stock]";
                } else if (isSelectedElsewhere) {
                  statusSuffix = " [Already Selected]";
                }

                return (
                  <option
                    key={pId}
                    value={pId}
                    disabled={isDisabled}
                  >
                    {name} {sku} - ${Number(price).toFixed(2)} | Available Stock: {currentStock}{" "}
                    {statusSuffix}
                  </option>
                );
              })}
            </>
          )}
        </select>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl animate-pulse text-xs text-slate-400 text-center">
          Fetching product catalog...
        </div>
      )}

      {/* Error Message Display */}
      {error && (
        <p className="text-xs text-rose-500 font-medium">{error}</p>
      )}

      {/* Selected Product Preview Card */}
      {selectedProduct && (
        <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl space-y-1">
          <div className="flex justify-between items-start">
            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100">
              {selectedProduct.name || selectedProduct.title || "Unknown Product"}
            </h4>
            <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">
              Selling Price: ${Number(getSellingPrice(selectedProduct)).toFixed(2)}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-500 dark:text-slate-400">
            <span>
              SKU:{" "}
              <strong className="text-slate-700 dark:text-slate-300 font-mono">
                {selectedProduct.sku || "N/A"}
              </strong>
            </span>

            {(selectedProduct.barcode || selectedProduct.upc || selectedProduct.code) && (
              <span>
                Barcode:{" "}
                <strong className="text-slate-700 dark:text-slate-300 font-mono">
                  {selectedProduct.barcode || selectedProduct.upc || selectedProduct.code}
                </strong>
              </span>
            )}

            <span>
              Available Stock:{" "}
              <strong
                className={`font-semibold ${
                  getStock(selectedProduct) > 0
                    ? "text-slate-700 dark:text-slate-300"
                    : "text-rose-500"
                }`}
              >
                {getStock(selectedProduct)}
              </strong>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductSelector;