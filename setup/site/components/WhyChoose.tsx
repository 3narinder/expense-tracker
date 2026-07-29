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
    <section className="py-24 sm:py-32 bg-(--color-bg-muted)">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-(--color-text-main)">
            Why people stick with ExpenseAI
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((r, i) => (
            <Reveal key={r.title} delay={i * 0.06}>
              <div className="h-full rounded-2xl bg-(--color-bg-surface) border border-(--color-border-main) p-6 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-(--color-primary-soft)">
                  <r.icon size={20} className="text-(--color-primary)" />
                </div>
                <h3 className="mt-4 font-bold text-(--color-text-main)">
                  {r.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-(--color-text-muted)">
                  {r.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
