import { motion } from "framer-motion"
import { Eye } from "lucide-react"
import { useNavigate } from "react-router-dom"

import { TableCell } from "../../../components/ui/Table"
import StatusBadge from "../../../components/ui/StatusBadge"

import ActionDropdown from "./ActionDropdown"

const ProductRow = ({
  item,
  onEdit,
  onDelete,
  onArchive,
  onView,
}) => {
  const navigate = useNavigate()

  const ProductIcon = item.image

  /* ---------------- STOCK UI ---------------- */

  const stockColor =
    item.stock === 0
      ? "bg-red-100 text-red-600"
      : item.stock <= 5
      ? "bg-orange-100 text-orange-600"
      : "bg-green-100 text-green-600"

  return (

    <motion.tr
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="hover:bg-slate-50 transition"
    >

      {/* PRODUCT */}
      <TableCell>

        <div className="flex items-center gap-3">

          {/* PRODUCT IMAGE / ICON */}
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-600 overflow-hidden">

            {ProductIcon ? (

              <ProductIcon
                size={22}
                strokeWidth={2}
              />

            ) : (

              <span className="text-xs font-bold">
                P
              </span>

            )}

          </div>

          {/* PRODUCT INFO */}
          <div className="flex flex-col">

            <span className="font-semibold text-slate-800">
              {item.name}
            </span>

            <span className="text-xs text-slate-400">
              Product ID: #{item.id}
            </span>

          </div>

        </div>

      </TableCell>

      {/* SKU */}
      <TableCell className="font-medium text-slate-600">
        {item.sku}
      </TableCell>

      {/* CATEGORY */}
      <TableCell>
        {item.category}
      </TableCell>

      {/* COST PRICE */}
      <TableCell className="font-medium">
        ₦{(item.costPrice ?? 0).toLocaleString()}
      </TableCell>

      {/* SELLING PRICE */}
      <TableCell className="font-semibold text-slate-800">
        ₦{(item.sellingPrice ?? 0).toLocaleString()}
      </TableCell>

      {/* STOCK */}
      <TableCell>

        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${stockColor}`}
        >
          {item.stock}
        </span>

      </TableCell>

      {/* STATUS */}
      <TableCell>
        <StatusBadge status={item.status} />
      </TableCell>

      {/* ACTIONS */}
      <TableCell className="text-right">

        <div className="flex items-center justify-end gap-2">

          {/* VIEW DETAILS */}
          <button
            onClick={() =>
              navigate(`/inventory/products/${item.id}`)
            }
            className="p-2 rounded-full hover:bg-slate-100 transition"
          >
            <Eye className="w-4 h-4 text-slate-500" />
          </button>

          {/* ACTION DROPDOWN */}
         <ActionDropdown
          onEdit={() => onEdit?.(item)}
          onDelete={() => onDelete?.(item.id)}
          onArchive={() => onArchive?.(item.id)}
          onView={() =>
            navigate(`/inventory/products/${item.id}`)
          }
        />

        </div>

      </TableCell>

    </motion.tr>
  )
}

export default ProductRow