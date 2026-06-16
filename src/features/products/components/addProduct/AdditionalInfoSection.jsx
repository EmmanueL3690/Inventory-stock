import SectionCard from "../../../../components/ui/SectionCard"
import { Field } from "../../../../components/ui/Field"
import TextArea from "../../../../components/ui/TextArea"

import { FileText } from "lucide-react"

const AdditionalInfoSection=({
formData,
handleChange
})=>{

return(

<SectionCard
title="Additional Information"
icon={<FileText size={18}/>}
>

<Field label="Description">

<TextArea

rows={4}

name="description"

value={formData.description}

onChange={handleChange}

placeholder="Enter description..."

/>

</Field>

<div className="text-xs text-gray-400 text-right mt-2">

{formData.description.length}/500

</div>

</SectionCard>

)

}

export default AdditionalInfoSection