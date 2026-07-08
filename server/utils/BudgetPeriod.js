// utils/BudgetPeriod.js
const MS_PER_DAY = 24 * 60 * 60 * 1000;

export const getPeriodEnd = (startDate, period) => {
  const end = new Date(startDate);

  switch (period) {
    case "weekly":
      end.setDate(end.getDate() + 7);
      break;
    case "quarterly":
      end.setMonth(end.getMonth() + 3);
      break;
    case "monthly":
    default:
      const expectedMonth = (end.getMonth() + 1) % 12;
      end.setMonth(end.getMonth() + 1);

      if (end.getMonth() !== expectedMonth) {
        end.setDate(0);
      }
      break;
  }
  return end;
};

export const isDateWithinPeriod = (date, startDate, period) => {
  const d = new Date(date).getTime();
  const start = new Date(startDate).getTime();
  const end = getPeriodEnd(startDate, period).getTime();
  return d >= start && d < end;
};
