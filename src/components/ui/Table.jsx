import { cn } from "../../Lib/utils";

const Table = ({ columns, data, renderRow, className }) => {
  return (
    <div className="relative w-full overflow-auto rounded-lg border border-slate-200">
      <table className={cn("w-full caption-bottom text-sm", className)}>
        
        {/* Header Section */}
        <thead className="bg-slate-50/50 border-b border-slate-200">
          <tr className="transition-colors">
            {columns.map((col) => (
              <th
                key={col.header || col}
                className="h-12 px-4 text-left align-middle font-semibold text-slate-600 uppercase tracking-wider text-xs"
              >
                {col.header || col}
              </th>
            ))}
          </tr>
        </thead>

        {/* Body Section */}
        <tbody className="[&_tr:last-child]:border-0">
          {data.length > 0 ? (
            data.map((item, index) => (
              renderRow(item, index) 
            ))
          ) : (
            <tr>
              <td 
                colSpan={columns.length} 
                className="h-24 text-center text-slate-500 italic"
              >
                No results found.
              </td>
            </tr>
          )}
        </tbody>

      </table>
    </div>
  );
};

// Helper component for cells to keep padding consistent
const TableCell = ({ children, className }) => (
  <td className={cn("p-4 align-middle", className)}>
    {children}
  </td>
);

export { Table, TableCell };