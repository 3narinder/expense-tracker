import { View, Text, ViewProps } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useThemeColors } from "../theme/useThemeColors";

type AccentColor = "emerald" | "rose" | "orange" | "blue" | "purple";

interface Props extends ViewProps {
  label: string;
  value: string;
  icon: keyof typeof Feather.glyphMap;
  accent?: AccentColor;
}

const accentColors: Record<AccentColor, { bg: string; text: string }> = {
  emerald: { bg: "#ecfdf5", text: "#10b981" },
  rose: { bg: "#fef2f2", text: "#ef4444" },
  orange: { bg: "#fff7ed", text: "#f97316" },
  blue: { bg: "#eff6ff", text: "#3b82f6" },
  purple: { bg: "#f5f3ff", text: "#8b5cf6" },
};

export default function KpiCard({ label, value, icon, accent = "blue", style, ...rest }: Props) {
  const { colors } = useThemeColors();
  const accentColor = accentColors[accent];

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
      <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 12,
            backgroundColor: accentColor.bg,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Feather name={icon} size={20} color={accentColor.text} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 12, color: colors.textMuted, fontWeight: "500" }}>
            {label}
          </Text>
          <Text
            style={{
              fontSize: 20,
              color: colors.textMain,
              fontWeight: "700",
              marginTop: 4,
            }}
          >
            {value}
          </Text>
        </View>
      </View>
    </View>
  );
}
