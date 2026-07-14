// Mirrors the design tokens in client/src/index.css so the mobile app
// stays visually consistent with the web app. Kept as plain objects
// (no theming library) to keep the bundle light.

export const lightColors = {
  bgApp: "#fafafa",
  bgSurface: "#ffffff",
  bgMuted: "#f5f5f5",
  bgHover: "#f0f0f0",

  textMain: "#1a1a1a",
  textMuted: "#6b7280",
  textGhost: "#9ca3af",
  textInverse: "#ffffff",

  border: "#e5e7eb",
  borderMuted: "#f3f4f6",
  divider: "#e5e7eb",

  primary: "#4f46e5",
  primaryHover: "#4338ca",
  primarySoft: "#eef2ff",
  primaryForeground: "#ffffff",

  secondary: "#64748b",
  secondarySoft: "#f1f5f9",

  success: "#10b981",
  successSoft: "#ecfdf5",
  warning: "#f59e0b",
  warningSoft: "#fffbeb",
  danger: "#ef4444",
  dangerSoft: "#fef2f2",
  info: "#3b82f6",
  infoSoft: "#eff6ff",

  shadow: "rgba(0, 0, 0, 0.08)",
};

export const darkColors = {
  bgApp: "#0a0a0b",
  bgSurface: "#141416",
  bgMuted: "#1f1f23",
  bgHover: "#2a2a2e",

  textMain: "#f4f4f5",
  textMuted: "#a1a1aa",
  textGhost: "#71717a",
  textInverse: "#ffffff",

  border: "#27272a",
  borderMuted: "#1f1f23",
  divider: "#27272a",

  primary: "#6366f1",
  primaryHover: "#818cf8",
  primarySoft: "rgba(99, 102, 241, 0.15)",
  primaryForeground: "#ffffff",

  secondary: "#94a3b8",
  secondarySoft: "rgba(148, 163, 184, 0.15)",

  success: "#34d399",
  successSoft: "rgba(52, 211, 153, 0.15)",
  warning: "#fbbf24",
  warningSoft: "rgba(251, 191, 36, 0.15)",
  danger: "#f87171",
  dangerSoft: "rgba(248, 113, 113, 0.15)",
  info: "#60a5fa",
  infoSoft: "rgba(96, 165, 250, 0.15)",

  shadow: "rgba(0, 0, 0, 0.4)",
};

export type ThemeColors = typeof lightColors;
