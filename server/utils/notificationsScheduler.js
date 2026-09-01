import Transaction from "../models/TransactionSchema.js";
import Budget from "../models/BudgetSchema.js";
import NotificationPreference from "../models/NotificationPreferenceSchema.js";
import * as notificationService from "../services/notificationService.js";
import mongoose from "mongoose";

// Helper: compute period key for budget (monthly uses YYYY-MM)
const getPeriodKey = (budget, refDate = new Date()) => {
  const d = new Date(refDate);
  if (budget.period === "monthly") {
    return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
  }
  if (budget.period === "weekly") {
    // ISO week year-week
    const firstJan = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const days = Math.floor((d - firstJan) / (24 * 60 * 60 * 1000));
    const week = Math.ceil((days + ((firstJan.getUTCDay() + 1) || 7)) / 7);
    return `${d.getUTCFullYear()}-W${String(week).padStart(2, "0")}`;
  }
  // fallback to month
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
};

export const runNotificationChecks = async () => {
  try {
    // 1) Recurring expenses reminder
    const now = new Date();
    const prefsMap = new Map();

    // load all users who have recurring transactions or budgets - simplified: iterate transactions
    const upcomingWindowDays = 7; // check up to 7 days ahead
    const windowEnd = new Date(now.getTime() + upcomingWindowDays * 24 * 60 * 60 * 1000);

    const recurringTx = await Transaction.find({ recurring: true, nextOccurrence: { $ne: null, $lte: windowEnd } });

    for (const tx of recurringTx) {
      const userId = tx.userId.toString();
      if (!prefsMap.has(userId)) {
        const p = await NotificationPreference.findOne({ userId: tx.userId });
        prefsMap.set(userId, p || null);
      }
      const prefs = prefsMap.get(userId);
      // default reminderDays
      const reminderDays = (prefs && prefs.thresholds && Array.isArray(prefs.thresholds.recurringReminderDays) && prefs.thresholds.recurringReminderDays.length > 0) ? prefs.thresholds.recurringReminderDays : [1];

      for (const daysBefore of reminderDays) {
        const remindDate = new Date(tx.nextOccurrence);
        remindDate.setDate(remindDate.getDate() - daysBefore);
        // compare dates ignoring time
        const diff = Math.floor((tx.nextOccurrence - now) / (24 * 60 * 60 * 1000));
        if (diff >= 0 && diff <= upcomingWindowDays) {
          // check if we should create reminder for this daysBefore
          const dedupKey = `recurring:${tx._id}:occurrence:${tx.nextOccurrence.toISOString()}:reminder:${daysBefore}`;
          const title = `${tx.merchant || tx.description || "Recurring payment"} is due ${diff === 0 ? 'today' : `in ${diff} day${diff>1? 's':''}`}`;
          const message = `Amount: ${tx.amount}.`;
          await notificationService.createNotification({
            userId: tx.userId,
            type: "RECURRING_EXPENSE_DUE",
            title,
            message,
            priority: "MEDIUM",
            category: "recurring",
            dedupKey,
            referenceId: tx._id,
          });
        }
      }
    }

    // 2) Budget thresholds
    const budgets = await Budget.find({});
    for (const b of budgets) {
      const userId = b.userId.toString();
      if (!prefsMap.has(userId)) {
        const p = await NotificationPreference.findOne({ userId: b.userId });
        prefsMap.set(userId, p || null);
      }
      const prefs = prefsMap.get(userId);
      // skip if user turned off budget notifications
      if (prefs && prefs.enabled && prefs.enabled.budgetWarnings === false && prefs.enabled.budgetExceeded === false) continue;

      // thresholds to check: info, warning, exceeded
      const infoThreshold = (prefs && prefs.thresholds && prefs.thresholds.budgetInfo) || 75;
      const warnThreshold = (prefs && prefs.thresholds && prefs.thresholds.budgetWarning) || 90;
      const exceededThreshold = 100;

      const percent = b.amount ? Math.floor((b.spent / b.amount) * 100) : 0;
      const periodKey = getPeriodKey(b, new Date());

      const makeDedup = (level) => `budget:${b._id}:threshold:${level}:period:${periodKey}`;

      if (percent >= infoThreshold && percent < warnThreshold) {
        // informational
        const dedupKey = makeDedup(infoThreshold);
        await notificationService.createNotification({
          userId: b.userId,
          type: "BUDGET_WARNING",
          title: `${b.name} budget reached ${percent}%`,
          message: `You've used ₹${b.spent} of your ₹${b.amount} budget (${percent}%).`,
          priority: "LOW",
          category: "budget",
          dedupKey,
          referenceId: b._id,
        });
      }

      if (percent >= warnThreshold && percent < exceededThreshold) {
        const dedupKey = makeDedup(warnThreshold);
        await notificationService.createNotification({
          userId: b.userId,
          type: "BUDGET_WARNING",
          title: `${b.name} budget at ${percent}% (warning)`,
          message: `You've used ₹${b.spent} of your ₹${b.amount} budget (${percent}%).`,
          priority: "MEDIUM",
          category: "budget",
          dedupKey,
          referenceId: b._id,
        });
      }

      if (percent >= exceededThreshold) {
        const dedupKey = makeDedup(exceededThreshold);
        const extra = b.spent - b.amount;
        await notificationService.createNotification({
          userId: b.userId,
          type: "BUDGET_EXCEEDED",
          title: `${b.name} budget exceeded by ₹${extra}`,
          message: `You have exceeded your ${b.name} budget by ₹${extra}.`,
          priority: "HIGH",
          category: "budget",
          dedupKey,
          referenceId: b._id,
        });
      }
    }

    // 3) TODO: other checks (upcoming payments, unusual expenses, summaries) — left as hooks for future expansion

  } catch (err) {
    console.error("notificationsScheduler error:", err);
  }
};

let _interval = null;
export const startNotificationsScheduler = ({ intervalMs = 1000 * 60 * 60 } = {}) => {
  // run once immediately
  runNotificationChecks();
  if (_interval) clearInterval(_interval);
  _interval = setInterval(() => runNotificationChecks(), intervalMs);
  // node process should not exit if running in production; keep reference
};

export const stopNotificationsScheduler = () => {
  if (_interval) clearInterval(_interval);
};
