// lib/bkash/plans.js
// Server-side source of truth for plan pricing — never trust amount from client.
export const PLANS = {
  personal: {
    name: "Personal",
    amount: "350", // BDT, fixed rate ~ $3
    billingCycle: "monthly",
    cardOrderQuota: 5, // physical card orders per month
    virtualCardLimit: 5, // virtual cards user can hold
  },
  business: {
    name: "Business",
    amount: "1200", // BDT, fixed rate ~ $10
    billingCycle: "yearly",
    cardOrderQuota: 50, // physical card orders per month (min order size 10, cap 50)
    virtualCardLimit: 100, // virtual cards user can hold
  },
};

export function getPlan(planId) {
  return PLANS[planId] || null;
}

// Free tier — default for users with no active plan.
export const FREE_TIER = {
  name: "Free",
  virtualCardLimit: 1,
};

// lib/bkash/pricing.js content merged here — physical card order pricing.
export const CARD_PRICE = 400; // BDT
export const VAT_RATE = 0.03; // 3%
export const DELIVERY_CHARGE_INSIDE_DHAKA = 50; // BDT
export const DELIVERY_CHARGE_OUTSIDE_DHAKA = 100; // BDT

// Server-side authoritative price calculation for a physical card order.
// isFirstOrder: true => whole order free (card + delivery + VAT waived).
export function calculateOrderPrice({ insideDhaka, isFirstOrder }) {
  if (isFirstOrder) {
    return {
      cardPrice: 0,
      deliveryCharge: 0,
      vat: 0,
      total: 0,
    };
  }

  const cardPrice = CARD_PRICE;
  const deliveryCharge = insideDhaka
    ? DELIVERY_CHARGE_INSIDE_DHAKA
    : DELIVERY_CHARGE_OUTSIDE_DHAKA;
  const vat = Math.round(cardPrice * VAT_RATE * 100) / 100;
  const total = cardPrice + deliveryCharge + vat;

  return { cardPrice, deliveryCharge, vat, total };
}
