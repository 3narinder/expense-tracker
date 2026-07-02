//** Shared helper for computing a budget's period window. Used by both the
//* budget controller (overlap checks, reconciliation) and the sync helper
//* (deciding whether a transaction date falls inside a budget's window).

const MS_PER_DAY = 24 * 60 * 60 * 1000;

//** Given a budget's startDate and period, return the exclusive end date of that period.

export const getPeriodEnd = (startDate, period) => {
  const end = new Date(startDate);
  switch (period) {
    case "weekly":
      end.setTime(end.getTime() + 7 * MS_PER_DAY);
      break;
    case "quarterly":
      end.setMonth(end.getMonth() + 3);
      break;
    case "monthly":
    default:
      end.setMonth(end.getMonth() + 1);
      break;
  }
  return end;
};

//** True if `date` falls within [startDate, periodEnd) for the given budget period definition.

export const isDateWithinPeriod = (date, startDate, period) => {
  const d = new Date(date).getTime();
  const start = new Date(startDate).getTime();
  const end = getPeriodEnd(startDate, period).getTime();
  return d >= start && d < end;
};
