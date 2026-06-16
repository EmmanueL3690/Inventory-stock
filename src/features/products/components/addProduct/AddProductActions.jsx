import Button from "../../../../components/ui/Button"

import {
Save
} from "lucide-react"

const AddProductActions = ({
handleSave,
handleSaveAndAddAnother,
handleCancel
}) => {

return (

<div className="flex justify-end gap-3 flex-wrap border-t pt-6">

<Button
variant="ghost"
onClick={handleCancel}
>
Cancel
</Button>

<Button
variant="outline"
onClick={handleSaveAndAddAnother}
>
Save & Add Another
</Button>

<Button
onClick={handleSave}
className="flex items-center gap-2"
>

<Save size={16}/>

Save Product

</Button>

</div>

)

}

export default AddProductActions