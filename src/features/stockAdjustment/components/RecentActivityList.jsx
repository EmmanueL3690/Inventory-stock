import React from 'react';
import { PlusCircle, FileText, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function RecentActivityList({ activities }) {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'created':
        return <PlusCircle className="w-3.5 h-3.5 text-blue-500" />;
      case 'variance':
        return <AlertCircle className="w-3.5 h-3.5 text-amber-500" />;
      case 'completed':
        return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />;
      default:
        return <FileText className="w-3.5 h-3.5 text-slate-400" />;
    }
  };

  return (
    <div className="relative border-l border-slate-100 pl-4 ml-2 space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="relative space-y-1">
          {/* Timeline bullet container housing contextual Lucide Icons */}
          <span className="absolute -left-[23px] top-0.5 bg-white rounded-full p-0.5 ring-4 ring-white border border-slate-100 flex items-center justify-center z-10">
            {getActivityIcon(activity.type)}
          </span>
          
          <p className="text-xs font-bold text-slate-700 leading-tight">
            {activity.message}
          </p>
          <div className="flex items-center gap-1 text-[10px] text-slate-400 font-medium">
            <span>{activity.timestamp}</span>
            <span>•</span>
            <span className="text-slate-500 font-semibold">{activity.user}</span>
          </div>
        </div>
      ))}
    </div>
  );
}