import mongoose from "mongoose";
import Transaction from "../models/TransactionSchema.js";
import Account from "../models/AccountSchema.js";
import { syncBudgetsOnCreate } from "../utils/BudgetSync.js";

export const getNextOccurrence = (fromDate, frequency) => {
  if (!fromDate || !frequency) return null;
  const d = new Date(fromDate);
  switch (frequency) {
    case "daily":
      d.setDate(d.getDate() + 1);
      return d;
    case "weekly":
      d.setDate(d.getDate() + 7);
      return d;
    case "monthly":
      d.setMonth(d.getMonth() + 1);
      return d;
    case "yearly":
      d.setFullYear(d.getFullYear() + 1);
      return d;
    default:
      return null;
  }
};

export const runRecurringJobs = async () => {
  const now = new Date();
  try {
    const dueTemplates = await Transaction.find({
      recurring: true,
      nextOccurrence: { $ne: null, $lte: now },
    });

    for (const template of dueTemplates) {
      const session = await mongoose.startSession();
      try {
        await session.withTransaction(async () => {
          const occurrenceDate = template.nextOccurrence || new Date();

          const occurrence = new Transaction({
            userId: template.userId,
            profileType: template.profileType,
            accountId: template.accountId,
            categoryId: template.categoryId,
            type: template.type,
            description: template.description,
            merchant: template.merchant,
            tags: template.tags,
            notes: template.notes,
            amount: template.amount,
            transactionDate: occurrenceDate,
            recurring: false,
            recurringFrequency: null,
            nextOccurrence: null,
          });

          await occurrence.save({ session });

          const impact = template.type === "income" ? template.amount : -template.amount;
          await Account.findByIdAndUpdate(
            template.accountId,
            { $inc: { balance: impact } },
            { session },
          );

          await syncBudgetsOnCreate(
            {
              userId: template.userId,
              profileType: template.profileType,
              categoryId: template.categoryId,
              transactionDate: occurrenceDate,
              type: template.type,
              amount: template.amount,
            },
            session,
          );

          const next = getNextOccurrence(occurrenceDate, template.recurringFrequency);
          template.nextOccurrence = next;
          await template.save({ session });
        });
      } catch (err) {
        console.error("Error processing recurring template", template._id, err);
      } finally {
        await session.endSession();
      }
    }
  } catch (err) {
    console.error("runRecurringJobs error:", err);
  }
};

let _interval = null;
export const startRecurringScheduler = ({ intervalMs = 1000 * 60 * 60 } = {}) => {
  runRecurringJobs();
  if (_interval) clearInterval(_interval);
  _interval = setInterval(() => runRecurringJobs(), intervalMs);
};

export const stopRecurringScheduler = () => {
  if (_interval) clearInterval(_interval);
};
