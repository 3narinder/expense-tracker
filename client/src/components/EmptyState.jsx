const EmptyState = ({ icon: Icon, title, description, action }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      {Icon && (
        <div className="h-12 w-12 rounded-lg bg-[var(--color-bg-muted)] flex items-center justify-center mb-4">
          <Icon size={24} className="text-(--color-text-muted)" />
        </div>
      )}
      <h3 className="font-semibold text-(--color-text-main) mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-(--color-text-muted) max-w-sm">
          {description}
        </p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
};

export default EmptyState;
