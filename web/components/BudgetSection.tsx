import { Target, CalendarClock, BellRing } from "lucide-react";
import Image from "next/image";
import Reveal from "./Reveal";

export default function BudgetSection() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <Reveal className="order-2 lg:order-1">
            <div className="h-full rounded-2xl border border-(--color-border-main) bg-(--color-bg-surface) p-6 hover:shadow-xl hover:shadow-(--color-warning)/10 transition-all duration-500">
              <Image
                src="/budget_image.png"
                alt="Budget Illustration"
                width={1000}
                height={800}
                className="rounded-xl"
                priority
              />
            </div>
          </Reveal>

          <Reveal delay={0.1} className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-(--color-success-soft) px-3.5 py-1.5 text-xs font-semibold text-(--color-success-foreground)">
              <Target size={13} />
              Budgets
            </div>
            <h2 className="mt-6 font-display text-3xl sm:text-4xl font-semibold tracking-tight text-(--color-text-main)">
              Set the limit once. Watch it enforce itself.
            </h2>
            <p className="mt-5 text-lg text-(--color-text-muted) leading-relaxed">
              Create a budget for one category or a group of them, choose how
              often it resets, and every new transaction updates your progress
              automatically.
            </p>

            <ul className="mt-8 space-y-5">
              <li className="flex gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-(--color-bg-muted)">
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
              <li className="flex gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-(--color-bg-muted)">
                  <BellRing size={16} className="text-(--color-warning)" />
                </span>
                <div>
                  <p className="font-semibold text-(--color-text-main)">
                    Color-coded before you overspend
                  </p>
                  <p className="text-sm text-(--color-text-muted) mt-0.5">
                    Progress bars shift from green to amber at 70% used, and to
                    red once you go over — a glance tells you where you stand.
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
