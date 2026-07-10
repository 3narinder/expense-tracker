import { useState } from "react";
import { Sparkles, X } from "lucide-react";
import toast from "react-hot-toast";

import Button from "../ui/Button.jsx";
import Spinner from "../Spinner.jsx";

const AIInsightCard = ({ transactionIds = [], transactionCount = 0 }) => {
  const [analysis, setAnalysis] = useState(null);
  const [analysisLoading, setAnalysisLoading] = useState(false);

  const generateInsight = async () => {
    if (transactionCount === 0) {
      toast.error("No transactions in view to analyze");
      return;
    }

    setAnalysisLoading(true);

    setTimeout(() => {
      setAnalysisLoading(false);
      setAnalysis({
        highlight: "Static Preview",
        insight: `This is a placeholder for your AI analysis. Once the backend hook is reconnected, clicking this will process your ${transactionCount} transactions dynamically.`,
      });
    }, 1000);
  };

  return (
    <div className="bg-(--color-bg-surface) rounded-lg border border-(--color-border-main) p-5 shadow-sm">
      {!analysis ? (
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="h-10 w-10 rounded-lg bg-blue-600/20 flex items-center justify-center shrink-0 border border-blue-200/30 dark:border-blue-900/30">
              <Sparkles size={18} className="text-blue-600" />
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-(--color-text-main)">
                AI Spending Insight
              </h3>
              <p className="text-sm text-(--color-text-muted) truncate">
                Get a quick analysis of the {transactionCount} transaction
                {transactionCount !== 1 ? "s" : ""} in this view
              </p>
            </div>
          </div>
          <Button
            onClick={generateInsight}
            disabled={analysisLoading || transactionCount === 0}
            size="sm"
          >
            {analysisLoading ? (
              <>
                <Spinner size="sm" />
                Analyzing
              </>
            ) : (
              <>
                <Sparkles size={14} />
                Generate
              </>
            )}
          </Button>
        </div>
      ) : (
        <div className="flex gap-4">
          <div className="h-10 w-10 rounded-lg bg-(--color-info)/10 flex items-center justify-center shrink-0 border border-(--color-info)/20">
            <Sparkles size={18} className="text-(--color-info)" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-(--color-text-main)">
                AI Spending Insight
              </h3>
              {analysis.highlight && (
                <span className="inline-flex items-center bg-blue-100/30 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 text-xs font-medium px-2.5 py-0.5 rounded-lg">
                  {analysis.highlight}
                </span>
              )}
            </div>
            <span className="inline-flex items-center bg-(--color-info)/10 text-(--color-info) border border-(--color-info)/20 text-xs font-bold px-2.5 py-0.5 rounded-lg">
              {analysis.highlight}
            </span>
            <button
              onClick={generateInsight}
              disabled={analysisLoading}
              className="mt-3 text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 disabled:opacity-50"
            >
              {analysisLoading ? "Re-analyzing..." : "Re-analyze"}
            </button>
          </div>
          <button
            onClick={() => setAnalysis(null)}
            className="text-(--color-text-muted) hover:text-(--color-text-main) shrink-0 p-1 rounded-lg hover:bg-(--color-bg-muted) transition-colors"
            title="Dismiss"
          >
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default AIInsightCard;
