import React from "react";
import SalesHeader from "../../features/sales/components/SalesHeader";
import SalesStats from "../../features/sales/components/SalesStats";
import SalesFilters from "../../features/sales/components/SalesFilters";
import SalesTable from "../../features/sales/components/SalesTable";

const Sales = () => {
  return (
    <div className="space-y-6">
      <SalesHeader />

      <SalesStats />

      <SalesFilters />

      <SalesTable />
    </div>
  );
};

export default Sales;