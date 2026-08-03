import React from 'react';

const Input = ({ 
  className = '', 
  icon: Icon, 
  ...props 
}) => {
  return (
    <div className="relative flex-1 max-w-sm">
      {Icon && (
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
          <Icon size={18} />
        </div>
      )}
      <input
        type="text"
        className={`w-full h-11 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all ${Icon ? 'pl-11 pr-4' : 'px-4'} ${className}`}
        {...props}
      />
    </div>
  );
};

export default Input;