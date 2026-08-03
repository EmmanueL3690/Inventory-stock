import Breadcrumb from "../../../components/ui/Breadcrumb"

import ProductInfoSection from "../components/addProduct/ProductInfoSection"
import PricingSection from "../components/addProduct/PricingSection"
import InventorySection from "../components/addProduct/InventorySection"
import BatchExpirySection from "../components/addProduct/BatchExpirySection"
import AdditionalInfoSection from "../components/addProduct/AdditionalInfoSection"

import AIScanCard from "../components/addProduct/AIScanCard"
import ProductImageUpload from "../components/addProduct/ProductImageUpload"
import ProductPreview from "../components/addProduct/ProductPreview"

import AddProductActions from "../components/addProduct/AddProductActions"
import { useAddProduct } from "../components/addProduct/useAddProduct" 

const AddProduct = () => {
  const {
    formData,
    handleChange,
    handleSave,
    handleSaveAndAddAnother,
    handleCancel,
    categories,
    units,
    loadingMetadata,
    isSubmitting,
    error,
  } = useAddProduct()

  return (
    <div className="space-y-6 p-4 md:p-6 animate-in fade-in">
      
      {/* ---------------- BREADCRUMB ---------------- */}
      <Breadcrumb items={["Inventory", "Products", "Add Product"]} />

      {/* ---------------- ERROR BANNER (BACKEND MESSAGE) ---------------- */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* ---------------- PAGE GRID ---------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-6">
          
          <ProductInfoSection
            formData={formData}
            handleChange={handleChange}
            categories={categories} // Injected options list
            isLoading={loadingMetadata}
          />

          <PricingSection
            formData={formData}
            handleChange={handleChange}
          />

          <InventorySection
            formData={formData}
            handleChange={handleChange}
            units={units} // Injected options list
            isLoading={loadingMetadata}
          />

          <BatchExpirySection
            formData={formData}
            handleChange={handleChange}
          />

          <AdditionalInfoSection
            formData={formData}
            handleChange={handleChange}
          />
          
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          <AIScanCard />
          <ProductImageUpload />
          <ProductPreview formData={formData} />
        </div>

      </div>

      {/* ---------------- ACTION BUTTONS ---------------- */}
      <AddProductActions
        handleSave={handleSave}
        handleSaveAndAddAnother={handleSaveAndAddAnother}
        handleCancel={handleCancel}
        isSubmitting={isSubmitting} // Connect to disable/spinner states inside UI actions
      />
      
    </div>
  )
}

export default AddProduct