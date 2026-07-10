import { useState } from "react";
import { useSearchParams } from "react-router-dom";

//* Hooks */
import { useCurrentUser } from "../features/Authentication/useCurrentUser.js";
import { useTransactions } from "../features/Transactions/useTransactions.js";
import { useTransactionActions } from "../features/Transactions/useTransactionActions.js";
import { useTransactionTrend } from "../features/Transactions/useTransactionTrend.js";

import { useCategories } from "../features/Categories/useCategories.js";
import { useAccounts } from "../features/Accounts/useAccounts.js";

//** Components */
import Modal from "../components/ui/Modal.jsx";
import TransactionForm from "../components/transactions/TransactionForm.jsx";
import TransactionsHeader from "../components/transactions/TransactionHeader.jsx";
import AIInsightCard from "../components/transactions/AIInsightCard.jsx";
import TransactionFilters from "../components/transactions/TransactionFilters.jsx";
import TransactionTrendCard from "../components/transactions/TransactionCard.jsx";
import TransactionsTable from "../components/transactions/TransactionTable.jsx";
import ConfirmDeleteModal from "../components/ui/ConfirmDeleteModal.jsx";

const PAGE_SIZE = 10;

const Transactions = () => {
  const { user } = useCurrentUser();
  const currency = user?.currency || "USD";

  const [searchParams, setSearchParams] = useSearchParams();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleteSingleTransaction, setDeleteSingleTransaction] = useState(null);

  const { categories } = useCategories();
  const { removeTransaction, isDeleting } = useTransactionActions();
  const { accounts } = useAccounts();

  // 1. Extract raw parameters from URL
  const page = Number(searchParams.get("page")) || 1;
  const range = searchParams.get("range") || "monthly";
  const search = searchParams.get("search") || "";
  const type = searchParams.get("type") || "";
  const categoryId = searchParams.get("categoryId") || "";
  const safeAccounts = accounts || [];

  //**  2. Reconstruct the filters
  const currentFilters = { search, type, categoryId, range, page };

  const { transactions, pagination, stats, isPending } = useTransactions({
    page,
    range,
    search,
    type,
    categoryId,
    limit: PAGE_SIZE,
  });

  const { trend, isPending: trendLoading } = useTransactionTrend({
    range,
    search,
    type,
    categoryId,
  });

  const safeTransactions = transactions || [];
  const safeCategories = categories || [];

  //** 3. Dynamic filter updater that syncs component state changes to the URL bar
  const handleFilterChange = (nextFilters) => {
    const params = new URLSearchParams(searchParams);

    Object.entries(nextFilters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key); // Clean up empty filters from the URL string
      }
    });

    params.set("page", "1"); // Always drop back to page 1 on filter updates
    setSearchParams(params);
  };

  const changeRange = (newRange) => {
    const params = new URLSearchParams(searchParams);
    params.set("range", newRange);
    params.set("page", "1");
    setSearchParams(params);
  };

  const changePage = (newPage) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(newPage));
    setSearchParams(params);
  };

  const onCreate = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const onEdit = (t) => {
    setEditing(t);
    setModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (deleteSingleTransaction) {
      removeTransaction(deleteSingleTransaction, {
        onSuccess: () => setDeleteSingleTransaction(null),
      });
    }
  };

  return (
    <div className="space-y-6">
      <TransactionsHeader onCreate={onCreate} />

      <TransactionTrendCard
        trend={trend}
        currency={currency}
        range={range}
        onRangeChange={changeRange}
        isLoading={trendLoading}
      />

      <AIInsightCard
        transactionIds={safeTransactions.map((t) => t.id || t._id)}
        transactionCount={safeTransactions.length}
      />

      <div className="bg-(--color-bg-surface) rounded-3xl border border-(--color-border-main) p-5">
        <TransactionFilters
          filters={currentFilters}
          onChange={handleFilterChange}
          categories={safeCategories}
          counts={stats?.counts || { all: 0, income: 0, expense: 0 }}
        />

        <TransactionsTable
          transactions={safeTransactions}
          currency={currency}
          isLoading={isPending}
          pagination={pagination}
          onPageChange={changePage}
          onEdit={onEdit}
          onDelete={(id) => setDeleteSingleTransaction(id)}
          onCreate={onCreate}
        />
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? "Edit Transaction" : "New Transaction"}
      >
        <TransactionForm
          initial={editing}
          categories={safeCategories}
          accounts={safeAccounts}
          onSaved={() => setModalOpen(false)}
          onCancel={() => setModalOpen(false)}
        />
      </Modal>

      <ConfirmDeleteModal
        open={!!deleteSingleTransaction}
        onClose={() => setDeleteSingleTransaction(null)}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
        title="Delete Transactions"
        message="Are you sure you want to delete this transaction? This action cannot be undone."
        itemName="Transaction"
      />
    </div>
  );
};

export default Transactions;
