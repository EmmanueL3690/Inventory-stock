import { useState } from "react"
import { useNavigate } from "react-router-dom"

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

const AddProduct = () => {

const navigate = useNavigate()

/* ---------------- FORM STATE ---------------- */

const [formData,setFormData]=useState({

name:"",
sku:"",
category:"",
brand:"",
supplier:"",

costPrice:"",
sellingPrice:"",

stock:"",
unit:"",
reorderLevel:"",

batch:"",
manufacturingDate:"",
expiryDate:"",

description:""

})

/* ---------------- INPUT CHANGE ---------------- */

const handleChange=(e)=>{

const {name,value}=e.target

setFormData((prev)=>({

...prev,

[name]:value

}))

}

/* ---------------- SAVE PRODUCT ---------------- */

const handleSave=()=>{

console.log("Saved Product:",formData)

/* later */

 // productService.addProduct(formData)

navigate("/inventory/products")

}

/* ---------------- SAVE + RESET ---------------- */

const handleSaveAndAddAnother=()=>{

console.log("Saved Product:",formData)

setFormData({

name:"",
sku:"",
category:"",
brand:"",
supplier:"",

costPrice:"",
sellingPrice:"",

stock:"",
unit:"",
reorderLevel:"",

batch:"",
manufacturingDate:"",
expiryDate:"",

description:""

})

}

/* ---------------- CANCEL ---------------- */

const handleCancel=()=>{

navigate("/inventory/products")

}

return(

<div className="space-y-6 p-4 md:p-6 animate-in fade-in">

{/* ---------------- BREADCRUMB ---------------- */}

<Breadcrumb
items={["Inventory","Products","Add Product"]}
/>

{/* ---------------- PAGE GRID ---------------- */}

<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

{/* LEFT COLUMN */}

<div className="lg:col-span-2 space-y-6">

<ProductInfoSection
formData={formData}
handleChange={handleChange}
/>

<PricingSection
formData={formData}
handleChange={handleChange}
/>

<InventorySection
formData={formData}
handleChange={handleChange}
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

<AIScanCard/>

<ProductImageUpload/>

<ProductPreview
formData={formData}
/>

</div>

</div>

{/* ---------------- ACTION BUTTONS ---------------- */}

<AddProductActions
handleSave={handleSave}
handleSaveAndAddAnother={handleSaveAndAddAnother}
handleCancel={handleCancel}
/>

</div>

)

}

export default AddProduct