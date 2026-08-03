import React from "react"

/**
 * Mirrors the primary/secondary button treatment used in AddProductActions
 * (rounded-lg, same padding/weight/colors). If AddProductActions imports a
 * shared <Button variant="primary|secondary"> component, prefer that instead
 * of the inline classes here to guarantee 1:1 visual parity.
 */
const EditProductActions = ({ handleSave, handleCancel, isSubmitting, showSuccess }) => {
  return (
    <div className="flex items-center justify-end gap-3 pt-2">
      {showSuccess && (
        <div
          className="flex items-center gap-2 text-sm font-medium text-green-600 animate-in fade-in"
          role="status"
        >
          {/* Success animation placeholder — Phase 2 can swap this span for a
              real check-circle animation once save is wired to the backend. */}
          <span className="inline-block h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          Changes saved
        </div>
      )}

      <button
        type="button"
        onClick={handleCancel}
        disabled={isSubmitting}
        className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-300
                   text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-150
                   disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Cancel
      </button>

      <button
        type="button"
        onClick={(e) => {
          console.log("Save button clicked") // TEMP DEBUG — check 3
          console.log(handleSave) // TEMP DEBUG — check 3

          if (typeof handleSave === "function") {
            handleSave(e)
          } else {
            console.error("handleSave is not a function", handleSave)
          }
        }}
        disabled={isSubmitting}
        className="px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 text-white
                   hover:bg-blue-700 transition-colors duration-150 inline-flex items-center gap-2
                   disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting && (
          <span
            className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin"
            aria-hidden="true"
          />
        )}
        {isSubmitting ? "Saving..." : "Save Changes"}
      </button>
    </div>
  )
}

export default EditProductActions