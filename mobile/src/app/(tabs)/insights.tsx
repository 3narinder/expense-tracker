import { ScrollView, Text, View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useThemeColors } from "../../theme/useThemeColors";
import Card from "../../components/Card";
import ScreenHeader from "../../components/ScreenHeader";
import { mockInsights } from "../../data/mockAppData";

export default function Insights() {
  const { colors } = useThemeColors();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bgApp }} edges={["top"]}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <ScreenHeader
          title="Insights"
          subtitle="AI-powered spending insights"
          showLogout
        />

        <Card style={{ marginBottom: 12 }}>
          <Text style={{ color: colors.textMain, fontWeight: "700", fontSize: 16 }}>
            Generate AI Insights
          </Text>
          <Text style={{ color: colors.textMuted, marginTop: 4, fontSize: 13 }}>
            UI demo mode: AI buttons are visual only for mobile design review.
          </Text>
          <View style={{ flexDirection: "row", gap: 8, marginTop: 12 }}>
            <Pressable
              style={{
                flex: 1,
                backgroundColor: colors.primary,
                borderRadius: 10,
                paddingVertical: 10,
                alignItems: "center",
              }}
            >
              <Text style={{ color: colors.primaryForeground, fontWeight: "600", fontSize: 12 }}>
                Monthly Summary
              </Text>
            </Pressable>
            <Pressable
              style={{
                flex: 1,
                borderColor: colors.border,
                borderWidth: 1,
                borderRadius: 10,
                paddingVertical: 10,
                alignItems: "center",
                backgroundColor: colors.bgSurface,
              }}
            >
              <Text style={{ color: colors.textMain, fontWeight: "600", fontSize: 12 }}>
                Savings Tips
              </Text>
            </Pressable>
          </View>
        </Card>

        {mockInsights.map((insight) => (
          <Card key={insight.id} style={{ marginBottom: 12 }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
              <View
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  backgroundColor: colors.primarySoft,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Feather name="zap" size={15} color={colors.primary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ color: colors.textMain, fontWeight: "700", fontSize: 14 }}>
                  {insight.title}
                </Text>
                <Text style={{ color: colors.textMuted, fontSize: 11, marginTop: 2 }}>
                  {insight.createdAt}
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: colors.successSoft,
                  borderRadius: 999,
                  paddingHorizontal: 8,
                  paddingVertical: 3,
                }}
              >
                <Text style={{ color: colors.success, fontWeight: "700", fontSize: 11 }}>
                  {insight.healthScore}
                </Text>
              </View>
            </View>
            <Text style={{ color: colors.textMuted, marginTop: 10, fontSize: 13, lineHeight: 19 }}>
              {insight.summary}
            </Text>
          </Card>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
