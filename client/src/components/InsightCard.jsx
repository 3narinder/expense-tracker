import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Check,
  AlertCircle,
  Lightbulb,
  TrendingUp,
  AlertTriangle,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { timeAgo } from "../utils/format.js";

const labelMap = {
  monthly_summary: "Monthly Summary",
  budget_alert: "Budget Alert",
  savings_tips: "Savings Tips",
};

const typeStyles = {
  monthly_summary: {
    Icon: TrendingUp,
    color: "text-blue-600",
    bg: "bg-blue-100/20",
  },
  budget_alert: {
    Icon: AlertTriangle,
    color: "text-red-600",
    bg: "bg-red-100/20",
  },
  savings_tips: {
    Icon: Lightbulb,
    color: "text-amber-600",
    bg: "bg-amber-100/20",
  },
};

const HealthScoreGauge = ({ score = 0 }) => {
  const safe = Math.max(0, Math.min(100, Number(score) || 0));
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (safe / 100) * circumference;
  const color = safe >= 70 ? "#22c55e" : safe >= 40 ? "#eab308" : "#ef4444";
  const label = safe >= 70 ? "Healthy" : safe >= 40 ? "Watch" : "Risky";

  return (
    <div className="relative h-36 w-36 shrink-0">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="var(--color-border-main)"
          strokeWidth="10"
          fill="none"
        />
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke={color}
          strokeWidth="10"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1s ease-out" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-4xl font-bold tracking-tight text-(--color-text-main)">
          {safe}
        </div>
        <div
          className="text-[10px] uppercase tracking-wider font-semibold"
          style={{ color }}
        >
          {label}
        </div>
      </div>
    </div>
  );
};

const Stat = ({ label, value, variant = "neutral" }) => {
  const variants = {
    neutral: "bg-(--color-bg-muted) text-(--color-text-main)",
    success:
      "bg-green-100/30 text-green-700 dark:bg-green-900/20 dark:text-green-400",
    warning:
      "bg-amber-100/30 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400",
    info: "bg-blue-100/30 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400",
  };
  return (
    <div className={`${variants[variant]} rounded-lg p-4`}>
      <div className="text-xs text-(--color-text-muted) mb-1 font-medium">
        {label}
      </div>
      <div className="text-xl font-bold tracking-tight">{value}</div>
    </div>
  );
};

const MonthlySummaryView = ({ c }) => (
  <div className="space-y-6">
    <div className="flex flex-col md:flex-row gap-6 items-center bg-(--color-bg-muted) rounded-xl p-6 border border-[var(--color-border-main)]">
      <HealthScoreGauge score={c.healthScore} />
      <div className="flex-1 min-w-0">
        <div className="text-[11px] uppercase tracking-wider font-semibold text-(--color-text-muted) mb-2">
          AI Summary
        </div>
        <p className="text-(--color-text-main) leading-relaxed">{c.summary}</p>
        {c.topSpendingCategory && (
          <div className="mt-3 inline-flex items-center gap-2 text-xs font-medium text-(--color-text-muted) bg-(--color-bg-surface) border border-[var(--color-border-main)] px-3 py-1.5 rounded-lg">
            <span className="text-[var(--color-text-ghost)]">Top category</span>
            <span className="font-semibold text-(--color-text-main)">
              {c.topSpendingCategory}
            </span>
          </div>
        )}
      </div>
    </div>

    {typeof c.estimatedMonthlySavings === "number" && (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <Stat
          label="Health Score"
          value={`${c.healthScore ?? 0}/100`}
          variant="info"
        />
        <Stat
          label="Estimated Savings"
          value={`$${Number(c.estimatedMonthlySavings).toLocaleString()}/mo`}
          variant="success"
        />
        <Stat
          label="Recommendations"
          value={c.recommendations?.length || 0}
          variant="neutral"
        />
      </div>
    )}

    {c.highlights?.length > 0 && (
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Check size={14} className="text-green-600" />
          <h4 className="text-xs font-semibold text-(--color-text-main) uppercase tracking-wider">
            What's going well
          </h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {c.highlights.map((h, i) => (
            <div
              key={i}
              className="p-4 bg-green-100/20 dark:bg-green-900/20 border border-green-200/30 dark:border-green-800/30 rounded-lg flex items-start gap-3"
            >
              <div className="h-6 w-6 rounded-lg bg-green-600 flex items-center justify-center shrink-0 mt-0.5">
                <Check size={12} className="text-white" strokeWidth={3} />
              </div>
              <p className="text-sm text-green-700 dark:text-green-400 leading-relaxed">
                {h}
              </p>
            </div>
          ))}
        </div>
      </div>
    )}

    {c.concerns?.length > 0 && (
      <div>
        <div className="flex items-center gap-2 mb-3">
          <AlertCircle size={14} className="text-red-600" />
          <h4 className="text-xs font-semibold text-(--color-text-main) uppercase tracking-wider">
            Areas to watch
          </h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {c.concerns.map((concern, i) => (
            <div
              key={i}
              className="p-4 bg-red-100/20 dark:bg-red-900/20 border border-red-200/30 dark:border-red-800/30 rounded-lg flex items-start gap-3"
            >
              <div className="h-6 w-6 rounded-lg bg-red-600 flex items-center justify-center shrink-0 mt-0.5">
                <AlertCircle size={12} className="text-white" strokeWidth={3} />
              </div>
              <p className="text-sm text-red-700 dark:text-red-400 leading-relaxed">
                {concern}
              </p>
            </div>
          ))}
        </div>
      </div>
    )}

    {c.recommendations?.length > 0 && (
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Sparkles size={14} className="text-blue-600" />
          <h4 className="text-xs font-semibold text-(--color-text-main) uppercase tracking-wider">
            Recommendations
          </h4>
        </div>
        <div className="space-y-2">
          {c.recommendations.map((r, i) => (
            <div
              key={i}
              className="p-4 bg-(--color-bg-surface) border border-[var(--color-border-main)] hover:border-blue-200/50 dark:hover:border-blue-900/50 rounded-lg transition flex items-start gap-3"
            >
              <div className="h-7 w-7 rounded-lg bg-blue-600/20 dark:bg-blue-900/20 flex items-center justify-center text-xs font-bold text-blue-600 dark:text-blue-400 shrink-0">
                {i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm text-(--color-text-main) mb-0.5">
                  {r.title}
                </div>
                <p className="text-sm text-(--color-text-muted) leading-relaxed">
                  {r.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);

const SavingsTipsView = ({ c }) => {
  const totalSavings = (c.tips || []).reduce(
    (sum, t) => sum + (Number(t.estimatedSavings) || 0),
    0,
  );

  return (
    <div className="space-y-5">
      {c.overallTip && (
        <div className="relative overflow-hidden rounded-lg bg-(--color-bg-muted) p-5 text-(--color-text-main) border border-(--color-border-main)">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 h-32 w-32 bg-(--color-bg-surface)/5 dark:bg-(--color-bg-surface)/2 rounded-full blur-2xl" />
          <div className="relative flex items-start gap-3">
            <div className="h-10 w-10 rounded-lg bg-(--color-bg-surface) border border-(--color-border-main) flex items-center justify-center shrink-0">
              <Lightbulb size={18} className="text-amber-600" />
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wider font-semibold text-(--color-text-muted) mb-1">
                Top tip
              </div>
              <p className="text-sm leading-relaxed font-medium">
                {c.overallTip}
              </p>
            </div>
          </div>
        </div>
      )}

      {totalSavings > 0 && (
        <div className="grid grid-cols-2 gap-3">
          <Stat
            label="Total potential"
            value={`$${totalSavings.toFixed(0)}/mo`}
            variant="success"
          />
          <Stat label="Tips" value={c.tips?.length || 0} variant="info" />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {c.tips?.map((t, i) => {
          const savings = Number(t.estimatedSavings) || 0;
          return (
            <div
              key={i}
              className="group relative p-5 rounded-lg bg-(--color-bg-surface) border border-(--color-border-main) hover:border-blue-200/50 dark:hover:border-blue-900/50 transition"
            >
              <div className="flex items-center justify-between mb-3">
                {t.category && (
                  <span className="text-[11px] font-semibold text-(--color-text-muted) uppercase tracking-wider bg-(--color-bg-muted) px-2.5 py-1 rounded-lg">
                    {t.category}
                  </span>
                )}
                {savings > 0 && (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-green-700 dark:text-green-400 bg-green-100/30 dark:bg-green-900/20 px-2.5 py-1 rounded-lg">
                    <TrendingUp size={11} />
                    ~${savings}/mo
                  </span>
                )}
              </div>
              <h5 className="text-base font-bold text-(--color-text-main) mb-1.5">
                {t.title}
              </h5>
              <p className="text-sm text-(--color-text-muted) leading-relaxed">
                {t.detail}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const BudgetAlertView = ({ c }) => {
  const severity = c.severity || "info";
  const sev = {
    info: {
      bg: "bg-blue-100/20 dark:bg-blue-900/20",
      border: "border-blue-200/30 dark:border-blue-800/30",
      icon: "bg-blue-600",
      text: "text-blue-700 dark:text-blue-400",
      accent: "text-blue-600 dark:text-blue-400",
    },
    warning: {
      bg: "bg-amber-100/20 dark:bg-amber-900/20",
      border: "border-amber-200/30 dark:border-amber-800/30",
      icon: "bg-amber-600",
      text: "text-amber-700 dark:text-amber-400",
      accent: "text-amber-600 dark:text-amber-400",
    },
    critical: {
      bg: "bg-red-100/20 dark:bg-red-900/20",
      border: "border-red-200/30 dark:border-red-800/30",
      icon: "bg-red-600",
      text: "text-red-700 dark:text-red-400",
      accent: "text-red-600 dark:text-red-400",
    },
  }[severity];

  return (
    <div className="space-y-5">
      <div className={`p-5 rounded-lg ${sev.bg} ${sev.border} border`}>
        <div className="flex items-start gap-3">
          <div
            className={`h-10 w-10 rounded-lg ${sev.icon} flex items-center justify-center shrink-0`}
          >
            <AlertTriangle size={18} className="text-white" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span
                className={`text-[10px] uppercase tracking-wider font-bold ${sev.accent} bg-(--color-bg-surface)/60 px-2 py-0.5 rounded-lg`}
              >
                {severity}
              </span>
            </div>
            {c.title && (
              <h4 className={`font-bold ${sev.text} text-base mb-1`}>
                {c.title}
              </h4>
            )}
            <p className={`text-sm ${sev.text} opacity-90 leading-relaxed`}>
              {c.message}
            </p>
          </div>
        </div>
      </div>

      {c.suggestions?.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <ArrowRight size={14} className="text-blue-600" />
            <h4 className="text-xs font-semibold text-(--color-text-main) uppercase tracking-wider">
              Suggested actions
            </h4>
          </div>
          <div className="space-y-2">
            {c.suggestions.map((sug, i) => (
              <div
                key={i}
                className="p-4 bg-(--color-bg-surface) border border-(--color-border-main) hover:border-blue-200/50 dark:hover:border-blue-900/50 rounded-lg flex items-start gap-3 transition"
              >
                <div className="h-7 w-7 rounded-lg bg-blue-600/20 dark:bg-blue-900/20 flex items-center justify-center shrink-0 text-xs font-bold text-blue-600 dark:text-blue-400">
                  {i + 1}
                </div>
                <p className="text-sm text-(--color-text-main) leading-relaxed">
                  {sug}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const previewText = (insight) => {
  const c = insight.content_json;
  if (insight.insight_type === "monthly_summary") return c.summary || "";
  if (insight.insight_type === "budget_alert")
    return c.message || c.title || "";
  if (insight.insight_type === "savings_tips") return c.overallTip || "";
  return "";
};

const headerChip = (insight) => {
  const c = insight.content_json;
  if (
    insight.insight_type === "monthly_summary" &&
    typeof c.healthScore === "number"
  ) {
    const score = c.healthScore;
    const tone =
      score >= 70
        ? "bg-green-100/30 text-green-700 dark:bg-green-900/20 dark:text-green-400"
        : score >= 40
          ? "bg-amber-100/30 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400"
          : "bg-red-100/30 text-red-700 dark:bg-red-900/20 dark:text-red-400";
    return (
      <span
        className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-lg ${tone}`}
      >
        Score {score}
      </span>
    );
  }
  if (insight.insight_type === "budget_alert" && c.severity) {
    const tone =
      c.severity === "critical"
        ? "bg-red-100/30 text-red-700 dark:bg-red-900/20 dark:text-red-400"
        : c.severity === "warning"
          ? "bg-amber-100/30 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400"
          : "bg-blue-100/30 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400";
    return (
      <span
        className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-lg ${tone}`}
      >
        {c.severity}
      </span>
    );
  }
  if (insight.insight_type === "savings_tips") {
    const total = (c.tips || []).reduce(
      (s, t) => s + (Number(t.estimatedSavings) || 0),
      0,
    );
    if (total > 0) {
      return (
        <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-lg bg-green-100/30 text-green-700 dark:bg-green-900/20 dark:text-green-400">
          ~${total}/mo
        </span>
      );
    }
  }
  return null;
};

const InsightCard = ({ insight, defaultExpanded = false }) => {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const c = insight.content_json;
  const t = typeStyles[insight.insight_type] || typeStyles.monthly_summary;
  const TypeIcon = t.Icon;

  return (
    <div className="bg-(--color-bg-surface) rounded-lg border border-(--color-border-main) overflow-hidden hover:border-blue-200/50 dark:hover:border-blue-900/50 transition shadow-sm">
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full p-5 flex items-start gap-4 text-left hover:bg-(--color-bg-muted) transition-colors"
      >
        <div
          className={`h-12 w-12 rounded-lg ${t.bg} ${t.color} flex items-center justify-center shrink-0 border border-(--color-border-main)`}
        >
          <TypeIcon size={22} className={t.color} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <h3 className="font-bold text-(--color-text-main)">
              {labelMap[insight.insight_type]}
            </h3>
            {headerChip(insight)}
            <span className="text-xs text-(--color-text-muted)">
              {timeAgo(insight.created_at)}
            </span>
          </div>
          <p className="text-sm text-(--color-text-muted) line-clamp-2 leading-relaxed">
            {previewText(insight)}
          </p>
        </div>
        {expanded ? (
          <ChevronUp
            size={18}
            className="text-(--color-text-muted) shrink-0 mt-1"
          />
        ) : (
          <ChevronDown
            size={18}
            className="text-(--color-text-muted) shrink-0 mt-1"
          />
        )}
      </button>
      {expanded && (
        <div className="px-5 pb-6 border-t border-[var(--color-border-main)] pt-5">
          {insight.insight_type === "monthly_summary" && (
            <MonthlySummaryView c={c} />
          )}
          {insight.insight_type === "budget_alert" && <BudgetAlertView c={c} />}
          {insight.insight_type === "savings_tips" && <SavingsTipsView c={c} />}
        </div>
      )}
    </div>
  );
};

export default InsightCard;
