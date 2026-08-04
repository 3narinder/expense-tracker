import { PlusCircle, Tags, SlidersHorizontal, Trash2, FileDown } from "lucide-react";
import Reveal from "./Reveal";
import ResponsiveImageFrame from "./ResponsiveImageFrame";

const points = [
  {
    icon: PlusCircle,
    title: "Quick entry",
    description: "Add an income or expense in a couple of taps, from any page.",
  },
  {
    icon: Tags,
    title: "Categories",
    description: "Every transaction is tagged with a category and an account.",
  },
  {
    icon: SlidersHorizontal,
    title: "Search & filter",
    description: "Filter by type, category, account, date range, or free-text search.",
  },
  {
    icon: Trash2,
    title: "Bulk delete",
    description: "Select multiple transactions and remove them in a single action.",
  },
  {
    icon: FileDown,
    title: "Export CSV",
    description: "Export your filtered results as a CSV file whenever you need it.",
  },
];

export default function TransactionsSection() {
  return (
    <section className="bg-(--color-bg-muted) py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-(--color-violet)/25 bg-(--color-violet-soft) px-4 py-2 text-xs font-mono font-semibold uppercase tracking-[0.14em] text-(--color-violet)">
            <span className="h-1.5 w-1.5 rounded-full bg-(--color-violet) shadow-[0_0_8px_var(--color-violet)]" />
            Transactions
          </div>
          <h2 className="mt-8 font-display text-3xl font-semibold tracking-tight text-(--color-text-main) sm:text-4xl">
            Transaction management that stays out of your way
          </h2>
          <p className="mt-4 text-lg leading-8 text-(--color-text-muted)">
            Every entry, edit, and export lives in one clean table — built to handle a handful of transactions or several years of them.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-14 lg:grid-cols-[0.5fr_1fr] lg:items-center">
          <Reveal>
            <div className="max-w-xl flex flex-col justify-center space-y-4">
              {points.map((point) => {
                const Icon = point.icon;
                return (
                  <div key={point.title} className="flex gap-4 rounded-2xl border border-(--color-border-main)/70 bg-(--color-bg-surface)/90 p-5 backdrop-blur-xl">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-(--color-violet-soft)">
                      <Icon size={16} className="text-(--color-violet)" />
                    </span>
                    <div>
                      <p className="font-semibold text-(--color-text-main)">{point.title}</p>
                      <p className="mt-1 text-sm leading-7 text-(--color-text-muted)">{point.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="relative">
              {/*
              <ResponsiveImageFrame
                src="/transaction_image.png"
                alt="Transaction management experience"
                aspectClassName="aspect-[2280/1008]"
                wrapperClassName="w-full"
                imageClassName="rounded-[1.15rem]"
                priority
              />
              */}
              <div className="aspect-[2280/1008] w-full rounded-2xl border-2 border-dashed border-(--color-border-muted) bg-(--color-bg-subtle) flex items-center justify-center">
                <span className="font-display text-[10rem] font-semibold text-(--color-text-ghost)/20">T</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
