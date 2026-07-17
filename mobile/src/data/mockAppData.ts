export const mockMonthSummary = {
  balance: 18450,
  monthlyNet: 2350,
  incomeThisMonth: 6200,
  expenseThisMonth: 3850,
  savingsRate: 37.9,
};

export const mockMonthTrends = [
  { month: "Jan", income: 5400, expense: 4200 },
  { month: "Feb", income: 5600, expense: 4100 },
  { month: "Mar", income: 6000, expense: 4350 },
  { month: "Apr", income: 6100, expense: 3900 },
  { month: "May", income: 5900, expense: 4100 },
  { month: "Jun", income: 6200, expense: 3850 },
];

export const mockCategoryBreakDown = [
  {
    category_name: "Food & Dining",
    amount: 1120,
    percentage: 29,
    category_color: "#f97316",
    category_icon: "coffee",
  },
  {
    category_name: "Transportation",
    amount: 760,
    percentage: 19.7,
    category_color: "#3b82f6",
    category_icon: "truck",
  },
  {
    category_name: "Utilities",
    amount: 680,
    percentage: 17.7,
    category_color: "#a855f7",
    category_icon: "zap",
  },
  {
    category_name: "Shopping",
    amount: 640,
    percentage: 16.6,
    category_color: "#ef4444",
    category_icon: "shopping-bag",
  },
  {
    category_name: "Entertainment",
    amount: 420,
    percentage: 10.9,
    category_color: "#14b8a6",
    category_icon: "film",
  },
];

export const mockRecentTransactions = [
  {
    id: "t-1",
    description: "Dinner with friends",
    amount: 54,
    type: "expense" as const,
    transaction_date: "2026-07-15",
    category_name: "Food & Dining",
    category_icon: "coffee",
    category_color: "#f97316",
  },
  {
    id: "t-2",
    description: "Monthly salary",
    amount: 5200,
    type: "income" as const,
    transaction_date: "2026-07-14",
    category_name: "Salary",
    category_icon: "briefcase",
    category_color: "#10b981",
  },
  {
    id: "t-3",
    description: "Uber ride",
    amount: 18,
    type: "expense" as const,
    transaction_date: "2026-07-13",
    category_name: "Transportation",
    category_icon: "truck",
    category_color: "#3b82f6",
  },
  {
    id: "t-4",
    description: "Electricity bill",
    amount: 95,
    type: "expense" as const,
    transaction_date: "2026-07-12",
    category_name: "Utilities",
    category_icon: "zap",
    category_color: "#a855f7",
  },
  {
    id: "t-5",
    description: "Freelance payout",
    amount: 750,
    type: "income" as const,
    transaction_date: "2026-07-11",
    category_name: "Freelance",
    category_icon: "dollar-sign",
    category_color: "#14b8a6",
  },
];

export const mockBudgets = [
  {
    id: "b-1",
    name: "Essentials",
    amount: 1800,
    spent: 1260,
    categories: [{ name: "Food & Dining" }, { name: "Utilities" }],
  },
  {
    id: "b-2",
    name: "Transport",
    amount: 700,
    spent: 580,
    categories: [{ name: "Transportation" }],
  },
  {
    id: "b-3",
    name: "Lifestyle",
    amount: 900,
    spent: 760,
    categories: [{ name: "Shopping" }, { name: "Entertainment" }],
  },
];

export const mockCategories = [
  {
    id: "c-1",
    name: "Food & Dining",
    icon: "coffee",
    color: "#f97316",
    type: "expense",
  },
  {
    id: "c-2",
    name: "Transportation",
    icon: "truck",
    color: "#3b82f6",
    type: "expense",
  },
  {
    id: "c-3",
    name: "Utilities",
    icon: "zap",
    color: "#a855f7",
    type: "expense",
  },
  {
    id: "c-4",
    name: "Shopping",
    icon: "shopping-bag",
    color: "#ef4444",
    type: "expense",
  },
  {
    id: "c-5",
    name: "Salary",
    icon: "briefcase",
    color: "#10b981",
    type: "income",
  },
  {
    id: "c-6",
    name: "Freelance",
    icon: "dollar-sign",
    color: "#14b8a6",
    type: "income",
  },
];

export const mockInsights = [
  {
    id: "i-1",
    title: "Monthly Summary",
    summary:
      "Your savings rate improved this month, but food and shopping are still your largest spending buckets.",
    healthScore: 76,
    createdAt: "2h ago",
  },
  {
    id: "i-2",
    title: "Savings Tip",
    summary:
      "Reducing dining expenses by 12% could free up roughly $130 per month with minimal lifestyle impact.",
    healthScore: 72,
    createdAt: "1d ago",
  },
];
