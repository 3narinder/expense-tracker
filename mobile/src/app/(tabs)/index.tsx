import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useThemeColors } from "../../theme/useThemeColors";
import Card from "../../components/Card";
import ScreenHeader from "../../components/ScreenHeader";

export default function Home() {
  const { colors } = useThemeColors();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bgApp }} edges={["top"]}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <ScreenHeader title="Home" subtitle="Your spending at a glance" />

        <Card style={{ backgroundColor: colors.primary, borderWidth: 0 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Feather name="credit-card" size={18} color={colors.primaryForeground} />
            <Text style={{ color: colors.primaryForeground, opacity: 0.85, fontSize: 13 }}>
              Total Balance
            </Text>
          </View>
          <Text
            style={{
              color: colors.primaryForeground,
              fontSize: 32,
              fontWeight: "700",
              marginTop: 8,
            }}
          >
            $0.00
          </Text>
        </Card>

        <Card style={{ marginTop: 16, alignItems: "center" }}>
          <Feather name="bar-chart-2" size={28} color={colors.textGhost} />
          <Text style={{ color: colors.textMain, fontWeight: "600", marginTop: 12 }}>
            Dashboard setup complete
          </Text>
          <Text
            style={{
              color: colors.textMuted,
              fontSize: 13,
              textAlign: "center",
              marginTop: 4,
            }}
          >
            KPIs, monthly trends, and recent activity will be wired up here next.
          </Text>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}
