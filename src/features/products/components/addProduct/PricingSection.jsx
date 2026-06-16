import SectionCard from "../../../../components/ui/SectionCard"
import { Field } from "../../../../components/ui/Field"
import TextInput from "../../../../components/ui/TextInput"

import { DollarSign } from "lucide-react"

const PricingSection=({
formData,
handleChange
})=>{

const profit=

formData.sellingPrice-
formData.costPrice || 0

return(

<SectionCard
title="Pricing"
icon={<DollarSign size={18}/>}
>

<div className="grid md:grid-cols-3 gap-4">

<Field label="Cost Price" required>

<TextInput
name="costPrice"
value={formData.costPrice}
onChange={handleChange}
/>

</Field>

<Field label="Selling Price" required>

<TextInput
name="sellingPrice"
value={formData.sellingPrice}
onChange={handleChange}
/>

</Field>

<div
className="bg-green-50 rounded-xl p-4 flex justify-between"
>

<div>

<div className="text-2xl font-bold text-green-600">

{profit}%

</div>

</div>

</div>

</div>

</SectionCard>

)

}

export default PricingSection