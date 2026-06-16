import { useEffect, useState } from "react"

const EditCategoryModal = ({
  open,
  onClose,
  category,
  onUpdateCategory,
}) => {

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    products: 0,
    status: "Active",
  })

  /* ---------------- LOAD CATEGORY ---------------- */

  useEffect(() => {

    if (category) {
      setFormData(category)
    }

  }, [category])

  if (!open || !category) return null

  /* ---------------- HANDLE CHANGE ---------------- */

  const handleChange = (e) => {

    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  /* ---------------- HANDLE UPDATE ---------------- */

  const handleSubmit = (e) => {

    e.preventDefault()

    onUpdateCategory(formData)

    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

      <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl animate-in fade-in zoom-in-95 duration-200">

        {/* Header */}
        <div className="border-b px-6 py-4">

          <h2 className="text-xl font-bold text-slate-800">
            Edit Category
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Update category information.
          </p>

        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4 p-6"
        >

          {/* Name */}
          <div>

            <label className="text-sm font-medium text-slate-700">
              Category Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          {/* Description */}
          <div>

            <label className="text-sm font-medium text-slate-700">
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="mt-1 w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          {/* Status */}
          <div>

            <label className="text-sm font-medium text-slate-700">
              Status
            </label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >

              <option value="Active">
                Active
              </option>

              <option value="Inactive">
                Inactive
              </option>

              <option value="Archived">
                Archived
              </option>

            </select>

          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Save Changes
            </button>

          </div>

        </form>

      </div>

    </div>
  )
}

export default EditCategoryModal