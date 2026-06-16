export const Field=({
label,
children,
required
})=>{

return(

<div className="space-y-2">

<label className="text-sm text-gray-700 font-medium">

{label}

{required && (

<span className="text-red-500">

*

</span>

)}

</label>

{children}

</div>

)

}