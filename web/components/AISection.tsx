import { Sparkles, TrendingUp, Lightbulb, Gauge } from "lucide-react";
import Reveal from "./Reveal";

export default function AISection() {
  return (
    <section id="ai" className="py-24 sm:py-32 bg-(--color-bg-muted) relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-(--color-primary)/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-(--color-gold)/5 rounded-full blur-3xl" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full bg-(--color-primary-soft) px-3.5 py-1.5 text-xs font-semibold text-(--color-primary) animate-pulse-glow">
              <Sparkles size={13} />
              AI Insights
            </div>
            <h2 className="mt-6 font-display text-3xl sm:text-4xl font-semibold tracking-tight text-(--color-text-main)">
              Let AI read your ledger, so you don&apos;t have to
            </h2>
            <p className="mt-5 text-lg text-(--color-text-muted) leading-relaxed">
              On demand, ExpenseAI analyzes your recent transactions and
              generates two kinds of reports: a monthly summary with a
              financial health score, and a set of ranked savings tips based
              on your top spending categories.
            </p>

            <ul className="mt-8 space-y-5">
              <li className="flex gap-4 group">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-(--color-bg-surface) border border-(--color-border-main) group-hover:border-(--color-primary)/50 group-hover:shadow-lg group-hover:shadow-(--color-primary)/10 transition-all duration-300">
                  <TrendingUp size={16} className="text-(--color-primary)" />
                </span>
                <div>
                  <p className="font-semibold text-(--color-text-main)">
                    Monthly summary
                  </p>
                  <p className="text-sm text-(--color-text-muted) mt-0.5">
                    A plain-English breakdown of income, expenses, and a
                    0–100 health score with concrete recommendations.
                  </p>
                </div>
              </li>
              <li className="flex gap-4 group">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-(--color-bg-surface) border border-(--color-border-main) group-hover:border-(--color-gold)/50 group-hover:shadow-lg group-hover:shadow-(--color-gold)/10 transition-all duration-300">
                  <Lightbulb size={16} className="text-(--color-gold)" />
                </span>
                <div>
                  <p className="font-semibold text-(--color-text-main)">
                    Savings tips
                  </p>
                  <p className="text-sm text-(--color-text-muted) mt-0.5">
                    Tailored, ranked suggestions built from your last 30 days
                    of spending, with an estimated potential monthly saving.
                  </p>
                </div>
              </li>
              <li className="flex gap-4 group">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-(--color-bg-surface) border border-(--color-border-main) group-hover:border-(--color-success)/50 group-hover:shadow-lg group-hover:shadow-(--color-success)/10 transition-all duration-300">
                  <Gauge size={16} className="text-(--color-success)" />
                </span>
                <div>
                  <p className="font-semibold text-(--color-text-main)">
                    Usage that scales with your plan
                  </p>
                  <p className="text-sm text-(--color-text-muted) mt-0.5">
                    Every insight is kept on file so you can look back at how
                    your habits changed, and daily generation limits scale
                    up across basic, personal, and premium plans.
                  </p>
                </div>
              </li>
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-(--color-border-main) bg-(--color-bg-surface) p-6 shadow-xl hover:shadow-2xl hover:shadow-(--color-primary)/10 transition-all duration-500 animate-scale-in">
              <div className="flex items-start justify-between gap-4 mb-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-(--color-primary-soft) animate-pulse-glow">
                    <Sparkles size={18} className="text-(--color-primary)" />
                  </span>
                  <div>
                    <p className="font-bold text-(--color-text-main)">
                      AI Monthly Snapshot
                    </p>
                    <p className="text-xs text-(--color-text-muted)">
                      Updated 2 hours ago
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 items-center gap-4">
                <svg viewBox="0 0 80 80" className="h-20 w-20 -rotate-90">
                  <circle cx="40" cy="40" r="32" fill="none" stroke="var(--color-bg-muted)" strokeWidth="9" />
                  <circle
                    cx="40" cy="40" r="32" fill="none"
                    stroke="var(--color-success)" strokeWidth="9"
                    strokeLinecap="round" strokeDasharray="201" strokeDashoffset="42"
                    className="animate-[gaugeSpin_2s_ease-out_forwards]"
                  />
                </svg>
                <div className="col-span-2">
                  <div className="text-3xl font-bold text-(--color-success)">
                    79/100
                  </div>
                  <p className="text-sm text-(--color-text-main) mt-1 leading-relaxed">
                    Spending stayed within budget across most categories this
                    month, with a healthy savings rate.
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-xl border border-dashed border-(--color-border-main) p-4 bg-(--color-bg-muted)/30">
                <p className="text-xs font-semibold text-(--color-text-muted) uppercase tracking-wide mb-1">
                  Next step
                </p>
                <p className="text-sm text-(--color-text-main)">
                  Dining out is trending 18% above last month — consider
                  setting a dedicated budget for it.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
