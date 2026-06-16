import { motion } from "framer-motion"

import { TableCell } from "../../../components/ui/Table"
import StatusBadge from "../../../components/ui/StatusBadge"

import ActionDropdown from "./ActionDropdown"

const CategoryRow = ({
  item,
  onEdit,
  onDelete,
  onArchive,
}) => {

  return (
    <motion.tr
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >

      {/* Category Name */}
      <TableCell className="font-semibold text-slate-900">

        <div className="flex items-center gap-3">

          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
            {item.icon && (
              <item.icon size={18} strokeWidth={2.5} />
            )}
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-bold">
              {item.name}
            </span>
            <span className="text-[10px] text-slate-400 uppercase">
              ID: #{item.id}
            </span>
          </div>

        </div>

      </TableCell>

      {/* Description */}
      <TableCell className="text-slate-500 italic">
        {item.description || "No description provided"}
      </TableCell>

      {/* Product Count */}
      <TableCell>
        <div className="flex flex-col">
          <span className="text-sm font-bold text-slate-700">
            {item.products}
          </span>
          <span className="text-[10px] uppercase text-slate-400">
            Items linked
          </span>
        </div>
      </TableCell>

      {/* Status */}
      <TableCell>
        <StatusBadge status={item.status} />
      </TableCell>

      {/* Actions */}
      <TableCell className="text-right">

        <ActionDropdown
          onEdit={() => onEdit(item)}
          onDelete={() => onDelete(item.id)}
          onArchive={() => onArchive(item.id)}
        />

      </TableCell>

    </motion.tr>
  )
}

export default CategoryRow