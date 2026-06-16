import SectionCard from "../../../../components/ui/SectionCard"

import {
Upload,
Image
}
from "lucide-react"

const ProductImageUpload=()=>{

return(

<SectionCard
title="Product Image"
icon={<Image size={18}/>}
>

<div
className="border-2 border-dashed rounded-xl p-8 flex flex-col items-center cursor-pointer"
>

<Upload
size={28}
/>

<p className="mt-2">

Click to upload

</p>

<p className="text-xs text-gray-400">

PNG,JPG up to 5MB

</p>

</div>

</SectionCard>

)

}

export default ProductImageUpload