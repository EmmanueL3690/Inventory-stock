import Breadcrumb from "../../../components/ui/Breadcrumb"

import EditProductForm from "../components/editProduct/EditProductForm"
import EditProductActions from "../components/editProduct/EditProductActions"
import { useEditProduct } from "../components/editProduct/useEditProduct"

const EditProduct = () => {
  const {
    formData,
    errors,
    handleChange,
    handleSave,
    handleCancel,
    categories,
    units,
    isLoading,
    isSubmitting,
    showSuccess,
    error,
  } = useEditProduct()

  console.log({ handleSave, handleCancel, isSubmitting }) // TEMP DEBUG — check 2

  return (
    <div className="space-y-6 p-4 md:p-6 animate-in fade-in">
      {/* ---------------- BREADCRUMB ---------------- */}
      <Breadcrumb items={["Inventory", "Products", "Edit Product"]} />

      {/* ---------------- ERROR BANNER ---------------- */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="max-w-3xl">
          <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6 text-sm text-gray-500 animate-in fade-in">
            Loading product...
          </div>
        </div>
      ) : (
        <>
          {/* ---------------- FORM ---------------- */}
          <div className="max-w-3xl">
            <EditProductForm
              formData={formData}
              errors={errors}
              handleChange={handleChange}
              categories={categories}
              units={units}
            />
          </div>

          {/* ---------------- ACTION BUTTONS ---------------- */}
          <div className="max-w-3xl">
            <EditProductActions
              handleSave={handleSave}
              handleCancel={handleCancel}
              isSubmitting={isSubmitting}
              showSuccess={showSuccess}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default EditProduct