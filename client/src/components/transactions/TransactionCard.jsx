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
  <div className="bg-white rounded-3xl border border-slate-100 p-6">
    <div className="mb-5 flex items-center justify-between gap-3">
      <div>
        <h2 className="text-lg font-bold text-slate-900 tracking-tight">
          Transaction Trend
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Income vs expenses over time
        </p>
      </div>
      <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-full shrink-0">
        {RANGE_OPTIONS.map((r) => (
          <button
            key={r.value}
            onClick={() => onRangeChange(r.value)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition ${
              range === r.value
                ? "bg-white shadow-sm text-slate-900"
                : "text-slate-600 hover:text-slate-900"
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
    />
  </div>
);

export default TransactionTrendCard;
