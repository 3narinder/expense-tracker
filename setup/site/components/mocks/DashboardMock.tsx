import { TrendingUp, TrendingDown, Wallet, Sparkles, Receipt } from "lucide-react";

export default function DashboardMock() {
  return (
    <div className="rounded-2xl border border-(--color-border-main) bg-(--color-bg-surface) shadow-2xl shadow-black/10 overflow-hidden">
      {/* window chrome */}
      <div className="flex items-center gap-1.5 border-b border-(--color-border-main) bg-(--color-bg-muted) px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-(--color-danger)/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-(--color-warning)/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-(--color-success)/70" />
        <span className="ml-3 text-[11px] font-medium text-(--color-text-muted)">
          expenseai.app/dashboard
        </span>
      </div>

      <div className="p-5 sm:p-6 space-y-5">
        {/* KPI row */}
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-xl border border-(--color-border-main) bg-(--color-bg-app) p-3">
            <div className="flex items-center gap-1.5 text-(--color-text-muted) text-[10px] font-semibold uppercase tracking-wide">
              <Wallet size={12} /> Balance
            </div>
            <div className="mt-1.5 text-lg font-bold text-(--color-text-main)">
              $12,547
            </div>
          </div>
          <div className="rounded-xl border border-(--color-border-main) bg-(--color-bg-app) p-3">
            <div className="flex items-center gap-1.5 text-(--color-text-muted) text-[10px] font-semibold uppercase tracking-wide">
              <TrendingUp size={12} /> Income
            </div>
            <div className="mt-1.5 text-lg font-bold text-(--color-success)">
              $6,320
            </div>
          </div>
          <div className="rounded-xl border border-(--color-border-main) bg-(--color-bg-app) p-3">
            <div className="flex items-center gap-1.5 text-(--color-text-muted) text-[10px] font-semibold uppercase tracking-wide">
              <TrendingDown size={12} /> Expenses
            </div>
            <div className="mt-1.5 text-lg font-bold text-(--color-danger)">
              $2,384
            </div>
          </div>
        </div>

        {/* AI + trend row */}
        <div className="grid grid-cols-5 gap-3">
          <div className="col-span-2 rounded-xl border border-(--color-border-main) bg-(--color-bg-app) p-3.5">
            <div className="flex items-center gap-2 mb-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-(--color-primary-soft)">
                <Sparkles size={12} className="text-(--color-primary)" />
              </span>
              <span className="text-[11px] font-bold text-(--color-text-main)">
                AI Snapshot
              </span>
            </div>
            <svg viewBox="0 0 80 80" className="mx-auto h-16 w-16 -rotate-90">
              <circle
                cx="40"
                cy="40"
                r="32"
                fill="none"
                stroke="var(--color-bg-muted)"
                strokeWidth="8"
              />
              <circle
                cx="40"
                cy="40"
                r="32"
                fill="none"
                stroke="var(--color-success)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray="201"
                strokeDashoffset="55"
              />
            </svg>
            <div className="text-center text-[11px] font-bold text-(--color-success) mt-1">
              82/100
            </div>
          </div>

          <div className="col-span-3 rounded-xl border border-(--color-border-main) bg-(--color-bg-app) p-3.5">
            <div className="text-[11px] font-bold text-(--color-text-main) mb-2">
              Monthly trend
            </div>
            <div className="flex items-end gap-1.5 h-16">
              {[40, 55, 35, 70, 50, 80, 60, 90, 65, 75, 58, 85].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-sm bg-(--color-primary)/70"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* budget + transactions row */}
        <div className="grid grid-cols-5 gap-3">
          <div className="col-span-2 rounded-xl border border-(--color-border-main) bg-(--color-bg-app) p-3.5 space-y-2.5">
            <div className="text-[11px] font-bold text-(--color-text-main)">
              Budgets
            </div>
            {[
              { label: "Food & Dining", pct: 62, color: "var(--color-success)" },
              { label: "Transport", pct: 88, color: "var(--color-warning)" },
              { label: "Shopping", pct: 105, color: "var(--color-danger)" },
            ].map((b) => (
              <div key={b.label}>
                <div className="flex justify-between text-[10px] text-(--color-text-muted) mb-1">
                  <span>{b.label}</span>
                  <span>{b.pct}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-(--color-bg-muted) overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${Math.min(b.pct, 100)}%`, backgroundColor: b.color }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="col-span-3 rounded-xl border border-(--color-border-main) bg-(--color-bg-app) p-3.5">
            <div className="flex items-center justify-between mb-2">
              <div className="text-[11px] font-bold text-(--color-text-main)">
                Recent transactions
              </div>
              <Receipt size={12} className="text-(--color-text-ghost)" />
            </div>
            <div className="space-y-1.5">
              {[
                { name: "Whole Foods Market", cat: "Groceries", amt: "-$87.20" },
                { name: "Salary deposit", cat: "Income", amt: "+$5,500.00", positive: true },
                { name: "Uber", cat: "Transport", amt: "-$18.40" },
              ].map((t) => (
                <div key={t.name} className="flex items-center justify-between text-[11px]">
                  <div className="min-w-0">
                    <div className="font-medium text-(--color-text-main) truncate">
                      {t.name}
                    </div>
                    <div className="text-(--color-text-muted) text-[10px]">{t.cat}</div>
                  </div>
                  <span
                    className={`font-bold shrink-0 ${
                      t.positive ? "text-(--color-success)" : "text-(--color-text-main)"
                    }`}
                  >
                    {t.amt}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
