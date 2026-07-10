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
  const activePage = Number(page) || 1;
  const totalPagesNum = Number(totalPages) || 1;
  const totalItems = Number(total) || 0;
  const size = Number(pageSize) || 20;

  if (totalPagesNum <= 1) return null;

  const startIdx = (activePage - 1) * size;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-5 pt-5 border-t border-[var(--color-border-main)]">
      <div className="text-xs text-(--color-text-muted)">
        Showing{" "}
        <span className="font-semibold text-(--color-text-main)">
          {totalItems === 0 ? 0 : startIdx + 1}–
          {Math.min(startIdx + size, totalItems)}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-(--color-text-main)">
          {totalItems}
        </span>
      </div>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(Math.max(1, activePage - 1))}
          disabled={activePage === 1}
          className="h-8 w-8 flex items-center justify-center rounded-lg text-(--color-text-muted) hover:bg-[var(--color-bg-muted)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft size={16} />
        </button>

        {getPageNumbers(activePage, totalPagesNum).map((p, i) =>
          p === "…" ? (
            <span
              key={`gap-${i}`}
              className="px-1.5 text-[var(--color-text-ghost)] text-sm"
            >
              {p}
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`h-8 min-w-8 px-2.5 rounded-lg text-sm font-medium transition-colors ${
                activePage === p
                  ? "bg-[var(--color-accent)] text-[var(--color-bg-surface)] shadow-sm"
                  : "text-(--color-text-muted) hover:bg-[var(--color-bg-muted)]"
              }`}
            >
              {p}
            </button>
          ),
        )}

        <button
          onClick={() => onPageChange(Math.min(totalPagesNum, activePage + 1))}
          disabled={activePage === totalPagesNum}
          className="h-8 w-8 flex items-center justify-center rounded-lg text-(--color-text-muted) hover:bg-[var(--color-bg-muted)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
