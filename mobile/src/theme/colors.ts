// Mirrors the design tokens in client/src/index.css so the mobile app
// stays visually consistent with the web app. Kept as plain objects
// (no theming library) to keep the bundle light.

export const lightColors = {
  bgApp: "#f6f7fb",
  bgSurface: "#ffffff",
  bgMuted: "#eef1f8",
  bgHover: "#e8ecf7",

  textMain: "#1a1a1a",
  textMuted: "#6b7280",
  textGhost: "#9ca3af",
  textInverse: "#ffffff",

  border: "#e5e7eb",
  borderMuted: "#f3f4f6",
  divider: "#e5e7eb",

  primary: "#5b4cf0",
  primaryHover: "#4b3ee0",
  primarySoft: "#ecebff",
  primaryForeground: "#ffffff",

  secondary: "#64748b",
  secondarySoft: "#f1f5f9",

  success: "#10b981",
  successSoft: "#ecfdf5",
  warning: "#f59e0b",
  warningSoft: "#fffbeb",
  danger: "#dc2626",
  dangerSoft: "#fef2f2",
  info: "#3b82f6",
  infoSoft: "#eff6ff",

  shadow: "rgba(0, 0, 0, 0.08)",
};

export const darkColors = {
  bgApp: "#0a0d16",
  bgSurface: "#131826",
  bgMuted: "#1d2435",
  bgHover: "#283149",

  textMain: "#f4f4f5",
  textMuted: "#a1a1aa",
  textGhost: "#71717a",
  textInverse: "#ffffff",

  border: "#27272a",
  borderMuted: "#1f1f23",
  divider: "#27272a",

  primary: "#7a7dff",
  primaryHover: "#9498ff",
  primarySoft: "rgba(122, 125, 255, 0.18)",
  primaryForeground: "#ffffff",

  secondary: "#94a3b8",
  secondarySoft: "rgba(148, 163, 184, 0.15)",

  success: "#34d399",
  successSoft: "rgba(52, 211, 153, 0.15)",
  warning: "#fbbf24",
  warningSoft: "rgba(251, 191, 36, 0.15)",
  danger: "#ef4444",
  dangerSoft: "rgba(239, 68, 68, 0.15)",
  info: "#60a5fa",
  infoSoft: "rgba(96, 165, 250, 0.15)",

  shadow: "rgba(0, 0, 0, 0.4)",
};

export type ThemeColors = typeof lightColors;
