import { useState } from "react";
import {
  Plus,
  Target,
  Pencil,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  AlertOctagon,
} from "lucide-react";

import { useCurrentUser } from "../features/Authentication/useCurrentUser.js";
import { useBudgets } from "../features/Budgets/useBudgets.js";
import { useBudgetActions } from "../features/Budgets/useBudgetActions.js";
import { useCategories } from "../features/Categories/useCategories.js";

import { formatCurrency } from "../utils/format.js";
import Button from "../components/ui/Button.jsx";
import Modal from "../components/ui/Modal.jsx";
import CategoryBadge from "../components/CategoryBadge.jsx";
import EmptyState from "../components/EmptyState.jsx";
import Spinner from "../components/Spinner.jsx";
import BudgetForm from "../components/BudgetForm.jsx";

const statusStyles = {
  good: {
    Icon: CheckCircle2,
    label: "On Track",
    bg: "bg-(--color-success)/10 border border-(--color-success)/25",
    text: "text-(--color-success) font-bold",
    iconColor: "text-(--color-success)",
    msgText: "text-(--color-text-main)/90",
    bar: "bg-(--color-success)",
  },
  caution: {
    Icon: AlertTriangle,
    label: "Warning",
    bg: "bg-(--color-warning)/10 border border-(--color-warning)/25",
    text: "text-(--color-warning) font-bold",
    iconColor: "text-(--color-warning)",
    msgText: "text-(--color-text-main)/90",
    bar: "bg-(--color-warning)",
  },
  concerning: {
    Icon: AlertOctagon,
    label: "Over Budget",
    bg: "bg-(--color-danger)/10 border border-(--color-danger)/25",
    text: "text-(--color-danger) font-bold",
    iconColor: "text-(--color-danger)",
    msgText: "text-(--color-text-main)/90",
    bar: "bg-(--color-danger)",
  },
};

const Budgets = () => {
  const { user } = useCurrentUser();
  const currency = user?.currency || "INR";

  const { budgets = [], isPending, error } = useBudgets();
  const { categories } = useCategories();
  const allCategories = categories || [];

  const { addBudget, editBudget, removeBudget, isDeleting } =
    useBudgetActions();

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const onEdit = (b) => {
    setEditing(b);
    setModalOpen(true);
  };

  const onCreate = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const onDelete = (id) => setConfirmDeleteId(id);

  const confirmDelete = () => {
    removeBudget(confirmDeleteId);
    setConfirmDeleteId(null);
  };

  const handleFormSubmitSuccess = (formData) => {
    return new Promise((resolve, reject) => {
      const payload = {
        name: formData.name.trim(),
        categoryIds: formData.categoryIds,
        amount: parseFloat(formData.amount),
        period: formData.period,
        startDate: formData.startDate,
        alertThreshold: formData.alertThreshold,
      };

      const onSettled = {
        onSuccess: () => {
          setModalOpen(false);
          resolve();
        },
        onError: (err) => reject(err),
      };

      if (editing) {
        editBudget({ id: editing.id, updatedBudget: payload }, onSettled);
      } else {
        addBudget(payload, onSettled);
      }
    });
  };

  if (error) {
    return (
      <div className="text-center py-12 text-rose-600">
        <AlertOctagon className="mx-auto h-12 w-12 text-rose-500 mb-3" />
        <p className="font-semibold">Unable to fetch budget groups.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-(--color-bg-muted)/50 p-6 rounded-3xl border border-(--color-border-main)">
        <div>
          <h1 className="text-3xl font-bold text-(--color-text-main) tracking-tight">
            Budgets
          </h1>
          <p className="text-sm text-(--color-text-muted) mt-1">
            Track multi-category limits with automatic health alerts.
          </p>
        </div>
        <Button onClick={onCreate} className="shrink-0 self-start sm:self-auto">
          <Plus size={16} className="mr-1.5" /> Add Budget
        </Button>
      </div>

      {isPending ? (
        <div className="flex justify-center py-20">
          <Spinner />
        </div>
      ) : budgets.length === 0 ? (
        <EmptyState
          icon={Target}
          title="No active budgets"
          description="Create a limit cap to organize your monthly outlays."
        />
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          {budgets.map((b) => {
            const isOverBudget = b.spent > b.amount;
            const style = statusStyles[b.analysis?.status] || statusStyles.good;

            return (
              <div
                key={b.id}
                className="bg-(--color-bg-surface) rounded-3xl border border-(--color-border-main) p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="min-w-0">
                      <h3 className="text-lg font-bold text-(--color-text-main) tracking-tight capitalize truncate">
                        {b.name}
                      </h3>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {b.categories?.map((cat) => (
                          <CategoryBadge
                            key={cat.id}
                            name={cat.name}
                            icon={cat.icon}
                            color={cat.color}
                            size="sm"
                          />
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0 bg-(--color-bg-muted) p-1 rounded-xl border border-(--color-border-main)">
                      <button
                        onClick={() => onEdit(b)}
                        className="p-2 hover:bg-(--color-bg-surface) rounded-lg text-(--color-text-muted) transition"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => onDelete(b.id)}
                        className="p-2 hover:bg-rose-50 rounded-lg text-rose-500 transition"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  <div className="mb-4 flex items-baseline justify-between">
                    <span className="text-3xl font-extrabold tracking-tight text-(--color-text-main)">
                      {formatCurrency(b.spent, currency)}
                    </span>
                    <span className="text-xs font-medium text-(--color-text-ghost) uppercase tracking-wider">
                      of {formatCurrency(b.amount, currency)}
                    </span>
                  </div>

                  <div className="h-2.5 bg-(--color-bg-muted) rounded-full overflow-hidden mb-3">
                    <div
                      className={`h-full ${style.bar} transition-all duration-500 ease-out rounded-full`}
                      style={{ width: `${Math.min(b.percentUsed, 100)}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs font-medium text-(--color-text-muted) mb-4">
                    <span className="capitalize bg-(--color-bg-muted) text-(--color-text-muted) px-2 py-0.5 rounded-md">
                      {b.period} · {b.percentUsed}% filled
                    </span>
                    <span
                      className={
                        isOverBudget
                          ? "text-rose-600 font-semibold"
                          : "text-(--color-text-muted)"
                      }
                    >
                      {isOverBudget
                        ? `Over by ${formatCurrency(Math.abs(b.remaining), currency)}`
                        : `${formatCurrency(b.remaining, currency)} left`}
                    </span>
                  </div>
                </div>

                <div className={`p-3.5 rounded-2xl ${style.bg}`}>
                  <div className="flex items-start gap-2.5">
                    <style.Icon
                      size={16}
                      className={`${style.iconColor} shrink-0 mt-0.5`}
                    />
                    <div className="min-w-0">
                      <p
                        className={`text-xs font-bold uppercase tracking-wider ${style.text} mb-0.5`}
                      >
                        {style.label}
                      </p>
                      <p
                        className={`text-xs leading-relaxed font-medium ${style.msgText}`}
                      >
                        {b.analysis?.message}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? "Edit Budget" : "New Budget"}
      >
        <BudgetForm
          initial={editing}
          categories={allCategories}
          onSaved={handleFormSubmitSuccess}
          onCancel={() => setModalOpen(false)}
        />
      </Modal>

      <Modal
        open={!!confirmDeleteId}
        onClose={() => setConfirmDeleteId(null)}
        title="Delete budget?"
        size="sm"
      >
        <p className="text-sm text-(--color-text-muted) mb-5">
          This will stop tracking this budget's limit. This action can't be
          undone.
        </p>
        <div className="flex gap-2 justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => setConfirmDeleteId(null)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={confirmDelete}
            disabled={isDeleting}
            className="bg-rose-500 hover:bg-rose-600 text-white"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Budgets;
