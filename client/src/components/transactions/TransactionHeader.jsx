import { Plus } from "lucide-react";

import Button from "../ui/Button.jsx";

const TransactionsHeader = ({ onCreate }) => (
  <div className="flex items-center justify-between">
    <div>
      <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
        Transactions
      </h1>
      <p className="text-sm text-slate-500 mt-1.5">
        All your income and expenses
      </p>
    </div>
    <Button onClick={onCreate}>
      <Plus size={16} /> Add Transaction
    </Button>
  </div>
);

export default TransactionsHeader;
