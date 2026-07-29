import Reveal from "./Reveal";

const features = [
  {
    title: "Transaction tracking",
    description:
      "Log income and expenses in seconds, tag them with categories and accounts, then search, filter, and sort your full history by date range, type, or keyword.",
  },
  {
    title: "Budgets that watch themselves",
    description:
      "Set weekly, monthly, or quarterly limits per category. Progress bars shift from green to amber to red as you approach your cap — no manual checking required.",
  },
  {
    title: "AI monthly summaries",
    description:
      "Generate a plain-English breakdown of your month, complete with a 0–100 financial health score and next-step recommendations.",
    highlight: true,
  },
  {
    title: "Custom categories",
    description:
      "Create and edit your own income and expense categories, each with its own icon and color, so every transaction lands exactly where it should.",
  },
  {
    title: "Multiple accounts, one view",
    description:
      "Track balances across accounts and currencies — USD, INR, EUR, or GBP — and see everything roll up into a single dashboard.",
  },
  {
    title: "Powerful filtering",
    description:
      "Narrow transactions by category, account, type, or custom date range, then bulk-select and delete in one action when you need to clean up.",
  },
  {
    title: "CSV export",
    description:
      "Pull your filtered transaction data out as a CSV whenever you need it for taxes, spreadsheets, or a second opinion.",
  },
  {
    title: "Light & dark mode",
    description:
      "The whole interface adapts to your system theme, or you can switch manually — with the same calm, uncluttered layout either way.",
  },
];

export default function Features() {
  return (
    <section id="features" className="relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden className="absolute inset-0 bg-linear-to-b from-(--color-bg-muted)/70 via-transparent to-(--color-bg-surface)" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-(--color-border-main)/70 bg-(--color-bg-surface)/90 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-(--color-text-muted)">
            Core features
          </div>
          <h2 className="mt-6 font-display text-3xl font-semibold tracking-tight text-(--color-text-main) sm:text-4xl">
            Everything you need, nothing you don&apos;t
          </h2>
          <p className="mt-4 text-lg leading-8 text-(--color-text-muted)">
            ExpenseAI keeps personal finance simple: track what happened, budget what&apos;s next, and let AI handle the analysis.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {features.map((feature, index) => (
            <Reveal key={feature.title} delay={index * 0.04}>
              <div
                className={`relative h-full rounded-[1.6rem] border p-6 transition-all duration-300 hover:-translate-y-1 ${
                  feature.highlight
                    ? "border-(--color-gold)/35 bg-linear-to-b from-(--color-gold-soft)/70 to-(--color-bg-surface) shadow-[0_25px_80px_-40px_rgba(201,138,26,0.35)]"
                    : "border-(--color-border-main)/70 bg-(--color-bg-surface) hover:border-(--color-primary)/40 hover:shadow-[0_24px_70px_-38px_rgba(91,76,240,0.3)]"
                }`}
              >
                {feature.highlight && (
                  <span className="absolute right-5 top-[-0.9rem] rounded-full bg-linear-to-r from-(--color-gold) to-(--color-warning) px-2.5 py-0.75 text-[10px] font-bold uppercase tracking-[0.2em] text-white shadow-sm">
                    Most loved
                  </span>
                )}
                <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${feature.highlight ? "bg-(--color-gold)/15" : "bg-(--color-primary-soft)"}`}>
                  <span className={`text-sm font-semibold ${feature.highlight ? "text-(--color-gold)" : "text-(--color-primary)"}`}>
                    {index + 1}
                  </span>
                </div>
                <h3 className="mt-5 text-base font-semibold text-(--color-text-main)">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-(--color-text-muted)">
                  {feature.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
