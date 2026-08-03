import React from "react"

/**
 * Shared field wrapper for the Edit Product form.
 *
 * Renders a label + input/select/number field + inline validation error,
 * using the same spacing/typography/border-radius/color tokens already
 * used across the Add Product form (rounded-lg borders, red-50/red-200/red-700
 * error styling, text-sm labels).
 *
 * Kept local to editProduct/ for now since we don't have a confirmed shared
 * <Input>/<Select> primitive to import without risking a broken build. If
 * Stocklytics has a components/ui/Input or components/ui/Select, swap the
 * <input>/<select> below for those and delete the inline classes.
 */
const baseFieldClasses =
  "w-full rounded-lg border px-3 py-2 text-sm text-gray-900 placeholder-gray-400 " +
  "transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-0 " +
  "disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed"

const normalBorder = "border-gray-300 focus:border-blue-500 focus:ring-blue-500/30"
const errorBorder = "border-red-300 focus:border-red-500 focus:ring-red-500/30"

const FormField = ({
  label,
  name,
  value,
  onChange,
  error,
  required = false,
  type = "text",
  as = "input", // "input" | "select"
  options = [], // for as="select" -> [{ value, label }]
  min,
  step,
  disabled = false,
  placeholder,
}) => {
  const fieldClasses = `${baseFieldClasses} ${error ? errorBorder : normalBorder}`

  return (
    <div className="space-y-1.5">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>

      {as === "select" ? (
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={fieldClasses}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${name}-error` : undefined}
        >
          <option value="">Select {label.toLowerCase()}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          min={min}
          step={step}
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder}
          className={fieldClasses}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${name}-error` : undefined}
        />
      )}

      {error && (
        <p id={`${name}-error`} className="text-xs text-red-600 animate-in fade-in">
          {error}
        </p>
      )}
    </div>
  )
}

export default FormField