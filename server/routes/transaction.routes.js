import express from "express";
import {
  getTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  bulkDeleteTransactions,
  exportTransactionsCSV,
} from "../controllers/transactionController.js";

//* Protect the routes
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

//* Applying protection in all routes in this routes
router.use(protect);

//* ==========================================
//* SPECIFIC ROUTES (Must come before /:id)
//* ==========================================

//* Route: POST /api/transactions/bulk-delete
router.post("/bulk-delete", bulkDeleteTransactions);

//* Route: GET /api/transactions/export-csv
router.get("/export-csv", exportTransactionsCSV);

//* ==========================================
//* ROOT & PARAMETERIZED ROUTES
//* ==========================================

//* Routes: GET /api/transactions | POST /api/transactions

router.route("/").get(getTransactions).post(createTransaction);

//* Routes: GET /api/transactions/:id | PUT /api/transactions/:id | DELETE /api/transactions/:id

router
  .route("/:id")
  .get(getTransactionById)
  .put(updateTransaction)
  .delete(deleteTransaction);

export default router;
