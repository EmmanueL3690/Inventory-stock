import React from "react";
import { Calendar, Download } from "lucide-react";

const ReportsHeader = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 w-full max-w-6xl mx-auto p-1">
      {/* Title and Subtitle Section */}
      <div className="max-w-xl">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
          Reports
        </h1>
        <p className="text-sm sm:text-base text-slate-500 mt-1 sm:mt-2 leading-relaxed">
          Analyze your business performance with detailed reports and insights.
        </p>
      </div>

      {/* Action Buttons Section */}
      <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
        <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-slate-200 px-5 py-3 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 active:bg-slate-100 transition-all shadow-sm">
          <Calendar size={18} className="text-slate-500 shrink-0" />
          <span>Schedule Reports</span>
        </button>

        <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-xl text-sm font-medium hover:bg-blue-700 active:bg-blue-800 transition-all shadow-sm shadow-blue-100">
          <Download size={18} className="shrink-0" />
          <span>Export Report</span>
        </button>
      </div>
    </div>
  );
};

export default ReportsHeader;