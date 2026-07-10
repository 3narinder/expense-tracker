import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { formatCurrency } from "../../utils/format.js";

const formatLabel = (label) => {
  if (!label) return label;
  const isMonthOnly = /^\d{4}-\d{2}$/.test(label);
  const date = isMonthOnly ? new Date(`${label}-01`) : new Date(label);
  if (isNaN(date)) return label;
  return isMonthOnly
    ? date.toLocaleDateString(undefined, { month: "short", year: "numeric" })
    : date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
};

const CustomTooltip = ({ active, payload, label, currency }) => {
  if (!active || !payload || payload.length === 0) return null;

  const point = payload[0].payload;

  return (
    <div className="bg-(--color-bg-surface)/95 backdrop-blur-sm border border-(--color-border-main) shadow-xl rounded-xl p-3.5 min-w-50 text-xs">
      <div className="font-semibold text-slate-700 pb-2 mb-3 border-b border-(--color-border-main)">
        {formatLabel(label)}
      </div>

      <div className="space-y-4">
        {point.income > 0 && (
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between font-semibold text-violet-600">
              <span>Income</span>
              <span>{formatCurrency(point.income, currency)}</span>
            </div>

            {point.incomeByCategory?.length > 0 && (
              <div className="pl-2.5 border-l-2 border-violet-100 ml-1 space-y-1.5">
                {point.incomeByCategory.map((c) => (
                  <div
                    key={c.name}
                    className="flex justify-between items-center text-(--color-text-muted)"
                  >
                    <span className="truncate pr-3">{c.name}</span>
                    <span className="font-medium text-slate-700">
                      {formatCurrency(c.amount, currency)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {point.expense > 0 && (
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between font-semibold text-orange-600">
              <span>Expense</span>
              <span>{formatCurrency(point.expense, currency)}</span>
            </div>

            {point.expenseByCategory?.length > 0 && (
              <div className="pl-2.5 border-l-2 border-orange-100 ml-1 space-y-1.5">
                {point.expenseByCategory.map((c) => (
                  <div
                    key={c.name}
                    className="flex justify-between items-center text-(--color-text-muted)"
                  >
                    <span className="truncate pr-3">{c.name}</span>
                    <span className="font-medium text-slate-700">
                      {formatCurrency(c.amount, currency)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const TransactionTrendChart = ({ data, currency }) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-sm text-(--color-text-ghost) bg-(--color-bg-muted)/50 rounded-2xl border border-dashed border-slate-200">
        No transaction data available for this period.
      </div>
    );
  }

  const interval = Math.max(0, Math.ceil(data.length / 7) - 1);

  return (
    <div className="h-64 w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="incomeArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#A78BFA" stopOpacity={0.45} />
              <stop offset="100%" stopColor="#A78BFA" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="expenseArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FB923C" stopOpacity={0.45} />
              <stop offset="100%" stopColor="#FB923C" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="4 4"
            stroke="#f1f5f9"
            vertical={false}
          />

          <XAxis
            dataKey="label"
            tickFormatter={formatLabel}
            tick={{ fill: "#94a3b8", fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            interval={interval}
            dy={10} // Pushes labels down slightly
          />

          <YAxis
            yAxisId="income"
            tick={{ fill: "#7C3AED", fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            width={50}
            dx={-10}
          />

          <YAxis
            yAxisId="expense"
            orientation="right"
            tick={{ fill: "#EA580C", fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            width={50}
            dx={10}
          />

          <Tooltip
            cursor={{
              stroke: "#e2e8f0",
              strokeWidth: 2,
              strokeDasharray: "4 4",
            }}
            content={<CustomTooltip currency={currency} />}
            wrapperStyle={{ outline: "none" }} // Removes default recharts focus ring
          />

          <Legend
            wrapperStyle={{ fontSize: 12, paddingTop: 20 }}
            iconType="circle"
            payload={[
              { value: "Income", type: "circle", color: "#7C3AED" },
              { value: "Expense", type: "circle", color: "#EA580C" },
            ]}
          />

          <Area
            yAxisId="income"
            type="monotone"
            dataKey="income"
            stroke="#7C3AED"
            strokeWidth={3}
            fill="url(#incomeArea)"
            activeDot={{
              r: 6,
              fill: "#7C3AED",
              stroke: "#fff",
              strokeWidth: 2,
            }}
          />

          <Area
            yAxisId="expense"
            type="monotone"
            dataKey="expense"
            stroke="#EA580C"
            strokeWidth={3}
            fill="url(#expenseArea)"
            activeDot={{
              r: 6,
              fill: "#EA580C",
              stroke: "#fff",
              strokeWidth: 2,
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TransactionTrendChart;
