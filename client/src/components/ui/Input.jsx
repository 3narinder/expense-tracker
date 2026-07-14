import { useState } from "react";

const Input = ({
  label,
  error,
  className = "",
  endAdornment,
  id,
  onFocus,
  onBlur,
  style,
  ...props
}) => {
  const [focused, setFocused] = useState(false);
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
            transition:
              "border-color 250ms ease-out, box-shadow 250ms ease-out",
            ...style,
          }}
          className={`
            w-full px-4 py-2.5 rounded-lg
            bg-[var(--color-bg-surface)] text-[var(--color-text-main)]
            placeholder-[var(--color-text-ghost)]
            disabled:opacity-50 disabled:cursor-not-allowed
            ${endAdornment ? "pr-11" : ""}
            ${
              props.type === "password"
                ? "text-xl tracking-[0.2em] font-mono leading-5"
                : "text-sm leading-5"
            }
            ${className}
          `
            .replace(/\s+/g, " ")
            .trim()}
          {...props}
        />
        {endAdornment && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center">
            {endAdornment}
          </div>
        )}
      </div>
      {error && (
        <p className="text-xs text-[var(--color-danger)] mt-1">{error}</p>
      )}
    </div>
  );
};

export default Input;
