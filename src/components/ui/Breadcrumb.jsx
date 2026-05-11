import { ChevronRight, Home } from "lucide-react";

const Breadcrumb = ({ items }) => (
  <nav className="flex items-center space-x-2 text-sm text-slate-500 mb-2">
    <Home className="w-4 h-4" />
    {items.map((item, index) => (
      <div key={item} className="flex items-center space-x-2">
        <ChevronRight className="w-4 h-4 text-slate-400" />
        <span className={index === items.length - 1 ? "font-medium text-slate-900" : ""}>
          {item}
        </span>
      </div>
    ))}
  </nav>
);

export default Breadcrumb;