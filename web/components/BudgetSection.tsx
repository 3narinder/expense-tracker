import { Target, CalendarClock, BellRing } from "lucide-react";
import Reveal from "./Reveal";
import ResponsiveImageFrame from "./ResponsiveImageFrame";

export default function BudgetSection() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <Reveal className="order-2 lg:order-1">
            <ResponsiveImageFrame
              src="/budget_image.png"
              alt="Budget planning dashboard"
              aspectClassName="aspect-[896/528]"
              wrapperClassName="w-full"
              imageClassName="rounded-[1.15rem]"
              priority
            />
          </Reveal>

          <Reveal delay={0.08} className="order-1 lg:order-2">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-(--color-success-soft) px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-(--color-success-foreground)">
                <Target size={13} />
                Budgets
              </div>
              <h2 className="mt-6 font-display text-3xl font-semibold tracking-tight text-(--color-text-main) sm:text-4xl">
                Set the limit once. Watch it enforce itself.
              </h2>
              <p className="mt-5 text-lg leading-8 text-(--color-text-muted)">
                Create a budget for one category or a group of them, choose how often it resets, and every new transaction updates your progress automatically.
              </p>

              <ul className="mt-8 space-y-5">
                <li className="flex gap-4 rounded-[1.25rem] border border-(--color-border-main)/70 bg-(--color-bg-surface)/80 p-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-(--color-bg-muted)">
                    <CalendarClock size={16} className="text-(--color-primary)" />
                  </span>
                  <div>
                    <p className="font-semibold text-(--color-text-main)">Weekly, monthly, or quarterly</p>
                    <p className="mt-1 text-sm leading-7 text-(--color-text-muted)">Pick the period that matches how you actually plan your spending.</p>
                  </div>
                </li>
                <li className="flex gap-4 rounded-[1.25rem] border border-(--color-border-main)/70 bg-(--color-bg-surface)/80 p-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-(--color-bg-muted)">
                    <BellRing size={16} className="text-(--color-warning)" />
                  </span>
                  <div>
                    <p className="font-semibold text-(--color-text-main)">Color-coded before you overspend</p>
                    <p className="mt-1 text-sm leading-7 text-(--color-text-muted)">Progress bars shift from green to amber at 70% used, and to red once you go over — a glance tells you where you stand.</p>
                  </div>
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
