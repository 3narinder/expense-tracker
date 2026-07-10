import { Search } from "lucide-react";
import { useState, useEffect } from "react";

const TransactionFilters = ({
  filters,
  onChange,
  categories = [],
  counts = {},
}) => {
  const [localSearch, setLocalSearch] = useState(filters.search || "");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (localSearch !== (filters.search || "")) {
        onChange({ ...filters, search: localSearch });
      }
    }, 400);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localSearch]);

  useEffect(() => {
    setLocalSearch(filters.search || "");
  }, [filters.search]);

  const tabs = [
    {
      value: "",
      label: "All",
      count: counts?.all || 0,
      badge: "bg-[var(--color-bg-muted)] text-(--color-text-main)",
    },
    {
      value: "income",
      label: "Income",
      count: counts?.income || 0,
      badge:
        "bg-green-100/30 text-green-700 dark:bg-green-900/20 dark:text-green-400",
    },
    {
      value: "expense",
      label: "Expense",
      count: counts?.expense || 0,
      badge: "bg-red-100/30 text-red-700 dark:bg-red-900/20 dark:text-red-400",
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row lg:items-center gap-3 mb-5">
      <div className="relative flex-1">
        <Search
          size={16}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-(--color-text-muted)"
        />
        <input
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          placeholder="Search description or notes..."
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-[var(--color-border-main)] bg-[var(--color-bg-surface)] text-sm text-(--color-text-main) placeholder-[var(--color-text-ghost)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent transition-all"
        />
      </div>

      <div className="flex items-center gap-1 bg-[var(--color-bg-muted)] p-1 rounded-lg self-start lg:self-auto">
        {tabs.map((tab) => (
          <button
            key={tab.value || "all"}
            onClick={() => onChange({ ...filters, type: tab.value })}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
              filters.type === tab.value
                ? "bg-[var(--color-bg-surface)] shadow-sm text-(--color-text-main) border border-[var(--color-border-main)]"
                : "text-(--color-text-muted) hover:text-(--color-text-main)"
            }`}
          >
            {tab.label}
            <span
              className={`text-xs px-1.5 py-0.5 rounded-lg font-semibold ${tab.badge}`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      <select
        value={filters.categoryId || ""}
        onChange={(e) => onChange({ ...filters, categoryId: e.target.value })}
        className="px-4 py-2 rounded-lg border border-[var(--color-border-main)] bg-[var(--color-bg-surface)] text-sm text-(--color-text-main) focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent transition-all"
      >
        <option value="">All categories</option>
        {categories.map((c) => {
          const catId = c.id || c._id;
          return (
            <option key={catId} value={catId}>
              {c.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default TransactionFilters;
