import { Sparkles, TrendingUp, Lightbulb, Gauge } from "lucide-react";
import Reveal from "./Reveal";
import ResponsiveImageFrame from "./ResponsiveImageFrame";

export default function AISection() {
  return (
    <section
      id="ai"
      className="py-24 sm:py-32 bg-(--color-bg-muted) relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-96 h-96 bg-(--color-primary)/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-(--color-gold)/5 rounded-full blur-3xl" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
        <div className="grid items-center gap-16 lg:grid-cols-[1.618fr_1fr]">
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
              generates two kinds of reports: a monthly summary with a financial
              health score, and a set of ranked savings tips based on your top
              spending categories.
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
                    A plain-English breakdown of income, expenses, and a 0–100
                    health score with concrete recommendations.
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
                    Tailored, ranked suggestions built from your last 30 days of
                    spending, with an estimated potential monthly saving.
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
                    your habits changed, and daily generation limits scale up
                    across basic, personal, and premium plans.
                  </p>
                </div>
              </li>
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="h-full rounded-[1.5rem] border border-(--color-border-main) bg-linear-to-br from-(--color-bg-surface) via-(--color-bg-subtle) to-(--color-bg-muted) p-4 sm:p-6 shadow-[0_22px_70px_-34px_rgba(15,23,42,0.28)] transition-all duration-500 hover:shadow-[0_30px_80px_-28px_rgba(91,76,240,0.28)]">
              <ResponsiveImageFrame
                src="/Ai_image.png"
                alt="AI insights experience"
                aspectClassName="aspect-[16/7]"
                wrapperClassName="w-full border-0 bg-transparent p-0 shadow-none"
                imageClassName="rounded-[0.95rem]"
                priority
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
