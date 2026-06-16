import React from 'react';
import { Info } from 'lucide-react';

const ProductInformation = ({ info }) => {
  // Groups data properties logically to build a highly structured, scannable list
  const basicDetails = [
    { label: "Product Name", value: info.productName },
    { label: "SKU", value: info.sku },
    { label: "Barcode", value: info.barcode },
    { label: "Category", value: info.category },
    { label: "Sub Category", value: info.subCategory },
    { label: "Brand", value: info.brand },
    { label: "Unit", value: info.unit },
  ];

  const operationalDetails = [
    { label: "Supplier", value: info.supplier },
    { label: "Cost Price", value: `₦${info.costPrice.toFixed(2)}` },
    { label: "Selling Price", value: `₦${info.sellingPrice.toFixed(2)}` },
    { label: "Profit Margin", value: info.profitMargin, className: "text-emerald-600 font-bold" },
    { label: "Tax Rate", value: info.taxRate },
    { label: "Reorder Level", value: info.reorderLevel },
    { label: "Location/Warehouse", value: info.location },
    { label: "Status", value: info.status, isBadge: true },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6 space-y-6">
      {/* Header Block Section */}
      <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
        <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
          <Info size={16} />
        </div>
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Product Information</h3>
      </div>

      {/* Balanced Structural Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
        
        {/* Left Column Grouping */}
        <div className="space-y-3.5">
          {basicDetails.map((item, idx) => (
            <div key={idx} className="flex justify-between items-start text-sm border-b border-slate-50 pb-2 last:border-0">
              <span className="text-slate-400 font-medium">{item.label}</span>
              <span className="text-slate-800 font-semibold max-w-[60%] text-right truncate">{item.value}</span>
            </div>
          ))}
          {/* Detailed Paragraph Row Block */}
          <div className="flex flex-col gap-1 pt-1">
            <span className="text-xs text-slate-400 font-medium">{info.description && "Description"}</span>
            <p className="text-sm text-slate-600 font-medium leading-relaxed bg-slate-50/70 p-3 rounded-xl border border-slate-100">
              {info.description}
            </p>
          </div>
        </div>

        {/* Right Column Grouping */}
        <div className="space-y-3.5">
          {operationalDetails.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center text-sm border-b border-slate-50 pb-2 last:border-0">
              <span className="text-slate-400 font-medium">{item.label}</span>
              {item.isBadge ? (
                <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
                  <span className="w-1 h-1 rounded-full bg-emerald-500 mr-1.5" />
                  {item.value}
                </span>
              ) : (
                <span className={`text-slate-800 font-semibold ${item.className || ''}`}>{item.value}</span>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ProductInformation;