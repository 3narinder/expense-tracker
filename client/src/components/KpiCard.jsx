import { TrendingUp, TrendingDown } from "lucide-react";

const KpiCard = ({ label, value, delta, icon: Icon }) => {
  const hasDelta = delta != null && Number.isFinite(delta);
  const positive = hasDelta && delta >= 0;

  return (
    <div className="bg-[var(--color-bg-surface)] rounded-2xl border border-[var(--color-border-main)] p-6 flex items-center gap-4 shadow-sm">
      {Icon && (
        <div className="h-14 w-14 rounded-xl flex items-center justify-center shrink-0 bg-[var(--color-bg-muted)]">
          <Icon
            size={24}
            className="text-[var(--color-primary)]"
            strokeWidth={1.75}
          />
        </div>
      )}
      <div className="min-w-0 flex-1">
        <p className="text-sm text-[var(--color-text-muted)] truncate">{label}</p>
        <div className="flex items-baseline gap-2 mt-1">
          <h3 className="text-2xl font-bold text-[var(--color-text-main)] tracking-tight truncate">
            {value}
          </h3>
          {hasDelta && (
            <span
              className={`text-xs font-semibold shrink-0 inline-flex items-center gap-0.5 ${positive ? "text-[var(--color-success)]" : "text-[var(--color-danger)]"}`}
            >
              {positive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              {Math.abs(delta).toFixed(1)}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default KpiCard;
