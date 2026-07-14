const Input = ({ label, error, className = "", endAdornment, id, ...props }) => {
  const inputId =
    id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className="space-y-2">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-(--color-text-main)"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={inputId}
          className={`w-full px-4 py-2.5 ${endAdornment ? "pr-11" : ""} rounded-lg border border-(--color-border-main) bg-(--color-bg-surface) text-sm text-(--color-text-main) placeholder-(--color-text-ghost) transition-all duration-200 focus:outline-none focus:border-(--color-accent) focus:ring-2 focus:ring-(--color-accent)/20 ${
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
      {error && <p className="text-xs text-(--color-danger)">{error}</p>}
    </div>
  );
};

export default Input;
