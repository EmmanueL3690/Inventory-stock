import { X, Package2, Barcode, Boxes } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import StatusBadge from "../../../components/ui/StatusBadge"

const ProductDetailsDrawer = ({ open, onClose, product }) => {
  // Capture dynamic component instance from properties schema mapping safely
  const ProductIcon = product?.image

  /* ---------------- INTELLIGENT COLOR SYSTEM ---------------- */
  const getStockMetricStyles = (stock) => {
    const stockCount = Number(stock || 0)
    if (stockCount === 0) {
      return {
        bg: "bg-rose-50 border-rose-100",
        text: "text-rose-700",
        label: "Out of Stock"
      }
    }
    if (stockCount <= 5) {
      return {
        bg: "bg-amber-50 border-amber-100",
        text: "text-amber-700",
        label: "Critical Low"
      }
    }
    return {
      bg: "bg-emerald-50 border-emerald-100",
      text: "text-emerald-700",
      label: "Healthy"
    }
  }

  const stockMetrics = getStockMetricStyles(product?.stock)

  return (
    <AnimatePresence>
      {open && product && (
        <>
          {/* ========================================
              BACKDROP OVERLAY (ANIMATED)
          ======================================== */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          />

          {/* ========================================
              SLIDE-OUT DRAWER CONTAINER (SCROLL & VIEWPORT SAFE)
          ======================================== */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 z-[60] h-dvh w-full max-w-md overflow-y-auto bg-white shadow-2xl flex flex-col"
          >
            {/* STICKY HEADER */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white/95 backdrop-blur px-6 py-5">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Product Details
                </h2>
                <p className="text-sm text-slate-500">
                  Inventory management profile
                </p>
              </div>

              <button
                onClick={onClose}
                className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* SCROLLABLE MAIN CONTENT BODY */}
            <div className="flex-1 overflow-y-auto space-y-6 p-6 pb-24">
              
              {/* FIXED: DYNAMIC FALLBACK ICON ELEMENT WRAPPER */}
              <div className="flex h-64 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 shadow-inner">
                {ProductIcon ? (
                  <ProductIcon
                    size={90}
                    className="text-slate-300"
                    strokeWidth={1.2}
                  />
                ) : (
                  <Package2
                    size={90}
                    className="text-slate-300"
                    strokeWidth={1.2}
                  />
                )}
              </div>

              {/* PRODUCT NAME & IDENTIFICATION TAGLINE */}
              <div>
                <div className="mb-3 flex items-start justify-between gap-4">
                  <h3 className="text-2xl font-bold text-slate-900 break-words max-w-[70%]">
                    {product?.name || "Unnamed Product"}
                  </h3>
                  <div className="shrink-0 mt-1">
                    <StatusBadge status={product?.status || "In Stock"} />
                  </div>
                </div>

                <p className="text-sm text-slate-500 leading-relaxed bg-slate-50 rounded-xl p-3 border border-slate-100">
                  {product?.description || "No supplemental product description context provided."}
                </p>
              </div>

              {/* CORE METRIC GRID */}
              <div className="grid grid-cols-2 gap-4">
                {/* SKU CARD */}
                <div className="rounded-2xl border border-slate-200 p-4 bg-white shadow-sm">
                  <div className="mb-2 flex items-center gap-2">
                    <Barcode className="w-4 h-4 text-blue-500" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      SKU Reference
                    </span>
                  </div>
                  <p className="text-sm font-black text-slate-800 break-all">
                    {product?.sku || "N/A"}
                  </p>
                </div>

                {/* CRASH-SAFE INVENTORY HEALTH STOCK CARD */}
                <div className={`rounded-2xl border p-4 shadow-sm transition-colors ${stockMetrics.bg}`}>
                  <div className="mb-2 flex items-center gap-2">
                    <Boxes className="w-4 h-4 text-slate-600" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Stock Level
                    </span>
                  </div>
                  <p className="text-sm font-black text-slate-900">
                    {product?.stock !== undefined ? `${product.stock} units` : "0 units"}
                  </p>
                  <span className={`text-[10px] font-extrabold uppercase tracking-tight ${stockMetrics.text}`}>
                    • {stockMetrics.label}
                  </span>
                </div>
              </div>

              {/* DETAILED INFORMATION PANEL */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-4 flex items-center gap-2 border-b border-slate-100 pb-3">
                  <Package2 className="w-4 h-4 text-purple-500" />
                  <h4 className="text-sm font-bold text-slate-800">
                    Operational Matrix
                  </h4>
                </div>

                <div className="space-y-4">
                  {/* CATEGORY */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500">Category</span>
                    <span className="text-sm font-semibold text-slate-800">
                      {product?.category || "Unassigned"}
                    </span>
                  </div>

                  {/* FIXED: NAIRA LOCALESTRING FORMAT COST PRICE */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500">Cost Price</span>
                    <span className="text-sm font-bold text-emerald-600">
                      ₦{(product?.costPrice ?? 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>

                  {/* FIXED: NAIRA LOCALESTRING FORMAT SELLING PRICE */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500">Selling Price</span>
                    <span className="text-sm font-bold text-blue-600">
                      ₦{(product?.sellingPrice ?? 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>

                  {/* SUPPLIER */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500">Supplier</span>
                    <span className="text-sm font-semibold text-slate-800 max-w-[60%] text-right truncate">
                      {product?.supplier || "No supplier linked"}
                    </span>
                  </div>

                  {/* BARCODE */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500">Barcode ID</span>
                    <span className="text-sm font-mono text-slate-700">
                      {product?.barcode || "No barcode scan record"}
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default ProductDetailsDrawer