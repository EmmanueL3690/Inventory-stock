import React from "react";

const SalesHeader = () => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
          Sales
        </h1>
        <p className="text-sm sm:text-base text-slate-500 mt-1">
          Track and manage all your sales transactions.
        </p>
      </div>

      <div className="flex items-center gap-3 w-full sm:w-auto">
        <button className="flex-1 sm:flex-none justify-center inline-flex items-center px-5 py-2.5 text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:text-slate-900 active:scale-[0.98] transition-all focus:outline-none focus:ring-2 focus:ring-slate-200">
          {/* Optional: Add an export icon here */}
          Export
        </button>

        <button className="flex-1 sm:flex-none justify-center inline-flex items-center px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 active:scale-[0.98] transition-all shadow-sm shadow-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          <span>+ New Sale</span>
        </button>
      </div>
    </div>
  );
};

export default SalesHeader;