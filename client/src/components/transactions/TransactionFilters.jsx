import { Search, Calendar, ArrowUpDown, X, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

const getPresetRange = (preset) => {
  const today = new Date();

  switch (preset) {
    case "today":
      return { from: today, to: today };
    case "week": {
      const start = new Date(today);
      start.setDate(today.getDate() - today.getDay());
      return { from: start, to: today };
    }
    case "month": {
      const start = new Date(today.getFullYear(), today.getMonth(), 1);
      return { from: start, to: today };
    }
    case "last30": {
      const start = new Date(today);
      start.setDate(today.getDate() - 30);
      return { from: start, to: today };
    }
    default:
      return undefined;
  }
};

const DATE_PRESETS = [
  { value: "today", label: "Today" },
  { value: "week", label: "This week" },
  { value: "month", label: "This month" },
  { value: "last30", label: "Last 30 days" },
];

const toISO = (date) => {
  if (!date) return "";
  const offset = date.getTimezoneOffset();
  const local = new Date(date.getTime() - offset * 60 * 1000);
  return local.toISOString().split("T")[0];
};

const fromISO = (value) => (value ? new Date(`${value}T00:00:00`) : undefined);

const formatDisplayDate = (date) =>
  date
    ? new Intl.DateTimeFormat(undefined, {
        month: "short",
        day: "numeric",
      }).format(date)
    : "";

const controlClasses =
  "h-10 flex items-center px-4 rounded-xl border border-[var(--color-border-main)] bg-[var(--color-bg-surface)] text-sm text-[var(--color-text-main)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all";

const TransactionFilters = ({
  filters,
  onChange,
  categories = [],
  counts = {},
}) => {
  const [localSearch, setLocalSearch] = useState(filters.search || "");
  const [calendarOpen, setCalendarOpen] = useState(false);
  const calendarRef = useRef(null);

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

  // Close the calendar popover on outside click
  useEffect(() => {
    if (!calendarOpen) return;
    const handleClick = (e) => {
      if (calendarRef.current && !calendarRef.current.contains(e.target)) {
        setCalendarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [calendarOpen]);

  const tabs = [
    {
      value: "",
      label: "All",
      count: counts?.all || 0,
      badge: "bg-[var(--color-bg-muted)] text-[var(--color-text-main)]",
    },
    {
      value: "income",
      label: "Income",
      count: counts?.income || 0,
      badge: "bg-[var(--color-success)]/10 text-[var(--color-success)]",
    },
    {
      value: "expense",
      label: "Expense",
      count: counts?.expense || 0,
      badge: "bg-[var(--color-danger)]/10 text-[var(--color-danger)]",
    },
  ];

  const selectedRange = {
    from: fromISO(filters.startDate),
    to: fromISO(filters.endDate),
  };
  const hasDateRange = filters.startDate || filters.endDate;

  const handleRangeSelect = (range) => {
    onChange({
      ...filters,
      startDate: toISO(range?.from),
      endDate: toISO(range?.to),
    });
  };

  const applyPreset = (presetValue) => {
    const range = getPresetRange(presetValue);
    handleRangeSelect(range);
    setCalendarOpen(false);
  };

  const clearDateRange = () => {
    onChange({ ...filters, startDate: "", endDate: "" });
    setCalendarOpen(false);
  };

  const dateLabel = hasDateRange
    ? `${formatDisplayDate(selectedRange.from) || "…"} – ${
        formatDisplayDate(selectedRange.to) || "…"
      }`
    : "Date range";

  return (
    <div className="flex flex-col gap-4 mb-5">
      {/* ROW 1: Search & Type Tabs */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-3">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
          />
          <input
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder="Search description or notes..."
            aria-label="Search transactions by description or notes"
            className={`w-full pl-10 pr-4 ${controlClasses}`}
          />
        </div>

        <div className="flex items-center gap-1 bg-[var(--color-bg-muted)] p-1 rounded-xl h-10 self-start lg:self-auto shrink-0">
          {tabs.map((tab) => (
            <button
              key={tab.value || "all"}
              onClick={() => onChange({ ...filters, type: tab.value })}
              aria-pressed={filters.type === tab.value}
              className={`h-8 px-4 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] ${
                filters.type === tab.value
                  ? "bg-[var(--color-bg-surface)] shadow-sm text-[var(--color-text-main)] border border-[var(--color-border-main)]"
                  : "text-[var(--color-text-muted)] hover:text-[var(--color-text-main)]"
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
      </div>

      {/* ROW 2: Sort, Category, Date range — one aligned toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-3 border-t border-[var(--color-border-muted)]">
        <div className="relative w-full sm:w-auto sm:min-w-42.5">
          <label htmlFor="sort-select" className="sr-only">
            Sort transactions
          </label>
          <select
            id="sort-select"
            value={filters.sort || "date_desc"}
            onChange={(e) => onChange({ ...filters, sort: e.target.value })}
            className={`w-full pr-9 ${controlClasses} appearance-none cursor-pointer`}
          >
            <option value="date_desc">Newest First</option>
            <option value="date_asc">Oldest First</option>
            <option value="amount_desc">Highest Amount</option>
            <option value="amount_asc">Lowest Amount</option>
          </select>
          <ArrowUpDown
            size={14}
            className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--color-text-muted)]"
          />
        </div>

        <div className="relative w-full sm:w-auto sm:min-w-42.5">
          <label htmlFor="category-select" className="sr-only">
            Filter by category
          </label>
          <select
            id="category-select"
            value={filters.categoryId || ""}
            onChange={(e) =>
              onChange({ ...filters, categoryId: e.target.value })
            }
            className={`w-full pr-9 ${controlClasses} appearance-none cursor-pointer`}
          >
            <option value="">All Categories</option>
            {categories.map((c) => {
              const catId = c.id || c._id;
              return (
                <option key={catId} value={catId}>
                  {c.name}
                </option>
              );
            })}
          </select>
          <ChevronDown
            size={14}
            className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--color-text-muted)]"
          />
        </div>

        {/* Date range popover trigger */}
        <div className="relative w-full sm:w-auto sm:ml-auto" ref={calendarRef}>
          <button
            type="button"
            onClick={() => setCalendarOpen((open) => !open)}
            aria-expanded={calendarOpen}
            aria-haspopup="dialog"
            className={`w-full sm:w-auto gap-2 justify-between sm:justify-start ${controlClasses} ${
              hasDateRange
                ? "border-[var(--color-primary)] text-[var(--color-text-main)]"
                : "text-[var(--color-text-muted)]"
            }`}
          >
            <span className="flex items-center gap-2">
              <Calendar size={14} />
              {dateLabel}
            </span>
            {hasDateRange && (
              <span
                role="button"
                tabIndex={0}
                aria-label="Clear date range"
                onClick={(e) => {
                  e.stopPropagation();
                  clearDateRange();
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.stopPropagation();
                    clearDateRange();
                  }
                }}
                className="ml-1 p-0.5 rounded hover:bg-[var(--color-bg-muted)] text-[var(--color-text-muted)] hover:text-red-500"
              >
                <X size={14} />
              </span>
            )}
          </button>

          {calendarOpen && (
            <div
              role="dialog"
              aria-label="Select date range"
              className="absolute right-0 z-20 mt-2 p-4 rounded-2xl border border-[var(--color-border-main)] bg-[var(--color-bg-surface)] shadow-lg"
              style={{
                "--rdp-accent-color": "var(--color-primary)",
                "--rdp-today-color": "var(--color-primary)",
              }}
            >
              <div className="flex flex-wrap items-center gap-1 mb-2 bg-[var(--color-bg-muted)] p-1 rounded-xl">
                {DATE_PRESETS.map((preset) => (
                  <button
                    key={preset.value}
                    type="button"
                    onClick={() => applyPreset(preset.value)}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] hover:bg-[var(--color-bg-surface)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>

              <DayPicker
                mode="range"
                selected={selectedRange.from ? selectedRange : undefined}
                onSelect={handleRangeSelect}
                numberOfMonths={1}
                defaultMonth={selectedRange.from || new Date()}
              />

              <div className="flex justify-between items-center pt-2 border-t border-[var(--color-border-muted)] mt-2">
                <button
                  type="button"
                  onClick={clearDateRange}
                  className="text-xs font-medium text-red-500 hover:text-red-600 px-2 py-1"
                >
                  Clear
                </button>
                <button
                  type="button"
                  onClick={() => setCalendarOpen(false)}
                  className="text-xs font-medium px-3 py-1.5 rounded-lg bg-[var(--color-primary)] text-white hover:opacity-90"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionFilters;
