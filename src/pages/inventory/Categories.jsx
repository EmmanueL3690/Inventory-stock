import { useState } from "react"
import { motion } from "framer-motion"
import { MoreVertical, Edit3 } from "lucide-react"

import { Card, CardContent } from "../../components/ui/Card"
import PageHeader from "../../components/ui/PageHeader"
import { Table, TableCell } from "../../components/ui/Table"
import StatusBadge from "../../components/ui/StatusBadge"
import Breadcrumb from "../../components/ui/Breadcrumb"
import Pagination from "../../components/ui/Pagination"

import { cn } from "../../Lib/utils"
import { categories } from "../../routes/data/mockData"

const Categories = () => {

  const [activeTab, setActiveTab] = useState("All Categories")
  const [search, setSearch] = useState("")

  const columns = [
    "Category Name",
    "Description",
    "Product Count",
    "Status",
    "Actions",
  ]

  const tabs = ["All Categories", "Active", "Inactive", "Archived"]

  /* ---------------- FILTER LOGIC ---------------- */

  const filteredCategories = categories.filter((item) => {

    const matchesTab =
      activeTab === "All Categories" ||
      item.status.toLowerCase() === activeTab.toLowerCase()

    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase())

    return matchesTab && matchesSearch
  })

  return (
    <div className="space-y-6 p-4 md:p-6 animate-in fade-in duration-500">

      {/* Breadcrumb */}
      <Breadcrumb items={["Inventory", "Categories"]} />

      {/* Page Header */}
      <PageHeader
        title="Product Categories"
        subtitle="Organize your store by grouping items into logical collections."
        buttonText="Add Category"
      />

      {/* Search */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <input
          type="text"
          placeholder="Search categories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-72 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

      </div>

      {/* Tabs */}
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

      {/* Card */}
      <Card className="border-none shadow-md">

        <CardContent className="p-0">

          {/* Responsive Table */}
          <div className="">

            <Table
              columns={columns}
              data={filteredCategories}
              renderRow={(item) => (

                <motion.tr
                  key={item.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className=""
                >

                  {/* Category Name */}
                  <TableCell className="font-semibold text-slate-900">

                    <div className="flex items-center gap-3">

                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                        {item.icon && <item.icon size={18} strokeWidth={2.5} />}
                      </div>

                      <div className="flex flex-col">
                        <span className="text-sm font-bold">{item.name}</span>
                        <span className="text-[10px] text-slate-400 uppercase">
                          ID: #{item.id}
                        </span>
                      </div>

                    </div>

                  </TableCell>

                  {/* Description */}
                  <TableCell className="text-slate-500 italic">
                    {item.description || "No description provided"}
                  </TableCell>

                  {/* Product Count */}
                  <TableCell>

                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-700">
                        {item.products}
                      </span>

                      <span className="text-[10px] uppercase text-slate-400">
                        Items linked
                      </span>
                    </div>

                  </TableCell>

                  {/* Status */}
                  <TableCell>
                    <StatusBadge status={item.status} />
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="text-right">

                    <div className="flex justify-end gap-2">

                      <button className="p-2 hover:bg-slate-100 rounded-full transition text-slate-400 hover:text-blue-600">
                        <Edit3 className="w-4 h-4" />
                      </button>

                      <button className="p-2 hover:bg-slate-100 rounded-full transition text-slate-400">
                        <MoreVertical className="w-4 h-4" />
                      </button>

                    </div>

                  </TableCell>

                </motion.tr>

              )}
            />

          </div>

          {/* Pagination */}
          <Pagination
            currentPage={1}
            totalPages={3}
          />

        </CardContent>

      </Card>

    </div>
  )
}

export default Categories