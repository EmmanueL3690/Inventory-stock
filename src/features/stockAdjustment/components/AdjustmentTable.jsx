import React from 'react';
import { HelpCircle, Loader2 } from 'lucide-react';

const AdjustmentTable = ({ engine }) => {
  return (
    <div className="space-y-4">
      {/* Current Stock Preview Card */}
      {engine.selectedProduct && (
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-slate-500">Selected Product</p>
            <p className="text-sm font-bold text-slate-800">{engine.selectedProduct.name}</p>
          </div>
          <div className="flex items-center gap-6 text-center">
            <div>
              <p className="text-[11px] font-bold text-slate-500 uppercase">Current Stock</p>
              <p className="text-base font-bold text-slate-800">
                {engine.loadingStock ? <Loader2 size={16} className="animate-spin inline" /> : engine.currentStock}
              </p>
            </div>
            <div className={engine.adjustmentImpact < 0 ? 'text-rose-600' : 'text-emerald-600'}>
              <p className="text-[11px] font-bold uppercase">Adjustment ({engine.formData.type})</p>
              <p className="text-base font-bold">
                {engine.adjustmentImpact > 0 ? `+${engine.adjustmentImpact}` : engine.adjustmentImpact}
              </p>
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-500 uppercase">New Stock</p>
              <p className="text-base font-bold text-blue-600">{engine.newStock}</p>
            </div>
          </div>
        </div>
      )}

      {/* Form Input Control Section */}
      {engine.selectedProduct && (
        <div className="p-4 border border-blue-100 bg-blue-50/30 rounded-xl space-y-3">
          <h4 className="text-xs font-bold text-slate-700">Stock Adjustment Details</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-500 mb-1">Adjustment Type</label>
              <select
                value={engine.formData.type}
                onChange={(e) => engine.handleInputChange('type', e.target.value)}
                className="w-full h-9 px-3 bg-white border border-slate-200 rounded-lg text-xs font-semibold"
              >
                <option value="DAMAGE">DAMAGE</option>
                <option value="LOST">LOST</option>
                <option value="EXPIRED">EXPIRED</option>
                <option value="FOUND">FOUND</option>
                <option value="CORRECTION">CORRECTION</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-500 mb-1">Quantity</label>
              <input
                type="number"
                min="1"
                value={engine.formData.quantity}
                onChange={(e) => engine.handleInputChange('quantity', e.target.value)}
                className="w-full h-9 px-3 bg-white border border-slate-200 rounded-lg text-xs font-semibold"
              />
              {engine.formErrors?.quantity && (
                <p className="text-[10px] text-rose-500 mt-0.5">{engine.formErrors.quantity}</p>
              )}
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-500 mb-1">Notes (Optional)</label>
              <input
                type="text"
                placeholder="Reason or explanation..."
                value={engine.formData.notes}
                onChange={(e) => engine.handleInputChange('notes', e.target.value)}
                className="w-full h-9 px-3 bg-white border border-slate-200 rounded-lg text-xs font-semibold"
              />
            </div>
          </div>
        </div>
      )}

      {/* Adjustments History Table Wrapper */}
      <div className="overflow-x-auto -mx-5 sm:mx-0 border border-slate-100 rounded-xl bg-white">
        <table className="w-full border-collapse text-left min-w-[900px]">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/60 select-none">
              <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Product</th>
              <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">SKU / Barcode</th>
              <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <span>System Qty</span>
                <HelpCircle size={12} className="text-slate-400 cursor-help" />
              </th>
              <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Adjustment Qty</th>
              <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Type</th>
              <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Notes</th>
              <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 text-xs">
            {engine.loadingMovements ? (
              <tr>
                <td colSpan="7" className="px-4 py-12 text-center text-xs font-semibold text-slate-400">
                  <Loader2 className="animate-spin inline mr-2" size={16} />
                  Loading adjustment records...
                </td>
              </tr>
            ) : !engine.items || engine.items.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-4 py-12 text-center text-xs font-semibold text-slate-400 bg-slate-50/30">
                  No adjustment records found.
                </td>
              </tr>
            ) : (
              engine.items.map((item, index) => {
                // Task 1: Single Product Resolution Source
                const product = engine.resolveProduct ? engine.resolveProduct(item) : (item.product || {});

                const productName = product.name || 'Unknown Product';
                const sku = product.sku || '-';
                const barcode = product.barcode || '-';

                const qtyVal = Number(item.quantity) || 0;
                const type = item.type || item.movementType || 'DAMAGE';

                const isNegative = type === 'DAMAGE' || type === 'LOST' || type === 'EXPIRED' || qtyVal < 0;
                const systemStock = item.totalStock ?? product.stock ?? product.totalStock ?? '-';

                return (
                  <tr key={item.id || item._id || index} className="hover:bg-slate-50/80 transition">
                    <td className="px-4 py-3 font-semibold text-slate-800">
                      {productName}
                    </td>
                    <td className="px-4 py-3 text-slate-500">
                      {sku} / {barcode}
                    </td>
                    <td className="px-4 py-3 font-semibold text-slate-700">
                      {systemStock}
                    </td>
                    <td className={`px-4 py-3 font-bold ${isNegative ? 'text-rose-600' : 'text-emerald-600'}`}>
                      {isNegative ? `-${Math.abs(qtyVal)}` : `+${Math.abs(qtyVal)}`}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                        isNegative
                          ? 'bg-rose-50 text-rose-700 border-rose-200'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      }`}>
                        {type}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-500 max-w-xs truncate">
                      {item.notes || item.reason || '-'}
                    </td>
                    <td className="px-4 py-3 text-slate-400">
                      {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'Recent'}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdjustmentTable;