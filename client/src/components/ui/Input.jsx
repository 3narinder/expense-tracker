const Input = ({ label, error, className = "", ...props }) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-(--color-text-main)">
          {label}
        </label>
      )}
      <input
        className={`w-full px-4 py-2.5 rounded-lg border border-[var(--color-border-main)] bg-[var(--color-bg-surface)] text-sm text-(--color-text-main) placeholder-[var(--color-text-ghost)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent transition-all ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-[var(--color-danger)]">{error}</p>}
    </div>
  );
};

export default Input;
