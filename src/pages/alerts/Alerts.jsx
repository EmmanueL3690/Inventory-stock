import React from 'react';
import AlertsHeader from '../../features/alerts/components/AlertsHeader';
import AlertsStats from '../../features/alerts/components/AlertsStats';
import AlertsFilters from '../../features/alerts/components/AlertsFilters';
import AlertsTable from '../../features/alerts/components/AlertsTable';
import AlertsPagination from '../../features/alerts/components/AlertsPagination';
import AlertDetailsDrawer from '../../features/alerts/components/AlertDetailsDrawer';
import { useAlerts } from '../../features/alerts/hooks/useAlerts';

const Alerts = () => {
  const {
    alerts,
    totalCount,
    searchQuery,
    setSearchQuery,
    selectedType,
    setSelectedType,
    selectedStatus,
    setSelectedStatus,
    currentPage,
    setCurrentPage,
    totalPages,
    stats,
    markAllAsRead,
    selectedAlert,
    setSelectedAlert
  } = useAlerts();

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1600px] mx-auto antialiased">
      {/* Title block banner */}
      <AlertsHeader />

      {/* Metrics analytics layout section */}
      <AlertsStats stats={stats} />

      {/* Data tables card panel block container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6 space-y-6">
        <AlertsFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedType={selectedType}
          onTypeChange={setSelectedType}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          onMarkAllRead={markAllAsRead}
        />

        <AlertsTable 
          alerts={alerts} 
          onRowClick={(alert) => setSelectedAlert(alert)} 
        />

        <AlertsPagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalCount={totalCount}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Slide-out overlay context panel */}
      {selectedAlert && (
        <AlertDetailsDrawer
          alert={selectedAlert}
          onClose={() => setSelectedAlert(null)}
        />
      )}
    </div>
  );
};

export default Alerts;