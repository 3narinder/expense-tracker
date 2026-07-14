import { useMemo, useState } from "react";
import {
  Sparkles,
  TrendingUp,
  Lightbulb,
  Activity,
  Wallet,
  Clock,
} from "lucide-react";

import { timeAgo } from "../utils/format.js";
import EmptyState from "../components/EmptyState.jsx";
import Spinner from "../components/Spinner.jsx";
import InsightCard from "../components/InsightCard.jsx";
import Button from "../components/ui/Button.jsx";
import {
  useInsights,
  useGenerateInsight,
  useInsightEligibility,
} from "../features/AiInsights/useInsights.js";
import KpiCard from "../components/KpiCard.jsx";

const ActionStamp = ({
  title,
  description,
  icon: Icon,
  onClick,
  generating,
  lastGenerated,
  disabled = false,
  helperMessage = "",
}) => (
  <div className="group relative flex-1 min-w-65 overflow-hidden bg-(--color-bg-surface) rounded-2xl border border-(--color-border-main) p-6 hover:border-(--color-emerald)/40 hover:shadow-[0_1px_0_0_var(--color-border-main)] transition">
    <div className="flex items-start justify-between mb-5">
      <div className="h-11 w-11 rounded-full border border-(--color-border-main) bg-(--color-bg-muted) flex items-center justify-center group-hover:border-(--color-emerald)/50 transition">
        <Icon size={18} className="text-(--color-emerald)" />
      </div>
      <Sparkles
        size={15}
        className="text-(--color-text-ghost) group-hover:text-(--color-gold) transition"
      />
    </div>
    <h3 className="font-display text-lg font-semibold text-(--color-text-main) mb-1">
      {title}
    </h3>
    <p className="text-sm text-(--color-text-muted) mb-6 leading-relaxed">
      {description}
    </p>
    <div className="flex items-center justify-between border-t border-dashed border-(--color-border-main) pt-4">
      <Button
        variant="primary"
        size="sm"
        onClick={onClick}
        disabled={generating || disabled}
      >
        {generating ? (
          <>
            <Spinner size="sm" />
            Analyzing…
          </>
        ) : (
          "Generate insight"
        )}
      </Button>
      {lastGenerated && (
        <span className="font-mono-tab text-[11px] text-(--color-text-ghost)">
          {timeAgo(lastGenerated)}
        </span>
      )}
    </div>
    {disabled && helperMessage && (
      <p className="text-xs text-(--color-warning) mt-2">{helperMessage}</p>
    )}
  </div>
);

const Insights = () => {
  const { insights, isPending: loading } = useInsights();
  const { generate, isGenerating } = useGenerateInsight();
  const { eligibility } = useInsightEligibility();
  const [activeType, setActiveType] = useState(null);

  const handleGenerate = (type) => {
    setActiveType(type);
    generate(type, { onSettled: () => setActiveType(null) });
  };

  const { latestMonthly, latestTips, historyInsights } = useMemo(() => {
    const latestMonthly = insights.find(
      (i) => i.insight_type === "monthly_summary",
    );
    const latestTips = insights.find((i) => i.insight_type === "savings_tips");

    const shownIds = new Set(
      [latestMonthly?.id, latestTips?.id].filter(Boolean),
    );

    return {
      latestMonthly,
      latestTips,
      historyInsights: insights.filter((i) => !shownIds.has(i.id)),
    };
  }, [insights]);

  const stats = useMemo(() => {
    const healthScore =
      latestMonthly?.health_score ?? latestTips?.health_score ?? null;
    const potentialSavings = latestTips?.content_json?.potential_savings || 0;

    return {
      total: insights.length,
      healthScore,
      potentialSavings,
      lastAt: insights[0]?.created_at || null,
    };
  }, [insights, latestMonthly, latestTips]);

  const healthAccent =
    stats.healthScore == null
      ? "neutral"
      : stats.healthScore >= 70
        ? "emerald"
        : stats.healthScore >= 40
          ? "warning"
          : "danger";

  const today = new Date().toLocaleDateString(undefined, {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="space-y-8">
      {/* Statement header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <div className="text-[11px] uppercase tracking-[0.16em] font-semibold text-(--color-gold) mb-2">
            Statement · {today}
          </div>
          <h1 className="font-display text-3xl font-semibold text-(--color-text-main) tracking-tight">
            AI Insights
          </h1>
          <p className="text-sm text-(--color-text-muted) mt-2 max-w-md leading-relaxed">
            A running analysis of your finances, drawn up on demand and kept on
            file below.
          </p>
          {eligibility && (
            <p className="text-xs text-(--color-text-muted) mt-2">
              Plan:{" "}
              <span className="capitalize font-semibold text-(--color-text-main)">
                {eligibility.plan}
              </span>{" "}
              · Daily limit: {eligibility.dailyLimit} · Remaining today:{" "}
              {eligibility.remainingToday}
            </p>
          )}
        </div>
      </div>

      {/* Ledger strip */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label="Insights" value={stats.total} icon={Sparkles} />
        <KpiCard
          label="Health score"
          icon={Activity}
          value={stats.healthScore != null ? `${stats.healthScore}` : "—"}
          accent={healthAccent}
        />
        <KpiCard
          label="Potential savings"
          value={
            stats.potentialSavings > 0
              ? `₹${stats.potentialSavings.toFixed(0)}/mo`
              : "—"
          }
          icon={Wallet}
          accent="gold"
        />
        <KpiCard
          label="Last drawn up"
          value={stats.lastAt ? timeAgo(stats.lastAt) : "—"}
          icon={Clock}
        />
      </div>

      {/* Generate actions */}
      <div className="flex flex-wrap gap-4">
        <ActionStamp
          title="Monthly Summary"
          description="A full breakdown of this month's income, expenses, and a personalized health score with actionable recommendations."
          icon={TrendingUp}
          onClick={() => handleGenerate("monthly_summary")}
          generating={isGenerating && activeType === "monthly_summary"}
          lastGenerated={latestMonthly?.created_at}
          helperMessage={eligibility?.canGenerate === false ? eligibility.message : ""}
        />
        <ActionStamp
          title="Savings Tips"
          description="Tailored, ranked ways to save money based on your top spending categories from the last 30 days."
          icon={Lightbulb}
          onClick={() => handleGenerate("savings_tips")}
          generating={isGenerating && activeType === "savings_tips"}
          lastGenerated={latestTips?.created_at}
          helperMessage={eligibility?.canGenerate === false ? eligibility.message : ""}
        />
      </div>

      {/* Latest snapshot — the current summary + tips, always expanded */}
      {(latestMonthly || latestTips) && (
        <div>
          <h2 className="font-display text-lg font-semibold text-(--color-text-main) tracking-tight mb-4">
            Latest Snapshot
          </h2>
          <div className="space-y-5">
            {latestMonthly && (
              <InsightCard insight={latestMonthly} defaultExpanded />
            )}
            {latestTips && <InsightCard insight={latestTips} defaultExpanded />}
          </div>
        </div>
      )}

      {/* Analysis History — everything older than the latest snapshot above */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-lg font-semibold text-(--color-text-main) tracking-tight">
            Analysis History
          </h2>
          {!loading && historyInsights.length > 0 && (
            <span className="font-mono-tab text-[11px] text-(--color-text-muted)">
              {historyInsights.length}{" "}
              {historyInsights.length === 1 ? "entry" : "entries"}
            </span>
          )}
        </div>

        {loading ? (
          <div className="bg-(--color-bg-surface) rounded-2xl border border-(--color-border-main) py-16 flex justify-center">
            <Spinner size="lg" />
          </div>
        ) : insights.length === 0 ? (
          <div className="bg-(--color-bg-surface) rounded-2xl border border-(--color-border-main)">
            <EmptyState
              icon={Sparkles}
              title="No insights yet"
              description="Generate your first AI analysis using one of the cards above."
            />
          </div>
        ) : historyInsights.length === 0 ? (
          <div className="bg-(--color-bg-surface) rounded-2xl border border-(--color-border-main)">
            <EmptyState
              icon={Sparkles}
              title="No older analyses yet"
              description="Once you generate a new insight, the previous one moves here."
            />
          </div>
        ) : (
          <div className="space-y-5">
            {historyInsights.map((i, idx) => (
              <div
                key={i.id}
                className="ledger-fade-in"
                style={{ animationDelay: `${Math.min(idx, 6) * 40}ms` }}
              >
                <InsightCard insight={i} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Insights;
