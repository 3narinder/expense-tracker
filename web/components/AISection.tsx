import { Sparkles, TrendingUp, Lightbulb, Gauge } from "lucide-react";
import Reveal from "./Reveal";
import ResponsiveImageFrame from "./ResponsiveImageFrame";

const points = [
  {
    icon: TrendingUp,
    title: "Monthly summary",
    description:
      "A plain-English breakdown of income, expenses, and a 0–100 health score with concrete recommendations.",
  },
  {
    icon: Lightbulb,
    title: "Savings tips",
    description:
      "Tailored, ranked suggestions built from your last 30 days of spending, with an estimated potential monthly saving.",
  },
  {
    icon: Gauge,
    title: "Usage that scales with your plan",
    description:
      "Every insight is kept on file so you can look back at how your habits changed, and daily generation limits scale up across basic, personal, and premium plans.",
  },
];

export default function AISection() {
  return (
    <section id="ai" className="relative overflow-hidden bg-(--color-bg-muted) py-24 sm:py-32">
      <div aria-hidden className="absolute left-0 top-0 h-96 w-96 rounded-full bg-(--color-violet)/8 blur-3xl" />
      <div aria-hidden className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-(--color-gold)/8 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-(--color-gold)/25 bg-(--color-gold-soft) px-4 py-2 text-xs font-mono font-semibold uppercase tracking-[0.14em] text-(--color-gold)">
            <span className="h-1.5 w-1.5 rounded-full bg-(--color-gold) shadow-[0_0_8px_var(--color-gold)]" />
            AI Insights
          </div>
          <h2 className="mt-8 font-display text-3xl font-semibold tracking-tight text-(--color-text-main) sm:text-4xl">
            Let AI read your ledger, so you don&apos;t have to
          </h2>
          <p className="mt-4 text-lg leading-8 text-(--color-text-muted)">
            On demand, ExpenseAI analyzes your recent transactions and generates two kinds of reports: a monthly summary with a financial health score, and a set of ranked savings tips based on your top spending categories.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <Reveal>
            <div className="max-w-2xl">
              <ul className="space-y-5">
                {points.map((point) => {
                  const Icon = point.icon;
                  return (
                    <li key={point.title} className="flex gap-4 rounded-2xl border border-(--color-border-main)/70 bg-(--color-bg-surface)/90 p-5 backdrop-blur-xl">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-(--color-violet-soft)">
                        <Icon size={16} className="text-(--color-violet)" />
                      </span>
                      <div>
                        <p className="font-semibold text-(--color-text-main)">{point.title}</p>
                        <p className="mt-1 text-sm leading-7 text-(--color-text-muted)">{point.description}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="relative">
              {/*
              <ResponsiveImageFrame
                src="/Ai_Image.png"
                alt="AI insights experience"
                aspectClassName="aspect-[2267/1013]"
                wrapperClassName="w-full"
                imageClassName="rounded-[1.15rem]"
                priority
              />
              */}
              <div className="aspect-[2267/1013] w-full rounded-2xl border-2 border-dashed border-(--color-border-muted) bg-(--color-bg-subtle)" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
