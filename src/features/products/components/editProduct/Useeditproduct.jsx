import { useState, useEffect, useCallback } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { productService } from "../../../../routes/services/productService";


const REQUIRED_FIELDS = ["name", "sku", "categoryId", "unitId"]
const NON_NEGATIVE_FIELDS = ["costPrice", "sellingPrice", "reorderLevel"]

const FIELD_LABELS = {
  name: "Product name",
  sku: "SKU",
  categoryId: "Category",
  unitId: "Unit",
  costPrice: "Cost price",
  sellingPrice: "Selling price",
  reorderLevel: "Reorder level",
}

const EMPTY_FORM = {
  name: "",
  sku: "",
  categoryId: "",
  unitId: "",
  costPrice: "",
  sellingPrice: "",
  reorderLevel: "",
}

// Backend may return categoryId/unitId as a plain string id, or as a
// populated object like { _id, name }. Always resolve down to the id.
function normalizeRefId(value) {
  if (value && typeof value === "object") {
    return value._id ?? value.id ?? ""
  }
  return value ?? ""
}

function normalizeOptions(list) {
  return (list ?? []).map((item) => ({
    value: item._id ?? item.id,
    label: item.name,
  }))
}

function validate(formData) {
  const errors = {}

  REQUIRED_FIELDS.forEach((field) => {
    if (!String(formData[field] ?? "").trim()) {
      errors[field] = `${FIELD_LABELS[field]} is required.`
    }
  })

  NON_NEGATIVE_FIELDS.forEach((field) => {
    const raw = formData[field]
    if (raw === "" || raw === null || raw === undefined) {
      errors[field] = `${FIELD_LABELS[field]} is required.`
      return
    }
    const numeric = Number(raw)
    if (Number.isNaN(numeric)) {
      errors[field] = `${FIELD_LABELS[field]} must be a number.`
    } else if (numeric < 0) {
      errors[field] = `${FIELD_LABELS[field]} must be 0 or greater.`
    }
  })

  return errors
}

function resolveErrorMessage(err) {
  return (
    err.response?.data?.message ||
    err.message ||
    "Failed to update product."
  )
}

export function useEditProduct() {
  console.log("useEditProduct mounted") // TEMP DEBUG — check 1

  const navigate = useNavigate()
  const { id } = useParams()

  const [formData, setFormData] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [categories, setCategories] = useState([])
  const [units, setUnits] = useState([])

  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    async function loadProduct() {
      setIsLoading(true)
      setError(null)

      try {
        const [product, categoryList, unitList] = await Promise.all([
          productService.getProductById(id),
          productService.getCategories(),
          productService.getUnits(),
        ])

        if (!isMounted) return

        setCategories(normalizeOptions(categoryList))
        setUnits(normalizeOptions(unitList))
        setFormData({
          name: product.name ?? "",
          sku: product.sku ?? "",
          categoryId: normalizeRefId(product.categoryId),
          unitId: normalizeRefId(product.unitId),
          costPrice: product.costPrice ?? "",
          sellingPrice: product.sellingPrice ?? "",
          reorderLevel: product.reorderLevel ?? "",
        })
      } catch (err) {
        if (isMounted) {
          setError(resolveErrorMessage(err))
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadProduct()

    return () => {
      isMounted = false
    }
  }, [id])

  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev))
  }, [])

  const handleCancel = useCallback(() => {
    navigate(-1)
  }, [navigate])

  const handleSave = useCallback(
    async (e) => {
      console.log("handleSave called") // TEMP DEBUG — step 1
      e?.preventDefault?.()
      const validationErrors = validate(formData)
      console.log("validationErrors", validationErrors) // TEMP DEBUG — step 2
      setErrors(validationErrors)

      if (Object.keys(validationErrors).length > 0) {
        console.log("blocked by validation, fields:", Object.keys(validationErrors)) // TEMP DEBUG — step 3
        return
      }

      console.log("validation passed, building payload") // TEMP DEBUG — step 4
      const payload = {
        name: formData.name,
        sku: formData.sku,
        categoryId: formData.categoryId,
        unitId: formData.unitId,
        costPrice: Number(formData.costPrice),
        sellingPrice: Number(formData.sellingPrice),
        reorderLevel: Number(formData.reorderLevel),
      }

      setIsSubmitting(true)
      setShowSuccess(false)
      setError(null)

      console.log("about to call updateProduct", { id, payload }) // TEMP DEBUG — step 5
      try {
        await productService.updateProduct(id, payload)
        setShowSuccess(true)
        setTimeout(() => {
          navigate(`/inventory/products/${id}`)
        }, 1200)
      } catch (err) {
        setError(resolveErrorMessage(err))
      } finally {
        setIsSubmitting(false)
      }
    },
    [formData, id, navigate]
  )

  return {
    formData,
    errors,
    handleChange,
    handleSave,
    handleCancel,
    categories,
    units,
    isLoading,
    isSubmitting,
    showSuccess,
    error,
  }
}