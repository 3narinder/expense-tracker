import { Link } from "react-router-dom";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  PiggyBank,
  ArrowRight,
  Target,
  PlusCircle,
  Receipt,
} from "lucide-react";

import { formatCurrency, formatDate } from "../utils/format.js";
import { useCurrentUser } from "../features/Authentication/useCurrentUser.js";
import { useDashboardData } from "../features/Dashboard/useDashboardData.js";
import { useBudgets } from "../features/Budgets/useBudgets.js";

import KpiCard from "../components/KpiCard.jsx";
import CategoryBadge from "../components/CategoryBadge.jsx";
import MonthlyTrendChart from "../components/charts/MonthlyTrendChart.jsx";
import CategoryBreakdownChart from "../components/charts/CategoryBreakdownChart.jsx";
import Spinner from "../components/Spinner.jsx";

const Dashboard = () => {
  const { user } = useCurrentUser();
  const {
    monthSummary,
    monthTrends,
    categoryBreakDown,
    recentTransactions,
    isPending,
  } = useDashboardData();
  const { budgets = [], isPending: budgetsLoading } = useBudgets();
  const currency = user?.currency || "USD";

  if (isPending || !monthSummary) {
    return (
      <div className="flex justify-center py-16">
        <Spinner size="lg" />
      </div>
    );
  }

  const hasNoData =
    monthSummary.balance === 0 &&
    monthSummary.incomeThisMonth === 0 &&
    monthSummary.expenseThisMonth === 0 &&
    recentTransactions.length === 0;

  if (hasNoData) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <div className="h-24 w-24 bg-linear-to-br from-violet-100 to-violet-50 rounded-full flex items-center justify-center mb-6 shadow-inner">
          <Wallet size={40} className="text-violet-500" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-(--color-text-main) tracking-tight mb-3">
          Welcome to ExpenseAI!
        </h1>
        <p className="text-(--color-text-muted) max-w-md mx-auto mb-8 leading-relaxed">
          Your financial dashboard is currently empty. Let's get started by
          adding your first transaction or setting up a monthly budget to unlock
          your insights.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link
            to="/transactions"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-linear-to-br from-violet-500 to-violet-600 hover:from-violet-600 hover:to-violet-700 text-white font-semibold py-3 px-6 rounded-xl transition shadow-lg shadow-violet-500/30"
          >
            <PlusCircle size={18} /> Add Transaction
          </Link>
          <Link
            to="/budgets"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-(--color-bg-surface) border-2 border-(--color-border-main)] hover:border-(--color-divider) hover:bg-(--color-bg-hover) text-(--color-text-main) font-semibold py-3 px-6 rounded-xl transition"
          >
            <Target size={18} /> Set a Budget
          </Link>
        </div>
      </div>
    );
  }

  const totalSpent = budgets.reduce((sum, b) => sum + (b.spent || 0), 0);
  const totalBudget = budgets.reduce((sum, b) => sum + (b.amount || 0), 0);
  const aggPct = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;
  const aggColor =
    aggPct >= 100
      ? "var(--color-danger)"
      : aggPct >= 70
        ? "var(--color-warning)"
        : "var(--color-success)";

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-(--color-text-main) tracking-tight">
            Dashboard
          </h1>
          <p className="text-sm text-(--color-text-muted) mt-1.5">
            An overview of your finances this month
          </p>
        </div>
        <div className="text-left sm:text-right">
          <div className="text-xs font-medium text-(--color-text-ghost) uppercase tracking-wider mb-1">
            Total Balance
          </div>
          <div className="text-2xl font-bold text-(--color-text-main) tracking-tight">
            {formatCurrency(monthSummary.balance, currency)}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          label="This Month's Net"
          value={formatCurrency(monthSummary.monthlyNet, currency)}
          icon={monthSummary.monthlyNet >= 0 ? TrendingUp : TrendingDown}
          accent={monthSummary.monthlyNet >= 0 ? "emerald" : "rose"}
        />
        <KpiCard
          label="Income"
          value={formatCurrency(monthSummary.incomeThisMonth, currency)}
          icon={TrendingUp}
          accent="orange"
        />
        <KpiCard
          label="Expenses"
          value={formatCurrency(monthSummary.expenseThisMonth, currency)}
          icon={TrendingDown}
          accent="rose"
        />
        <KpiCard
          label="Savings Rate"
          value={`${monthSummary.savingsRate?.toFixed(1) || 0}%`}
          icon={PiggyBank}
          accent="blue"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-(--color-bg-surface) rounded-3xl border border-(--color-border-main) p-6">
          <div className="mb-5">
            <h2 className="text-lg font-bold text-(--color-text-main) tracking-tight">
              Monthly Trend
            </h2>
            <p className="text-xs text-(--color-text-muted) mt-1">
              Income vs expenses, last 6 months
            </p>
          </div>
          <MonthlyTrendChart data={monthTrends} currency={currency} />
        </div>
        <div className="bg-(--color-bg-surface) rounded-3xl border border-(--color-border-main) p-6">
          <div className="mb-5">
            <h2 className="text-lg font-bold text-(--color-text-main) tracking-tight">
              Top Categories
            </h2>
            <p className="text-xs text-(--color-text-muted) mt-1">
              Spending this month
            </p>
          </div>
          {categoryBreakDown.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-(--color-text-ghost)">
              <Receipt size={32} className="mb-2 opacity-50" />
              <p className="text-sm">No category data yet</p>
            </div>
          ) : (
            <CategoryBreakdownChart
              data={categoryBreakDown}
              currency={currency}
            />
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-(--color-bg-surface) rounded-3xl border border-(--color-border-main) p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-bold text-(--color-text-main) tracking-tight">
              Recent Transactions
            </h2>
            <Link
              to="/transactions"
              className="inline-flex items-center gap-1 text-sm font-medium text-violet-600 hover:text-violet-700 transition"
            >
              View all <ArrowRight size={14} />
            </Link>
          </div>
          {recentTransactions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <Receipt size={32} className="text-(--color-text-ghost) mb-3" />
              <p className="text-sm text-(--color-text-muted) mb-4">
                No transactions this month.
              </p>
              <Link
                to="/transactions"
                className="text-sm font-medium text-violet-600 hover:text-violet-700 bg-violet-500/10 px-4 py-2 rounded-lg transition"
              >
                Add a transaction
              </Link>
            </div>
          ) : (
            <div className="space-y-1">
              {recentTransactions.map((t) => (
                <div
                  key={t.id}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-(--color-bg-hover) transition"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <CategoryBadge
                      icon={t.category_icon}
                      color={t.category_color}
                      size="sm"
                    />
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-(--color-text-main) truncate">
                        {t.description || t.category_name || "Untitled"}
                      </div>
                      <div className="text-xs text-(--color-text-muted)">
                        {t.category_name || "Uncategorized"} ·{" "}
                        {formatDate(t.transaction_date)}
                      </div>
                    </div>
                  </div>
                  <span
                    className={`text-sm font-bold shrink-0 ${t.type === "income" ? "text-(--color-success)" : "text-(--color-danger)"}`}
                  >
                    {t.type === "income" ? "+" : "-"}
                    {formatCurrency(t.amount, currency)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="lg:col-span-5 bg-(--color-bg-surface) rounded-3xl border border-(--color-border-main) p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-bold text-(--color-text-main) tracking-tight">
              Budget Status
            </h2>
            <Link
              to="/budgets"
              className="inline-flex items-center gap-1 text-sm font-medium text-violet-600 hover:text-violet-700 transition"
            >
              View all <ArrowRight size={14} />
            </Link>
          </div>

          {budgetsLoading ? (
            <div className="flex justify-center py-10">
              <Spinner />
            </div>
          ) : budgets.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center bg-(--color-bg-muted)] rounded-2xl border border-dashed border-(--color-border-main)]">
              <div className="h-10 w-10 rounded-full bg-(--color-bg-surface)] shadow-sm flex items-center justify-center mb-3">
                <Target size={18} className="text-violet-400" />
              </div>
              <p className="text-sm font-semibold text-(--color-text-main)] mb-1">
                No active budgets
              </p>
              <p className="text-xs text-(--color-text-muted) mb-4 px-4">
                Keep your spending in check by setting limits.
              </p>
              <Link
                to="/budgets"
                className="text-xs text-white bg-(--color-accent) hover:bg-(--color-accent-hover) px-4 py-2 rounded-lg font-medium transition"
              >
                Create Budget
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-5">
                <div className="flex items-baseline justify-between mb-2">
                  <div>
                    <div className="text-2xl font-bold tracking-tight text-(--color-text-main)">
                      {formatCurrency(totalSpent, currency)}
                    </div>
                    <div className="text-xs text-(--color-text-muted) mt-0.5">
                      of {formatCurrency(totalBudget, currency)} total
                    </div>
                  </div>
                  <div className="text-right">
                    <div
                      className="text-sm font-bold"
                      style={{ color: aggColor }}
                    >
                      {aggPct.toFixed(0)}%
                    </div>
                    <div className="text-[10px] text-(--color-text-muted)">
                      used
                    </div>
                  </div>
                </div>
                <div className="h-2 bg-(--color-bg-muted) rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${Math.min(aggPct, 100)}%`,
                      backgroundColor: aggColor,
                    }}
                  />
                </div>
              </div>

              <div className="space-y-3">
                {budgets.slice(0, 4).map((b) => {
                  const pct =
                    b.amount > 0
                      ? Math.min((b.spent / b.amount) * 100, 100)
                      : 0;
                  const color =
                    pct >= 100
                      ? "var(--color-danger)"
                      : pct >= 70
                        ? "var(--color-warning)"
                        : "var(--color-success)";
                  const label =
                    b.categories?.map((c) => c.name).join(", ") || b.name;
                  return (
                    <div key={b.id}>
                      <div className="flex justify-between items-center text-xs mb-1.5">
                        <span className="text-(--color-text-main) font-medium truncate">
                          {label}
                        </span>
                        <span className="text-(--color-text-muted) shrink-0 ml-2 text-[11px]">
                          {formatCurrency(b.spent, currency)} /{" "}
                          {formatCurrency(b.amount, currency)}
                        </span>
                      </div>
                      <div className="h-1.5 bg-(--color-bg-muted) rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{ width: `${pct}%`, backgroundColor: color }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
