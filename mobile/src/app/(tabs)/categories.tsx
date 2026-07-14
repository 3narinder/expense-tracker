import { ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useThemeColors } from "../../theme/useThemeColors";
import Card from "../../components/Card";
import ScreenHeader from "../../components/ScreenHeader";

export default function Categories() {
  const { colors } = useThemeColors();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bgApp }} edges={["top"]}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <ScreenHeader title="Categories" subtitle="Organize where your money goes" />

        <Card style={{ alignItems: "center", paddingVertical: 32 }}>
          <Feather name="folder" size={28} color={colors.textGhost} />
          <Text style={{ color: colors.textMain, fontWeight: "600", marginTop: 12 }}>
            No categories yet
          </Text>
          <Text
            style={{
              color: colors.textMuted,
              fontSize: 13,
              textAlign: "center",
              marginTop: 4,
            }}
          >
            Category badges and management will live here.
          </Text>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}
