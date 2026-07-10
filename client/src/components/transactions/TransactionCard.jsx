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
  <div className="bg-(--color-bg-surface) rounded-2xl border border-(--color-border-main) p-6 shadow-sm">
    <div className="mb-5 flex items-center justify-between gap-3">
      <div>
        <h2 className="text-lg font-bold text-(--color-text-main) tracking-tight">
          Transaction Trend
        </h2>
        <p className="text-xs text-(--color-text-muted) mt-1">
          Income vs expenses over time
        </p>
      </div>
      <div className="flex items-center gap-1 bg-(--color-bg-muted) p-1 rounded-lg shrink-0">
        {RANGE_OPTIONS.map((r) => (
          <button
            key={r.value}
            onClick={() => onRangeChange(r.value)}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
              range === r.value
                ? "bg-(--color-bg-surface) shadow-sm text-(--color-text-main) border border-(--color-border-main)"
                : "text-(--color-text-muted) hover:text-(--color-text-main)"
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
