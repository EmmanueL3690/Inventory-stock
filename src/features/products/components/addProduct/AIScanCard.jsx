import SectionCard from "../../../../components/ui/SectionCard"

import {
Sparkles,
Camera
}
from "lucide-react"

const AIScanCard=()=>{

return(

<SectionCard
title="AI Scan Product"
icon={<Sparkles size={18}/>}
>

<p className="text-sm text-gray-500 mb-4">

Scan barcode or image

</p>

<div
className="border-2 border-dashed rounded-xl p-8 flex flex-col items-center cursor-pointer"
>

<div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-3">

<Camera/>

</div>

<p className="font-medium">

Click to Scan

</p>

<p className="text-xs text-gray-400">

or drag image

</p>

</div>

</SectionCard>

)

}

export default AIScanCard