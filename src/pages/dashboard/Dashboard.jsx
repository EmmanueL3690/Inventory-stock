// src/pages/dashboard/Dashboard.jsx
import React from 'react';

// Import Feature Architecture Components
import { StatsGrid } from '../../features/dashboard/components/StatsGrid';
import { SalesTrendChart } from '../../features/dashboard/components/SalesTrendChart';
import { InventorySummary } from '../../features/dashboard/components/InventorySummary';
import { RecentSalesTable } from '../../features/dashboard/components/RecentSalesTable';
import { RecentAlerts } from '../../features/dashboard/components/RecentAlerts';

// Mock Data
import { mockDashboardData } from '../../features/dashboard/data/mockDashboard';

const Dashboard = () => {
  return (
    <div className="p-6 bg-[#f8fafc] min-h-screen space-y-6">
      
      {/* Welcome Banner Row */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Welcome back, John</h1>
        <p className="text-sm text-slate-500 mt-0.5">Here's what's happening with your business today.</p>
      </div>

      {/* Row 1: Stat Cards */}
      <StatsGrid stats={mockDashboardData.stats} />

      {/* Row 2: Charts Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SalesTrendChart data={mockDashboardData.salesTrend} />
        </div>
        <div>
          <InventorySummary summary={mockDashboardData.inventorySummary} />
        </div>
      </div>

      {/* Row 3: Data Arrays Tables / System Log */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentSalesTable sales={mockDashboardData.recentSales} />
        </div>
        <div>
          <RecentAlerts alerts={mockDashboardData.recentAlerts} />
        </div>
      </div>

    </div>
  );
};

export default Dashboard;