import { darkColors, lightColors } from "./colors";
import { useAppShell } from "../state/appShell";

/**
 * Returns the active color palette based on the device's system setting,
 * matching the "userInterfaceStyle": "automatic" behavior already set
 * in app.json. No provider/context needed — keeps things light.
 */
export function useThemeColors() {
  const { resolvedTheme } = useAppShell();
  const isDark = resolvedTheme === "dark";
  return { colors: isDark ? darkColors : lightColors, isDark };
}
