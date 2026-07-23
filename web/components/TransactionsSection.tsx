import {
  PlusCircle,
  Tags,
  SlidersHorizontal,
  Trash2,
  FileDown,
} from "lucide-react";
import Reveal from "./Reveal";

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
    <section className="py-24 sm:py-32 bg-(--color-bg-muted) relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-(--color-info)/5 rounded-full blur-3xl" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-(--color-text-main)">
            Transaction management that stays out of your way
          </h2>
          <p className="mt-4 text-lg text-(--color-text-muted)">
            Every entry, edit, and export lives in one clean table — built
            to handle a handful of transactions or several years of them.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-5 lg:gap-16 items-start">
          <Reveal className="lg:col-span-2 space-y-6">
            {points.map((p, i) => (
              <div key={p.title} className="flex gap-4 group">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-(--color-bg-surface) border border-(--color-border-main) group-hover:bg-(--color-primary-soft) group-hover:border-(--color-primary)/30 group-hover:shadow-lg group-hover:shadow-(--color-primary)/10 transition-all duration-300">
                  <p.icon size={17} className="text-(--color-primary)" />
                </span>
                <div>
                  <p className="font-semibold text-(--color-text-main) group-hover:text-(--color-primary) transition-colors">
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
            <div className="rounded-2xl border border-(--color-border-main) bg-(--color-bg-surface) shadow-xl hover:shadow-2xl hover:shadow-(--color-info)/10 transition-all duration-500 overflow-hidden animate-scale-in">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-(--color-border-main) p-4">
                <div className="flex gap-2 flex-wrap">
                  {["This month", "Expense", "Groceries"].map((chip) => (
                    <span
                      key={chip}
                      className="rounded-full bg-(--color-bg-muted) px-3 py-1 text-xs font-medium text-(--color-text-muted) hover:bg-(--color-primary-soft) hover:text-(--color-primary) transition-colors cursor-pointer"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
                <span className="rounded-lg bg-(--color-primary) px-3 py-1.5 text-xs font-semibold text-(--color-primary-foreground) hover:bg-(--color-primary-hover) transition-colors cursor-pointer">
                  + New
                </span>
              </div>
              <div className="divide-y divide-(--color-border-muted)">
                {[
                  { name: "Whole Foods Market", cat: "Groceries", date: "Jul 12", amt: "-$87.20" },
                  { name: "Trader Joe's", cat: "Groceries", date: "Jul 9", amt: "-$54.10" },
                  { name: "Salary deposit", cat: "Income", date: "Jul 1", amt: "+$5,500.00", positive: true },
                  { name: "Costco", cat: "Groceries", date: "Jun 28", amt: "-$142.65" },
                ].map((t) => (
                  <div key={t.name} className="flex items-center justify-between px-4 py-3.5 hover:bg-(--color-bg-hover) transition-colors group cursor-pointer">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-(--color-text-main) truncate group-hover:text-(--color-primary) transition-colors">
                        {t.name}
                      </p>
                      <p className="text-xs text-(--color-text-muted)">
                        {t.cat} · {t.date}
                      </p>
                    </div>
                    <span
                      className={`text-sm font-bold shrink-0 ${
                        t.positive ? "text-(--color-success)" : "text-(--color-danger)"
                      }`}
                    >
                      {t.amt}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
