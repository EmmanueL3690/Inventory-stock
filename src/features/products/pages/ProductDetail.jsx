import React from 'react';
import { useProducts } from '../components/productDetail/Hooks/useProducts';
import ProductDetailHeader from '../components/productDetail/ProductDetailHeader';
import ProductStats from '../components/productDetail/ProductStats';
import ProductTabs from '../components/productDetail/ProductTabs';

// Subview imports representing the context engine (Loaded in Phase 2/3)
import ProductInformation from '../components/productDetail/overview/ProductInformation';
import BatchExpiryTable from '../components/productDetail/overview/BatchExpiryTable';
import StockTrendChart from '../components/productDetail/overview/StockTrendChart';
import SalesSummary from '../components/productDetail/overview/SalesSummary';
import AIInsights from '../components/productDetail/overview/AIInsights';
import QuickActions from '../components/productDetail/overview/QuickActions';
import RecentActivities from '../components/productDetail/overview/RecentActivities';

const ProductDetail = () => {
  const { product, activeTab, setActiveTab, tabs } = useProducts();

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1600px] mx-auto antialiased">
      {/* Structural Breadcrumbs & Main Command Header Rows */}
      <ProductDetailHeader product={product} />

      {/* High-density Analytical KPI Matrix Grid */}
      <ProductStats stats={product.stats} />

      {/* Horizontal Nav Workspace Hub Tabs */}
      <ProductTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Dynamic Conditional Workspace Rendering Pipeline */}
      {activeTab === 'Overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Main Informational Column (Left and Center Content Blocks) */}
          <div className="lg:col-span-8 space-y-6">
            <ProductInformation info={product.info} />
            <BatchExpiryTable batches={product.batches} totalStock={product.stats.currentStock} unit={product.info.unit} />
          </div>

          {/* Interactive Live Metrics Column (Center Visual Graphics Stream) */}
          <div className="lg:col-span-4 space-y-6">
            <StockTrendChart data={product.stockTrend} currentStock={product.stats.currentStock} />
            <SalesSummary data={product.salesSummary} units={product.stats.unitsSoldThisMonth} revenue={product.stats.revenueThisMonth} />
          </div>

          {/* Contextual Intelligence Sidebar Column (Right Feeds Panel) */}
          <div className="col-span-1 lg:col-span-12 xl:col-span-4 space-y-6 xl:absolute xl:right-8 xl:w-[380px] hidden">
             {/* Extended mapping for hyper-wide screens, embedded responsively inside subview files */}
          </div>

        </div>
      )}

      {/* Fallback containers for structural continuity during tab switches */}
      {activeTab !== 'Overview' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-400 font-medium shadow-sm">
          {activeTab} module workspace content pipeline mapping active.
        </div>
      )}
    </div>
  );
};

export default ProductDetail;