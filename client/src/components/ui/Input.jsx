const Input = ({ label, error, className = "", endAdornment, id, ...props }) => {
  const inputId =
    id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className="space-y-2">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-[var(--color-text-main)]"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={inputId}
          className={`w-full px-4 py-2.5 ${endAdornment ? "pr-11" : ""} rounded-lg border border-[var(--color-border-main)] bg-[var(--color-bg-surface)] text-sm text-[var(--color-text-main)] placeholder-[var(--color-text-ghost)] transition-all duration-200 focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/10 focus:shadow-sm disabled:opacity-50 disabled:cursor-not-allowed ${
            props.type === "password" ? "text-base tracking-[0.2em]" : ""
          } ${className}`}
          {...props}
        />
        {endAdornment && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {endAdornment}
          </div>
        )}
      </div>
      {error && <p className="text-xs text-[var(--color-danger)] mt-1">{error}</p>}
    </div>
  );
};

export default Input;
