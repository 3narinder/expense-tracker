import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import transactionRoutes from "./routes/transaction.routes.js";
import accountRoutes from "./routes/account.routes.js";
import budgetRoutes from "./routes/budget.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import aiInsightRoutes from "./routes/aiInsight.routes.js";

const app = express();

const clientOrigins = (process.env.CLIENT_ORIGINS || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const defaultLocalOrigins =
  process.env.NODE_ENV !== "production"
    ? ["http://localhost:5173", "http://localhost:3000"]
    : [];

const allowedOrigins = [...defaultLocalOrigins, ...clientOrigins].filter(
  (value, index, self) => self.indexOf(value) === index,
);

if (allowedOrigins.length === 0) {
  console.warn(
    "⚠️ No CLIENT_ORIGINS / CLIENT_ORIGIN configured for CORS. In production this will block browser requests unless origin is explicitly allowed.",
  );
}

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(
        new Error(`CORS policy: Origin ${origin} is not allowed.`),
      );
    },
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/accounts", accountRoutes);
app.use("/api/budgets", budgetRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/insight", aiInsightRoutes);

export default app;
