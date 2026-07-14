import { Pencil, Trash2, Wallet } from "lucide-react";

import { formatCurrency, formatDate } from "../../utils/format.js";
import CategoryBadge from "../CategoryBadge.jsx";
import StatusPill from "../StatusPill.jsx";
import EmptyState from "../EmptyState.jsx";
import Spinner from "../Spinner.jsx";
import Button from "../ui/Button.jsx";
import Pagination from "../ui/Pagination.jsx";

const TransactionsTable = ({
  transactions = [],
  currency,
  isLoading,
  pagination,
  onPageChange,
  onEdit,
  onDelete,
  onCreate,
  selectedIds = [],
  onToggleSelect,
  onToggleSelectAll,
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner />
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <EmptyState
        icon={Wallet}
        title="No transactions"
        description="Try adjusting filters, or add a new transaction."
        action={
          <Button onClick={onCreate}>
            <Wallet size={16} /> Add Transaction
          </Button>
        }
      />
    );
  }

  const allSelected =
    transactions.length > 0 &&
    transactions.every((t) => selectedIds.includes(t.id || t._id));

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider border-b border-[var(--color-border-main)]">
            <th className="pb-4 pr-3 w-10">
              <input
                type="checkbox"
                aria-label="Select all transactions on this page"
                checked={allSelected}
                onChange={(e) => onToggleSelectAll?.(e.target.checked)}
                className="h-4 w-4 rounded border-[var(--color-border-main)] text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
              />
            </th>
            <th className="pb-4 pr-4">Category</th>
            <th className="pb-4 pr-4">Description</th>
            <th className="pb-4 pr-4">Date</th>
            <th className="pb-4 pr-4">Type</th>
            <th className="pb-4 pr-4 text-right">Amount</th>
            <th className="pb-4"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--color-border-main)]">
          {transactions.map((t) => {
            const recordId = t.id || t._id;

            return (
              <tr
                key={recordId}
                className="hover:bg-[var(--color-bg-muted)] transition-colors"
              >
                <td className="py-4 pr-3">
                  <input
                    type="checkbox"
                    aria-label={`Select transaction ${t.description || recordId}`}
                    checked={selectedIds.includes(recordId)}
                    onChange={() => onToggleSelect?.(recordId)}
                    className="h-4 w-4 rounded border-[var(--color-border-main)] text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                  />
                </td>
                <td className="py-4 pr-4">
                  <CategoryBadge
                    name={t.categoryId?.name || "Uncategorized"}
                    icon={t.categoryId?.icon}
                    color={t.categoryId?.color}
                    size="sm"
                  />
                </td>
                <td className="py-4 pr-4 text-sm text-[var(--color-text-main)]">
                  {t.description || "—"}
                </td>
                <td className="py-4 pr-4 text-sm text-[var(--color-text-muted)] whitespace-nowrap">
                  {formatDate(t.transactionDate)}
                </td>
                <td className="py-4 pr-4">
                  <StatusPill
                    variant={t.type === "income" ? "income" : "expense"}
                  >
                    {t.type}
                  </StatusPill>
                </td>
                <td
                  className={`py-4 pr-4 text-sm font-semibold text-right whitespace-nowrap ${
                    t.type === "income"
                      ? "text-[var(--color-success)]"
                      : "text-[var(--color-danger)]"
                  }`}
                >
                  {t.type === "income" ? "+" : "-"}
                  {formatCurrency(t.amount, currency)}
                </td>
                <td className="py-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => onEdit(t)}
                      className="p-1.5 hover:bg-[var(--color-bg-muted)] rounded-lg text-[var(--color-text-muted)] transition-colors"
                      title="Edit entry"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => onDelete(recordId)}
                      className="p-1.5 hover:bg-[var(--color-danger-soft)] rounded-lg text-[var(--color-danger)] transition-colors"
                      title="Delete entry"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <Pagination
        page={pagination?.page || 1}
        totalPages={pagination?.totalPages || 1}
        total={pagination?.total || 0}
        pageSize={pagination?.limit || 20}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default TransactionsTable;
