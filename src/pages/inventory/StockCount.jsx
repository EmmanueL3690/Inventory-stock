import React from 'react';
import useStockCount from '../../features/stockAdjustment/hooks/useStockCount';
import StockCountHeader from '../../features/stockAdjustment/components/StockCountHeader';
import StockCountOverviewCard from '../../features/stockAdjustment/components/StockCountOverviewCard';
import StockCountItemsTable from '../../features/stockAdjustment/components/StockCountItemsTable';
import StockCountSummaryPanels from '../../features/stockAdjustment/components/StockCountSummaryPanels';
import StockCountFooterActions from '../../features/stockAdjustment/components/StockCountFooterActions';

export default function StockCount() {
  const state = useStockCount();

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 xl:p-8 font-sans antialiased text-slate-900">
      <div className="max-w-[1600px] mx-auto space-y-6">
        
        {/* Top Breadcrumb and Action Control Row */}
        <StockCountHeader 
          overview={state.overview} 
          onComplete={state.handleCompleteCount} 
        />
        
        {/* Quick Parameters Tracker Info Row */}
        <StockCountOverviewCard 
          overview={state.overview} 
          metrics={state.summaryMetrics} 
        />
        
        {/* Main Workspace Two-Column Split Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 items-start">
          
          {/* Left / Center Content Column: Table + Notes Block */}
          <div className="xl:col-span-3 space-y-6 w-full min-w-0">
            <StockCountItemsTable 
              items={state.items} 
              searchQuery={state.searchQuery}
              onSearchChange={state.setSearchQuery}
              onQtyChange={state.handleQtyChange}
            />
            <StockCountFooterActions 
              noteText={state.noteText}
              onNoteChange={state.setNoteText}
            />
          </div>

          {/* Right Column Content Panel: Context Aggregators and Activity Logs */}
          <div className="xl:col-span-1 w-full">
            <StockCountSummaryPanels 
              metrics={state.summaryMetrics} 
              activities={state.activities} 
            />
          </div>

        </div>

      </div>
    </div>
  );
}