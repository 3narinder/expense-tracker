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

const rawOrigins =
  process.env.CLIENT_ORIGINS ||
  process.env.CLIENT_ORIGIN ||
  process.env.CORS_ORIGINS ||
  process.env.CORS_ORIGIN ||
  "";

const clientOrigins = rawOrigins
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

console.log(
  `🔧 CORS config: NODE_ENV=${process.env.NODE_ENV}, rawOrigins=${JSON.stringify(
    rawOrigins,
  )}, allowedOrigins=${JSON.stringify(allowedOrigins)}`,
);

if (process.env.NODE_ENV === "production" && allowedOrigins.length === 0) {
  throw new Error(
    "Missing CLIENT_ORIGINS / CLIENT_ORIGIN / CORS_ORIGINS / CORS_ORIGIN in production environment. Please configure the allowed client origin(s) in your production environment settings.",
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

app.use((err, req, res, next) => {
  if (err?.message?.startsWith("CORS policy")) {
    return res.status(403).json({ message: err.message });
  }
  return next(err);
});

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
