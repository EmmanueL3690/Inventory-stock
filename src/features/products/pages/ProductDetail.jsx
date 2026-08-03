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
  const { product, loading, error, activeTab, setActiveTab, tabs } = useProducts();

  // 1. Loading State: Render skeletons using current styling layout
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50/50 p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1600px] mx-auto antialiased animate-pulse">
        {/* Header Skeleton */}
        <div className="h-20 bg-slate-200 rounded-2xl w-full" />
        {/* Stats Matrix Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-24 bg-slate-200 rounded-2xl w-full" />
          ))}
        </div>
        {/* Tabs Skeleton */}
        <div className="h-12 bg-slate-200 rounded-xl w-64" />
        {/* Content Area Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-6">
            <div className="h-[400px] bg-slate-200 rounded-2xl w-full" />
            <div className="h-64 bg-slate-200 rounded-2xl w-full" />
          </div>
          <div className="lg:col-span-4 space-y-6">
            <div className="h-64 bg-slate-200 rounded-2xl w-full" />
            <div className="h-64 bg-slate-200 rounded-2xl w-full" />
          </div>
        </div>
      </div>
    );
  }

  // 2. Error State: Display a professional, clean error card matching UI spec
  if (error) {
    return (
      <div className="min-h-screen bg-slate-50/50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 max-w-md w-full text-center space-y-4">
          <div className="mx-auto w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center text-rose-500 font-extrabold text-lg">
            !
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900">Unable to load product</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Please refresh or try again later.
            </p>
          </div>
          <button 
            onClick={() => window.location.reload()} 
            className="w-full h-10 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition duration-150 cursor-pointer"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  // 3. Null State: Handle missing product gracefully
  if (!product) {
    return (
      <div className="min-h-screen bg-slate-50/50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 max-w-md w-full text-center space-y-3">
          <h3 className="text-base font-bold text-slate-900">Product not found.</h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            The requested inventory product may have been archived or removed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1600px] mx-auto antialiased">
      {/* Structural Breadcrumbs & Main Command Header Rows */}
      <ProductDetailHeader product={product} loading={loading} />

      {/* High-density Analytical KPI Matrix Grid */}
      <ProductStats product={product} loading={loading} />

      {/* Horizontal Nav Workspace Hub Tabs */}
      <ProductTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Dynamic Conditional Workspace Rendering Pipeline */}
      {activeTab === 'Overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Main Informational Column (Left and Center Content Blocks) */}
          <div className="lg:col-span-8 space-y-6">
            <ProductInformation product={product} />
            <BatchExpiryTable product={product} />
          </div>

          {/* Interactive Live Metrics Column (Center Visual Graphics Stream) */}
          <div className="lg:col-span-4 space-y-6">
            <QuickActions product={product} />
            <StockTrendChart product={product} />
            <SalesSummary product={product} />
            <AIInsights product={product} />
            <RecentActivities product={product} />
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