import React from 'react';
import { Info } from 'lucide-react';

const ProductInformation = ({ product }) => {
  // Format Currency
  const formatCurrency = (val) => {
    if (val === undefined || val === null || isNaN(Number(val))) return "Coming Soon";
    return `₦${Number(val).toLocaleString()}`;
  };

  // Format Numeric Counts safely
  const formatNumber = (val) => {
    if (val === undefined || val === null || isNaN(Number(val))) return "0";
    return Number(val).toLocaleString();
  };

  // Format Date: new Date(date).toLocaleDateString()
  const formatDate = (dateString) => {
    if (!dateString) return "Coming Soon";
    try {
      const parsedDate = new Date(dateString);
      if (isNaN(parsedDate.getTime())) return "Coming Soon";
      return parsedDate.toLocaleDateString();
    } catch {
      return "Coming Soon";
    }
  };

  // Determine Status: Archived, Active, or Inactive
  const getStatus = () => {
    if (!product) return "Inactive";
    if (product.status) return product.status;
    if (product.isArchived === true) return "Archived";
    if (product.isActive === true) return "Active";
    return "Inactive";
  };

  // Status-specific tag colors
  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case 'Active':
      case 'In Stock':
        return {
          badge: 'bg-emerald-50 text-emerald-600 border border-emerald-100',
          dot: 'bg-emerald-500'
        };
      case 'Archived':
        return {
          badge: 'bg-slate-50 text-slate-500 border border-slate-200',
          dot: 'bg-slate-400'
        };
      case 'Low Stock':
        return {
          badge: 'bg-amber-50 text-amber-600 border border-amber-100',
          dot: 'bg-amber-500'
        };
      case 'Out of Stock':
      case 'Inactive':
      default:
        return {
          badge: 'bg-rose-50 text-rose-600 border border-rose-100',
          dot: 'bg-rose-500'
        };
    }
  };

  const currentStatus = getStatus();
  const statusStyle = getStatusBadgeStyle(currentStatus);

  // Basic Information Details
  const basicDetails = [
    { label: "Product Name", value: product?.name || "Coming Soon" },
    { label: "SKU", value: product?.sku || "Coming Soon" },
    { label: "Barcode", value: product?.barcode || "Coming Soon" },
    { label: "Category", value: product?.category || "No Category" },
    { label: "Unit", value: product?.unit || "No Unit" },
    { label: "Selling Price", value: formatCurrency(product?.sellingPrice) },
  ];

  // Stock and Operational Parameters from Backend
  const operationalDetails = [
    { label: "Current Stock", value: formatNumber(product?.currentQuantity) },
    { label: "Available Stock", value: formatNumber(product?.availableStock) },
    { label: "Reserved Stock", value: formatNumber(product?.reservedStock) },
    { label: "Reorder Level", value: formatNumber(product?.reorderLevel) },
    { label: "Inventory Value", value: formatCurrency(product?.inventoryValue) },
    { label: "Status", value: currentStatus, isBadge: true },
  ];

  const systemLogs = [
    { label: "Created Date", value: formatDate(product?.createdAt || product?.raw?.createdAt) },
    { label: "Updated Date", value: formatDate(product?.updatedAt || product?.raw?.updatedAt) }
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
          {/* System Audit Timestamps */}
          <div className="pt-2 space-y-3.5 border-t border-slate-100">
            {systemLogs.map((item, idx) => (
              <div key={idx} className="flex justify-between items-start text-sm border-b border-slate-50 pb-2 last:border-0">
                <span className="text-slate-400 font-medium">{item.label}</span>
                <span className="text-slate-800 font-semibold max-w-[60%] text-right truncate">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column Grouping */}
        <div className="space-y-3.5">
          {operationalDetails.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center text-sm border-b border-slate-50 pb-2 last:border-0">
              <span className="text-slate-400 font-medium">{item.label}</span>
              {item.isBadge ? (
                <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold ${statusStyle.badge}`}>
                  <span className={`w-1 h-1 rounded-full mr-1.5 ${statusStyle.dot}`} />
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