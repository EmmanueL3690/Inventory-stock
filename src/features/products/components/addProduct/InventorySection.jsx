import SectionCard from "../../../../components/ui/SectionCard"
import { Field } from "../../../../components/ui/Field"
import TextInput from "../../../../components/ui/TextInput"
import Select from "../../../../components/ui/Select"

import { Package } from "lucide-react"

const InventorySection = ({
  formData,
  handleChange
}) => {

return (

<SectionCard
title="Inventory"
icon={<Package size={18}/>}
>

<div className="grid md:grid-cols-3 gap-4">

<Field
label="Initial Stock"
required
>

<TextInput
name="stock"
value={formData.stock}
onChange={handleChange}
type="number"
/>

</Field>

<Field label="Unit">

<Select
name="unit"
value={formData.unit}
onChange={handleChange}
>

<option>Select unit</option>
<option>Bottle</option>
<option>Pack</option>
<option>Piece</option>

</Select>

</Field>

<Field label="Reorder Level">

<TextInput
name="reorderLevel"
value={formData.reorderLevel}
onChange={handleChange}
type="number"
/>

</Field>

<Field
label="Location / Warehouse"
className="md:col-span-2"
>

<Select>

<option>Select warehouse</option>

</Select>

</Field>

<div className="flex items-end">

<label className="flex gap-2">

<input
type="checkbox"
defaultChecked
/>

Track stock

</label>

</div>

</div>

</SectionCard>

)

}

export default InventorySection