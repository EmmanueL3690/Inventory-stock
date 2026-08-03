export const validateStockOut = (data, selectedProduct) => {
  const errors = {};

  if (!selectedProduct) {
    errors.product = 'Please select a product.';
  }

  const qty = parseInt(data.quantity, 10);
  if (!data.quantity || isNaN(qty)) {
    errors.quantity = 'Quantity is required.';
  } else if (qty <= 0) {
    errors.quantity = 'Quantity must be greater than zero.';
  } else if (selectedProduct && qty > selectedProduct.currentStock) {
    errors.quantity = 'Quantity cannot exceed available inventory stock.';
  }

  if (!data.reason) {
    errors.reason = 'Please select a valid reason for stock out.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};