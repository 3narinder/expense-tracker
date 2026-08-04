const asPositiveInt = (value, fallback) => {
  const parsed = Number.parseInt(value ?? "", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

const normalizePeriod = (value, fallback) => {
  const normalized = String(value || "").trim().toLowerCase();
  return normalized === "week" || normalized === "day" ? normalized : fallback;
};

export const PLAN_CONFIG = {
  basic: {
    aiLimit: asPositiveInt(process.env.PLAN_BASIC_AI_LIMIT, 2),
    aiPeriod: normalizePeriod(process.env.PLAN_BASIC_AI_PERIOD, "day"),
    maxAccounts: asPositiveInt(process.env.PLAN_BASIC_MAX_ACCOUNTS, 1),
    canCreateBusinessAccount: false,
    maxPersonalAccounts: asPositiveInt(process.env.PLAN_BASIC_MAX_PERSONAL_ACCOUNTS, 1),
    maxBusinessAccounts: 0,
  },
  pro: {
    aiLimit: asPositiveInt(process.env.PLAN_PRO_AI_LIMIT, 10),
    aiPeriod: normalizePeriod(process.env.PLAN_PRO_AI_PERIOD, "day"),
    maxAccounts: asPositiveInt(process.env.PLAN_PRO_MAX_ACCOUNTS, 2),
    canCreateBusinessAccount: true,
    maxPersonalAccounts: asPositiveInt(process.env.PLAN_PRO_MAX_PERSONAL_ACCOUNTS, 1),
    maxBusinessAccounts: asPositiveInt(process.env.PLAN_PRO_MAX_BUSINESS_ACCOUNTS, 1),
  },
  premium: {
    aiLimit: asPositiveInt(process.env.PLAN_PREMIUM_AI_LIMIT, 100),
    aiPeriod: normalizePeriod(process.env.PLAN_PREMIUM_AI_PERIOD, "week"),
    maxAccounts: asPositiveInt(process.env.PLAN_PREMIUM_MAX_ACCOUNTS, 50),
    canCreateBusinessAccount: true,
    maxPersonalAccounts: asPositiveInt(
      process.env.PLAN_PREMIUM_MAX_PERSONAL_ACCOUNTS,
      50,
    ),
    maxBusinessAccounts: asPositiveInt(
      process.env.PLAN_PREMIUM_MAX_BUSINESS_ACCOUNTS,
      50,
    ),
  },
};

export const VALID_SUBSCRIPTION_PLANS = Object.keys(PLAN_CONFIG);

export const getPlanConfig = (plan) => PLAN_CONFIG[plan] ?? PLAN_CONFIG.basic;

