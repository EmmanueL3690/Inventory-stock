import React from 'react';
import { Sparkles, ArrowUpRight, AlertTriangle, Cpu } from 'lucide-react';

const AIInsights = ({ product }) => {
  const insights = product?.aiInsights;
  const hasInsights = !!insights;

  // Determine styles for the risk analysis card
  const getRiskStyles = (risk) => {
    switch (risk?.toLowerCase()) {
      case 'high':
        return { bg: 'bg-rose-50', text: 'text-rose-600', border: 'border-rose-100/70' };
      case 'medium':
        return { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-100/70' };
      default:
        return { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-100/70' };
    }
  };

  const riskStyles = getRiskStyles(insights?.riskLevel);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6 space-y-4">
      {/* Header Panel Title Bar */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-purple-50 text-purple-600 rounded-lg">
            <Sparkles size={15} fill="currentColor" />
          </div>
          <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">AI Insights</h4>
        </div>
        {hasInsights && (
          <button className="text-xs font-bold text-blue-600 hover:text-blue-700 transition cursor-pointer">
            View all
          </button>
        )}
      </div>

      {!hasInsights ? (
        /* Professional Empty State Wrapper */
        <div className="flex flex-col items-center justify-center py-12 px-4 border border-dashed border-slate-200 rounded-xl bg-slate-50/30 text-center">
          <Cpu className="h-8 w-8 text-purple-300 mb-2.5 animate-pulse" />
          <h5 className="text-xs font-bold text-slate-700">AI Insights Coming Soon</h5>
          <p className="text-[11px] text-slate-400 max-w-xs mt-1 leading-relaxed">
            Advanced inventory intelligence will become available once the AI service is connected.
          </p>
        </div>
      ) : (
        /* Rendered Log Collection Pipeline dynamically mapped to schema fields */
        <div className="space-y-3">
          {/* Demand Forecast Insight */}
          {insights?.demandForecast && (
            <div className="p-3.5 border border-emerald-100/70 rounded-xl flex items-start gap-3 transition hover:bg-slate-50/50 duration-150">
              <div className="p-2 rounded-lg shrink-0 bg-emerald-50 text-emerald-600">
                <ArrowUpRight size={14} strokeWidth={2.5} />
              </div>
              <div className="pt-0.5 space-y-0.5">
                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider block">Demand Forecast</span>
                <p className="text-xs font-semibold text-slate-600 leading-relaxed">
                  {insights.demandForecast}
                </p>
              </div>
            </div>
          )}

          {/* Stock & Reorder Recommendation */}
          {(insights?.stockRecommendation || insights?.reorderSuggestion) && (
            <div className="p-3.5 border border-blue-100/70 rounded-xl flex items-start gap-3 transition hover:bg-slate-50/50 duration-150">
              <div className="p-2 rounded-lg shrink-0 bg-blue-50 text-blue-600">
                <Cpu size={14} strokeWidth={2.5} />
              </div>
              <div className="pt-0.5 space-y-0.5">
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block">Reorder Suggestion</span>
                <p className="text-xs font-semibold text-slate-600 leading-relaxed">
                  {insights.stockRecommendation || insights.reorderSuggestion}
                </p>
              </div>
            </div>
          )}

          {/* Pricing Suggestion */}
          {insights?.pricingSuggestion && (
            <div className="p-3.5 border border-purple-100/70 rounded-xl flex items-start gap-3 transition hover:bg-slate-50/50 duration-150">
              <div className="p-2 rounded-lg shrink-0 bg-purple-50 text-purple-600">
                <Sparkles size={14} strokeWidth={2.5} />
              </div>
              <div className="pt-0.5 space-y-0.5">
                <span className="text-[10px] font-bold text-purple-600 uppercase tracking-wider block">Pricing Recommendation</span>
                <p className="text-xs font-semibold text-slate-600 leading-relaxed">
                  {insights.pricingSuggestion}
                </p>
              </div>
            </div>
          )}

          {/* Risk Level Analysis */}
          {insights?.riskLevel && (
            <div className={`p-3.5 border rounded-xl flex items-start gap-3 transition hover:bg-slate-50/50 duration-150 ${riskStyle.border}`}>
              <div className={`p-2 rounded-lg shrink-0 ${riskStyle.bg} ${riskStyle.text}`}>
                <AlertTriangle size={14} strokeWidth={2.5} />
              </div>
              <div className="pt-0.5 space-y-0.5">
                <span className={`text-[10px] font-bold uppercase tracking-wider block ${riskStyle.text}`}>Risk Analysis</span>
                <p className="text-xs font-semibold text-slate-600 leading-relaxed">
                  Risk Assessment: {insights.riskLevel} Risk
                </p>
              </div>
            </div>
          )}

          {/* Confidence Score Badge */}
          {insights?.confidence !== undefined && (
            <div className="flex items-center justify-between bg-slate-50 border border-slate-100 px-3.5 py-2.5 rounded-xl">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">AI Accuracy Confidence</span>
              <span className="text-xs font-extrabold text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-md">
                {insights.confidence}%
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AIInsights;