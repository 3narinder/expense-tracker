import { Target, CalendarClock, BellRing } from "lucide-react";
import Reveal from "./Reveal";
import ResponsiveImageFrame from "./ResponsiveImageFrame";

export default function BudgetSection() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-(--color-emerald)/25 bg-(--color-emerald-soft) px-4 py-2 text-xs font-mono font-semibold uppercase tracking-[0.14em] text-(--color-emerald)">
            <span className="h-1.5 w-1.5 rounded-full bg-(--color-emerald) shadow-[0_0_8px_var(--color-emerald)]" />
            Budgets
          </div>
          <h2 className="mt-8 font-display text-3xl font-semibold tracking-tight text-(--color-text-main) sm:text-4xl">
            Set the limit once. Watch it enforce itself.
          </h2>
          <p className="mt-4 text-lg leading-8 text-(--color-text-muted)">
            Create a budget for one category or a group of them, choose how often it resets, and every new transaction updates your progress automatically.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-14 lg:grid-cols-[0.5fr_1fr] lg:items-center">
          <Reveal className="order-2 lg:order-1">
            <div className="relative">
              {/*
              <ResponsiveImageFrame
                src="/budget_image.png"
                alt="Budget planning dashboard"
                aspectClassName="aspect-[896/528]"
                wrapperClassName="w-full"
                imageClassName="rounded-[1.15rem]"
                priority
              />
              */}
              <div className="aspect-[896/528] w-full rounded-2xl border-2 border-dashed border-(--color-border-muted) bg-(--color-bg-subtle) flex items-center justify-center">
                <span className="font-display text-[10rem] font-semibold text-(--color-text-ghost)/20">B</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="order-1 lg:order-2">
            <div className="max-w-xl flex flex-col justify-center">
              <ul className="space-y-5">
                <li className="flex gap-4 rounded-2xl border border-(--color-border-main)/70 bg-(--color-bg-surface)/90 p-5 backdrop-blur-xl">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-(--color-violet-soft)">
                    <CalendarClock size={16} className="text-(--color-violet)" />
                  </span>
                  <div>
                    <p className="font-semibold text-(--color-text-main)">Weekly, monthly, or quarterly</p>
                    <p className="mt-1 text-sm leading-7 text-(--color-text-muted)">Pick the period that matches how you actually plan your spending.</p>
                  </div>
                </li>
                <li className="flex gap-4 rounded-2xl border border-(--color-border-main)/70 bg-(--color-bg-surface)/90 p-5 backdrop-blur-xl">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-(--color-warning-soft)">
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
