import React from 'react';
import { ChevronDown } from 'lucide-react';
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const Select = ({ 
  options = [], 
  children, 
  value, 
  onChange, 
  className, 
  ...props 
}) => {
  return (
    <div className="relative inline-block w-full min-w-[140px]">
      <select
        value={value}
        onChange={onChange}
        className={cn(
          "w-full h-11 bg-white border border-slate-200 rounded-xl pl-4 pr-10 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:border-blue-500 transition-all cursor-pointer appearance-none",
          className
        )}
        {...props}
      >
        {/* Support both options array or manual option tags as children */}
        {options.length > 0 
          ? options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))
          : children}
      </select>
      
      {/* Absolute dropdown arrow symbol container matching the design layout */}
      <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-400">
        <ChevronDown size={16} />
      </div>
    </div>
  );
};

export default Select;