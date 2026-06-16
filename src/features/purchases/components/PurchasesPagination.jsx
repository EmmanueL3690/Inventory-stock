import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PurchasesPagination = ({ currentPage, totalPages, totalCount, onPageChange }) => {
  if (totalPages <= 1) return null;

  // Calculates contextual ranges to prevent indexing breakages
  const startRange = (currentPage - 1) * 7 + 1;
  const endRange = Math.min(currentPage * 7, totalCount);

  return (
    <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-100 pt-5 sm:flex-row w-full">
      {/* Current Range Label */}
      <div className="text-sm font-medium text-slate-500">
        Showing <span className="text-slate-800">{startRange}–{endRange}</span> of{" "}
        <span className="text-slate-800">{totalCount}</span> purchases
      </div>

      {/* Interactive Control Nodes */}
      <div className="flex items-center gap-1.5">
        <button
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white active:scale-95"
        >
          <ChevronLeft size={16} />
        </button>

        {Array.from({ length: totalPages }, (_, index) => {
          const pageNumber = index + 1;
          const isSelected = pageNumber === currentPage;

          return (
            <button
              key={pageNumber}
              onClick={() => onPageChange(pageNumber)}
              className={`flex h-9 w-9 items-center justify-center rounded-xl text-sm font-bold shadow-sm transition active:scale-95 ${
                isSelected
                  ? "bg-blue-600 text-white"
                  : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              {pageNumber}
            </button>
          );
        })}

        <button
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white active:scale-95"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default PurchasesPagination;