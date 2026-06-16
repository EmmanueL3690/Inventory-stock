import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const AlertsPagination = ({ currentPage, totalPages, totalCount, onPageChange }) => {
  if (totalPages <= 1) return null;

  const itemsPerPage = 7;
  const startRange = (currentPage - 1) * itemsPerPage + 1;
  const endRange = Math.min(currentPage * itemsPerPage, totalCount);

  return (
    <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-100 pt-5 sm:flex-row w-full">
      {/* Dynamic Inventory Count Status Text */}
      <div className="text-sm font-medium text-slate-500">
        Showing <span className="text-slate-800 font-semibold">{startRange} to {endRange}</span> of{" "}
        <span className="text-slate-800 font-semibold">{totalCount}</span> alerts
      </div>

      {/* Control Nodes Navigation Block */}
      <div className="flex items-center gap-1.5 self-center sm:self-auto">
        {/* Previous Button Arrow Icon */}
        <button
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 shadow-xs transition hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white active:scale-95"
        >
          <ChevronLeft size={16} />
        </button>

        {/* Page Intermediary Blocks Mapping */}
        {Array.from({ length: totalPages }, (_, index) => {
          const pageNumber = index + 1;
          const isSelected = pageNumber === currentPage;

          // Standard responsive pagination truncation clip window
          if (totalPages > 5 && Math.abs(pageNumber - currentPage) > 1 && pageNumber !== 1 && pageNumber !== totalPages) {
            if (pageNumber === 2 || pageNumber === totalPages - 1) {
              return <span key={pageNumber} className="px-1.5 text-slate-400 text-xs font-bold">...</span>;
            }
            return null;
          }

          return (
            <button
              key={pageNumber}
              onClick={() => onPageChange(pageNumber)}
              className={`flex h-9 w-9 items-center justify-center rounded-xl text-sm font-bold shadow-xs transition active:scale-95 ${
                isSelected
                  ? "bg-blue-600 text-white"
                  : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              {pageNumber}
            </button>
          );
        })}

        {/* Text-Label Next Indicator Node */}
        <button
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="flex h-9 px-3 items-center justify-center gap-1 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-700 shadow-xs transition hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white active:scale-95"
        >
          <span>Next</span>
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
};

export default AlertsPagination;