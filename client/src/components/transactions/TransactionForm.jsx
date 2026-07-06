import { useState } from "react";

//** Hooks and functions */
import { todayDateString } from "../../utils/format.js";
import { useTransactionActions } from "../../features/Transactions/useTransactionActions.js";

//**Components */
import Input from "../ui/Input.jsx";
import Select from "../ui/Select.jsx";
import Textarea from "../ui/Textarea.jsx";
import Button from "../ui/Button.jsx";

const TransactionForm = ({
  initial,
  categories,
  accounts = [],
  onSaved,
  onCancel,
}) => {
  const { addTransaction, isCreating, editTransaction, isUpdating } =
    useTransactionActions();
  const saving = isCreating || isUpdating;

  const [form, setForm] = useState({
    type: initial?.type || "expense",
    amount: initial?.amount ?? "",
    categoryId: initial?.categoryId?._id || initial?.categoryId || "",
    accountId: initial?.accountId?._id || initial?.accountId || "",
    description: initial?.description || "",
    notes: initial?.notes || "",
    transactionDate:
      initial?.transactionDate?.split("T")[0] || todayDateString(),
  });

  const filteredCategories = categories.filter((c) => c.type === form.type);

  const submit = (e) => {
    e.preventDefault();

    const payload = {
      type: form.type,
      amount: parseFloat(form.amount),
      categoryId: form.categoryId || null,
      accountId: form.accountId || null,
      description: form.description || null,
      notes: form.notes || null,
      transactionDate: form.transactionDate,
    };

    if (initial) {
      editTransaction(
        { id: initial._id || initial.id, updatedTx: payload },
        { onSuccess: () => onSaved?.() },
      );
    } else {
      addTransaction(payload, { onSuccess: () => onSaved?.() });
    }
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => setForm({ ...form, type: "expense", categoryId: "" })}
          className={`py-2 px-4 rounded-lg text-sm font-medium transition ${
            form.type === "expense"
              ? "bg-rose-500 text-white"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          Expense
        </button>
        <button
          type="button"
          onClick={() => setForm({ ...form, type: "income", categoryId: "" })}
          className={`py-2 px-4 rounded-lg text-sm font-medium transition ${
            form.type === "income"
              ? "bg-emerald-500 text-white"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          Income
        </button>
      </div>

      <Input
        label="Amount"
        type="number"
        step="0.01"
        min="0.01"
        required
        value={form.amount}
        onChange={(e) => setForm({ ...form, amount: e.target.value })}
      />

      <Select
        label="Account"
        required
        value={form.accountId}
        onChange={(e) => setForm({ ...form, accountId: e.target.value })}
      >
        <option value="" disabled>
          Select account
        </option>
        {accounts.map((a) => {
          const accId = a.id || a._id;
          return (
            <option key={accId} value={accId}>
              {a.name}
            </option>
          );
        })}
      </Select>

      <Select
        label="Category"
        value={form.categoryId}
        onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
      >
        <option value="">Uncategorized</option>
        {filteredCategories.map((c) => {
          const catId = c.id || c._id;
          return (
            <option key={catId} value={catId}>
              {c.name}
            </option>
          );
        })}
      </Select>

      <Input
        label="Description"
        placeholder="e.g. Coffee at Starbucks"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      <Input
        label="Date"
        type="date"
        required
        value={form.transactionDate}
        onChange={(e) => setForm({ ...form, transactionDate: e.target.value })}
      />

      <Textarea
        label="Notes (optional)"
        rows={3}
        value={form.notes}
        onChange={(e) => setForm({ ...form, notes: e.target.value })}
      />

      <div className="flex gap-2 justify-end pt-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Save"}
        </Button>
      </div>
    </form>
  );
};

export default TransactionForm;
