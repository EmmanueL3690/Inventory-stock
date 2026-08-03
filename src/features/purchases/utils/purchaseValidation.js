/**
 * Validates a purchase order object.
 *
 * @param {Object} data - Purchase order data object.
 * @param {string|number} data.supplierId - ID of the selected supplier.
 * @param {Array<Object>} data.items - List of purchase line items.
 * @param {string} data.paymentStatus - Payment status string.
 * @param {string} [data.notes] - Optional purchase notes.
 * * @returns {{ isValid: boolean, errors: Object }} Object containing validity boolean and detailed error messages.
 */
export const validatePurchase = (data = {}) => {
  const errors = {};

  // 1. Validate Supplier ID
  if (!data.supplierId || String(data.supplierId).trim() === '') {
    errors.supplierId = 'Supplier is required.';
  }

  // 2. Validate Payment Status
  if (!data.paymentStatus || String(data.paymentStatus).trim() === '') {
    errors.paymentStatus = 'Payment status is required.';
  }

  // 3. Validate Items Array
  if (!Array.isArray(data.items) || data.items.length === 0) {
    errors.items = 'At least one item is required.';
  } else {
    const itemErrors = [];

    data.items.forEach((item, index) => {
      const fieldErrors = {};

      // Validate Quantity (> 0)
      const qty = Number(item?.quantity);
      if (item?.quantity === undefined || item?.quantity === null || isNaN(qty) || qty <= 0) {
        fieldErrors.quantity = 'Quantity must be greater than 0.';
      }

      // Validate Cost Price (> 0)
      const cost = Number(item?.costPrice);
      if (item?.costPrice === undefined || item?.costPrice === null || isNaN(cost) || cost <= 0) {
        fieldErrors.costPrice = 'Cost price must be greater than 0.';
      }

      if (Object.keys(fieldErrors).length > 0) {
        itemErrors[index] = fieldErrors;
      }
    });

    if (itemErrors.length > 0) {
      errors.itemDetails = itemErrors;
    }
  }

  // 4. Validate Notes (Optional, checking max length if provided)
  if (data.notes && typeof data.notes === 'string' && data.notes.length > 500) {
    errors.notes = 'Notes cannot exceed 500 characters.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};