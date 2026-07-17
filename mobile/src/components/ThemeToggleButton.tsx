import { Feather } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { useAppShell } from "../state/appShell";
import { useThemeColors } from "../theme/useThemeColors";

export default function ThemeToggleButton() {
  const { colors } = useThemeColors();
  const { resolvedTheme, toggleTheme } = useAppShell();

  return (
    <Pressable
      onPress={toggleTheme}
      style={{
        width: 36,
        height: 36,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.bgSurface,
        alignItems: "center",
        justifyContent: "center",
      }}
      accessibilityRole="button"
      accessibilityLabel={resolvedTheme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      <Feather
        name={resolvedTheme === "dark" ? "sun" : "moon"}
        size={16}
        color={colors.textMuted}
      />
    </Pressable>
  );
}
