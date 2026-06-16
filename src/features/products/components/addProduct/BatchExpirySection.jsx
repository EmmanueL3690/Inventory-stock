import SectionCard from "../../../../components/ui/SectionCard"
import { Field } from "../../../../components/ui/Field"
import TextInput from "../../../../components/ui/TextInput"

import { Diamond } from "lucide-react"

const BatchExpirySection = ({
formData,
handleChange
})=>{

return(

<SectionCard
title="Batch & Expiry"
icon={<Diamond size={18}/>}
>

<div className="grid md:grid-cols-3 gap-4">

<Field label="Batch Number">

<TextInput
name="batch"
value={formData.batch}
onChange={handleChange}
/>

</Field>

<Field label="Manufacturing Date">

<TextInput
type="date"
name="manufacturingDate"
value={formData.manufacturingDate}
onChange={handleChange}
/>

</Field>

<Field label="Expiry Date">

<TextInput
type="date"
name="expiryDate"
value={formData.expiryDate}
onChange={handleChange}
/>

</Field>

</div>

</SectionCard>

)

}

export default BatchExpirySection