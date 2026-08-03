import axios from 'axios';

/**
 * Updates the payment status of a purchase order via Axios.
 * * @param {string} id - The ID of the purchase order.
 * @param {string} paymentStatus - The new payment status ('pending' | 'paid' | 'partially_paid').
 * @returns {Promise<Object>} The updated purchase object.
 */
export const updatePurchasePaymentStatus = async (id, paymentStatus) => {
  if (!id) throw new Error('Purchase ID is required');

  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  try {
    const response = await axios.patch(
      `/api/purchases/${id}/payment-status`,
      { paymentStatus },
      { headers }
    );
    return response.data?.data || response.data;
  } catch (error) {
    console.error(`Error updating payment status for ID ${id}:`, error);
    const message =
      error.response?.data?.message ||
      error.message ||
      'Failed to update payment status.';
    throw new Error(message);
  }
};

export default {
  updatePurchasePaymentStatus,
};