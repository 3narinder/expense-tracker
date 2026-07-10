const styles = {
  income:
    "bg-green-100/50 text-green-700 dark:bg-green-900/20 dark:text-green-400",
  expense: "bg-red-100/50 text-red-700 dark:bg-red-900/20 dark:text-red-400",
  warning:
    "bg-amber-100/50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400",
  info: "bg-blue-100/50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400",
  critical: "bg-red-100/50 text-red-700 dark:bg-red-900/20 dark:text-red-400",
  neutral: "bg-[var(--color-bg-muted)] text-(--color-text-main)",
};

const StatusPill = ({ variant = "neutral", children }) => {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium capitalize transition-colors ${styles[variant] || styles.neutral}`}
    >
      {children}
    </span>
  );
};

export default StatusPill;
