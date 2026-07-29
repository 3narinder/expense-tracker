import {
  PlusCircle,
  Tags,
  SlidersHorizontal,
  Trash2,
  FileDown,
} from "lucide-react";
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
    description:
      "Filter by type, category, account, date range, or free-text search.",
  },
  {
    icon: Trash2,
    title: "Bulk delete",
    description:
      "Select multiple transactions and remove them in a single action.",
  },
  {
    icon: FileDown,
    title: "Export CSV",
    description:
      "Export your filtered results as a CSV file whenever you need it.",
  },
];

export default function TransactionsSection() {
  return (
    <section className="py-24 sm:py-32 bg-(--color-bg-muted)">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-(--color-text-main)">
            Transaction management that stays out of your way
          </h2>
          <p className="mt-4 text-lg text-(--color-text-muted)">
            Every entry, edit, and export lives in one clean table — built to
            handle a handful of transactions or several years of them.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-5 lg:gap-16 items-start">
          <Reveal className="lg:col-span-2 space-y-6">
            {points.map((p) => (
              <div key={p.title} className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-(--color-bg-surface) border border-(--color-border-main)">
                  <p.icon size={17} className="text-(--color-primary)" />
                </span>
                <div>
                  <p className="font-semibold text-(--color-text-main)">
                    {p.title}
                  </p>
                  <p className="text-sm text-(--color-text-muted) mt-0.5">
                    {p.description}
                  </p>
                </div>
              </div>
            ))}
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-3">
            <div className="h-full rounded-[1.5rem] border border-(--color-border-main) bg-linear-to-br from-(--color-bg-surface) via-(--color-bg-subtle) to-(--color-bg-muted) p-4 sm:p-6 shadow-[0_22px_70px_-34px_rgba(15,23,42,0.28)] transition-all duration-500 hover:shadow-[0_30px_80px_-28px_rgba(245,158,11,0.28)]">
              <ResponsiveImageFrame
                src="/transaction_image.png"
                alt="Transaction management experience"
                aspectClassName="aspect-[16/7]"
                wrapperClassName="w-full border-0 bg-transparent p-0 shadow-none"
                imageClassName="rounded-[0.95rem]"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
