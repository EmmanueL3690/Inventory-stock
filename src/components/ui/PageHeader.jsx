import Button from "./Button";
import { cn } from "../../Lib/utils";

const PageHeader = ({ 
  title, 
  subtitle, 
  buttonText, 
  onButtonClick, 
  isLoading = false,
  className 
}) => {
  return (
    <div className={cn("flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8", className)}>
      
      {/* Text Content */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm text-slate-500 max-w-[600px]">
            {subtitle}
          </p>
        )}
      </div>

      {/* Action Area */}
      {buttonText && (
        <div className="flex items-center gap-3">
          <Button 
            onClick={onButtonClick} 
            isLoading={isLoading}
            variant="primary"
            className="shadow-md"
          >
            <span className="mr-2 text-lg">+</span>
            {buttonText}
          </Button>
        </div>
      )}
      
    </div>
  );
};

export default PageHeader;