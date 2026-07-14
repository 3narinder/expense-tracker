import { View, ViewProps } from "react-native";
import { useThemeColors } from "../theme/useThemeColors";

/**
 * Basic surface card: rounded corners, subtle border, themed background.
 * Mirrors the ".bg-[var(--color-bg-surface)] border border-[var(--color-border-main)]"
 * pattern used across the web app's cards (KpiCard, InsightCard, etc).
 */
export default function Card({ style, children, ...rest }: ViewProps) {
  const { colors } = useThemeColors();
  return (
    <View
      style={[
        {
          backgroundColor: colors.bgSurface,
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: 16,
          padding: 16,
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
}
