const Select = ({ label, error, className = "", children, ...props }) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-(--color-text-main)">
          {label}
        </label>
      )}
      <select
        className={`w-full px-4 py-2.5 rounded-lg border border-(--color-border-main) text-sm bg-(--color-bg-surface) text-(--color-text-main) focus:outline-none focus:ring-2 focus:ring-(--color-accent) focus:border-transparent transition-all ${className}`}
        {...props}
      >
        {children}
      </select>
      {error && <p className="text-xs text-(--color-danger)">{error}</p>}
    </div>
  );
};

export default Select;
