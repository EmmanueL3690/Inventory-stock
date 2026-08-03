import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Edit3, MoreHorizontal, Plus, Package } 
from 'lucide-react';

const ProductDetailHeader = ({ product, loading }) => {
  // 1. Render Loading Skeleton
  if (loading) {
    return (
      <div className="space-y-4 animate-pulse">
        {/* Breadcrumb Skeleton */}
        <div className="h-4 w-40 bg-slate-200 rounded-md" />
        {/* Header Block Skeleton */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-slate-200 rounded-xl" />
            <div className="space-y-2">
              <div className="h-6 w-48 bg-slate-200 rounded-md" />
              <div className="h-4 w-32 bg-slate-200 rounded-md" />
              <div className="flex gap-1.5 pt-1">
                <div className="h-5 w-16 bg-slate-200 rounded-md" />
                <div className="h-5 w-16 bg-slate-200 rounded-md" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. Render Null State (If loading is complete but product remains null)
  if (!product) {
    return (
      <div className="py-8 text-center text-sm font-semibold text-slate-500">
        Product not found.
      </div>
    );
  }

  // Helper helper to dynamicize status badge styles safely
  const getStatusClasses = (status) => {
    switch (status) {
      case 'Active':
        return {
          badge: 'bg-emerald-50 text-emerald-600 border-emerald-100',
          dot: 'bg-emerald-500',
        };
      case 'Archived':
        return {
          badge: 'bg-slate-50 text-slate-500 border-slate-200',
          dot: 'bg-slate-400',
        };
      default: // Inactive or default
        return {
          badge: 'bg-amber-50 text-amber-600 border-amber-100',
          dot: 'bg-amber-500',
        };
    }
  };

  const statusStyle = getStatusClasses(product?.status);
  const navigate = useNavigate();

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
            {/* Visual fallback container holding the Package placeholder icon */}
            <div className="w-full h-full bg-slate-100 rounded-lg flex items-center justify-center text-slate-400">
              <Package size={24} className="stroke-[1.5]" />
            </div>
          </div>
          
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                {product?.name}
              </h1>
              {product?.status && (
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${statusStyle.badge}`}>
                  <span className={`w-1.5 h-1.5 rounded-full mr-1.5 animate-pulse ${statusStyle.dot}`} />
                  {product?.status}
                </span>
              )}
            </div>
            
            <p className="text-xs text-slate-400 font-medium">
              SKU: <span className="text-slate-700 font-semibold">{product?.sku}</span>
            </p>

            {/* Micro-pill metadata tags row */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="px-2 py-0.5 text-[11px] font-bold bg-blue-50 text-blue-600 rounded-md tracking-wide">
                {product?.category || "No Category"}
              </span>
              <span className="px-2 py-0.5 text-[11px] font-bold bg-slate-100 text-slate-600 rounded-md tracking-wide">
                {product?.unit || "No Unit"}
              </span>
            </div>
          </div>
        </div>

        {/* Global Operations Action Groupings Button List */}
        <div className="flex items-center gap-2 self-start sm:self-center ml-2 sm:ml-0">
          <button className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-600 shadow-sm hover:bg-slate-50 transition active:scale-95"
           onClick={() => navigate(`/products/${product.id}/edit`)}
          >
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