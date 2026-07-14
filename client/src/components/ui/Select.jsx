const Select = ({ label, error, className = "", children, ...props }) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-[var(--color-text-main)]">
          {label}
        </label>
      )}
      <select
        className={`w-full px-4 py-2.5 rounded-lg border border-[var(--color-border-main)] text-sm bg-[var(--color-bg-surface)] text-[var(--color-text-main)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/10 focus:shadow-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${className}`}
        {...props}
      >
        {children}
      </select>
      {error && <p className="text-xs text-[var(--color-danger)] mt-1">{error}</p>}
    </div>
  );
};

export default Select;
