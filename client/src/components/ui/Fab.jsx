import React from "react";

const Fab = ({ onClick, ariaLabel = "Add", children }) => {
  return (
    <button
      aria-label={ariaLabel}
      onClick={onClick}
      className="fixed right-4 bottom-20 sm:bottom-8 z-50 w-14 h-14 rounded-full flex items-center justify-center bg-[var(--color-primary)] text-white shadow-lg active:scale-95 transition-transform"
    >
      {children}
    </button>
  );
};

export default Fab;
