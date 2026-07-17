import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useThemeColors } from "../../theme/useThemeColors";
import Card from "../../components/Card";
import ScreenHeader from "../../components/ScreenHeader";
import { mockCategories } from "../../data/mockAppData";

export default function Categories() {
  const { colors } = useThemeColors();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bgApp }} edges={["top"]}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <ScreenHeader
          title="Categories"
          subtitle="Organize where your money goes"
          showLogout
        />

        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
          {mockCategories.map((category) => (
            <Card key={category.id} style={{ width: "47%", padding: 12 }}>
              <View
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 10,
                  backgroundColor: `${category.color}20`,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Feather
                  name={category.icon as keyof typeof Feather.glyphMap}
                  size={15}
                  color={category.color}
                />
              </View>
              <Text style={{ marginTop: 8, fontSize: 13, fontWeight: "700", color: colors.textMain }}>
                {category.name}
              </Text>
              <Text style={{ marginTop: 2, fontSize: 11, color: colors.textMuted, textTransform: "capitalize" }}>
                {category.type}
              </Text>
            </Card>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
