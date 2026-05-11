import { cn } from "../../Lib/utils"; 

const Card = ({ children, className, hoverable = false }) => {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-slate-200 bg-white text-slate-950 shadow-sm",
        hoverable && "transition-all duration-200 hover:shadow-md hover:-translate-y-1",
        className
      )}
    >
      {children}
    </div>
  );
};

const CardHeader = ({ children, className }) => (
  <div className={cn("flex flex-col space-y-1.5 p-6", className)}>
    {children}
  </div>
);

const CardTitle = ({ children, className }) => (
  <h3 className={cn("text-2xl font-semibold leading-none tracking-tight", className)}>
    {children}
  </h3>
);

const CardContent = ({ children, className }) => (
  <div className={cn("p-6 pt-0", className)}>
    {children}
  </div>
);

const CardFooter = ({ children, className }) => (
  <div className={cn("flex items-center p-6 pt-0", className)}>
    {children}
  </div>
);

export  { Card, CardHeader, CardTitle, CardContent, CardFooter };