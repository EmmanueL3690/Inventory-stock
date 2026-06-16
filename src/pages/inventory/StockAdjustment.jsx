import React from 'react';
import { useAdjustments } from '../../features/stockAdjustment/hooks/useAdjustments';
import AdjustmentHeader from '../../features/stockAdjustment/components/AdjustmentHeader';
import AdjustmentStats from '../../features/stockAdjustment/components/AdjustmentStats';
import AdjustmentFilters from '../../features/stockAdjustment/components/AdjustmentFilters';
import AdjustmentTable from '../../features/stockAdjustment/components/AdjustmentTable';
import AdjustmentSessionCard from '../../features/stockAdjustment/components/AdjustmentSessionCard';
import AIInsightsCard from '../../features/stockAdjustment/components/AIInsightsCard';
import SummaryCard from '../../features/stockAdjustment/components/SummaryCard';
import FooterActions from '../../features/stockAdjustment/components/FooterActions';

const StockAdjustment = () => {
  const engine = useAdjustments();

  return (
    <div className="min-h-screen bg-slate-50/50 pb-28 antialiased selection:bg-blue-500 selection:text-white">
      <div className="max-w-[1600px] mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        
        {/* Breadcrumb Navigation and Action Control Bar Row */}
        <AdjustmentHeader referenceId={engine.sessionMeta.referenceId} />

        {/* Dashboard Metric Aggregates Row */}
        <AdjustmentStats stats={engine.stats} />

        {/* Workspace Layout Grid Shell Splitter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Main Datagrid Operations Panel Area Column */}
          <div className="lg:col-span-8 xl:col-span-9 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
            <AdjustmentFilters engine={engine} />
            <AdjustmentTable engine={engine} />
          </div>

          {/* Contextual Side Panel Column Container Stack */}
          <div className="lg:col-span-4 xl:col-span-3 space-y-6">
            <AdjustmentSessionCard meta={engine.sessionMeta} />
            <AIInsightsCard insights={engine.aiInsights} />
            <SummaryCard stats={engine.stats} items={engine.allItemsRaw} />
          </div>

        </div>
      </div>

      {/* Sticky Bottom Operational Command Center Bar */}
      <FooterActions />
    </div>
  );
};

export default StockAdjustment;