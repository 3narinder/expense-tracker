import { BarChart3, PieChart } from "lucide-react";
import Reveal from "./Reveal";

const categoryBreakdown = [
  { name: "Housing", value: 38, color: "var(--color-primary)" },
  { name: "Food", value: 24, color: "var(--color-warning)" },
  { name: "Transport", value: 16, color: "var(--color-info)" },
  { name: "Other", value: 22, color: "var(--color-text-ghost)" },
];

export default function AnalyticsSection() {
  const circumference = 2 * Math.PI * 32;
  let cumulative = 0;

  return (
    <section id="analytics" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-(--color-text-main)">
            See your spending, not just your statements
          </h2>
          <p className="mt-4 text-lg text-(--color-text-muted)">
            Monthly trend lines and category breakdowns turn a list of
            transactions into a picture you can act on.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-2xl border border-(--color-border-main) bg-(--color-bg-surface) p-6">
              <div className="flex items-center gap-2 mb-6">
                <BarChart3 size={18} className="text-(--color-primary)" />
                <p className="font-bold text-(--color-text-main)">
                  Income vs. expenses
                </p>
              </div>
              <div className="flex items-end gap-3 h-48">
                {[
                  { income: 70, expense: 40 },
                  { income: 85, expense: 55 },
                  { income: 60, expense: 35 },
                  { income: 95, expense: 50 },
                  { income: 75, expense: 65 },
                  { income: 100, expense: 45 },
                ].map((m, i) => (
                  <div key={i} className="flex-1 flex items-end gap-1 h-full">
                    <div
                      className="flex-1 rounded-t-md bg-(--color-success)/70"
                      style={{ height: `${m.income}%` }}
                    />
                    <div
                      className="flex-1 rounded-t-md bg-(--color-danger)/60"
                      style={{ height: `${m.expense}%` }}
                    />
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-4 text-xs text-(--color-text-muted)">
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-(--color-success)/70" /> Income
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-(--color-danger)/60" /> Expenses
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="h-full rounded-2xl border border-(--color-border-main) bg-(--color-bg-surface) p-6">
              <div className="flex items-center gap-2 mb-6">
                <PieChart size={18} className="text-(--color-primary)" />
                <p className="font-bold text-(--color-text-main)">
                  Spending by category
                </p>
              </div>
              <div className="flex items-center gap-8">
                <svg viewBox="0 0 80 80" className="h-32 w-32 -rotate-90 shrink-0">
                  {categoryBreakdown.map((c) => {
                    const dash = (c.value / 100) * circumference;
                    const offset = cumulative;
                    cumulative += dash;
                    return (
                      <circle
                        key={c.name}
                        cx="40"
                        cy="40"
                        r="32"
                        fill="none"
                        stroke={c.color}
                        strokeWidth="12"
                        strokeDasharray={`${dash} ${circumference - dash}`}
                        strokeDashoffset={-offset}
                      />
                    );
                  })}
                </svg>
                <div className="space-y-2.5 flex-1">
                  {categoryBreakdown.map((c) => (
                    <div key={c.name} className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 text-(--color-text-main) font-medium">
                        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: c.color }} />
                        {c.name}
                      </span>
                      <span className="text-(--color-text-muted)">{c.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
