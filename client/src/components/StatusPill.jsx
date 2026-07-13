const styles = {
  income: "bg-(--color-success-soft) text-(--color-success-foreground)",
  expense: "bg-(--color-danger-soft) text-(--color-danger-foreground)",
  warning: "bg-(--color-warning-soft) text-(--color-warning-foreground)",
  info: "bg-(--color-info-soft) text-(--color-info-foreground)",
  critical: "bg-(--color-danger-soft) text-(--color-danger-foreground)",
  neutral: "bg-(--color-bg-muted) text-(--color-text-main)",
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
