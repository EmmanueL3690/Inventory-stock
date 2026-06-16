import React from 'react';
import { ChevronRight, Edit3, MoreHorizontal, Plus, ArrowLeft } from 'lucide-react';

const ProductDetailHeader = ({ product }) => {
  return (
    <div className="space-y-4">
      {/* Link Navigation Breadcrumb Row */}
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
        <span className="hover:text-slate-600 transition cursor-pointer">Products</span>
        <ChevronRight size={14} className="text-slate-300" />
        <span className="text-blue-600">Product Details</span>
      </div>

      {/* Primary Action Row Block */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        
        {/* Core Media Profile Branding & Tags Setup */}
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 bg-white border border-slate-200 rounded-xl flex items-center justify-center p-2 shadow-xs shrink-0">
            {/* Visual placeholder matching your product layout thumbnail image geometry */}
            <div className="w-full h-full bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 font-bold text-xs">IMG</div>
          </div>
          
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">{product.name}</h1>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse" />
                {product.status}
              </span>
            </div>
            
            <p className="text-xs text-slate-400 font-medium">
              SKU: <span className="text-slate-700 font-semibold">{product.sku}</span> &nbsp;•&nbsp; 
              Barcode: <span className="text-slate-700 font-semibold">{product.barcode}</span>
            </p>

            {/* Micro-pill metadata tags row */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {product.categories.map((cat, i) => (
                <span key={i} className="px-2 py-0.5 text-[11px] font-bold bg-blue-50 text-blue-600 rounded-md tracking-wide">
                  {cat}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Global Operations Action Groupings Button List */}
        <div className="flex items-center gap-2 self-start sm:self-center ml-2 sm:ml-0">
          <button className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-600 shadow-sm hover:bg-slate-50 transition active:scale-95">
            <Edit3 size={15} />
            <span>Edit Product</span>
          </button>
          
          <button className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 shadow-sm hover:bg-slate-50 transition active:scale-95">
            <MoreHorizontal size={16} />
          </button>

          <button className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-blue-600 px-4 text-sm font-bold text-white shadow-sm hover:bg-blue-700 transition active:scale-95">
            <Plus size={16} strokeWidth={2.5} />
            <span>Add Stock</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProductDetailHeader;