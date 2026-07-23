import { useState } from "react";
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
  Sparkles,
  Bot,
  Crown,
  Zap,
} from "lucide-react";
import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

import { formatCurrency, formatDate, timeAgo } from "../utils/format.js";
import { useCurrentUser } from "../features/Authentication/useCurrentUser.js";
import { useDashboardData } from "../features/Dashboard/useDashboardData.js";
import { useBudgets } from "../features/Budgets/useBudgets.js";
import { useBudgetActions } from "../features/Budgets/useBudgetActions.js";
import { useCategories } from "../features/Categories/useCategories.js";
import { useAccounts } from "../features/Accounts/useAccounts.js";
import {
  useGenerateInsight,
  useLatestInsightByType,
  useInsightEligibility,
} from "../features/AiInsights/useInsights.js";

import KpiCard from "../components/KpiCard.jsx";
import CategoryBadge from "../components/CategoryBadge.jsx";
import MonthlyTrendChart from "../components/charts/MonthlyTrendChart.jsx";
import CategoryBreakdownChart from "../components/charts/CategoryBreakdownChart.jsx";
import Spinner from "../components/Spinner.jsx";
import Button from "../components/ui/Button.jsx";
import Modal from "../components/ui/Modal.jsx";
import TransactionForm from "../components/transactions/TransactionForm.jsx";
import BudgetForm from "../components/BudgetForm.jsx";

const scoreTone = (score) =>
  score >= 70
    ? "text-[var(--color-success)]"
    : score >= 40
      ? "text-[var(--color-warning)]"
      : "text-[var(--color-danger)]";

const PlanBadge = ({ eligibility }) => {
  if (!eligibility) return null;

  const isPremium = eligibility.plan?.toLowerCase() === "premium";
  const Icon = isPremium ? Crown : Zap;

  const badgeClasses = isPremium
    ? "bg-gradient-to-r from-amber-50 to-amber-100/50 border-amber-200 text-amber-900"
    : "bg-[var(--color-bg-muted)] border-[var(--color-border-main)] text-[var(--color-text-main)]";

  const iconClasses = isPremium
    ? "text-amber-600"
    : "text-[var(--color-text-muted)]";
  const statClasses = isPremium
    ? "text-amber-700/80"
    : "text-[var(--color-text-muted)]";

  return (
    <div
      className={`inline-flex items-center gap-3 px-3 py-1.5 rounded-lg border shadow-sm ${badgeClasses} transition-all`}
    >
      <div className="flex items-center gap-1.5">
        <Icon size={14} className={iconClasses} />
        <span className="text-xs font-semibold capitalize tracking-wide">
          {eligibility.plan}
        </span>
      </div>

      <div
        className={`w-px h-3 ${isPremium ? "bg-amber-300" : "bg-(--color-border-main)"}`}
      />

      <div
        className={`flex items-center gap-1.5 text-[11px] font-medium ${statClasses}`}
      >
        <span>AI uses left today:</span>
        <span
          className={`font-mono-tab px-1.5 py-0.5 rounded-md ${isPremium ? "bg-amber-200/50" : "bg-(--color-bg-surface) border border-(--color-border-main)"}`}
        >
          {eligibility.remainingToday} / {eligibility.dailyLimit}
        </span>
      </div>
    </div>
  );
};

const DashboardAIInsightCard = ({
  insight,
  onGenerate,
  isGenerating,
  eligibilityMessage = "",
}) => {
  if (!insight) {
    return (
      <div className="bg-(--color-bg-surface) rounded-3xl border border-(--color-border-main) p-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-10 w-10 rounded-xl bg-(--color-primary-soft) flex items-center justify-center">
            <Bot size={18} className="text-(--color-primary)" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-(--color-text-main)">
              AI Monthly Snapshot
            </h2>
            <p className="text-xs text-(--color-text-muted)">
              Generate a concise monthly summary and health score
            </p>
          </div>
        </div>
        <Button onClick={onGenerate} disabled={isGenerating}>
          <Sparkles size={16} />
          {isGenerating ? "Generating..." : "Create Insight"}
        </Button>
        {eligibilityMessage && (
          <p className="text-xs text-(--color-warning) mt-2">
            {eligibilityMessage}
          </p>
        )}
      </div>
    );
  }

  const c = insight.content_json || {};
  const score = Number(c.health_score) || 0;
  const gaugeData = [{ value: Math.max(0, Math.min(100, score)) }];
  const summary = c.summary || "Your monthly AI summary is ready.";

  return (
    <div className="bg-(--color-bg-surface) rounded-3xl border border-(--color-border-main) p-6">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <h2 className="text-lg font-bold text-(--color-text-main)">
            AI Monthly Snapshot
          </h2>
          <p className="text-xs text-(--color-text-muted) mt-1">
            Updated {timeAgo(insight.created_at)}
          </p>
        </div>
        <Button
          size="sm"
          variant="outline"
          onClick={onGenerate}
          disabled={isGenerating}
        >
          <Sparkles size={14} />
          {isGenerating ? "Refreshing..." : "Refresh"}
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
        <div className="h-36">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              data={gaugeData}
              innerRadius="70%"
              outerRadius="100%"
              startAngle={90}
              endAngle={-270}
              barSize={14}
            >
              <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
              <RadialBar
                dataKey="value"
                cornerRadius={10}
                fill={
                  score >= 70
                    ? "var(--color-success)"
                    : score >= 40
                      ? "var(--color-warning)"
                      : "var(--color-danger)"
                }
                background={{ fill: "var(--color-bg-muted)" }}
              />
            </RadialBarChart>
          </ResponsiveContainer>
        </div>
        <div className="sm:col-span-2">
          <div
            className={`text-3xl font-bold tracking-tight mb-1 ${scoreTone(score)}`}
          >
            {score}/100
          </div>
          <p className="text-sm text-(--color-text-main) leading-relaxed">
            {summary}
          </p>
          {c.recommendations?.length > 0 && (
            <p className="text-xs text-(--color-text-muted) mt-2">
              Next step: {c.recommendations[0]}
            </p>
          )}
          <Link
            to="/insights"
            className="inline-flex items-center gap-1 text-sm font-medium text-(--color-primary) hover:text-(--color-primary-hover) mt-3"
          >
            Open full insights <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
};

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
  const { categories = [] } = useCategories();
  const { accounts = [] } = useAccounts();
  const { addBudget } = useBudgetActions();
  const { generate, isGenerating } = useGenerateInsight();
  const { eligibility } = useInsightEligibility();
  const { insight: latestMonthlyInsight } =
    useLatestInsightByType("monthly_summary");
  const currency = user?.currency || "USD";

  const [transactionModalOpen, setTransactionModalOpen] = useState(false);
  const [budgetModalOpen, setBudgetModalOpen] = useState(false);

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

  const totalSpent = budgets.reduce((sum, b) => sum + (b.spent || 0), 0);
  const totalBudget = budgets.reduce((sum, b) => sum + (b.amount || 0), 0);
  const aggPct = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;
  const aggColor =
    aggPct >= 100
      ? "var(--color-danger)"
      : aggPct >= 70
        ? "var(--color-warning)"
        : "var(--color-success)";

  const handleCreateBudget = (formData) =>
    new Promise((resolve, reject) => {
      const payload = {
        name: formData.name.trim(),
        categoryIds: formData.categoryIds,
        amount: parseFloat(formData.amount),
        period: formData.period,
        startDate: formData.startDate,
        alertThreshold: formData.alertThreshold,
      };

      addBudget(payload, {
        onSuccess: () => {
          setBudgetModalOpen(false);
          resolve();
        },
        onError: reject,
      });
    });

  const quickActions = (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 w-full lg:max-w-3xl">
      <Button
        onClick={() => setTransactionModalOpen(true)}
        className="w-full justify-center"
      >
        <PlusCircle size={16} /> Add Transaction
      </Button>
      <Button
        variant="outline"
        onClick={() => setBudgetModalOpen(true)}
        className="w-full justify-center"
      >
        <Target size={16} /> Add Budget
      </Button>
      <Button
        variant="outline"
        onClick={() => generate("monthly_summary")}
        disabled={isGenerating}
        className="w-full justify-center"
      >
        <Sparkles size={16} />
        {isGenerating ? "Creating..." : "Create Insight"}
      </Button>
    </div>
  );

  if (hasNoData) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <div className="h-24 w-24 bg-linear-to-br from-(--color-primary-soft) to-(--color-bg-surface) rounded-full flex items-center justify-center mb-6 shadow-inner">
          <Wallet size={40} className="text-(--color-primary)" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-(--color-text-main) tracking-tight mb-3">
          Welcome to ExpenseAI!
        </h1>
        <p className="text-(--color-text-muted) max-w-md mx-auto mb-8 leading-relaxed">
          Your dashboard is empty right now. Add a transaction, set a budget, or
          generate your first AI monthly summary.
        </p>
        {quickActions}

        <div className="mt-5 flex justify-center">
          <PlanBadge eligibility={eligibility} />
        </div>

        <Modal
          open={transactionModalOpen}
          onClose={() => setTransactionModalOpen(false)}
          title="New Transaction"
        >
          <TransactionForm
            categories={categories}
            accounts={accounts}
            onSaved={() => setTransactionModalOpen(false)}
            onCancel={() => setTransactionModalOpen(false)}
          />
        </Modal>

        <Modal
          open={budgetModalOpen}
          onClose={() => setBudgetModalOpen(false)}
          title="New Budget"
        >
          <BudgetForm
            categories={categories}
            onSaved={handleCreateBudget}
            onCancel={() => setBudgetModalOpen(false)}
          />
        </Modal>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-(--color-bg-surface) rounded-3xl border border-(--color-border-main) p-5 md:p-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-(--color-text-main) tracking-tight">
              Dashboard
            </h1>
            <p className="text-sm text-(--color-text-muted) mt-1.5">
              An overview of your finances this month
            </p>
          </div>
          <div className="inline-flex items-center gap-3 px-4 py-3 rounded-2xl bg-(--color-bg-muted) border border-(--color-border-main)">
            <div className="h-9 w-9 rounded-xl bg-(--color-primary-soft) text-(--color-primary) flex items-center justify-center">
              <Wallet size={16} />
            </div>
            <div className="text-left">
              <div className="text-[11px] font-medium text-(--color-text-ghost) uppercase tracking-wider">
                Total Balance
              </div>
              <div className="text-2xl font-bold text-(--color-text-main) tracking-tight">
                {formatCurrency(monthSummary.balance, currency)}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4">
          {quickActions}
          <div className="mt-5 flex md:justify-start sm:justify-center">
            <PlanBadge eligibility={eligibility} />
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

      <DashboardAIInsightCard
        insight={latestMonthlyInsight}
        onGenerate={() => generate("monthly_summary")}
        isGenerating={isGenerating}
        eligibilityMessage={
          eligibility?.canGenerate === false ? eligibility.message : ""
        }
      />

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
              className="inline-flex items-center gap-1 text-sm font-medium text-(--color-primary) hover:text-(--color-primary-hover) transition"
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
              <Button size="sm" onClick={() => setTransactionModalOpen(true)}>
                Add a transaction
              </Button>
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
              className="inline-flex items-center gap-1 text-sm font-medium text-(--color-primary) hover:text-(--color-primary-hover) transition"
            >
              View all <ArrowRight size={14} />
            </Link>
          </div>

          {budgetsLoading ? (
            <div className="flex justify-center py-10">
              <Spinner />
            </div>
          ) : budgets.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center bg-(--color-bg-muted) rounded-2xl border border-dashed border-(--color-border-main)">
              <div className="h-10 w-10 rounded-full bg-(--color-bg-surface) shadow-sm flex items-center justify-center mb-3">
                <Target size={18} className="text-(--color-primary)" />
              </div>
              <p className="text-sm font-semibold text-(--color-text-main) mb-1">
                No active budgets
              </p>
              <p className="text-xs text-(--color-text-muted) mb-4 px-4">
                Keep your spending in check by setting limits.
              </p>
              <Button size="sm" onClick={() => setBudgetModalOpen(true)}>
                Create Budget
              </Button>
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

      <Modal
        open={transactionModalOpen}
        onClose={() => setTransactionModalOpen(false)}
        title="New Transaction"
      >
        <TransactionForm
          categories={categories}
          accounts={accounts}
          onSaved={() => setTransactionModalOpen(false)}
          onCancel={() => setTransactionModalOpen(false)}
        />
      </Modal>

      <Modal
        open={budgetModalOpen}
        onClose={() => setBudgetModalOpen(false)}
        title="New Budget"
      >
        <BudgetForm
          categories={categories}
          onSaved={handleCreateBudget}
          onCancel={() => setBudgetModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default Dashboard;
