import { useState } from "react";
import { lucideIconByName } from "../utils/icons.js";
import Input from "./ui/Input.jsx";
import Select from "./ui/Select.jsx";
import Button from "./ui/Button.jsx";
import { useCategoryActions } from "../features/Categories/useCategoriesActions.js";

const ICONS = [
  "tag",
  "utensils",
  "shopping-cart",
  "shopping-bag",
  "car",
  "home",
  "zap",
  "film",
  "heart",
  "book-open",
  "plane",
  "briefcase",
  "gift",
  "laptop",
  "trending-up",
  "sparkles",
];
const COLORS = [
  "#71717a", // muted
  "#64748b", // slate
  "#78716c", // stone
  "#d4af37", // gold
  "#22c55e", // success
  "#3b82f6", // info
  "#ef4444", // danger
  "#f59e0b", // warning
  "#8b5cf6", // purple
  "#ec4899", // pink
  "#06b6d4", // cyan
  "#14b8a6", // teal
  "#0ea5e9", // sky
  "#6366f1", // indigo
  "#a855f7", // fuchsia
  "#eab308", // lime
];

const CategoryForm = ({ initial, onSaved, onCancel }) => {
  const { addCategory, updateCategory, isCreating, isUpdating } =
    useCategoryActions();
  const [form, setForm] = useState({
    name: initial?.name || "",
    type: initial?.type || "expense",
    icon: initial?.icon || "tag",
    color: initial?.color || "#71717a",
  });

  const isSaving = isCreating || isUpdating;

  const submit = (e) => {
    e.preventDefault();

    if (initial) {
      updateCategory(
        { id: initial.id, updatedCategory: form },
        { onSuccess: onSaved },
      );
    } else {
      addCategory(form, { onSuccess: onSaved });
    }
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <Input
        label="Name"
        required
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      {!initial && (
        <Select
          label="Type"
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </Select>
      )}

      <div>
        <label className="block text-sm font-medium text-(--color-text-main) mb-2">
          Icon
        </label>
        <div className="grid grid-cols-8 gap-2">
          {ICONS.map((name) => {
            const Icon = lucideIconByName(name);
            return (
              <button
                key={name}
                type="button"
                onClick={() => setForm({ ...form, icon: name })}
                className={`h-10 rounded-lg border flex items-center justify-center transition-all ${
                  form.icon === name
                    ? "border-[var(--color-accent)] bg-[var(--color-bg-muted)] text-[var(--color-accent)]"
                    : "border-[var(--color-border-main)] text-(--color-text-muted) hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                }`}
              >
                <Icon size={18} />
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-(--color-text-main) mb-2">
          Color
        </label>
        <div className="flex flex-wrap gap-2">
          {COLORS.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => setForm({ ...form, color })}
              className={`h-8 w-8 rounded-lg transition-all ring-offset-2 border-2 ${form.color === color ? "ring-2 ring-[var(--color-accent)]" : "ring-0 border-[var(--color-border-main)]"}`}
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>
      </div>

      <div className="flex gap-2 justify-end pt-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSaving}>
          {isSaving ? "Saving..." : "Save"}
        </Button>
      </div>
    </form>
  );
};

export default CategoryForm;
