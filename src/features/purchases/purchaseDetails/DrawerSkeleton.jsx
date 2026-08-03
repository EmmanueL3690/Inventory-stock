import React from 'react';

const DrawerSkeleton = () => {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Cards Row Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="h-44 bg-slate-200 dark:bg-slate-800 rounded-xl" />
        <div className="h-44 bg-slate-200 dark:bg-slate-800 rounded-xl" />
      </div>

      {/* Items Table Skeleton */}
      <div className="space-y-3">
        <div className="h-6 w-32 bg-slate-200 dark:bg-slate-800 rounded" />
        <div className="h-48 bg-slate-200 dark:bg-slate-800 rounded-xl" />
      </div>

      {/* Notes Skeleton */}
      <div className="h-24 bg-slate-200 dark:bg-slate-800 rounded-xl" />
    </div>
  );
};

export default DrawerSkeleton;