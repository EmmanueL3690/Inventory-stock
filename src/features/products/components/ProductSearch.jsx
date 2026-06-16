import { Search } from "lucide-react"

const ProductSearch = ({
  search,
  setSearch,
}) => {

  return (

    <div className="relative w-full md:w-80">

      {/* Search Icon */}

      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        size={18}
      />

      {/* Input */}

      <input
        type="text"
        placeholder="Search products..."

        value={search}

        onChange={(e) =>
          setSearch(e.target.value)
        }

        className="
          w-full
          rounded-xl
          border
          border-slate-200
          bg-white
          py-3
          pl-10
          pr-4
          text-sm
          outline-none
          transition
          focus:border-blue-500
          focus:ring-2
          focus:ring-blue-100
        "
      />

    </div>
  )
}

export default ProductSearch