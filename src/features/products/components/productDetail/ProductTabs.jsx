import React from 'react';

const ProductTabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="border-b border-slate-200 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none">
      <div className="flex space-x-8 min-w-max">
        {tabs.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 text-sm font-bold border-b-2 transition duration-150 relative cursor-pointer outline-none whitespace-nowrap ${
                isActive
                  ? "border-blue-600 text-blue-600 font-extrabold"
                  : "border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300"
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ProductTabs;