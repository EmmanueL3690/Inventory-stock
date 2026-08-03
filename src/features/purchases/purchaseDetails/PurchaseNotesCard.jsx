import React from 'react';
import { StickyNote } from 'lucide-react';

const PurchaseNotesCard = ({ notes = '' }) => {
  const hasNotes = notes && String(notes).trim().length > 0;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-3">
      {/* Card Header */}
      <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="p-1.5 bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800/60 rounded-md text-indigo-600 dark:text-indigo-400">
          <StickyNote className="w-4 h-4" />
        </div>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Notes
        </h3>
      </div>

      {/* Card Body */}
      <div className="text-xs">
        {hasNotes ? (
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
            {notes}
          </p>
        ) : (
          <p className="text-slate-400 dark:text-slate-500 italic">
            No notes available
          </p>
        )}
      </div>
    </div>
  );
};

export default PurchaseNotesCard;