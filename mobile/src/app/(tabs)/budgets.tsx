import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColors } from "../../theme/useThemeColors";
import Card from "../../components/Card";
import ScreenHeader from "../../components/ScreenHeader";
import { mockBudgets } from "../../data/mockAppData";

const formatCurrency = (amount: number, currency: string = "USD") =>
  new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount);

export default function Budgets() {
  const { colors } = useThemeColors();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bgApp }} edges={["top"]}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <ScreenHeader
          title="Budgets"
          subtitle="Stay on top of your limits"
          showLogout
        />

        {mockBudgets.map((budget) => {
          const pct = budget.amount > 0 ? Math.min((budget.spent / budget.amount) * 100, 100) : 0;
          const color =
            pct >= 100 ? colors.danger : pct >= 70 ? colors.warning : colors.success;

          return (
            <Card key={budget.id} style={{ marginBottom: 12 }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Text style={{ fontSize: 16, fontWeight: "700", color: colors.textMain }}>{budget.name}</Text>
                <Text style={{ fontSize: 12, color: colors.textMuted }}>{pct.toFixed(0)}% used</Text>
              </View>

              <Text style={{ fontSize: 12, color: colors.textMuted, marginTop: 4 }}>
                {budget.categories?.map((c) => c.name).join(", ")}
              </Text>

              <View
                style={{
                  marginTop: 12,
                  height: 8,
                  borderRadius: 999,
                  backgroundColor: colors.bgMuted,
                  overflow: "hidden",
                }}
              >
                <View style={{ width: `${pct}%`, height: "100%", backgroundColor: color }} />
              </View>

              <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
                <Text style={{ fontSize: 12, color: colors.textMuted }}>
                  {formatCurrency(budget.spent)} spent
                </Text>
                <Text style={{ fontSize: 12, color: colors.textMuted }}>
                  {formatCurrency(budget.amount)} limit
                </Text>
              </View>
            </Card>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}
