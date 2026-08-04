import { ShieldCheck, Zap, Layers, Moon } from "lucide-react";
import Reveal from "./Reveal";

const reasons = [
  {
    icon: Layers,
    title: "One place for everything",
    description:
      "Transactions, categories, budgets, and AI insights live in a single connected app instead of scattered spreadsheets.",
  },
  {
    icon: Zap,
    title: "Fast, focused interface",
    description:
      "No clutter, no busywork. Every screen is built around the one thing you came to do.",
  },
  {
    icon: ShieldCheck,
    title: "Your data, protected",
    description:
      "Accounts sit behind authenticated, protected routes — your finances stay yours.",
  },
  {
    icon: Moon,
    title: "Looks good day or night",
    description:
      "A refined light and dark theme that follows your system preference automatically.",
  },
];

export default function WhyChoose() {
  return (
    <section className="bg-(--color-bg-muted) py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-(--color-violet)/25 bg-(--color-violet-soft) px-4 py-2 text-xs font-mono font-semibold uppercase tracking-[0.14em] text-(--color-violet)">
            <span className="h-1.5 w-1.5 rounded-full bg-(--color-violet) shadow-[0_0_8px_var(--color-violet)]" />
            Why ExpenseAI
          </div>
          <h2 className="mt-8 font-display text-3xl font-semibold tracking-tight text-(--color-text-main) sm:text-4xl">
            Why people stick with ExpenseAI
          </h2>
          <p className="mt-4 text-lg leading-8 text-(--color-text-muted)">
            Calm automation, thoughtful defaults, and a polished experience that feels effortless from day one.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <Reveal key={reason.title} delay={index * 0.06}>
                <div className="h-full rounded-2xl border border-(--color-border-main)/70 bg-(--color-bg-surface)/90 p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_-38px_rgba(124,108,246,0.28)] backdrop-blur-xl">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-(--color-violet-soft)">
                    <Icon size={20} className="text-(--color-violet)" />
                  </div>
                  <h3 className="mt-5 font-semibold text-(--color-text-main)">{reason.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-(--color-text-muted)">{reason.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
