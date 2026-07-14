import { Text, View } from "react-native";
import { useThemeColors } from "../theme/useThemeColors";

type Props = {
  title: string;
  subtitle?: string;
};

export default function ScreenHeader({ title, subtitle }: Props) {
  const { colors } = useThemeColors();
  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={{ fontSize: 26, fontWeight: "700", color: colors.textMain }}>
        {title}
      </Text>
      {subtitle ? (
        <Text style={{ fontSize: 14, color: colors.textMuted, marginTop: 4 }}>
          {subtitle}
        </Text>
      ) : null}
    </View>
  );
}
