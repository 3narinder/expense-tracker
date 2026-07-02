import { useState } from "react";
import toast from "react-hot-toast";

import Input from "./ui/Input.jsx";
import Select from "./ui/Select.jsx";
import Button from "./ui/Button.jsx";

const BudgetForm = ({ initial, categories, onSaved, onCancel }) => {
  const [form, setForm] = useState({
    categoryId: initial?.category_id || "",
    amount: initial?.amount || "",
    period: initial?.period || "monthly",
  });
  const [saving, setSaving] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      {!initial && (
        <Select
          label="Category"
          required
          value={form.categoryId}
          onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
        >
          <option value="">Select a category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </Select>
      )}

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
        label="Period"
        value={form.period}
        onChange={(e) => setForm({ ...form, period: e.target.value })}
      >
        <option value="monthly">Monthly</option>
        <option value="weekly">Weekly</option>
      </Select>

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

export default BudgetForm;
