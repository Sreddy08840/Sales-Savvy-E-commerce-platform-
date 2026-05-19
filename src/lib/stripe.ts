import { loadStripe, Stripe } from "@stripe/stripe-js";

let stripePromise: Promise<Stripe | null> | null = null;

/**
 * Get a singleton Stripe instance.
 * Reads the publishable key from VITE_STRIPE_PUBLISHABLE_KEY.
 */
export const getStripe = () => {
  if (!stripePromise) {
    const key = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
    if (!key) {
      console.warn("VITE_STRIPE_PUBLISHABLE_KEY is not set – Stripe will not work.");
    }
    stripePromise = loadStripe(key ?? "");
  }
  return stripePromise;
};
