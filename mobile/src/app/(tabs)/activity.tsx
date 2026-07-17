import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useThemeColors } from "../../theme/useThemeColors";
import Card from "../../components/Card";
import ScreenHeader from "../../components/ScreenHeader";
import { mockRecentTransactions } from "../../data/mockAppData";

const formatCurrency = (amount: number, currency: string = "USD") =>
  new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount);

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

export default function Activity() {
  const { colors } = useThemeColors();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bgApp }} edges={["top"]}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <ScreenHeader
          title="Transactions"
          subtitle="All your income and expenses"
          showLogout
        />

        <Card style={{ marginBottom: 16 }}>
          <View style={{ flexDirection: "row", gap: 8 }}>
            {["All", "Income", "Expense"].map((filter, index) => (
              <View
                key={filter}
                style={{
                  backgroundColor: index === 0 ? colors.primarySoft : colors.bgMuted,
                  borderRadius: 999,
                  paddingHorizontal: 12,
                  paddingVertical: 7,
                }}
              >
                <Text
                  style={{
                    color: index === 0 ? colors.primary : colors.textMuted,
                    fontWeight: "600",
                    fontSize: 12,
                  }}
                >
                  {filter}
                </Text>
              </View>
            ))}
          </View>
        </Card>

        <Card>
          {mockRecentTransactions.map((tx, index) => (
            <View
              key={tx.id}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingVertical: 12,
                borderBottomWidth: index === mockRecentTransactions.length - 1 ? 0 : 1,
                borderBottomColor: colors.borderMuted,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center", gap: 10, flex: 1 }}>
                <View
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 10,
                    backgroundColor: `${tx.category_color}20`,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Feather
                    name={tx.category_icon as keyof typeof Feather.glyphMap}
                    size={15}
                    color={tx.category_color}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: colors.textMain, fontWeight: "600", fontSize: 14 }}>
                    {tx.description}
                  </Text>
                  <Text style={{ color: colors.textMuted, fontSize: 12, marginTop: 2 }}>
                    {tx.category_name} · {formatDate(tx.transaction_date)}
                  </Text>
                </View>
              </View>
              <Text
                style={{
                  color: tx.type === "income" ? colors.success : colors.danger,
                  fontWeight: "700",
                  fontSize: 13,
                }}
              >
                {tx.type === "income" ? "+" : "-"}
                {formatCurrency(tx.amount)}
              </Text>
            </View>
          ))}
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}
