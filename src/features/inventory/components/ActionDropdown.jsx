import { useState, useRef, useEffect } from "react"

import {
  MoreVertical,
  Pencil,
  Trash2,
  Archive,
} from "lucide-react"

const ActionDropdown = ({
  onEdit,
  onDelete,
  onArchive,
}) => {

  const [open, setOpen] = useState(false)

  const dropdownRef = useRef(null)

  /* ---------------- CLOSE OUTSIDE ---------------- */

  useEffect(() => {

    const handleClickOutside = (event) => {

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false)
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    )

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      )
    }

  }, [])

  return (
    <div
      className="relative flex justify-end"
      ref={dropdownRef}
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

        <div className="absolute right-0 top-11 z-50 w-40 rounded-xl border border-slate-200 bg-white shadow-lg overflow-hidden animate-in fade-in zoom-in-95 duration-100">

          {/* Edit */}
          <button
            onClick={() => {
              onEdit()
              setOpen(false)
            }}
            className="flex items-center gap-3 w-full px-4 py-3 text-sm hover:bg-slate-50 transition"
          >
            <Pencil className="w-4 h-4 text-blue-500" />
            Edit
          </button>

          {/* Delete */}
          <button
            onClick={() => {
              onDelete()
              setOpen(false)
            }}
            className="flex items-center gap-3 w-full px-4 py-3 text-sm hover:bg-red-50 text-red-600 transition"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>

          {/* Archive */}
          <button
            onClick={() => {
              onArchive()
              setOpen(false)
            }}
            className="flex items-center gap-3 w-full px-4 py-3 text-sm hover:bg-slate-50 transition"
          >
            <Archive className="w-4 h-4 text-slate-500" />
            Archive
          </button>

        </div>

      )}

    </div>
  )
}

export default ActionDropdown