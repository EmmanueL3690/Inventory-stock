import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** * Utility to merge Tailwind classes safely (prevents style conflicts)
 */
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const Button = ({ 
  children, 
  variant = "primary", 
  size = "md", 
  isLoading = false, 
  disabled = false, 
  className,
  ...props 
}) => {
  
  // Base styles: Focus rings and disabled states are crucial for UI/UX
  const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]";

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-sm focus-visible:ring-blue-500",
    secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200 focus-visible:ring-slate-500",
    outline: "border border-slate-200 bg-transparent hover:bg-slate-50 text-slate-700",
    danger: "bg-red-500 text-white hover:bg-red-600 focus-visible:ring-red-500",
    ghost: "hover:bg-slate-100 text-slate-600",
  };

  const sizes = {
    sm: "h-8 px-3 text-xs",
    md: "h-10 px-4 py-2 text-sm",
    lg: "h-12 px-8 text-base",
  };

  return (
    <button
      disabled={isLoading || disabled}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;