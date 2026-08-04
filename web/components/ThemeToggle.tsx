"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/lib/theme-provider";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="inline-flex items-center justify-center rounded-full border border-(--color-border-main)/70 bg-(--color-bg-surface)/90 p-2.5 text-(--color-text-main) transition-all hover:bg-(--color-bg-hover)"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <Moon size={18} />
      ) : (
        <Sun size={18} />
      )}
    </button>
  );
}
