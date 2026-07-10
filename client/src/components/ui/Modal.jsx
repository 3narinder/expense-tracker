import { useEffect } from "react";
import { X } from "lucide-react";

const sizeClasses = {
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-2xl",
};

const Modal = ({ open, onClose, title, children, size = "md" }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (open) {
      window.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className={`relative bg-[var(--color-bg-surface)] rounded-2xl shadow-lg w-full ${sizeClasses[size]} max-h-[90vh] flex flex-col`}
      >
        <div className="flex items-center justify-between p-6 border-b border-[var(--color-border-main)] shrink-0">
          <h2 className="font-semibold text-(--color-text-main)">{title}</h2>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-[var(--color-bg-muted)] rounded-lg text-(--color-text-muted) transition-colors"
          >
            <X size={18} />
          </button>
        </div>
        <div className="p-6 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
