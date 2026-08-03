/**
 * Formats a numeric amount into Nigerian Naira (NGN) currency format.
 * Example output: ₦45,000.00
 * * @param {number} amount - The amount to format.
 * @returns {string} Formatted currency string.
 */
export const formatCurrency = (amount) => {
  const numericAmount = Number(amount) || 0;
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numericAmount);
};

/**
 * Formats a date string or object into 'DD MMM YYYY' format.
 * Example output: 21 Jul 2026
 * * @param {string|Date} date - The date to format.
 * @returns {string} Formatted date string.
 */
export const formatPurchaseDate = (date) => {
  if (!date) return 'N/A';
  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) return 'N/A';

  return new Intl.NumberFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(parsedDate);
};

/**
 * Calculates total cost for a single line item (quantity * costPrice).
 * * @param {Object} item - Item containing quantity and costPrice.
 * @returns {number} Total item cost.
 */
export const calculateItemTotal = (item) => {
  if (!item) return 0;
  const quantity = Number(item.quantity) || 0;
  const costPrice = Number(item.costPrice) || 0;
  return Math.max(0, quantity) * Math.max(0, costPrice);
};

/**
 * Calculates grand total for an array of purchase items.
 * * @param {Array<Object>} items - Array of purchase line items.
 * @returns {number} Sum of all line item totals.
 */
export const calculateGrandTotal = (items = []) => {
  if (!Array.isArray(items)) return 0;
  return items.reduce((total, item) => total + calculateItemTotal(item), 0);
};

/**
 * Returns corresponding Tailwind CSS badge classes based on payment status.
 * * @param {string} status - Payment status string ('pending', 'paid', 'partially_paid', etc.).
 * @returns {string} Tailwind CSS class list.
 */
export const getPaymentStatusColor = (status = '') => {
  const key = String(status).toLowerCase().trim();

  switch (key) {
    case 'paid':
      return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800';
    case 'pending':
      return 'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400 border-amber-200 dark:border-amber-800';
    case 'partially_paid':
    case 'partial':
      return 'bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400 border-blue-200 dark:border-blue-800';
    case 'overdue':
      return 'bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-400 border-rose-200 dark:border-rose-800';
    default:
      return 'bg-slate-50 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700';
  }
};

/**
 * Converts status codes into human-readable labels.
 * Example: 'partially_paid' -> 'Partially Paid'
 * * @param {string} status - Payment status string.
 * @returns {string} Human-readable label.
 */
export const getPaymentStatusLabel = (status = '') => {
  if (!status) return '';
  
  const statusLabels = {
    pending: 'Pending',
    paid: 'Paid',
    partially_paid: 'Partially Paid',
    partial: 'Partially Paid',
    overdue: 'Overdue',
  };

  const key = String(status).toLowerCase().trim();
  
  if (statusLabels[key]) {
    return statusLabels[key];
  }

  return status
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

/**
 * Sorts an array of purchases by createdAt date in descending order (newest first).
 * Returns a new sorted array without mutating the original input.
 * * @param {Array<Object>} purchases - Array of purchase objects.
 * @returns {Array<Object>} Sorted purchase list.
 */
export const sortPurchasesByNewest = (purchases = []) => {
  if (!Array.isArray(purchases)) return [];

  return [...purchases].sort((a, b) => {
    const dateA = new Date(a.createdAt || a.createdDate || 0).getTime();
    const dateB = new Date(b.createdAt || b.createdDate || 0).getTime();
    return dateB - dateA;
  });
};