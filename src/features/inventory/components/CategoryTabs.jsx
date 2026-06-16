import { cn } from "../../../Lib/utils"

const CategoryTabs = ({
  tabs,
  activeTab,
  setActiveTab,
}) => {

  return (
    <div className="flex gap-1 border-b border-slate-200 overflow-x-auto">

      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={cn(
            "px-4 py-2 text-sm font-medium transition-all relative whitespace-nowrap",
            activeTab === tab
              ? "text-blue-600 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-600"
              : "text-slate-500 hover:text-slate-700"
          )}
        >
          {tab}
        </button>
      ))}

    </div>
  )
}

export default CategoryTabs