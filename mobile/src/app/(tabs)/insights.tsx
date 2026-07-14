import { ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useThemeColors } from "../../theme/useThemeColors";
import Card from "../../components/Card";
import ScreenHeader from "../../components/ScreenHeader";

export default function Insights() {
  const { colors } = useThemeColors();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bgApp }} edges={["top"]}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <ScreenHeader title="Insights" subtitle="AI-powered spending insights" />

        <Card style={{ alignItems: "center", paddingVertical: 32 }}>
          <Feather name="zap" size={28} color={colors.primary} />
          <Text style={{ color: colors.textMain, fontWeight: "600", marginTop: 12 }}>
            No insights yet
          </Text>
          <Text
            style={{
              color: colors.textMuted,
              fontSize: 13,
              textAlign: "center",
              marginTop: 4,
            }}
          >
            Your generated spending insights will appear here.
          </Text>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}
