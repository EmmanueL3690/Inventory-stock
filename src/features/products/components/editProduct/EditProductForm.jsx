import React from "react"
import FormField from "./FormField"

/**
 * Matches the card styling used by Add Product's section components
 * (white surface, rounded-xl, border, consistent internal padding/gap).
 * If Add Product's sections import a shared <Card>/<SectionCard> wrapper,
 * swap the outer <div> below for that to stay pixel-identical.
 */
const EditProductForm = ({ formData, errors, handleChange, categories, units }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6 space-y-5 animate-in fade-in">
      <div>
        <h2 className="text-base font-semibold text-gray-900">Product Details</h2>
        <p className="text-sm text-gray-500 mt-0.5">
          Update the information below and save your changes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="Product Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          required
          placeholder="e.g. Wireless Mouse M185"
        />

        <FormField
          label="SKU"
          name="sku"
          value={formData.sku}
          onChange={handleChange}
          error={errors.sku}
          required
          placeholder="e.g. WM-185-BLK"
        />

        <FormField
          label="Category"
          name="categoryId"
          as="select"
          value={formData.categoryId}
          onChange={handleChange}
          error={errors.categoryId}
          options={categories}
          required
        />

        <FormField
          label="Unit"
          name="unitId"
          as="select"
          value={formData.unitId}
          onChange={handleChange}
          error={errors.unitId}
          options={units}
          required
        />

        <FormField
          label="Cost Price"
          name="costPrice"
          type="number"
          min="0"
          step="0.01"
          value={formData.costPrice}
          onChange={handleChange}
          error={errors.costPrice}
          placeholder="0.00"
        />

        <FormField
          label="Selling Price"
          name="sellingPrice"
          type="number"
          min="0"
          step="0.01"
          value={formData.sellingPrice}
          onChange={handleChange}
          error={errors.sellingPrice}
          placeholder="0.00"
        />

        <FormField
          label="Reorder Level"
          name="reorderLevel"
          type="number"
          min="0"
          step="1"
          value={formData.reorderLevel}
          onChange={handleChange}
          error={errors.reorderLevel}
          placeholder="0"
        />
      </div>
    </div>
  )
}

export default EditProductForm