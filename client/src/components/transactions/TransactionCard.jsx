import TransactionTrendChart from "../charts/TransactionTrendChart.jsx";

const RANGE_OPTIONS = [
  { value: "30d", label: "30D" },
  { value: "3m", label: "3M" },
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "Yearly" },
];

const TransactionTrendCard = ({
  trend,
  currency,
  range,
  onRangeChange,
  isLoading,
}) => (
  <div className="bg-[var(--color-bg-surface)] rounded-2xl border border-[var(--color-border-main)] p-6 shadow-sm">
    {/* 1. Changed to flex-col on mobile, flex-row on larger screens */}
    <div className="mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h2 className="text-lg font-bold text-[var(--color-text-main)] tracking-tight">
          Transaction Trend
        </h2>
        <p className="text-xs text-[var(--color-text-muted)] mt-1">
          Income vs expenses over time
        </p>
      </div>

      {/* 2. Removed shrink-0, added flex-wrap, and made it full width on mobile (w-full sm:w-auto) */}
      <div className="flex flex-wrap items-center gap-1 bg-[var(--color-bg-muted)] p-1 rounded-lg w-full sm:w-auto">
        {RANGE_OPTIONS.map((r) => (
          <button
            key={r.value}
            onClick={() => onRangeChange(r.value)}
            // 3. Added flex-1 sm:flex-none so buttons expand evenly on mobile
            className={`flex-1 sm:flex-none px-3 py-1 rounded-lg text-xs font-medium transition-colors text-center ${
              range === r.value
                ? "bg-[var(--color-bg-surface)] shadow-sm text-[var(--color-text-main)] border border-[var(--color-border-main)]"
                : "text-[var(--color-text-muted)] hover:text-[var(--color-text-main)]"
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>
    </div>

    <TransactionTrendChart
      data={isLoading ? [] : trend || []}
      currency={currency}
      isLoading={isLoading}
    />
  </div>
);

export default TransactionTrendCard;
