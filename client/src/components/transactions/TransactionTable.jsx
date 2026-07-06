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

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100">
            <th className="pb-4 pr-4">Category</th>
            <th className="pb-4 pr-4">Description</th>
            <th className="pb-4 pr-4">Date</th>
            <th className="pb-4 pr-4">Type</th>
            <th className="pb-4 pr-4 text-right">Amount</th>
            <th className="pb-4"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {transactions.map((t) => {
            const recordId = t.id || t._id;

            return (
              <tr key={recordId} className="hover:bg-slate-50/60 transition">
                <td className="py-4 pr-4">
                  <CategoryBadge
                    name={t.categoryId.name || "Uncategorized"}
                    icon={t.categoryId.icon}
                    color={t.categoryId.color}
                    size="sm"
                  />
                </td>
                <td className="py-4 pr-4 text-sm text-slate-700">
                  {t.description || "—"}
                </td>
                <td className="py-4 pr-4 text-sm text-slate-500 whitespace-nowrap">
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
                    t.type === "income" ? "text-emerald-600" : "text-rose-600"
                  }`}
                >
                  {t.type === "income" ? "+" : "-"}
                  {formatCurrency(t.amount, currency)}
                </td>
                <td className="py-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => onEdit(t)}
                      className="p-1.5 hover:bg-slate-100 rounded-md text-slate-500 transition"
                      title="Edit entry"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => onDelete(recordId)}
                      className="p-1.5 hover:bg-rose-50 rounded-md text-rose-500 transition"
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
