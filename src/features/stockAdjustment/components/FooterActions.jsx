import React from 'react';
import { ClipboardEdit, CheckSquare, Loader2 } from 'lucide-react';

const FooterActions = ({ engine }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-20 bg-white border-t border-slate-200 shadow-xl backdrop-blur-md z-40 flex items-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1600px] w-full mx-auto flex items-center justify-between gap-4">
        
        {/* Left Side Cancel Action */}
        <button
          type="button"
          onClick={engine?.handleResetForm}
          disabled={engine?.isSubmitting}
          className="h-10 px-4 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50/50 transition active:scale-[0.98] cursor-pointer disabled:opacity-50"
        >
          Cancel Session
        </button>

        {/* Right Side Control Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={true}
            title="Save as Draft is not supported"
            className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-400 shadow-2xs opacity-60 cursor-not-allowed"
          >
            <ClipboardEdit size={14} className="text-slate-400" strokeWidth={2.5} />
            <span>Save as Draft</span>
          </button>

          <button
            type="button"
            onClick={engine?.handleSubmit}
            disabled={engine?.isSubmitting || !engine?.selectedProduct}
            className="inline-flex h-10 items-center gap-2 rounded-xl bg-blue-600 px-5 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition active:scale-[0.98] cursor-pointer disabled:opacity-50"
          >
            {engine?.isSubmitting ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <CheckSquare size={14} strokeWidth={2.5} />
                <span>Save Adjustment</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};

export default FooterActions;