import { useState } from "react"
import { categories as mockCategories } from "../data/mockCategories"
import { useToast } from "../../../components/ui/toast/ToastContext"

export const useCategories = (activeTab, search) => {

  /* ---------------- TOAST ---------------- */

  const { showToast } = useToast()

  /* ---------------- MAIN STATE ---------------- */

  const [categories, setCategories] =
    useState(mockCategories)

  /* ---------------- UI STATE ---------------- */

  const [selectedCategory, setSelectedCategory] =
    useState(null)

  const [isEditOpen, setIsEditOpen] =
    useState(false)

  /* ---------------- FILTERED DATA ---------------- */

  const filteredCategories = categories.filter((item) => {

    const matchesTab =
      activeTab === "All Categories" ||
      item.status.toLowerCase() === activeTab.toLowerCase()

    const matchesSearch =
      item.name.toLowerCase().toLowerCase().includes(search.toLowerCase())

    return matchesTab && matchesSearch
  })

  /* ---------------- CREATE ---------------- */

  const handleAddCategory = (newCategory) => {

    setCategories((prev) => [
      newCategory,
      ...prev,
    ])

    showToast("Category created successfully", "success")
  }

  /* ---------------- UPDATE ---------------- */

  const handleEditCategory = (updatedCategory) => {

    setCategories((prev) =>
      prev.map((category) =>
        category.id === updatedCategory.id
          ? updatedCategory
          : category
      )
    )

    showToast("Category updated successfully", "success")
  }

  /* ---------------- DELETE ---------------- */

  const handleDeleteCategory = (id) => {

    setCategories((prev) =>
      prev.filter((category) =>
        category.id !== id
      )
    )

    showToast("Category deleted successfully", "error")
  }

  /* ---------------- ARCHIVE ---------------- */

  const handleArchiveCategory = (id) => {

    setCategories((prev) =>
      prev.map((category) =>
        category.id === id
          ? {
              ...category,
              status: "Archived",
            }
          : category
      )
    )

    showToast("Category archived", "info")
  }

  /* ---------------- RETURN EVERYTHING ---------------- */

  return {

    /* data */
    categories,
    filteredCategories,

    /* state */
    setCategories,

    selectedCategory,
    setSelectedCategory,

    isEditOpen,
    setIsEditOpen,

    /* actions */
    handleAddCategory,
    handleEditCategory,
    handleDeleteCategory,
    handleArchiveCategory,
  }
}