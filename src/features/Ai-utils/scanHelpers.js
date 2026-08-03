/**
 * Maps an AI confidence percentage to its corresponding color configuration.
 * @param {number} score - Confidence value from 0 to 100
 */
export const getConfidenceColor = (score) => {
  if (score >= 90) {
    return {
      bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      text: 'text-emerald-600',
      dot: 'bg-emerald-500',
      label: 'High Confidence'
    };
  }
  if (score >= 70) {
    return {
      bg: 'bg-amber-50 text-amber-700 border-amber-200',
      text: 'text-amber-600',
      dot: 'bg-amber-500',
      label: 'Medium Confidence'
    };
  }
  return {
    bg: 'bg-rose-50 text-rose-700 border-rose-200',
    text: 'text-rose-600',
    dot: 'bg-rose-500',
    label: 'Low Confidence'
  };
};

/**
 * Formats standard currency strings/numbers for the Stocklytics local system (NGN).
 * @param {number} amount 
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 2
  }).format(amount);
};