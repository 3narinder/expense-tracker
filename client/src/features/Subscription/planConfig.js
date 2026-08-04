export const SUBSCRIPTION_PLANS = [
  {
    id: "basic",
    name: "Basic",
    price: "Free",
    priceSubtext: "forever",
    aiLimit: 2,
    aiPeriod: "day",
    accountAllowance: "1 personal account",
    maxAccounts: 1,
    features: [
      "AI insights with daily limits",
      "Dashboard overview",
      "Transaction tracking",
      "Budget management",
    ],
    cta: "Current plan",
    highlight: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: "$9",
    priceSubtext: "per month",
    aiLimit: 10,
    aiPeriod: "day",
    accountAllowance: "Personal + 1 business account",
    maxAccounts: 2,
    features: [
      "Higher AI insight limits",
      "Cross-profile account support",
      "Advanced spending analytics",
      "Priority AI generation",
    ],
    cta: "Upgrade to Pro",
    highlight: true,
  },
  {
    id: "premium",
    name: "Premium",
    price: "$19",
    priceSubtext: "per month",
    aiLimit: 100,
    aiPeriod: "week",
    accountAllowance: "Multiple accounts",
    maxAccounts: 50,
    features: [
      "Highest AI insights allowance",
      "Weekly AI usage window",
      "Generous account cap",
      "Priority support",
    ],
    cta: "Upgrade to Premium",
    highlight: false,
  },
];

export const getSubscriptionPlanConfig = (planId) =>
  SUBSCRIPTION_PLANS.find((plan) => plan.id === planId) ?? SUBSCRIPTION_PLANS[0];

