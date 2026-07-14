const variants = {
  primary:
    "bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:bg-[var(--color-primary-hover)] shadow-sm hover:shadow-md focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]",

  secondary:
    "bg-[var(--color-secondary)] text-[var(--color-secondary-foreground)] hover:bg-[var(--color-secondary-hover)] shadow-sm hover:shadow-md focus-visible:ring-2 focus-visible:ring-[var(--color-secondary)]",

  outline:
    "border border-[var(--color-border-main)] bg-transparent text-[var(--color-text-main)] hover:bg-[var(--color-bg-muted)] hover:border-[var(--color-border-focus)] focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]",

  ghost:
    "bg-transparent text-[var(--color-text-main)] hover:bg-[var(--color-bg-muted)] focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]",

  success:
    "bg-[var(--color-success)] text-[var(--color-success-foreground)] hover:bg-[var(--color-success-hover)] shadow-sm hover:shadow-md focus-visible:ring-2 focus-visible:ring-[var(--color-success)]",

  danger:
    "bg-[var(--color-danger)] text-[var(--color-danger-foreground)] hover:bg-[var(--color-danger-hover)] shadow-sm hover:shadow-md focus-visible:ring-2 focus-visible:ring-[var(--color-danger)]",
};

const sizes = {
  sm: "h-9 px-3 rounded-md text-sm",
  md: "h-10 px-4 rounded-lg text-sm",
  lg: "h-11 px-5 rounded-xl text-base",
  xl: "h-12 px-6 rounded-xl text-base",
};

export default function Button({
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  className = "",
  children,
  type = "button",
  tooltip = "", // Added tooltip prop
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      title={tooltip} // Binds the tooltip to the native HTML title attribute
      className={`
        inline-flex
        items-center
        justify-center
        gap-2
        font-medium
        transition-all
        duration-200
        cursor-pointer
        active:scale-[0.98]
        disabled:cursor-not-allowed  /* Changed to allow the 'no-cursor' style & trigger tooltips */
        disabled:opacity-50
        ring-offset-2
        ring-offset-[var(--color-bg-surface)]
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {loading && (
        <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="3"
            opacity=".2"
          />
          <path
            d="M22 12A10 10 0 0012 2"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      )}

      {children}
    </button>
  );
}
