import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { formatCurrency } from "../../utils/format.js";

const COLORS = [
  "#64748B", // slate
  "#78716C", // stone
  "#78350F", // amber-dark
  "#166534", // green-dark
  "#7C3AED", // purple-dark (muted)
  "#DC2626", // red-dark
];

const CategoryBreakdownChart = ({ data, currency }) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-sm text-(--color-text-muted)">
        No expenses yet
      </div>
    );
  }

  const top = data.slice(0, 5);
  const formatted = top.map((d, i) => {
    return {
      name: d.category_name,
      value: parseFloat(d.total),
      color: COLORS[i % COLORS.length],
    };
  });

  return (
    <div>
      <div className="h-44">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={formatted}
              innerRadius={40}
              outerRadius={70}
              paddingAngle={2}
              dataKey="value"
              stroke="none"
            >
              {formatted.map((entry) => (
                <Cell key={entry.name} fill={entry.color} opacity={0.85} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                borderRadius: 8,
                border: "1px solid var(--color-border-main)",
                backgroundColor: "var(--color-bg-surface)",
                color: "var(--color-text-main)",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                fontSize: 12,
              }}
              formatter={(v) => formatCurrency(v, currency)}
              labelStyle={{ color: "var(--color-text-main)" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-3 space-y-2">
        {formatted.map((c) => (
          <div
            key={c.name}
            className="flex items-center justify-between text-sm"
          >
            <div className="flex items-center gap-2 min-w-0">
              <div
                className="h-2 w-2 rounded-full shrink-0"
                style={{ backgroundColor: c.color, opacity: 0.85 }}
              />
              <span className="text-xs text-(--color-text-main) truncate">
                {c.name}
              </span>
            </div>
            <span className="text-xs font-medium text-(--color-text-main) shrink-0 ml-2">
              {formatCurrency(c.value, currency)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryBreakdownChart;
