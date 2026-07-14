const styles = {
  income: "bg-[var(--color-success)]/10 text-[var(--color-success)]",
  expense: "bg-[var(--color-danger)]/10 text-[var(--color-danger)]",
  warning: "bg-[var(--color-warning)]/10 text-[var(--color-warning)]",
  info: "bg-[var(--color-info)]/10 text-[var(--color-info)]",
  critical: "bg-[var(--color-danger)]/10 text-[var(--color-danger)]",
  neutral: "bg-[var(--color-bg-muted)] text-[var(--color-text-main)]",
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
