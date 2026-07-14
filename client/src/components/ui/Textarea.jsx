import { useState } from "react";

const Textarea = ({
  label,
  error,
  className = "",
  onFocus,
  onBlur,
  style,
  ...props
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-[var(--color-text-main)]">
          {label}
        </label>
      )}
      <textarea
        onFocus={(e) => {
          setFocused(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          onBlur?.(e);
        }}
        style={{
          outline: "none",
          border: `1px solid ${
            focused ? "var(--color-info)" : "var(--color-border-main)"
          }`,
          boxShadow: focused
            ? "0 0 0 4px color-mix(in srgb, var(--color-info) 16%, transparent)"
            : "0 1px 2px rgba(0,0,0,0.04)",
          transition: "border-color 250ms ease-out, box-shadow 250ms ease-out",
          ...style,
        }}
        className={`
          w-full px-4 py-2.5 rounded-lg text-sm
          bg-[var(--color-bg-surface)] text-[var(--color-text-main)]
          placeholder-[var(--color-text-ghost)]
          resize-y disabled:opacity-50 disabled:cursor-not-allowed
          ${className}
        `
          .replace(/\s+/g, " ")
          .trim()}
        {...props}
      ></textarea>
      {error && (
        <p className="text-xs text-[var(--color-danger)] mt-1">{error}</p>
      )}
    </div>
  );
};

export default Textarea;
