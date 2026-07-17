import {
  ArrowLeftRight,
  Target,
  Sparkles,
  Folder,
  Wallet,
  Moon,
  Search,
  DownloadCloud,
} from "lucide-react";
import Reveal from "./Reveal";

const features = [
  {
    icon: ArrowLeftRight,
    title: "Transaction tracking",
    description:
      "Log income and expenses in seconds, tag them with categories and accounts, then search, filter, and sort your full history by date range, type, or keyword.",
  },
  {
    icon: Target,
    title: "Budgets that watch themselves",
    description:
      "Set weekly, monthly, or quarterly limits per category. Progress bars shift from green to amber to red as you approach your cap — no manual checking required.",
  },
  {
    icon: Sparkles,
    title: "AI monthly summaries",
    description:
      "Generate a plain-English breakdown of your month, complete with a 0–100 financial health score and next-step recommendations.",
  },
  {
    icon: Folder,
    title: "Custom categories",
    description:
      "Create and edit your own income and expense categories, each with its own icon and color, so every transaction lands exactly where it should.",
  },
  {
    icon: Wallet,
    title: "Multiple accounts, one view",
    description:
      "Track balances across accounts and currencies — USD, INR, EUR, or GBP — and see everything roll up into a single dashboard.",
  },
  {
    icon: Search,
    title: "Powerful filtering",
    description:
      "Narrow transactions by category, account, type, or custom date range, then bulk-select and delete in one action when you need to clean up.",
  },
  {
    icon: DownloadCloud,
    title: "CSV export",
    description:
      "Pull your filtered transaction data out as a CSV whenever you need it for taxes, spreadsheets, or a second opinion.",
  },
  {
    icon: Moon,
    title: "Light & dark mode",
    description:
      "The whole interface adapts to your system theme, or you can switch manually — with the same calm, uncluttered layout either way.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-(--color-text-main)">
            Everything you need, nothing you don&apos;t
          </h2>
          <p className="mt-4 text-lg text-(--color-text-muted)">
            ExpenseAI keeps personal finance simple: track what happened,
            budget what&apos;s next, and let AI handle the analysis.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={(i % 4) * 0.06}>
              <div className="h-full rounded-2xl border border-(--color-border-main) bg-(--color-bg-surface) p-6 hover:border-(--color-primary)/40 hover:shadow-lg hover:shadow-black/5 transition-all">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-(--color-primary-soft)">
                  <f.icon size={20} className="text-(--color-primary)" />
                </div>
                <h3 className="mt-4 text-base font-bold text-(--color-text-main)">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-(--color-text-muted)">
                  {f.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
