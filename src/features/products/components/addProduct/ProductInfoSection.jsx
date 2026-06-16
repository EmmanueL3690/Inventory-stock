import SectionCard from "../../../../components/ui/SectionCard"
import { Field } from "../../../../components/ui/Field"
import TextInput from "../../../../components/ui/TextInput"
import Select from "../../../../components/ui/Select"

import {
Info,
Camera,
Plus
} from "lucide-react"

const ProductInfoSection=({
formData,
handleChange
})=>{

return(

<SectionCard
title="Product Information"
icon={<Info size={18}/>}
>

<div className="grid md:grid-cols-2 gap-4">

<Field
label="Product Name"
required
>

<TextInput
name="name"
value={formData.name}
onChange={handleChange}
placeholder="Enter product name"
/>

</Field>

<Field
label="SKU / Barcode"
required
>

<div className="flex gap-2">

<TextInput
name="sku"
value={formData.sku}
onChange={handleChange}
placeholder="Enter barcode"
/>

<button
className="w-11 h-11 border rounded-lg flex justify-center items-center"
>

<Camera size={18}/>

</button>

</div>

</Field>

<Field
label="Category"
required
>

<Select
name="category"
value={formData.category}
onChange={handleChange}
>

<option>Select category</option>

<option>Dairy</option>

<option>Bakery</option>

<option>Groceries</option>

</Select>

</Field>

<Field label="Sub Category">

<Select>

<option>Select sub category</option>

</Select>

</Field>

<Field label="Brand">

<TextInput
name="brand"
value={formData.brand}
onChange={handleChange}
placeholder="Enter brand"
/>

</Field>

<Field label="Supplier">

<div className="flex gap-2">

<Select>

<option>Select supplier</option>

</Select>

<button
className="w-11 h-11 border rounded-lg flex justify-center items-center"
>

<Plus size={18}/>

</button>

</div>

</Field>

</div>

</SectionCard>

)

}

export default ProductInfoSection