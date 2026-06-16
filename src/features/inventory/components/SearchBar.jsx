const SearchBar = ({
  search,
  setSearch,
  placeholder = "Search...",
}) => {

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

      <input
        type="text"
        placeholder={placeholder}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full md:w-72 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

    </div>
  )
}

export default SearchBar