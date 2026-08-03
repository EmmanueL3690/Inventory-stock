import React, { useState } from 'react';
import ReceiveItemsHeader from '../components/ReceiveItemsHeader';
import ReceivePurchaseCard from '../components/ReceivePurchaseCard';
import ReceiveItemsTable from '../components/ReceiveItemsTable';
import BatchPreviewCard from '../components/BatchPreviewCard';
import ReceiveSummaryCard from '../components/ReceiveSummaryCard';
import ReceiveActions from '../components/ReceiveActions';

const ReceiveItems = () => {
  // Local state purely for UI interactions and component communication
  const [selectedItems, setSelectedItems] = useState([]);
  const [batches, setBatches] = useState([]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 space-y-6 max-w-[1600px] mx-auto text-slate-900 dark:text-slate-100">
      
      {/* 1. Header */}
      <ReceiveItemsHeader />

      {/* 2. Purchase Details Card */}
      <ReceivePurchaseCard />

      {/* Main Content Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left Column (Main Focus) */}
        <div className="lg:col-span-2 space-y-6">
          {/* 3. Receive Items Table */}
          <ReceiveItemsTable 
            selectedItems={selectedItems} 
            setSelectedItems={setSelectedItems} 
          />

          {/* 4. Batch Preview Card */}
          <BatchPreviewCard batches={batches} />
        </div>

        {/* Right Column (Summary & Final Actions) */}
        <div className="space-y-6 lg:sticky lg:top-6">
          {/* 5. Summary Card */}
          <ReceiveSummaryCard selectedItems={selectedItems} />

          {/* 6. Actions Card */}
          <ReceiveActions />
        </div>

      </div>

    </div>
  );
};

export default ReceiveItems;