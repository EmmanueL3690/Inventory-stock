import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Boxes, 
  TrendingUp, 
  BarChart3, 
  ArrowUpRight, 
  ArrowDownRight, 
  PackageCheck, 
  CheckCircle2, 
  Layers, 
  RefreshCw 
} from 'lucide-react';

/**
 * ProductShowcase Component
 * Features tabbed interactive preview views (Inventory, Sales, Reports),
 * dynamic animated dashboard mockups with floating stat widgets,
 * and high-contrast glassmorphism visual design.
 */
const ProductShowcase = () => {
  const [activeTab, setActiveTab] = useState('inventory');

  const tabs = [
    { id: 'inventory', label: 'Inventory Control', icon: Boxes },
    { id: 'sales', label: 'Sales Velocity', icon: TrendingUp },
    { id: 'reports', label: 'Reports & Intelligence', icon: BarChart3 },
  ];

  // Dynamic Content for Mockup Views
  const tabContent = {
    inventory: {
      tag: 'Real-time Stock Control',
      heading: 'Instant stock visibility across multi-warehouse channels',
      metrics: [
        { label: 'Total SKUs', value: '18,420', change: '+12%', isPositive: true },
        { label: 'Stock Turnover', value: '4.8x', change: '+0.6', isPositive: true },
        { label: 'Low Stock Items', value: '12 Items', change: '-4', isPositive: true },
      ],
      listItems: [
        { name: 'Wireless Headphones Pro', qty: '1,240 units', status: 'In Stock', badgeBg: 'bg-emerald-500/10 text-emerald-400' },
        { name: 'Ergonomic Office Chair', qty: '85 units', status: 'Low Stock', badgeBg: 'bg-amber-500/10 text-amber-400' },
        { name: 'Mechanical Keyboard RGB', qty: '610 units', status: 'In Stock', badgeBg: 'bg-emerald-500/10 text-emerald-400' },
      ],
      floatingWidget: {
        icon: PackageCheck,
        title: 'Auto Reorder Active',
        subtitle: 'PO #4028 generated automatically',
        color: 'text-blue-500 bg-blue-50',
      }
    },
    sales: {
      tag: 'Order & Revenue Tracking',
      heading: 'Seamless multi-channel order fulfillment and pipeline',
      metrics: [
        { label: 'Gross Revenue', value: '$142,850', change: '+28.4%', isPositive: true },
        { label: 'Avg Order Value', value: '$240.50', change: '+4.2%', isPositive: true },
        { label: 'Pending Orders', value: '48 Orders', change: '-12%', isPositive: true },
      ],
      listItems: [
        { name: 'Shopify Store Channel', qty: '$64,200 (450 Orders)', status: 'Sync Active', badgeBg: 'bg-blue-500/10 text-blue-400' },
        { name: 'Amazon Marketplace', qty: '$52,100 (380 Orders)', status: 'Sync Active', badgeBg: 'bg-blue-500/10 text-blue-400' },
        { name: 'B2B Wholesale Portal', qty: '$26,550 (24 Orders)', status: 'Sync Active', badgeBg: 'bg-blue-500/10 text-blue-400' },
      ],
      floatingWidget: {
        icon: TrendingUp,
        title: 'High Sales Volume',
        subtitle: 'Peak throughput detected +34%',
        color: 'text-emerald-500 bg-emerald-50',
      }
    },
    reports: {
      tag: 'AI Analytics & Forecasts',
      heading: 'Data-driven forecasting to maximize profit margins',
      metrics: [
        { label: 'Profit Margin', value: '34.2%', change: '+3.1%', isPositive: true },
        { label: 'Forecast Accuracy', value: '96.8%', change: '+1.4%', isPositive: true },
        { label: 'Carrying Costs', value: '$8,400', change: '-8.5%', isPositive: true },
      ],
      listItems: [
        { name: 'Q3 Demand Forecast Analysis', qty: '98% Confidence', status: 'Completed', badgeBg: 'bg-emerald-500/10 text-emerald-400' },
        { name: 'Supplier Lead Time Report', qty: 'Avg 4.2 Days', status: 'Updated', badgeBg: 'bg-blue-500/10 text-blue-400' },
        { name: 'Deadstock Minimization Insights', qty: '$12,400 Saved', status: 'Optimized', badgeBg: 'bg-emerald-500/10 text-emerald-400' },
      ],
      floatingWidget: {
        icon: BarChart3,
        title: 'Predictive Restock',
        subtitle: 'Optimal reorder date: July 30th',
        color: 'text-indigo-500 bg-indigo-50',
      }
    }
  };

  const currentView = tabContent[activeTab];

  return (
    <section className="py-20 md:py-32 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-blue-400 text-xs font-semibold uppercase tracking-wider">
            Interactive Product Preview
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Designed for ultimate <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-emerald-400 bg-clip-text text-transparent">
              operational clarity
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-400 font-normal">
            Switch between modules to explore how Stocklytics streamlines every phase of your inventory workflow.
          </p>
        </div>

        {/* Tab Navigation Switcher */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-800/80 border border-slate-700/80 backdrop-blur-md gap-1 max-w-full overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 whitespace-nowrap focus:outline-none ${
                    isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabGlow"
                      className="absolute inset-0 bg-blue-600 rounded-xl shadow-lg shadow-blue-600/30"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Showcase Canvas Card */}
        <div className="relative max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="rounded-2xl p-4 sm:p-6 bg-slate-800/60 border border-slate-700/80 shadow-2xl backdrop-blur-xl relative overflow-hidden"
            >
              {/* Window Header */}
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-700/60">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-900/80 text-xs font-mono text-slate-400">
                  <Layers className="w-3.5 h-3.5 text-blue-400" />
                  <span>stocklytics.com/app/{activeTab}</span>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
                  <RefreshCw className="w-3.5 h-3.5 text-emerald-400 animate-spin" style={{ animationDuration: '6s' }} />
                  Live Sync
                </div>
              </div>

              {/* View Content Layout */}
              <div className="space-y-6">
                
                {/* Module Heading */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">{currentView.tag}</span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">{currentView.heading}</h3>
                  </div>
                </div>

                {/* Metrics Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {currentView.metrics.map((metric, i) => (
                    <div key={i} className="p-4 rounded-xl bg-slate-900/60 border border-slate-700/50">
                      <p className="text-xs text-slate-400 font-medium">{metric.label}</p>
                      <div className="flex items-baseline justify-between mt-1">
                        <span className="text-2xl font-bold text-white">{metric.value}</span>
                        <span className={`inline-flex items-center text-xs font-semibold ${metric.isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {metric.isPositive ? <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> : <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />}
                          {metric.change}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Main Data Table Mockup */}
                <div className="rounded-xl bg-slate-900/80 border border-slate-700/50 overflow-hidden">
                  <div className="px-4 py-3 bg-slate-800/40 border-b border-slate-700/50 flex justify-between text-xs font-semibold text-slate-400">
                    <span>NAME / ITEM</span>
                    <span>METRIC / CAPACITY</span>
                    <span>STATUS</span>
                  </div>
                  <div className="divide-y divide-slate-800">
                    {currentView.listItems.map((item, idx) => (
                      <div key={idx} className="px-4 py-3.5 flex items-center justify-between text-sm hover:bg-slate-800/30 transition-colors">
                        <div className="flex items-center gap-2.5 font-medium text-slate-200">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>{item.name}</span>
                        </div>
                        <span className="text-slate-400 text-xs font-mono">{item.qty}</span>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${item.badgeBg}`}>
                          {item.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>

          {/* Floating Live Stat Card overlay */}
          <motion.div
            key={`floating-${activeTab}`}
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="absolute -bottom-6 -right-2 sm:-right-6 bg-white text-slate-900 p-4 rounded-2xl shadow-2xl border border-slate-200 flex items-center gap-3.5 z-20"
          >
            <div className={`p-3 rounded-xl ${currentView.floatingWidget.color}`}>
              {React.createElement(currentView.floatingWidget.icon, { className: 'w-6 h-6' })}
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">{currentView.floatingWidget.title}</p>
              <p className="text-xs text-slate-500 font-medium">{currentView.floatingWidget.subtitle}</p>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default ProductShowcase;