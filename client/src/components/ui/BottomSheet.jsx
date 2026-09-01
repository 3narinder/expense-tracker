import React, { useEffect } from "react";

const BottomSheet = ({ open, onClose, children, title }) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative w-full sm:w-[600px] bg-[var(--color-bg-surface)] border-t border-[var(--color-border-main)] rounded-t-2xl sm:rounded-2xl p-4 max-h-[90vh] overflow-y-auto">
        <div className="w-12 h-1.5 bg-[var(--color-border-main)] rounded-full mx-auto mb-3" />
        {title && <div className="text-lg font-semibold mb-2">{title}</div>}
        {children}
      </div>
    </div>
  );
};

export default BottomSheet;
