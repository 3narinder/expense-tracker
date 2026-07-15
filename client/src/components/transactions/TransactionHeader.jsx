import { Download, Plus, Trash2 } from "lucide-react";
import Button from "../ui/Button.jsx";

const TransactionsHeader = ({
  onCreate,
  onExport,
  onBulkDelete,
  selectedCount = 0,
  isBulkDeleting = false,
  isExporting = false,
}) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
    <div>
      <h1 className="text-3xl font-bold text-(--color-text-main) tracking-tight">
        Transactions
      </h1>
      <p className="text-sm text-(--color-text-muted) mt-1.5">
        All your income and expenses
      </p>
    </div>

    <div className="flex flex-col sm:flex-row md:items-center gap-2">
      <Button variant="outline" onClick={onExport} disabled={isExporting}>
        <Download size={16} />
        {isExporting ? "Exporting..." : "Export CSV"}
      </Button>
      <Button
        variant="danger"
        onClick={onBulkDelete}
        disabled={selectedCount === 0 || isBulkDeleting}
        tooltip={selectedCount === 0 ? "Select transactions to delete" : ""}
      >
        <Trash2 size={16} />
        {isBulkDeleting ? "Deleting..." : `Delete Selected (${selectedCount})`}
      </Button>
      <Button onClick={onCreate}>
        <Plus size={16} /> Add Transaction
      </Button>
    </div>
  </div>
);

export default TransactionsHeader;
