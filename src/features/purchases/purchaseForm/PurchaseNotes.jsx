import React from "react";
import { FileText } from "lucide-react";

const PurchaseNotes = ({
  notes = "",
  onChange,
  maxLength = 500,
}) => {

  const remainingCharacters =
    maxLength - notes.length;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-5">

      {/* Header */}

      <div className="flex items-center gap-2 mb-4">

        <FileText
          size={18}
          className="text-indigo-600"
        />

        <h3 className="text-sm font-semibold text-slate-800 dark:text-white">
          Purchase Notes
        </h3>

      </div>

      {/* Textarea */}

      <textarea
        rows={6}
        value={notes}
        onChange={(e) => onChange(e.target.value)}
        maxLength={maxLength}
        placeholder="Add any notes, supplier remarks, delivery instructions, invoice references, payment information or any other important details..."
        className="w-full resize-none rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-3 text-sm text-slate-700 dark:text-slate-200 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-900 outline-none transition"
      />

      {/* Footer */}

      <div className="mt-2 flex items-center justify-between">

        <p className="text-xs text-slate-500">
          Optional information for this purchase.
        </p>

        <span
          className={`text-xs font-medium ${
            remainingCharacters < 50
              ? "text-red-500"
              : "text-slate-500"
          }`}
        >
          {remainingCharacters} characters left
        </span>

      </div>

    </div>
  );
};

export default PurchaseNotes;