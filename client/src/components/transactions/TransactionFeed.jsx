import React, { useEffect, useRef, useState, useCallback } from "react";
import { formatCurrency, formatDate, timeAgo, todayDateString } from "../../utils/format.js";
import CategoryBadge from "../CategoryBadge.jsx";
import EmptyState from "../EmptyState.jsx";
import Spinner from "../Spinner.jsx";
import { Pencil, Trash2, Clock } from "lucide-react";

// Helper: group transactions by yyyy-mm-dd
const groupByDay = (transactions = []) => {
  const groups = new Map();
  transactions.forEach((t) => {
    const d = new Date(t.transactionDate || t.createdAt || todayDateString());
    const key = d.toISOString().slice(0, 10);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(t);
  });
  // preserve chronological order (newest first by date)
  return Array.from(groups.entries()).sort((a, b) => (a[0] < b[0] ? 1 : -1));
};

const dayLabel = (isoDate) => {
  const d = new Date(isoDate);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const fmt = (dt) => dt.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });

  if (d.toDateString() === today.toDateString()) return "Today";
  if (d.toDateString() === yesterday.toDateString()) return "Yesterday";
  return fmt(d);
};

const TransactionFeed = ({
  transactions = [],
  currency = "USD",
  isLoading = false,
  pagination = {},
  onLoadMore,
  onEdit,
  onDelete,
  onCreate,
  onRefresh,
}) => {
  const groups = groupByDay(transactions);
  const sentinelRef = useRef(null);
  const [pullY, setPullY] = useState(0);
  const [pulling, setPulling] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const containerRef = useRef(null);

  // Infinite scroll observer
  useEffect(() => {
    if (!sentinelRef.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (pagination.page < (pagination.totalPages || 1)) {
              onLoadMore?.();
            }
          }
        });
      },
      { root: null, rootMargin: "200px", threshold: 0.1 },
    );
    obs.observe(sentinelRef.current);
    return () => obs.disconnect();
  }, [pagination, onLoadMore]);

  // Pull-to-refresh -- only on touch devices / mobile widths
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onTouchStart = (e) => {
      if (el.scrollTop !== 0) return; // only start if at top
      setTouchStart(e.touches[0].clientY);
      setPulling(true);
    };
    const onTouchMove = (e) => {
      if (!pulling || touchStart == null) return;
      const delta = e.touches[0].clientY - touchStart;
      if (delta > 0) {
        const capped = Math.min(delta, 120);
        setPullY(capped);
      }
    };
    const onTouchEnd = () => {
      if (!pulling) return;
      if (pullY > 80) {
        // trigger refresh
        onRefresh?.();
      }
      // reset
      setPullY(0);
      setTouchStart(null);
      setPulling(false);
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: true });
    el.addEventListener("touchend", onTouchEnd);

    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [containerRef, pulling, pullY, touchStart, onRefresh]);

  // Swipe-to-reveal: basic implementation (touch)
  const [swipeState, setSwipeState] = useState({}); // id -> translateX

  const handleTouchStartCard = (id, e) => {
    setSwipeState((s) => ({ ...s, [id]: { startX: e.touches[0].clientX, dx: 0 } }));
  };
  const handleTouchMoveCard = (id, e) => {
    const st = swipeState[id];
    if (!st) return;
    const dx = e.touches[0].clientX - st.startX;
    // only allow left-swipe (negative dx)
    if (dx < 0) {
      setSwipeState((s) => ({ ...s, [id]: { ...st, dx } }));
    }
  };
  const handleTouchEndCard = (id) => {
    const st = swipeState[id];
    if (!st) return;
    if (st.dx < -80) {
      // keep revealed
      setSwipeState((s) => ({ ...s, [id]: { ...st, dx: -120, open: true } }));
    } else {
      // reset
      setSwipeState((s) => ({ ...s, [id]: undefined }));
    }
  };

  if (isLoading && transactions.length === 0) {
    return (
      <div className="flex justify-center py-12">
        <Spinner />
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <EmptyState
        icon={Clock}
        title="No recent activity"
        description="Your recent transactions will show up here as a feed. Add one to get started."
        action={<button onClick={onCreate} className="btn">Add Transaction</button>}
      />
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative touch-pan-y overflow-y-auto max-h-[60vh] sm:max-h-[70vh]" // let parent control sizing
      style={{ WebkitOverflowScrolling: "touch" }}
    >
      {/* Pull-to-refresh indicator */}
      <div
        className="flex items-center justify-center text-sm text-[var(--color-text-muted)]"
        style={{ height: pullY, transition: pulling ? "none" : "height 200ms" }}
      >
        {pullY > 0 ? (pullY > 80 ? "Release to refresh" : "Pull to refresh") : null}
      </div>

      <div className="space-y-6 px-2">
        {groups.map(([day, items]) => (
          <section key={day}>
            <div className="sticky top-0 z-10 py-2 bg-[var(--color-bg-surface)]/95 backdrop-blur-sm">
              <div className="text-sm font-medium text-[var(--color-text-muted)]">{dayLabel(day)}</div>
            </div>

            <div className="mt-2 space-y-2">
              {items.map((t) => {
                const id = t.id || t._id;
                const sw = swipeState[id] || {};
                const translate = sw.dx || 0;
                const amountClass = t.type === "income" ? "text-[var(--color-success)]" : "text-[var(--color-danger)]";

                return (
                  <div
                    key={id}
                    onTouchStart={(e) => handleTouchStartCard(id, e)}
                    onTouchMove={(e) => handleTouchMoveCard(id, e)}
                    onTouchEnd={() => handleTouchEndCard(id)}
                    className="relative bg-[var(--color-bg-surface)] border border-[var(--color-border-main)] rounded-2xl p-3 flex items-start gap-3 shadow-sm active:scale-95 transition-transform"
                    style={{ transform: `translateX(${translate}px)` }}
                  >
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center">
                        <CategoryBadge name={t.categoryId?.name || "—"} icon={t.categoryId?.icon} color={t.categoryId?.color} size="md" />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <div className="min-w-0">
                          <div className="text-sm font-semibold text-[var(--color-text-main)] truncate">{t.description || "—"}</div>
                          <div className="text-xs text-[var(--color-text-muted)] truncate">{t.merchant || t.categoryId?.name || "—"} • {timeAgo(t.transactionDate)}</div>
                        </div>

                        <div className={`text-sm font-semibold ${amountClass} whitespace-nowrap`}> {t.type === "income" ? "+" : "-"}{formatCurrency(t.amount, currency)}</div>
                      </div>

                      {/* Desktop actions */}
                      <div className="hidden sm:flex items-center gap-2 mt-2"> 
                        <button onClick={() => onEdit?.(t)} className="p-1.5 hover:bg-[var(--color-bg-muted)] rounded-lg text-[var(--color-text-muted)] transition-colors" title="Edit">
                          <Pencil size={14} />
                        </button>
                        <button onClick={() => onDelete?.(id)} className="p-1.5 hover:bg-[var(--color-danger-soft)] rounded-lg text-[var(--color-danger)] transition-colors" title="Delete">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Swipe actions revealed on left-swipe */}
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex gap-2">
                      <button onClick={() => onEdit?.(t)} className="p-2 bg-[var(--color-bg-muted)] rounded-xl text-[var(--color-text-muted)] sm:hidden">Edit</button>
                      <button onClick={() => onDelete?.(id)} className="p-2 bg-[var(--color-danger-soft)] rounded-xl text-[var(--color-danger)] sm:hidden">Delete</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}

        <div ref={sentinelRef} className="h-8"></div>

        {isLoading && (
          <div className="flex justify-center py-4">
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionFeed;
