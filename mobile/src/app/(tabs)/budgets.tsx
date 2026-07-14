import { ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useThemeColors } from "../../theme/useThemeColors";
import Card from "../../components/Card";
import ScreenHeader from "../../components/ScreenHeader";

export default function Budgets() {
  const { colors } = useThemeColors();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bgApp }} edges={["top"]}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <ScreenHeader title="Budgets" subtitle="Stay on top of your limits" />

        <Card style={{ alignItems: "center", paddingVertical: 32 }}>
          <Feather name="target" size={28} color={colors.textGhost} />
          <Text style={{ color: colors.textMain, fontWeight: "600", marginTop: 12 }}>
            No budgets yet
          </Text>
          <Text
            style={{
              color: colors.textMuted,
              fontSize: 13,
              textAlign: "center",
              marginTop: 4,
            }}
          >
            Budget progress bars and forms will connect to the API here.
          </Text>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}
