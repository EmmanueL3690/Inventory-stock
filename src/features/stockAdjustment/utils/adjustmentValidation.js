export const validateAdjustmentForm = (formData) => {
  const errors = {};

  if (!formData.productId) {
    errors.productId = 'Product selection is required.';
  }

  if (!formData.quantity || isNaN(formData.quantity) || Number(formData.quantity) <= 0) {
    errors.quantity = 'Quantity must be greater than 0.';
  }

  if (!formData.type || !['DAMAGE', 'LOST'].includes(formData.type)) {
    errors.type = 'Type must be either DAMAGE or LOST.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};