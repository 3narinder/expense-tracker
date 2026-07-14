import { useColorScheme } from "react-native";
import { darkColors, lightColors } from "./colors";

/**
 * Returns the active color palette based on the device's system setting,
 * matching the "userInterfaceStyle": "automatic" behavior already set
 * in app.json. No provider/context needed — keeps things light.
 */
export function useThemeColors() {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";
  return { colors: isDark ? darkColors : lightColors, isDark };
}
