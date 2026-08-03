import React from 'react';

const SaleNotes = ({ value = '', onChange, maxLength = 500, placeholder = 'Add notes, payment terms, or delivery details...' }) => {
  const currentLength = value.length;
  const isNearLimit = currentLength >= maxLength * 0.9;
  const isAtLimit = currentLength >= maxLength;

  return (
    <div className="w-full space-y-1.5">
      <div className="flex justify-between items-center">
        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
          Notes / Remarks
        </label>
        <span
          className={`text-xs transition-colors ${
            isAtLimit
              ? 'text-red-500 font-semibold'
              : isNearLimit
              ? 'text-amber-500 font-medium'
              : 'text-gray-400 dark:text-gray-500'
          }`}
        >
          {currentLength} / {maxLength}
        </span>
      </div>

      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          maxLength={maxLength}
          rows={3}
          placeholder={placeholder}
          className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-y min-h-[80px]"
        />
      </div>
    </div>
  );
};

export default SaleNotes;