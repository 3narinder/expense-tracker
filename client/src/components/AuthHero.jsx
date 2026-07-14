import { memo } from "react";
import {
  Wallet,
  TrendingUp,
  Sparkles,
  Utensils,
  ShoppingBag,
  Coffee,
  Plane,
  Calendar,
  Receipt,
} from "lucide-react";

const BalanceCard = () => (
  <div className="bg-[var(--color-primary)] rounded-2xl p-5 text-[var(--color-primary-foreground)] shadow-xl relative overflow-hidden">
    <div className="absolute -top-8 -right-8 h-24 w-24 bg-[var(--color-primary-foreground)]/10 rounded-full blur-2xl" />
    <div className="relative flex items-center justify-between mb-4">
      <div className="text-xs font-medium opacity-80">Total Balance</div>
      <Wallet size={16} className="opacity-80" />
    </div>
    <div className="relative text-3xl font-bold tracking-tight">$12,547.30</div>
    <div className="relative flex items-center gap-1.5 mt-2 text-xs">
      <TrendingUp size={11} />
      <span className="font-semibold">+8.2%</span>
      <span className="opacity-70">this month</span>
    </div>
  </div>
);

const AIInsightCard = () => (
  <div className="bg-[var(--color-bg-surface)] rounded-2xl p-4 shadow-lg border border-[var(--color-border-main)]">
    <div className="flex items-start gap-2.5">
      <div className="h-9 w-9 rounded-xl bg-[var(--color-primary)] flex items-center justify-center shrink-0">
        <Sparkles
          size={16}
          className="text-[var(--color-primary-foreground)]"
        />
      </div>
      <div className="min-w-0">
        <div className="text-[10px] uppercase tracking-wider font-bold text-[var(--color-text-muted)] mb-0.5">
          AI Insight
        </div>
        <div className="text-xs font-semibold text-[var(--color-text-main)] mb-0.5">
          Coffee budget alert
        </div>
        <p className="text-[11px] text-[var(--color-text-muted)] leading-relaxed">
          Cut 2 cups/week → save $32/mo
        </p>
      </div>
    </div>
  </div>
);

const BudgetProgressCard = () => (
  <div className="bg-[var(--color-bg-surface)] rounded-2xl p-4 shadow-md border border-[var(--color-border-main)]">
    <div className="flex items-center gap-2 mb-3">
      <div className="h-8 w-8 rounded-lg bg-[var(--color-bg-muted)] flex items-center justify-center">
        <Utensils size={14} className="text-[var(--color-warning)]" />
      </div>
      <div>
        <div className="text-xs font-semibold text-[var(--color-text-main)]">
          Food & Dining
        </div>
        <div className="text-[10px] text-[var(--color-text-muted)]">
          May 2026
        </div>
      </div>
    </div>
    <div className="flex items-baseline justify-between mb-1.5">
      <span className="text-base font-bold text-[var(--color-text-main)]">
        $320
      </span>
      <span className="text-[10px] text-[var(--color-text-muted)]">
        of $400
      </span>
    </div>
    <div className="h-1.5 bg-[var(--color-bg-muted)] rounded-full overflow-hidden">
      <div
        className="h-full bg-[var(--color-warning)] rounded-full"
        style={{ width: "80%" }}
      />
    </div>
    <div className="text-[10px] text-[var(--color-warning)] font-medium mt-1.5">
      80% used
    </div>
  </div>
);

const SubscriptionsCard = () => (
  <div className="bg-[var(--color-bg-surface)] rounded-2xl p-4 shadow-md border border-[var(--color-border-main)]">
    <div className="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)] font-bold mb-3">
      Subscriptions
    </div>
    <div className="space-y-2.5">
      {[
        { name: "Netflix", cost: "$15.99", initial: "N" },
        { name: "Spotify", cost: "$10.99", initial: "S" },
        { name: "iCloud+", cost: "$2.99", initial: "i" },
      ].map((s) => (
        <div key={s.name} className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-[var(--color-primary)] flex items-center justify-center text-[var(--color-primary-foreground)] text-[11px] font-bold">
              {s.initial}
            </div>
            <span className="text-[11px] font-medium text-[var(--color-text-main)]">
              {s.name}
            </span>
          </div>
          <span className="text-[11px] font-semibold text-[var(--color-text-main)]">
            {s.cost}
          </span>
        </div>
      ))}
    </div>
  </div>
);

const IncomeExpenseCard = () => (
  <div className="bg-[var(--color-bg-surface)] rounded-2xl p-4 shadow-md border border-[var(--color-border-main)]">
    <div className="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)] font-bold mb-2">
      Income vs Expense
    </div>
    <div className="grid grid-cols-2 gap-3 mb-3">
      <div>
        <div className="text-[10px] text-[var(--color-text-muted)]">Income</div>
        <div className="text-base font-bold text-[var(--color-success)]">
          $6.3k
        </div>
      </div>
      <div>
        <div className="text-[10px] text-[var(--color-text-muted)]">
          Expense
        </div>
        <div className="text-base font-bold text-[var(--color-danger)]">
          $2.4k
        </div>
      </div>
    </div>
    <div className="flex items-end gap-1 h-10">
      {[55, 70, 45, 80, 65, 75].map((h, i) => (
        <div key={i} className="flex-1 flex flex-col gap-0.5 justify-end">
          <div
            className="bg-[var(--color-success)] rounded-sm opacity-70"
            style={{ height: `${h}%`, minHeight: "4px" }}
          />
          <div
            className="bg-[var(--color-danger)] rounded-sm opacity-70"
            style={{ height: `${h * 0.45}%`, minHeight: "2px" }}
          />
        </div>
      ))}
    </div>
  </div>
);

const MonthlySummaryCard = () => (
  <div className="bg-[var(--color-bg-surface)] rounded-2xl p-4 shadow-md border border-[var(--color-border-main)]">
    <div className="flex items-center justify-between mb-3">
      <div className="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)] font-bold">
        May 2026
      </div>
      <span className="text-[10px] text-[var(--color-success)] bg-[var(--color-bg-muted)] px-1.5 py-0.5 rounded-full font-bold">
        Healthy
      </span>
    </div>
    <div className="text-2xl font-bold tracking-tight text-[var(--color-text-main)] mb-1">
      $3,936
    </div>
    <div className="text-[10px] text-[var(--color-text-muted)]">
      Net this month
    </div>
    <div className="mt-3 h-1.5 bg-[var(--color-bg-muted)] rounded-full overflow-hidden">
      <div
        className="h-full bg-[var(--color-primary)] rounded-full"
        style={{ width: "62%" }}
      />
    </div>
    <div className="text-[10px] text-[var(--color-text-muted)] mt-1.5">
      62% savings rate
    </div>
  </div>
);

const RecentTransactionsCard = () => (
  <div className="bg-[var(--color-bg-surface)] rounded-2xl p-4 shadow-md border border-[var(--color-border-main)]">
    <div className="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)] font-bold mb-3">
      Recent
    </div>
    <div className="space-y-2.5">
      {[
        {
          icon: ShoppingBag,
          name: "Whole Foods",
          amount: "-$87.00",
        },
        {
          icon: Coffee,
          name: "Starbucks",
          amount: "-$6.45",
        },
        {
          icon: TrendingUp,
          name: "Salary",
          amount: "+$5,500",
          positive: true,
        },
      ].map((t, i) => (
        <div key={i} className="flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <div className="h-7 w-7 rounded-lg bg-[var(--color-bg-muted)] flex items-center justify-center shrink-0 text-[var(--color-text-muted)]">
              <t.icon size={12} />
            </div>
            <span className="text-[11px] font-medium text-[var(--color-text-main)] truncate">
              {t.name}
            </span>
          </div>
          <span
            className={`text-[11px] font-semibold ${
              t.positive
                ? "text-[var(--color-success)]"
                : "text-[var(--color-text-main)]"
            }`}
          >
            {t.amount}
          </span>
        </div>
      ))}
    </div>
  </div>
);

const CategoryDonutCard = () => (
  <div className="bg-[var(--color-bg-surface)] rounded-2xl p-4 shadow-md border border-[var(--color-border-main)]">
    <div className="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)] font-bold mb-3">
      Top Categories
    </div>
    <div className="flex items-center gap-3">
      <div className="relative h-16 w-16 shrink-0">
        <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
          <circle
            cx="18"
            cy="18"
            r="14"
            fill="none"
            stroke="var(--color-bg-muted)"
            strokeWidth="6"
          />
          <circle
            cx="18"
            cy="18"
            r="14"
            fill="none"
            stroke="var(--color-primary)"
            strokeWidth="6"
            strokeDasharray="35 88"
            strokeLinecap="round"
          />
          <circle
            cx="18"
            cy="18"
            r="14"
            fill="none"
            stroke="var(--color-warning)"
            strokeWidth="6"
            strokeDasharray="22 88"
            strokeDashoffset="-37"
            strokeLinecap="round"
          />
          <circle
            cx="18"
            cy="18"
            r="14"
            fill="none"
            stroke="var(--color-info)"
            strokeWidth="6"
            strokeDasharray="16 88"
            strokeDashoffset="-61"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div className="space-y-1.5 flex-1 min-w-0">
        {[
          { name: "Food", value: "$320", color: "bg-[var(--color-primary)]" },
          { name: "Rent", value: "$1.8k", color: "bg-[var(--color-warning)]" },
          { name: "Travel", value: "$240", color: "bg-[var(--color-info)]" },
        ].map((c) => (
          <div
            key={c.name}
            className="flex items-center justify-between text-[10px]"
          >
            <div className="flex items-center gap-1.5">
              <div className={`h-1.5 w-1.5 rounded-full ${c.color}`} />
              <span className="text-[var(--color-text-muted)] font-medium">
                {c.name}
              </span>
            </div>
            <span className="text-[var(--color-text-main)] font-semibold">
              {c.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const SavingsGoalCard = () => (
  <div className="bg-[var(--color-bg-surface)] rounded-2xl p-4 shadow-md border border-[var(--color-border-main)]">
    <div className="flex items-center gap-2 mb-3">
      <div className="h-8 w-8 rounded-lg bg-[var(--color-primary)] flex items-center justify-center">
        <Plane size={14} className="text-[var(--color-primary-foreground)]" />
      </div>
      <div>
        <div className="text-xs font-semibold text-[var(--color-text-main)]">
          Vacation Fund
        </div>
        <div className="text-[10px] text-[var(--color-text-muted)]">
          Goal: $5,000
        </div>
      </div>
    </div>
    <div className="flex items-baseline justify-between mb-1.5">
      <span className="text-lg font-bold tracking-tight text-[var(--color-text-main)]">
        $3,240
      </span>
      <span className="text-[10px] text-[var(--color-success)] font-bold">
        65%
      </span>
    </div>
    <div className="h-1.5 bg-[var(--color-bg-muted)] rounded-full overflow-hidden">
      <div
        className="h-full bg-[var(--color-success)] rounded-full"
        style={{ width: "65%" }}
      />
    </div>
  </div>
);

const UpcomingBillCard = () => (
  <div className="bg-[var(--color-bg-surface)] rounded-2xl p-4 shadow-md border border-[var(--color-border-main)]">
    <div className="flex items-center gap-3">
      <div className="h-10 w-10 rounded-xl bg-[var(--color-bg-muted)] flex items-center justify-center shrink-0">
        <Calendar size={16} className="text-[var(--color-danger)]" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[10px] uppercase tracking-wider text-[var(--color-danger)] font-bold">
          Due in 2 days
        </div>
        <div className="text-xs font-semibold text-[var(--color-text-main)]">
          Rent payment
        </div>
      </div>
      <div className="text-sm font-bold text-[var(--color-text-main)]">
        $1,800
      </div>
    </div>
  </div>
);

const PortfolioCard = () => (
  <div className="bg-[var(--color-primary)] rounded-2xl p-4 text-[var(--color-primary-foreground)] shadow-xl">
    <div className="flex items-center justify-between mb-3">
      <div className="text-[10px] uppercase tracking-wider opacity-60 font-bold">
        Investments
      </div>
      <Receipt size={12} className="opacity-60" />
    </div>
    <div className="text-2xl font-bold tracking-tight mb-1">$8,420.55</div>
    <div className="flex items-center gap-1.5 text-[11px]">
      <span className="font-semibold opacity-90">+$182.30</span>
      <span className="opacity-50">today</span>
    </div>
    <div className="mt-3 h-10">
      <svg
        viewBox="0 0 100 30"
        className="w-full h-full"
        preserveAspectRatio="none"
      >
        <path
          d="M0,20 L15,18 L30,22 L45,15 L60,12 L75,8 L100,5"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M0,20 L15,18 L30,22 L45,15 L60,12 L75,8 L100,5 L100,30 L0,30 Z"
          fill="url(#sparkGradient)"
        />
        <defs>
          <linearGradient id="sparkGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.35" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  </div>
);

const column1 = [
  <BalanceCard key="balance" />,
  <AIInsightCard key="ai" />,
  <BudgetProgressCard key="budget" />,
  <SubscriptionsCard key="subs" />,
  <IncomeExpenseCard key="incexp" />,
];

const column2 = [
  <MonthlySummaryCard key="monthly" />,
  <RecentTransactionsCard key="recent" />,
  <CategoryDonutCard key="cats" />,
  <SavingsGoalCard key="savings" />,
  <UpcomingBillCard key="bill" />,
  <PortfolioCard key="portfolio" />,
];

const shuffledColumn1 = [...column1, ...column1, ...column2].sort(
  () => Math.random() - 0.5,
);
const shuffledColumn2 = [...column2, ...column2, ...column2];
const shuffledColumn3 = [...column1, ...column1, ...column2].sort(
  () => Math.random() - 0.5,
);

const AuthHero = ({ headline, subHeadline }) => {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[var(--color-bg-app)] transition-colors duration-300">
      <div className="absolute top-1/2 -right-24 w-80 h-80 bg-[var(--color-primary)]/10 rounded-full blur-3xl pointer-events-none z-0" />

      <div className="absolute inset-0 overflow-hidden z-10">
        <div
          className="absolute -inset-40 flex gap-4"
          style={{ transform: "rotate(-7deg)" }}
        >
          <div className="flex-1 min-w-0">
            <div style={{ animation: "scrollUp 45s linear infinite" }}>
              {shuffledColumn1.map((card, i) => (
                <div key={i} className="pb-4">
                  {card}
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div style={{ animation: "scrollDown 45s linear infinite" }}>
              {shuffledColumn2.map((card, i) => (
                <div key={i} className="pb-4">
                  {card}
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div style={{ animation: "scrollUp 45s linear infinite" }}>
              {shuffledColumn3.map((card, i) => (
                <div key={i} className="pb-4">
                  {card}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-[var(--color-bg-app)] [mask-image:linear-gradient(to_top,black_40%,transparent)] [-webkit-mask-image:linear-gradient(to_top,black_40%,transparent)] pointer-events-none z-20" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[var(--color-bg-app)] via-[var(--color-bg-app)]/70 to-transparent pointer-events-none z-20" />

      <div className="absolute top-10 left-10 xl:top-14 xl:left-14 z-30 max-w-[70%]">
        <h1 className="text-5xl xl:text-6xl font-normal tracking-tight text-[var(--color-text-main)] mb-2">
          {headline}
        </h1>
        <p className="text-base text-[var(--color-text-muted)]">
          {subHeadline}
        </p>
      </div>
    </div>
  );
};

export default memo(AuthHero);
