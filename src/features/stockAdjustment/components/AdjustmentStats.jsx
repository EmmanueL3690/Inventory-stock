import React from 'react';
import { Package, PlusCircle, MinusCircle, Wallet, Percent } from 'lucide-react';
import AdjustmentStatCard from './AdjustmentStatCard';

const AdjustmentStats = ({ stats }) => {
  // Format math metrics gracefully to mirror UI parameters perfectly
  const formattedVarianceValue = `${stats.varianceValue >= 0 ? '' : '-'}${Math.abs(stats.varianceValue) === 0 ? '' : '₦'}${Math.abs(stats.varianceValue).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  const formattedVariancePercent = `${stats.varianceValue >= 0 ? '+' : ''}${stats.variancePercentage.toFixed(2)}%`;

  return (
    <div className="overflow-x-auto -mx-4 px-4 pb-2 sm:mx-0 sm:px-0 sm:pb-0 scrollbar-none">
      <div className="grid grid-cols-5 gap-4 min-w-[1000px] lg:min-w-0 w-full">
        
        <AdjustmentStatCard
          title="Total Items Counted"
          value={stats.totalItemsCounted.toLocaleString()}
          subtext="This session"
          icon={Package}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
        />

        <AdjustmentStatCard
          title="Positive Adjustments"
          value={`+${stats.positiveAdjustments.toLocaleString()}`}
          subtext="Items increased"
          icon={PlusCircle}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
          valueColor="text-emerald-600"
        />

        <AdjustmentStatCard
          title="Negative Adjustments"
          value={`-${stats.negativeAdjustments.toLocaleString()}`}
          subtext="Items decreased"
          icon={MinusCircle}
          iconBg="bg-rose-50"
          iconColor="text-rose-600"
          valueColor="text-rose-600"
        />

        <AdjustmentStatCard
          title="Variance Value"
          value={formattedVarianceValue}
          subtext="Total inventory variance"
          icon={Wallet}
          iconBg="bg-purple-50"
          iconColor="text-purple-600"
          valueColor={stats.varianceValue >= 0 ? 'text-emerald-600' : 'text-rose-600'}
        />

        <AdjustmentStatCard
          title="Variance Percentage"
          value={formattedVariancePercent}
          subtext="Vs system value"
          icon={Percent}
          iconBg="bg-amber-50"
          iconColor="text-amber-500"
          valueColor={stats.variancePercentage >= 0 ? 'text-emerald-600' : 'text-amber-500'}
        />

      </div>
    </div>
  );
};

export default AdjustmentStats;