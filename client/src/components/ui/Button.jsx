const variants = {
  primary:
    "bg-(--color-accent) hover:bg-(--color-accent-hover) text-(--color-accent-foreground) shadow-sm transition-colors",
  secondary:
    "bg-(--color-bg-muted) hover:bg-(--color-bg-hover) text-(--color-text-main) transition-colors",
  ghost:
    "hover:bg-(--color-bg-muted) text-(--color-text-main) transition-colors",
  danger:
    "bg-(--color-danger) hover:bg-red-500 text-(--color-accent-foreground) shadow-sm transition-colors",
  outline:
    "border border-(--color-border-main) hover:bg-(--color-bg-muted) text-(--color-text-main) transition-colors",
};

const sizes = {
  sm: "px-4 py-1.5 text-sm font-medium",
  md: "px-5 py-2.5 text-sm font-medium",
  lg: "px-6 py-3 text-base font-semibold",
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
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
