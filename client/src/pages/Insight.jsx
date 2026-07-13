import { useMemo, useState } from "react";
import {
  Sparkles,
  TrendingUp,
  Lightbulb,
  Activity,
  Wallet,
  Clock,
  ArrowRight,
} from "lucide-react";
import toast from "react-hot-toast";

import { timeAgo } from "../utils/format.js";
import EmptyState from "../components/EmptyState.jsx";
import Spinner from "../components/Spinner.jsx";
import InsightCard from "../components/InsightCard.jsx";
import KpiCard from "../components/KpiCard.jsx";

// --- 1. HARDCODED MOCK DATA ---
const MOCK_INSIGHTS = [
  {
    id: "insight_1",
    insight_type: "monthly_summary",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    content_json: {
      health_score: 78,
      potential_savings: 0,
      total_analysis: 12,
      summary:
        "You're keeping your expenses well within limits this month. However, your dining out expenses have increased by 15% compared to last month.",
      recommendations: [
        "Try to limit restaurant visits to weekends to stay within your food budget.",
        "Your utility bills are slightly higher, consider adjusting the thermostat.",
      ],
    },
  },
  {
    id: "insight_2",
    insight_type: "savings_tips",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
    content_json: {
      health_score: 75,
      potential_savings: 145,
      total_analysis: 11,
      tips: [
        {
          title: "Cancel unused subscriptions",
          description:
            "We noticed you haven't used your gym membership in 2 months.",
          estimatedSavings: 60,
        },
        {
          title: "Switch to a cheaper phone plan",
          description:
            "Based on your data usage, you could downgrade your plan.",
          estimatedSavings: 85,
        },
      ],
    },
  },
];

const ActionCard = ({
  title,
  description,
  icon: Icon,
  accentGradient,
  accentText,
  onClick,
  generating,
  lastGenerated,
}) => (
  <button
    onClick={onClick}
    disabled={generating}
    className="group relative overflow-hidden bg-(--color-bg-surface) rounded-3xl border border-(--color-border-main) p-6 text-left hover:border-slate-200 hover:shadow-md transition disabled:opacity-60 disabled:cursor-not-allowed"
  >
    <div className="flex items-start justify-between mb-4">
      <div
        className={`h-14 w-14 rounded-2xl bg-linear-to-br ${accentGradient} flex items-center justify-center group-hover:scale-105 transition shadow-sm`}
      >
        <Icon size={24} className="text-white" />
      </div>
      {generating ? (
        <Spinner size="sm" />
      ) : (
        <Sparkles
          size={16}
          className="text-slate-300 group-hover:text-violet-500 transition"
        />
      )}
    </div>
    <h3 className="text-lg font-bold text-(--color-text-main) mb-1.5">
      {title}
    </h3>
    <p className="text-sm text-(--color-text-muted) mb-5 leading-relaxed">
      {description}
    </p>
    <div className="flex items-center justify-between">
      <span
        className={`inline-flex items-center gap-1.5 text-sm font-semibold ${accentText}`}
      >
        {generating ? "Analyzing..." : "Generate Insight"}
        {!generating && (
          <ArrowRight
            size={14}
            className="group-hover:translate-x-0.5 transition"
          />
        )}
      </span>
      {lastGenerated && (
        <span className="text-xs text-(--color-text-ghost)">
          Last: {timeAgo(lastGenerated)}
        </span>
      )}
    </div>
  </button>
);

const Insights = () => {
  // --- 2. HARDCODED STATE ---
  const [insights, setInsights] = useState(MOCK_INSIGHTS);
  const [loading, setLoading] = useState(false); // Set to false since data is local
  const [activeType, setActiveType] = useState(null);

  const handleGenerate = (type) => {
    setActiveType(type);

    setTimeout(() => {
      const newInsight = {
        id: `mock_new_${Date.now()}`,
        insight_type: type,
        created_at: new Date().toISOString(),
        content_json: {
          health_score: Math.floor(Math.random() * (95 - 60 + 1)) + 60, // Random score 60-95
          potential_savings: type === "savings_tips" ? 200 : 0,
          total_analysis: insights.length + 1,
          summary:
            "This is a freshly generated hardcoded insight! Your AI engine is running perfectly.",
          tips:
            type === "savings_tips"
              ? [{ title: "New tip!", estimatedSavings: 200 }]
              : undefined,
        },
      };

      setInsights((prev) => [newInsight, ...prev]);

      toast.success("Insight generated successfully!");
      setActiveType(null);
    }, 2000);
  };

  const stats = useMemo(() => {
    const latestMonthly = insights.find(
      (i) => i.insight_type === "monthly_summary",
    );
    const latestTips = insights.find((i) => i.insight_type === "savings_tips");

    const monthly = latestMonthly?.content_json;
    const tips = latestTips?.content_json;

    const healthScore = monthly?.health_score || tips?.health_score || null;
    const potentialSavings =
      tips?.potential_savings || monthly?.potential_savings || 0;
    const total =
      monthly?.total_analysis || tips?.total_analysis || insights.length || 0;

    return {
      total,
      healthScore,
      potentialSavings,
      lastAt: insights[0]?.created_at || null,
      latestMonthlyAt: latestMonthly?.created_at,
      latestTipsAt: latestTips?.created_at,
    };
  }, [insights]);

  const healthAccent =
    stats.healthScore == null
      ? "slate"
      : stats.healthScore >= 70
        ? "emerald"
        : stats.healthScore >= 40
          ? "amber"
          : "rose";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-(--color-text-main) tracking-tight">
          AI Insights
        </h1>
        <p className="text-sm text-(--color-text-muted) mt-1.5">
          Personalized financial analysis powered by Gemini — generate insights
          and watch your money smarter
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          label="Insights generated"
          value={stats.total}
          icon={Sparkles}
          accent="violet"
        />
        <KpiCard
          label="Health score"
          value={stats.healthScore != null ? `${stats.healthScore}/100` : "—"}
          icon={Activity}
          accent={healthAccent}
        />
        <KpiCard
          label="Potential savings"
          value={
            stats.potentialSavings > 0
              ? `$${stats.potentialSavings.toFixed(0)}/mo`
              : "—"
          }
          icon={Wallet}
          accent="orange"
        />
        <KpiCard
          label="Last analysis"
          value={stats.lastAt ? timeAgo(stats.lastAt) : "—"}
          icon={Clock}
          accent="blue"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ActionCard
          title="Monthly Summary"
          description="A full breakdown of this month's income, expenses, and a personalized health score with actionable recommendations."
          icon={TrendingUp}
          accentGradient="from-violet-400 to-violet-600"
          accentText="text-violet-600"
          onClick={() => handleGenerate("monthly_summary")}
          generating={activeType === "monthly_summary"}
          lastGenerated={stats.latestMonthlyAt}
        />
        <ActionCard
          title="Savings Tips"
          description="Tailored, ranked ways to save money based on your top spending categories from the last 30 days."
          icon={Lightbulb}
          accentGradient="from-blue-400 to-blue-600"
          accentText="text-blue-600"
          onClick={() => handleGenerate("savings_tips")}
          generating={activeType === "savings_tips"}
          lastGenerated={stats.latestTipsAt}
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-(--color-text-main) tracking-tight">
            Recent Analyses
          </h2>
          {!loading && insights.length > 0 && (
            <span className="text-xs text-(--color-text-muted)">
              {insights.length}{" "}
              {insights.length === 1 ? "analysis" : "analyses"}
            </span>
          )}
        </div>

        {loading ? (
          <div className="bg-(--color-bg-surface) rounded-3xl border border-(--color-border-main) py-16 flex justify-center">
            <Spinner size="lg" />
          </div>
        ) : insights.length === 0 ? (
          <div className="bg-(--color-bg-surface) rounded-3xl border border-(--color-border-main)">
            <EmptyState
              icon={Sparkles}
              title="No insights yet"
              description="Generate your first AI analysis using one of the cards above."
            />
          </div>
        ) : (
          <div className="space-y-3">
            {insights.map((i, idx) => (
              <InsightCard key={i.id} insight={i} defaultExpanded={idx === 0} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Insights;
