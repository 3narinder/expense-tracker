const variants = {
  primary:
    "bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--color-primary-foreground)] shadow-sm hover:shadow-md transition-all duration-200 focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2 focus:ring-offset-[var(--color-bg-surface)]",
  secondary:
    "bg-[var(--color-secondary)] hover:bg-[var(--color-secondary-hover)] text-[var(--color-secondary-foreground)] shadow-sm hover:shadow-md transition-all duration-200 focus:ring-2 focus:ring-[var(--color-secondary)] focus:ring-offset-2 focus:ring-offset-[var(--color-bg-surface)]",
  ghost:
    "bg-transparent hover:bg-[var(--color-bg-muted)] text-[var(--color-text-main)] transition-all duration-200 focus:ring-2 focus:ring-[var(--color-border-focus)] focus:ring-offset-2 focus:ring-offset-[var(--color-bg-surface)]",
  danger:
    "bg-[var(--color-danger)] hover:bg-[var(--color-danger-hover)] text-[var(--color-danger-foreground)] shadow-sm hover:shadow-md transition-all duration-200 focus:ring-2 focus:ring-[var(--color-danger)] focus:ring-offset-2 focus:ring-offset-[var(--color-bg-surface)]",
  outline:
    "border border-[var(--color-border-main)] hover:bg-[var(--color-bg-muted)] hover:border-[var(--color-border-focus)] text-[var(--color-text-main)] transition-all duration-200 focus:ring-2 focus:ring-[var(--color-border-focus)] focus:ring-offset-2 focus:ring-offset-[var(--color-bg-surface)]",
  success:
    "bg-[var(--color-success)] hover:bg-[var(--color-success-hover)] text-[var(--color-success-foreground)] shadow-sm hover:shadow-md transition-all duration-200 focus:ring-2 focus:ring-[var(--color-success)] focus:ring-offset-2 focus:ring-offset-[var(--color-bg-surface)]",
};

const sizes = {
  sm: "px-3 py-1.5 text-sm font-medium rounded-md",
  md: "px-4 py-2 text-sm font-medium rounded-lg",
  lg: "px-6 py-2.5 text-base font-semibold rounded-lg",
  xl: "px-8 py-3 text-base font-semibold rounded-lg",
};

const Button = ({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}) => {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:opacity-50 active:scale-[0.98] ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
