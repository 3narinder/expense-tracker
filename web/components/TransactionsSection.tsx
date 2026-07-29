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
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-(--color-border-main)/70 bg-(--color-bg-surface)/90 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-(--color-text-muted)">
            Transactions
          </div>
          <h2 className="mt-6 font-display text-3xl font-semibold tracking-tight text-(--color-text-main) sm:text-4xl">
            Transaction management that stays out of your way
          </h2>
          <p className="mt-4 text-lg leading-8 text-(--color-text-muted)">
            Every entry, edit, and export lives in one clean table — built to handle a handful of transactions or several years of them.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <Reveal>
            <div className="space-y-4">
              {points.map((point) => {
                const Icon = point.icon;
                return (
                  <div key={point.title} className="flex gap-4 rounded-[1.25rem] border border-(--color-border-main)/70 bg-(--color-bg-surface)/90 p-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-(--color-bg-muted)">
                      <Icon size={16} className="text-(--color-primary)" />
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
            <ResponsiveImageFrame
              src="/transaction_image.png"
              alt="Transaction management experience"
              aspectClassName="aspect-[2280/1008]"
              wrapperClassName="w-full"
              imageClassName="rounded-[1.15rem]"
              priority
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
