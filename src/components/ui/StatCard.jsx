const StatCard = ({
  title,
  value,
  subtitle
}) => {

  return (

    <div className="bg-white rounded-xl border p-5">

      <p className="text-sm text-slate-500">
        {title}
      </p>

      <h3 className="text-2xl font-bold mt-2">
        {value}
      </h3>

      <p className="text-sm text-slate-400 mt-1">
        {subtitle}
      </p>

    </div>

  )
}

export default StatCard