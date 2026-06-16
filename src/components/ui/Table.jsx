import { cn } from "../../Lib/utils"

const Table = ({
  columns = [],
  data = [],
  renderRow,
  className,
}) => {

  return (

    <div className="relative w-full overflow-auto rounded-lg border border-slate-200">

      <table
        className={cn(
          "w-full caption-bottom text-sm",
          className
        )}
      >

        {/* HEADER */}
        <thead className="border-b border-slate-200 bg-slate-50/50">

          <tr>

            {columns.map((col,index)=>(

              <th
                key={index}
                className="h-12 px-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600"
              >
                {col.header || col}
              </th>

            ))}

          </tr>

        </thead>

        {/* BODY */}
        <tbody>

          {data?.length ? (

            data.map((item,index)=>{

              return renderRow(item,index)

            })

          ) : (

            <tr>

              <td
                colSpan={columns.length}
                className="h-24 text-center text-slate-500"
              >
                No results found
              </td>

            </tr>

          )}

        </tbody>

      </table>

    </div>

  )
}

const TableCell = ({
  children,
  className
}) => (

  <td
    className={cn(
      "p-4 align-middle",
      className
    )}
  >
    {children}
  </td>

)

export {
  Table,
  TableCell
}