import { Target, CalendarClock, BellRing } from "lucide-react";
import Reveal from "./Reveal";

const budgets = [
  { label: "Food & Dining", spent: 248, total: 400, pct: 62, color: "var(--color-success)" },
  { label: "Transport", spent: 176, total: 200, pct: 88, color: "var(--color-warning)" },
  { label: "Shopping", spent: 315, total: 300, pct: 105, color: "var(--color-danger)" },
  { label: "Entertainment", spent: 40, total: 150, pct: 27, color: "var(--color-success)" },
];

export default function BudgetSection() {
  return (
    <section className="py-24 sm:py-32 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-(--color-success)/5 rounded-full blur-3xl" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <Reveal className="order-2 lg:order-1">
            <div className="rounded-2xl border border-(--color-border-main) bg-(--color-bg-surface) p-6 shadow-xl hover:shadow-2xl hover:shadow-(--color-success)/10 transition-all duration-500">
              <div className="flex items-center justify-between mb-5">
                <p className="font-bold text-(--color-text-main)">
                  Budget status
                </p>
                <span className="text-xs font-semibold text-(--color-text-muted)">
                  This month
                </span>
              </div>
              <div className="space-y-5">
                {budgets.map((b) => (
                  <div key={b.label} className="group">
                    <div className="flex justify-between items-baseline text-sm mb-1.5">
                      <span className="font-medium text-(--color-text-main) group-hover:text-(--color-primary) transition-colors">
                        {b.label}
                      </span>
                      <span className="text-xs text-(--color-text-muted)">
                        ${b.spent} / ${b.total}
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-(--color-bg-muted) overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000 ease-out group-hover:brightness-110"
                        style={{ width: `${Math.min(b.pct, 100)}%`, backgroundColor: b.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-(--color-success-soft) px-3.5 py-1.5 text-xs font-semibold text-(--color-success-foreground) animate-pulse-glow">
              <Target size={13} />
              Budgets
            </div>
            <h2 className="mt-6 font-display text-3xl sm:text-4xl font-semibold tracking-tight text-(--color-text-main)">
              Set the limit once. Watch it enforce itself.
            </h2>
            <p className="mt-5 text-lg text-(--color-text-muted) leading-relaxed">
              Create a budget for one category or a group of them, choose how
              often it resets, and every new transaction updates your
              progress automatically.
            </p>

            <ul className="mt-8 space-y-5">
              <li className="flex gap-4 group">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-(--color-bg-muted) group-hover:bg-(--color-primary-soft) group-hover:shadow-lg group-hover:shadow-(--color-primary)/10 transition-all duration-300">
                  <CalendarClock size={16} className="text-(--color-primary)" />
                </span>
                <div>
                  <p className="font-semibold text-(--color-text-main)">
                    Weekly, monthly, or quarterly
                  </p>
                  <p className="text-sm text-(--color-text-muted) mt-0.5">
                    Pick the period that matches how you actually plan your
                    spending.
                  </p>
                </div>
              </li>
              <li className="flex gap-4 group">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-(--color-bg-muted) group-hover:bg-(--color-warning-soft) group-hover:shadow-lg group-hover:shadow-(--color-warning)/10 transition-all duration-300">
                  <BellRing size={16} className="text-(--color-warning)" />
                </span>
                <div>
                  <p className="font-semibold text-(--color-text-main)">
                    Color-coded before you overspend
                  </p>
                  <p className="text-sm text-(--color-text-muted) mt-0.5">
                    Progress bars shift from green to amber at 70% used, and
                    to red once you go over — a glance tells you where you
                    stand.
                  </p>
                </div>
              </li>
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
