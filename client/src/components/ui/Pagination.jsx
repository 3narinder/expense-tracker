import { ChevronLeft, ChevronRight } from "lucide-react";

const getPageNumbers = (page, totalPages) => {
  if (totalPages <= 7)
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  if (page <= 4) return [1, 2, 3, 4, 5, "…", totalPages];
  if (page >= totalPages - 3) {
    return [
      1,
      "…",
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }
  return [1, "…", page - 1, page, page + 1, "…", totalPages];
};

const Pagination = ({ page, totalPages, total, pageSize, onPageChange }) => {
  // 1. FORCE cast all string inputs to safe Numbers
  const activePage = Number(page) || 1;
  const totalPagesNum = Number(totalPages) || 1;
  const totalItems = Number(total) || 0;
  const size = Number(pageSize) || 20;

  if (totalPagesNum <= 1) return null;

  const startIdx = (activePage - 1) * size;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-5 pt-5 border-t border-slate-100">
      <div className="text-xs text-slate-500">
        Showing{" "}
        <span className="font-semibold text-slate-700">
          {totalItems === 0 ? 0 : startIdx + 1}–
          {Math.min(startIdx + size, totalItems)}
        </span>{" "}
        of <span className="font-semibold text-slate-700">{totalItems}</span>
      </div>
      <div className="flex items-center gap-1">
        {/* Prev Button */}
        <button
          onClick={() => onPageChange(Math.max(1, activePage - 1))}
          disabled={activePage === 1}
          className="h-8 w-8 flex items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          <ChevronLeft size={16} />
        </button>

        {/* Page Numbers */}
        {getPageNumbers(activePage, totalPagesNum).map((p, i) =>
          p === "…" ? (
            <span key={`gap-${i}`} className="px-1.5 text-slate-400 text-sm">
              {p}
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`h-8 min-w-8 px-2.5 rounded-lg text-sm font-medium transition ${
                activePage === p
                  ? "bg-violet-600 text-white shadow-sm shadow-violet-500/30"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {p}
            </button>
          ),
        )}

        {/* Next Button */}
        <button
          onClick={() => onPageChange(Math.min(totalPagesNum, activePage + 1))}
          disabled={activePage === totalPagesNum}
          className="h-8 w-8 flex items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
