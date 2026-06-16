const TextArea=({
...props
})=>{

return(

<textarea
{...props}
className="w-full rounded-lg border border-gray-300 p-4 outline-none focus:ring-2 focus:ring-blue-500"
/>

)

}

export default TextArea