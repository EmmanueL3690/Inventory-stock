const SectionCard = ({
title,
icon,
children
}) => {

return (

<div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">

<div className="flex items-center gap-2 mb-6">

<div className="text-blue-600">

{icon}

</div>

<h2 className="font-semibold text-gray-800">

{title}

</h2>

</div>

{children}

</div>

)

}

export default SectionCard