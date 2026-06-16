import { useState } from "react"

import Breadcrumb from "../../components/ui/Breadcrumb"
import PageHeader from "../../components/ui/PageHeader"

import SearchBar from "../../features/inventory/components/SearchBar"
import CategoryTabs from "../../features/inventory/components/CategoryTabs"
import CategoryTable from "../../features/inventory/components/CategoryTable"

import AddCategoryModal from "../../features/inventory/components/AddCategoryModal"
import EditCategoryModal from "../../features/inventory/components/EditCategoryModal"

import { useCategories } from "../../features/inventory/hooks/useCategories"
import { useToast } from "../../components/ui/toast/ToastContext"

const Categories = () => {

  /* ---------------- FILTER STATE ---------------- */

  const [activeTab, setActiveTab] =
    useState("All Categories")

  const [search, setSearch] =
    useState("")

  /* ---------------- MODAL STATE ---------------- */

  const [isAddOpen, setIsAddOpen] =
    useState(false)

  const [isEditOpen, setIsEditOpen] =
    useState(false)

  const [selectedCategory, setSelectedCategory] =
    useState(null)

  /* ---------------- SHARED STATE ---------------- */

  const {
    categories,
    setCategories,
    filteredCategories,
  } = useCategories(activeTab, search)

  const { showToast } = useToast()

  /* ---------------- ADD CATEGORY ---------------- */

  const handleAddCategory = (newCategory) => {

    setCategories((prev) => [
      newCategory,
      ...prev,
    ])

    showToast("Category created successfully", "success")
    setIsAddOpen(false)
  }

  /* ---------------- OPEN EDIT ---------------- */

  const handleOpenEdit = (category) => {

    setSelectedCategory(category)
    setIsEditOpen(true)
  }

  /* ---------------- UPDATE CATEGORY ---------------- */

  const handleUpdateCategory = (updatedCategory) => {

    setCategories((prev) =>
      prev.map((item) =>
        item.id === updatedCategory.id
          ? updatedCategory
          : item
      )
    )

    showToast("Category updated successfully", "success")

    setIsEditOpen(false)
    setSelectedCategory(null)
  }

  /* ---------------- DELETE CATEGORY ---------------- */

  const handleDeleteCategory = (id) => {

    setCategories((prev) =>
      prev.filter((item) => item.id !== id)
    )

    showToast("Category deleted successfully", "error")
  }

  /* ---------------- ARCHIVE CATEGORY ---------------- */

  const handleArchiveCategory = (id) => {

    setCategories((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status: "Archived" }
          : item
      )
    )

    showToast("Category archived", "info")
  }

  /* ---------------- TABLE CONFIG ---------------- */

  const columns = [
    "Category Name",
    "Description",
    "Product Count",
    "Status",
    "Actions",
  ]

  const tabs = [
    "All Categories",
    "Active",
    "Inactive",
    "Archived",
  ]

  return (
    <div className="space-y-6 p-4 md:p-6 animate-in fade-in duration-500">

      {/* Breadcrumb */}
      <Breadcrumb items={["Inventory", "Categories"]} />

      {/* Header */}
      <PageHeader
        title="Product Categories"
        subtitle="Organize your store by grouping items into logical collections."
        buttonText="Add Category"
        onButtonClick={() => setIsAddOpen(true)}
      />

      {/* Search */}
      <SearchBar
        search={search}
        setSearch={setSearch}
        placeholder="Search categories..."
      />

      {/* Tabs */}
      <CategoryTabs
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Table */}
      <CategoryTable
        columns={columns}
        data={filteredCategories}
        onEdit={handleOpenEdit}
        onDelete={handleDeleteCategory}
        onArchive={handleArchiveCategory}
      />

      {/* Add Modal */}
      <AddCategoryModal
        open={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onAddCategory={handleAddCategory}
      />

      {/* Edit Modal */}
      <EditCategoryModal
        open={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        category={selectedCategory}
        onUpdateCategory={handleUpdateCategory}
      />

    </div>
  )
}

export default Categories