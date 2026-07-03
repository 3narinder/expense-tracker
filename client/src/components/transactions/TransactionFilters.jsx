import { Search } from "lucide-react";
import { useState, useEffect } from "react";

const TransactionFilters = ({
  filters,
  onChange,
  categories = [],
  counts = {},
}) => {
  // 1. Create a local state to prevent the search input from losing focus on every keystroke
  const [localSearch, setLocalSearch] = useState(filters.search || "");

  // 2. Debounce: Wait 400ms after the user STOPS typing before updating the URL
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
      badge: "bg-slate-200 text-slate-700",
    },
    {
      value: "income",
      label: "Income",
      count: counts?.income || 0,
      badge: "bg-emerald-100 text-emerald-700",
    },
    {
      value: "expense",
      label: "Expense",
      count: counts?.expense || 0,
      badge: "bg-rose-100 text-rose-700",
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row lg:items-center gap-3 mb-5">
      <div className="relative flex-1">
        <Search
          size={16}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          placeholder="Search description or notes..."
          className="w-full pl-10 pr-4 py-2 rounded-full border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
        />
      </div>

      <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-full self-start lg:self-auto">
        {tabs.map((tab) => (
          <button
            key={tab.value || "all"}
            onClick={() => onChange({ ...filters, type: tab.value })}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition flex items-center gap-2 ${
              filters.type === tab.value
                ? "bg-white shadow-sm text-slate-900"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            {tab.label}
            <span
              className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${tab.badge}`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      <select
        value={filters.categoryId || ""}
        onChange={(e) => onChange({ ...filters, categoryId: e.target.value })}
        className="px-4 py-2 rounded-full border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-violet-500"
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
