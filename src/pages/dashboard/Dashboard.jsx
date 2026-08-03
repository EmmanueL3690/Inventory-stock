import React from "react";

// Dashboard Components
import { StatsGrid } from "../../features/dashboard/components/StatsGrid";
import { SalesTrendChart } from "../../features/dashboard/components/SalesTrendChart";
import { InventorySummary } from "../../features/dashboard/components/InventorySummary";
import { RecentSalesTable } from "../../features/dashboard/components/RecentSalesTable";
import { RecentAlerts } from "../../features/dashboard/components/RecentAlerts";

// Dashboard Hook
import { useDashboard } from "../../features/dashboard/hooks/useDashboard";

const Dashboard = () => {
  const {
    dashboardData,
    loading,
    error,
    refetchDashboard,
  } = useDashboard();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#f8fafc]">
        <div className="flex flex-col items-center gap-4">

          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>

          <p className="text-slate-600 font-medium">
            Loading Dashboard...
          </p>

        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#f8fafc]">

        <div className="bg-white rounded-xl shadow-lg border border-red-200 p-8 max-w-md text-center">

          <h2 className="text-xl font-bold text-red-600">
            Something went wrong
          </h2>

          <p className="text-slate-500 mt-3">
            {error}
          </p>

          <button
            onClick={refetchDashboard}
            className="mt-6 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Try Again
          </button>

        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 space-y-6">

      {/* Welcome Banner */}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

        <div className="flex items-center justify-between">

          <div>

            <h1 className="text-3xl font-bold text-slate-900">
              Welcome back 👋
            </h1>

            <p className="text-slate-500 mt-1">
              Here's what's happening with your business today.
            </p>

          </div>

          <button
            onClick={refetchDashboard}
            className="px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-100 text-sm font-medium transition"
          >
            Refresh
          </button>

        </div>

      </div>

      {/* KPI Cards */}

      <StatsGrid stats={dashboardData} />

      {/* Charts */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <div className="lg:col-span-2">

          <SalesTrendChart
            data={dashboardData}
          />

        </div>

        <InventorySummary
          summary={dashboardData}
        />

      </div>

      {/* Bottom Section */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <div className="lg:col-span-2">

          <RecentSalesTable
            sales={dashboardData?.recents?.sales || []}
          />

        </div>

        <RecentAlerts
          alerts={dashboardData}
        />

      </div>

    </div>
  );
};

export default Dashboard;