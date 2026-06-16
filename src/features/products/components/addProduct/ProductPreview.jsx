import SectionCard from "../../../../components/ui/SectionCard"

import {
Eye,
Package
}
from "lucide-react"

const ProductPreview=({
formData
})=>{

return(

<SectionCard
title="Product Preview"
icon={<Eye size={18}/>}
>

<div className="flex gap-4">

<div
className="w-20 h-20 bg-gray-100 rounded-lg flex justify-center items-center"
>

<Package/>

</div>

<div className="space-y-2 text-sm">

<p>

<strong>Name:</strong>

{formData.name || "-"}

</p>

<p>

<strong>SKU:</strong>

{formData.sku || "-"}

</p>

<p>

<strong>Category:</strong>

{formData.category || "-"}

</p>

<p>

<strong>Price:</strong>

₦{formData.sellingPrice || 0}

</p>

<p>

<strong>Stock:</strong>

{formData.stock || 0}

</p>

</div>

</div>

<div
className="mt-4 bg-green-100 px-3 py-1 rounded-full w-fit text-green-700 text-sm"
>

Active

</div>

</SectionCard>

)

}

export default ProductPreview