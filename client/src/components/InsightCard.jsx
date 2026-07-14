import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
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
    success: "bg-(--color-emerald-soft) text-(--color-emerald)",
    gold: "bg-(--color-gold-soft) text-(--color-gold)",
    warning: "bg-(--color-warning-soft) text-(--color-warning-foreground)",
    info: "bg-(--color-info-soft) text-(--color-info-foreground)",
  };
  return (
    <div className={`${variants[variant]} rounded-xl p-4`}>
      <div className="text-[10.5px] uppercase tracking-wider text-(--color-text-muted) mb-1 font-semibold">
        {label}
      </div>
      <div className="font-display text-xl font-semibold tracking-tight">
        {value}
      </div>
    </div>
  );
};

const MonthlySummaryView = ({ c }) => (
  <div className="space-y-6">
    <div className="flex flex-col md:flex-row gap-6 items-center bg-(--color-bg-muted) rounded-xl p-6 border border-(--color-border-main)">
      <HealthScoreGauge score={c.health_score} />
      <div className="flex-1 min-w-0">
        <div className="text-[11px] uppercase tracking-wider font-semibold text-(--color-text-muted) mb-2">
          AI Summary
        </div>
        <p className="text-(--color-text-main) leading-relaxed">{c.summary}</p>
      </div>
    </div>

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
              <p className="text-sm text-(--color-text-muted) leading-relaxed flex-1">
                {r}
              </p>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);

const SavingsTipsView = ({ c }) => {
  const totalSavings =
    c.potential_savings ??
    (c.tips || []).reduce(
      (sum, t) => sum + (Number(t.estimatedSavings) || 0),
      0,
    );

  return (
    <div className="space-y-5">
      {totalSavings > 0 && (
        <div className="grid grid-cols-2 gap-3">
          <Stat
            label="Total potential"
            value={`$${Number(totalSavings).toFixed(0)}/mo`}
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
                {savings > 0 && (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-(--color-emerald) bg-(--color-emerald-soft) px-2.5 py-1 rounded-lg ml-auto">
                    <TrendingUp size={11} />
                    ~${savings}/mo
                  </span>
                )}
              </div>
              <h5 className="text-base font-bold text-(--color-text-main) mb-1.5">
                {t.title}
              </h5>
              <p className="text-sm text-(--color-text-muted) leading-relaxed">
                {t.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const previewText = (insight) => {
  const c = insight.content_json;
  if (insight.insight_type === "monthly_summary") return c.summary || "";
  if (insight.insight_type === "budget_alert")
    return c.message || c.title || "";
  if (insight.insight_type === "savings_tips")
    return c.tips?.[0]?.description || "";
  return "";
};

const headerChip = (insight) => {
  const c = insight.content_json;
  if (
    insight.insight_type === "monthly_summary" &&
    typeof c.health_score === "number"
  ) {
    const score = c.health_score;
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
  if (insight.insight_type === "savings_tips" && c.potential_savings > 0) {
    return (
      <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-lg bg-green-100/30 text-green-700 dark:bg-green-900/20 dark:text-green-400">
        ~${c.potential_savings}/mo
      </span>
    );
  }
  return null;
};

const BudgetAlertView = ({ c }) => {
  const severity = c.severity || "info";
  const sev = {
    info: {
      text: "text-(--color-info-foreground)",
      bg: "bg-(--color-info-soft)",
    },
    warning: {
      text: "text-(--color-warning-foreground)",
      bg: "bg-(--color-warning-soft)",
    },
    critical: {
      text: "text-(--color-danger-foreground)",
      bg: "bg-(--color-danger-soft)",
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
        <div className="px-5 pb-6 border-t border-(--color-border-main) pt-5">
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
