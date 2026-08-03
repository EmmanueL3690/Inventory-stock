import { motion } from "framer-motion";
import { Eye, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { TableCell } from "../../../components/ui/Table";
import StatusBadge from "../../../components/ui/StatusBadge";

import ActionDropdown from "./ActionDropdown";

const ProductRow = ({
  item,
  onEdit,
  onDelete,
  onArchive,
  onView,
}) => {
  const navigate = useNavigate();

  // Backend Compatibility
  const id = item?._id || item?.id;
  const stock = item?.totalStock ?? item?.stock ?? 0;

  const ProductIcon = item?.image;

  // Determine Status
  const status =
    item?.status ||
    (stock === 0
      ? "Out of Stock"
      : stock <= 5
      ? "Low Stock"
      : "In Stock");

  // Stock Badge Color
  const stockColor =
    stock === 0
      ? "bg-red-100 text-red-600"
      : stock <= 5
      ? "bg-orange-100 text-orange-600"
      : "bg-green-100 text-green-600";

  return (
    <motion.tr
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="hover:bg-slate-50 transition"
    >
      {/* Product */}
      <TableCell>
        <div className="flex items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-600 overflow-hidden">

            {ProductIcon ? (
              <ProductIcon
                size={22}
                strokeWidth={2}
              />
            ) : (
              <Package
                size={22}
                strokeWidth={2}
              />
            )}

          </div>

          <div className="flex flex-col">

            <span className="font-semibold text-slate-800">
              {item?.name || "Unnamed Product"}
            </span>

            <span className="text-xs text-slate-400">
              Product ID: #{id}
            </span>

          </div>

        </div>
      </TableCell>

      {/* SKU */}

      <TableCell className="font-medium text-slate-600">
        {item?.sku || "-"}
      </TableCell>

      {/* Category */}

      <TableCell>
        {item?.categoryId?.name || "-"}
      </TableCell>

      {/* Cost Price */}

      <TableCell className="font-medium">
        ₦{Number(item?.costPrice || 0).toLocaleString()}
      </TableCell>

      {/* Selling Price */}

      <TableCell className="font-semibold text-slate-800">
        ₦{Number(item?.sellingPrice || 0).toLocaleString()}
      </TableCell>

      {/* Stock */}

      <TableCell>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${stockColor}`}
        >
          {stock}
        </span>
      </TableCell>

      {/* Status */}

      <TableCell>
        <StatusBadge status={status} />
      </TableCell>

      {/* Actions */}

      <TableCell className="text-right">

        <div className="flex items-center justify-end gap-2">

          <button
            onClick={() => {
              onView
                ? onView(item)
                : navigate(`/inventory/products/${id}`);
            }}
            className="p-2 rounded-full hover:bg-slate-100 transition"
          >
            <Eye className="w-4 h-4 text-slate-500" />
          </button>

          <ActionDropdown
        onEdit={() =>
        onEdit
          ? onEdit(item)
          : navigate(`/inventory/products/${id}/edit`)
      }
            onDelete={() => onDelete?.(id)}
            onArchive={() => onArchive?.(id)}
            onView={() =>
              onView
                ? onView(item)
                : navigate(`/inventory/products/${id}`)
            }
          />

        </div>

      </TableCell>
    </motion.tr>
  );
};

export default ProductRow;