import { useState } from "react";
import { Plus, Pencil, Trash2, Folder } from "lucide-react";

//* Components
import Button from "../components/ui/Button.jsx";
import Modal from "../components/ui/Modal.jsx";
import CategoryBadge from "../components/CategoryBadge.jsx";
import StatusPill from "../components/StatusPill.jsx";
import EmptyState from "../components/EmptyState.jsx";
import Spinner from "../components/Spinner.jsx";
import CategoryForm from "../components/CategoryForm.jsx";

//* Hooks
import { useCategories } from "../features/Categories/useCategories.js";
import { useCategoryActions } from "../features/Categories/useCategoriesActions.js";
import ConfirmDeleteModal from "../components/ui/ConfirmDeleteModal.jsx";

const Categories = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleteSingleCategory, setDeleteSingleCategory] = useState(null);

  //* Data fetching & Mutation hooks
  const { categories, isPending } = useCategories();
  const { deleteCategory, isDeleting } = useCategoryActions();

  const onEdit = (c) => {
    setEditing(c);
    setModalOpen(true);
  };

  const onCreate = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const handleDelete = () => {
    if (deleteSingleCategory) {
      deleteCategory(deleteSingleCategory, {
        onSuccess: () => setDeleteSingleCategory(null),
      });
    }
  };

  if (isPending) {
    return (
      <div className="flex justify-center py-12">
        <Spinner />
      </div>
    );
  }

  const income = categories?.filter((c) => c.type === "income") || [];
  const expense = categories?.filter((c) => c.type === "expense") || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[var(--color-text-main)] tracking-tight">
            Categories
          </h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-1.5">
            Organize transactions by category
          </p>
        </div>
        <Button onClick={onCreate}>
          <Plus size={16} /> Add Category
        </Button>
      </div>

      {categories?.length === 0 ? (
        <EmptyState
          icon={Folder}
          title="No categories"
          description="Add a category to start organizing."
        />
      ) : (
        <>
          {[
            { label: "Income", items: income },
            { label: "Expense", items: expense },
          ].map((group) => (
            <div key={group.label}>
              <h2 className="font-semibold text-(--color-text-main) mb-3">
                {group.label}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {group.items.map((c) => (
                  <div
                    key={c.id}
                    className="bg-(--color-bg-surface) rounded-2xl border border-(--color-border-main) shadow-sm p-4 flex items-center justify-between"
                  >
                    <CategoryBadge
                      name={c.name}
                      icon={c.icon}
                      color={c.color}
                    />
                    <div className="flex items-center gap-1.5">
                      {c.isDefault && (
                        <StatusPill variant="neutral">default</StatusPill>
                      )}
                      <button
                        onClick={() => onEdit(c)}
                        className="p-1.5 hover:bg-(--color-bg-muted) rounded-md text-(--color-text-muted) transition"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => setDeleteSingleCategory(c.id)} // Point directly to the setter
                        disabled={isDeleting}
                        className="p-1.5 hover:bg-rose-50 rounded-md text-rose-500 transition disabled:opacity-50"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </>
      )}

      {/* Edit/Create Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? "Edit Category" : "New Category"}
      >
        <CategoryForm
          initial={editing}
          onSaved={() => setModalOpen(false)}
          onCancel={() => setModalOpen(false)}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmDeleteModal
        open={!!deleteSingleCategory}
        onClose={() => setDeleteSingleCategory(null)}
        onConfirm={handleDelete}
        isDeleting={isDeleting}
        title="Delete Category"
        message="Are you sure you want to delete this category? All associated transactions will become uncategorized."
        itemName="Category"
      />
    </div>
  );
};

export default Categories;
