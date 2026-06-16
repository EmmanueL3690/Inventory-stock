const Select=({
children,
...props
})=>{

return(

<select
{...props}
className="w-full h-11 px-4 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
>

{children}

</select>

)

}

export default Select