import { useEffect, useRef, useState } from "react"

import {
  MoreVertical,
  Pencil,
  Trash2,
  Archive,
  Eye,
} from "lucide-react"

const ActionDropdown = ({
  onEdit,
  onDelete,
  onArchive,
  onView,
}) => {

  const [open, setOpen] = useState(false)

  const dropdownRef = useRef(null)

  /* ---------------- CLOSE WHEN CLICK OUTSIDE ---------------- */

  useEffect(() => {

    const handleOutsideClick = (event) => {

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false)
      }
    }

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    )

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      )
    }

  }, [])

  return (

    <div
      ref={dropdownRef}
      className="relative flex justify-end"
    >

      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-full hover:bg-slate-100 transition"
      >
        <MoreVertical className="w-4 h-4 text-slate-500" />
      </button>

      {/* Dropdown */}
      {open && (

        <div className="absolute right-0 top-11 z-50 w-44 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">

          {/* View */}
          <button
            onClick={() => {
              onView?.()
              setOpen(false)
            }}
            className="flex w-full items-center gap-3 px-4 py-3 text-sm hover:bg-slate-50 transition"
          >
            <Eye className="w-4 h-4 text-slate-500" />
            View Details
          </button>

          {/* Edit */}
          <button
            onClick={() => {
              onEdit?.()
              setOpen(false)
            }}
            className="flex w-full items-center gap-3 px-4 py-3 text-sm hover:bg-slate-50 transition"
          >
            <Pencil className="w-4 h-4 text-blue-500" />
            Edit
          </button>

          {/* Archive */}
          <button
            onClick={() => {
              onArchive?.()
              setOpen(false)
            }}
            className="flex w-full items-center gap-3 px-4 py-3 text-sm hover:bg-slate-50 transition"
          >
            <Archive className="w-4 h-4 text-orange-500" />
            Archive
          </button>

          {/* Delete */}
          <button
            onClick={() => {
              onDelete?.()
              setOpen(false)
            }}
            className="flex w-full items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>

        </div>

      )}

    </div>
  )
}

export default ActionDropdown