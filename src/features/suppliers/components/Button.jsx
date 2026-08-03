import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  icon: Icon, 
  ...props 
}) => {
  const baseStyles = "flex items-center justify-center gap-2 font-semibold text-sm transition-all duration-200 rounded-xl px-4 py-2.5 h-11 active:scale-[0.98]";
  
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-600/10",
    secondary: "bg-white hover:bg-slate-50 text-slate-700 border border-slate-200",
    ghost: "bg-transparent hover:bg-slate-50 text-slate-500 hover:text-slate-700"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {Icon && <Icon size={18} className="shrink-0" />}
      {children}
    </button>
  );
};

export default Button;