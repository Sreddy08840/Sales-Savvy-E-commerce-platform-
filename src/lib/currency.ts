/**
 * Format a number as Indian Rupees (₹).
 * Uses the en-IN locale so that values like 1500 render as ₹1,500.00
 */
export const formatINR = (amount: number, decimals = 2): string =>
  `₹${amount.toLocaleString("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}`;

/** Free-shipping threshold in INR */
export const FREE_SHIPPING_THRESHOLD = 5000;

/** Flat shipping fee in INR when below threshold */
export const SHIPPING_FEE = 199;
