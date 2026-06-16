import {
  ShoppingCart,
  ShoppingBag,
  TrendingUp,
  Receipt,
  DollarSign,
} from "lucide-react";

import ReportStatCard from "./ReportStatCard";

const ReportsStatsGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-4 md:gap-5 lg:gap-6 w-full">
      
      <ReportStatCard
        title="Total Sales"
        value="₦3,450,000"
        change="15.7%"
        icon={ShoppingCart}
        color="blue"
      />

      <ReportStatCard
        title="Total Purchases"
        value="₦2,450,000"
        change="12.6%"
        icon={ShoppingBag}
        color="slate"
      />

      <ReportStatCard
        title="Gross Profit"
        value="₦1,000,000"
        change="18.3%"
        icon={TrendingUp}
        color="emerald"
      />

      <ReportStatCard
        title="Total Expenses"
        value="₦350,000"
        change="-5.4%"
        icon={Receipt}
        color="rose"
      />

      <ReportStatCard
        title="Net Profit"
        value="₦650,000"
        change="22.1%"
        icon={DollarSign}
        color="amber"
      />
      
    </div>
  );
};

export default ReportsStatsGrid;