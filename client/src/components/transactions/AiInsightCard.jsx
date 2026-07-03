import { useState } from "react";
import { Sparkles, X } from "lucide-react";
import toast from "react-hot-toast";

import Button from "../ui/Button.jsx";
import Spinner from "../Spinner.jsx";

// Look here: The import from "../../features/Transactions/useTransactions.js" must be completely GONE.

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
    <div className="bg-white rounded-3xl border border-slate-100 p-5">
      {!analysis ? (
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="h-10 w-10 rounded-xl bg-linear-to-br from-violet-400 to-violet-600 flex items-center justify-center shrink-0">
              <Sparkles size={18} className="text-white" />
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-slate-900">
                AI Spending Insight
              </h3>
              <p className="text-sm text-slate-500 truncate">
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
          <div className="h-10 w-10 rounded-xl bg-linear-to-br from-violet-400 to-violet-600 flex items-center justify-center shrink-0">
            <Sparkles size={18} className="text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-slate-900">
                AI Spending Insight
              </h3>
              {analysis.highlight && (
                <span className="inline-flex items-center bg-violet-50 text-violet-700 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {analysis.highlight}
                </span>
              )}
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">
              {analysis.insight}
            </p>
            <button
              onClick={generateInsight}
              disabled={analysisLoading}
              className="mt-3 text-xs font-medium text-violet-600 hover:text-violet-700 disabled:opacity-50"
            >
              {analysisLoading ? "Re-analyzing..." : "Re-analyze"}
            </button>
          </div>
          <button
            onClick={() => setAnalysis(null)}
            className="text-slate-400 hover:text-slate-600 shrink-0 p-1"
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
