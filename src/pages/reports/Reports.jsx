import ReportsHeader from "../../features/reports/components/ReportsHeader";
import ReportsStatsGrid from "../../features/reports/components/stats/ReportsStatsGrid";
import ReportsFilters from "../../features/reports/components/filters/ReportsFilters";
import SalesOverviewChart from "../../features/reports/components/charts/SalesOverviewChart";
import SalesCategoryChart from "../../features/reports/components/charts/SalesCategoryChart";
import TopSellingProductsTable from "../../features/reports/components/tables/TopSellingProductsTable";
import SalesSummaryCard from "../../features/reports/components/tables/SalesSummaryCard";

const Reports = () => {
  return (
    <div className="space-y-6">
      <ReportsHeader />

      <ReportsStatsGrid />

      <ReportsFilters />

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-8">
          <SalesOverviewChart />
        </div>

        <div className="col-span-4">
          <SalesCategoryChart />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-7">
          <TopSellingProductsTable />
        </div>

        <div className="col-span-5">
          <SalesSummaryCard />
        </div>
      </div>
    </div>
  );
};

export default Reports;