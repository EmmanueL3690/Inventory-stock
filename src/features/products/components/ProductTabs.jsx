import { cn }
from "../../../Lib/utils"

const ProductTabs = ({
  tabs,
  activeTab,
  setActiveTab,
}) => {

  return (

    <div className="overflow-x-auto border-b border-slate-200">

      <div className="flex gap-1 min-w-max">

        {tabs.map((tab) => (

          <button
            key={tab}

            onClick={() =>
              setActiveTab(tab)
            }

            className={cn(

              `
              relative
              whitespace-nowrap
              px-4
              py-3
              text-sm
              font-medium
              transition-all
              `,

              activeTab === tab

                ? `
                  text-blue-600

                  after:absolute
                  after:bottom-0
                  after:left-0
                  after:right-0
                  after:h-0.5
                  after:bg-blue-600
                `

                : `
                  text-slate-500
                  hover:text-slate-700
                `
            )}
          >

            {tab}

          </button>

        ))}

      </div>

    </div>
  )
}

export default ProductTabs