import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { formatMonth, formatCurrency } from "../../utils/format.js";

const MonthlyTrendChart = ({ data, currency }) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-sm text-(--color-text-muted)">
        No data yet
      </div>
    );
  }

  const formatted = data.map((d) => ({
    month: formatMonth(d.month),
    income: parseFloat(d.income),
    expense: parseFloat(d.expense),
  }));

  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={formatted} barCategoryGap="35%" barGap={6}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#d4d4d8"
            vertical={false}
          />
          <XAxis
            dataKey="month"
            tick={{ fill: "#a1a1aa", fontSize: 12 }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            tick={{ fill: "#a1a1aa", fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            width={48}
          />
          <Tooltip
            cursor={false}
            contentStyle={{
              borderRadius: 8,
              border: "1px solid #d4d4d8",
              backgroundColor: "var(--color-bg-surface)",
              color: "var(--color-text-main)",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              fontSize: 12,
            }}
            formatter={(value) => formatCurrency(value, currency)}
            labelStyle={{ color: "var(--color-text-main)" }}
          />
          <Legend
            wrapperStyle={{
              fontSize: 12,
              paddingTop: 12,
              color: "var(--color-text-main)",
            }}
            iconType="circle"
            payload={[
              { value: "income", type: "circle", color: "#22c55e" },
              { value: "expense", type: "circle", color: "#ef4444" },
            ]}
          />
          <Bar
            dataKey="income"
            fill="#22c55e"
            radius={[8, 8, 0, 0]}
            opacity={0.85}
            background={{ fill: "var(--color-bg-muted)", radius: 8 }}
          />
          <Bar
            dataKey="expense"
            fill="#ef4444"
            radius={[8, 8, 0, 0]}
            opacity={0.85}
            background={{ fill: "var(--color-bg-muted)", radius: 8 }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyTrendChart;
