import React from 'react';
import { Calendar, MapPin, User, Hash } from 'lucide-react';

const AdjustmentSessionCard = ({ meta }) => {
  const sessionDetails = [
    { label: "Reference ID", value: meta.referenceId, icon: Hash },
    { label: "Location", value: meta.location, icon: MapPin },
    { label: "Date / Time", value: meta.date, icon: Calendar },
    { label: "Created By", value: meta.createdBy, icon: User },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
        Session Information
      </h4>
      
      <div className="space-y-3">
        {sessionDetails.map((detail, idx) => {
          const Icon = detail.icon;
          return (
            <div key={idx} className="flex items-start gap-3 text-xs">
              <Icon size={14} className="text-slate-400 mt-0.5 shrink-0" />
              <div className="space-y-0.5">
                <span className="text-slate-400 font-medium block">{detail.label}</span>
                <span className="text-slate-800 font-bold block">{detail.value}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdjustmentSessionCard;