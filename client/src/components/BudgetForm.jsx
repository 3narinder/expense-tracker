import { useState } from "react";
import { Check } from "lucide-react";
import toast from "react-hot-toast";

import Input from "./ui/Input.jsx";
import Select from "./ui/Select.jsx";
import Button from "./ui/Button.jsx";

const BudgetForm = ({ initial, categories = [], onSaved, onCancel }) => {
  const [form, setForm] = useState({
    name: initial?.name || "",
    categoryIds: initial?.categories?.map((c) => c.id) || [],
    amount: initial?.amount || "",
    period: initial?.period || "monthly",
    alertThreshold: initial?.alertThreshold || 80,
    startDate: initial?.startDate
      ? new Date(initial.startDate).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0],
  });

  const [saving, setSaving] = useState(false);

  const toggleCategorySelection = (categoryId) => {
    setForm((prev) => {
      const exists = prev.categoryIds.includes(categoryId);
      return {
        ...prev,
        categoryIds: exists
          ? prev.categoryIds.filter((id) => id !== categoryId)
          : [...prev.categoryIds, categoryId],
      };
    });
  };

  const handleFormSubmission = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) return toast.error("Provide a budget name");
    if (form.categoryIds.length === 0)
      return toast.error("Select at least one category");

    setSaving(true);
    try {
      await onSaved(form);
    } catch (error) {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleFormSubmission} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Budget Name"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <Input
          label="Amount Limit"
          type="number"
          step="0.01"
          required
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-(--color-text-main)">
          Tracked Categories{" "}
          <span className="text-[var(--color-danger)]">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-42.5 overflow-y-auto p-1 bg-[var(--color-bg-muted)]/50 rounded-lg border border-[var(--color-border-main)]">
          {categories.map((cat) => {
            const isSelected = form.categoryIds.includes(cat.id);
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => toggleCategorySelection(cat.id)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg border text-sm font-medium transition-all text-left ${
                  isSelected
                    ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-[var(--color-bg-surface)] shadow-sm"
                    : "border-[var(--color-border-main)] bg-[var(--color-bg-surface)] text-(--color-text-muted) hover:bg-[var(--color-bg-muted)]"
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: cat.color || "#71717a" }}
                  />
                  <span className="truncate">{cat.name}</span>
                </div>
                {isSelected && (
                  <Check
                    size={14}
                    className="text-[var(--color-bg-surface)] shrink-0 ml-1"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Select
          label="Period"
          value={form.period}
          onChange={(e) => setForm({ ...form, period: e.target.value })}
        >
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </Select>

        <Input
          label="Start Date"
          type="date"
          required
          value={form.startDate}
          onChange={(e) => setForm({ ...form, startDate: e.target.value })}
        />
      </div>

      <div className="space-y-3 bg-[var(--color-bg-muted)] p-4 rounded-lg border border-[var(--color-border-main)]">
        <div className="flex justify-between items-center">
          <label className="block text-xs font-bold text-(--color-text-main) uppercase tracking-wide">
            Alert Threshold
          </label>
          <span className="text-xs font-bold text-(--color-text-main) bg-[var(--color-bg-surface)] px-2 py-0.5 rounded-lg border border-[var(--color-border-main)]">
            {form.alertThreshold}%
          </span>
        </div>
        <input
          type="range"
          min="50"
          max="100"
          step="5"
          value={form.alertThreshold}
          onChange={(e) =>
            setForm({ ...form, alertThreshold: parseInt(e.target.value) })
          }
          className="w-full h-1.5 bg-[var(--color-border-main)] rounded-lg cursor-pointer appearance-none accent-[var(--color-accent)]"
        />
      </div>

      <div className="flex gap-3 justify-end pt-3 border-t border-[var(--color-border-main)]">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="w-full sm:w-auto"
        >
          Cancel
        </Button>
        <Button type="submit" disabled={saving}>
          {saving ? "Saving..." : initial ? "Save Changes" : "Create Budget"}
        </Button>
      </div>
    </form>
  );
};

export default BudgetForm;
