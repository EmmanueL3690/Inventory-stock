import React from 'react';
import { Eye, MoreVertical } from 'lucide-react';

const AlertActions = ({ onViewClick }) => {
  return (
    <div className="flex items-center justify-center gap-1.5" onClick={(e) => e.stopPropagation()}>
      <button 
        onClick={onViewClick}
        className="p-1.5 rounded-lg border border-slate-200 text-slate-500 bg-white hover:bg-slate-50 hover:text-slate-800 shadow-xs transition active:scale-95"
      >
        <Eye size={15} />
      </button>
      
      <button className="p-1.5 rounded-lg border border-slate-200 text-slate-500 bg-white hover:bg-slate-50 hover:text-slate-800 shadow-xs transition active:scale-95">
        <MoreVertical size={15} />
      </button>
    </div>
  );
};

export default AlertActions;