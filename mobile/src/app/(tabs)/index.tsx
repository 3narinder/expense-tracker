import { ScrollView, Text, View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useThemeColors } from "../../theme/useThemeColors";
import Card from "../../components/Card";
import ScreenHeader from "../../components/ScreenHeader";
import KpiCard from "../../components/KpiCard";
import MonthlyTrendChart from "../../components/MonthlyTrendChart";
import CategoryBreakdownChart from "../../components/CategoryBreakdownChart";
import TransactionList from "../../components/TransactionList";
import BudgetProgress from "../../components/BudgetProgress";
import {
  mockBudgets,
  mockCategoryBreakDown,
  mockInsights,
  mockMonthSummary,
  mockMonthTrends,
  mockRecentTransactions,
} from "../../data/mockAppData";

const formatCurrency = (amount: number, currency: string = "USD") =>
  new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount);

export default function Home() {
  const { colors } = useThemeColors();
  const currency = "USD";
  const latestInsight = mockInsights[0];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bgApp }} edges={["top"]}>
      <ScrollView contentContainerStyle={{ padding: 20 }} showsVerticalScrollIndicator={false}>
        <ScreenHeader
          title="Dashboard"
          subtitle="An overview of your finances this month"
          showLogout
        />

        <Card style={{ backgroundColor: colors.primary, borderWidth: 0 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <View>
              <Text style={{ color: colors.primaryForeground, opacity: 0.8, fontSize: 12 }}>
                Total Balance
              </Text>
              <Text style={{ color: colors.primaryForeground, fontSize: 32, fontWeight: "700", marginTop: 6 }}>
                {formatCurrency(mockMonthSummary.balance, currency)}
              </Text>
            </View>
            <View
              style={{
                backgroundColor: "rgba(255,255,255,0.18)",
                width: 44,
                height: 44,
                borderRadius: 12,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Feather name="credit-card" size={20} color={colors.primaryForeground} />
            </View>
          </View>
        </Card>

        <View style={{ flexDirection: "row", gap: 8, marginTop: 12 }}>
          {[
            { icon: "plus-circle", label: "Add Transaction" },
            { icon: "target", label: "Add Budget" },
            { icon: "zap", label: "Create Insight" },
          ].map((action) => (
            <Pressable
              key={action.label}
              style={{
                flex: 1,
                backgroundColor: colors.bgSurface,
                borderColor: colors.border,
                borderWidth: 1,
                borderRadius: 12,
                paddingVertical: 10,
                alignItems: "center",
                gap: 4,
              }}
            >
              <Feather name={action.icon as keyof typeof Feather.glyphMap} size={16} color={colors.primary} />
              <Text style={{ color: colors.textMain, fontSize: 11, fontWeight: "600" }}>{action.label}</Text>
            </Pressable>
          ))}
        </View>

        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12, marginTop: 16 }}>
          <View style={{ flex: 1, minWidth: "45%" }}>
            <KpiCard
              label="This Month's Net"
              value={formatCurrency(mockMonthSummary.monthlyNet, currency)}
              icon={mockMonthSummary.monthlyNet >= 0 ? "trending-up" : "trending-down"}
              accent={mockMonthSummary.monthlyNet >= 0 ? "emerald" : "rose"}
            />
          </View>
          <View style={{ flex: 1, minWidth: "45%" }}>
            <KpiCard
              label="Income"
              value={formatCurrency(mockMonthSummary.incomeThisMonth, currency)}
              icon="trending-up"
              accent="orange"
            />
          </View>
          <View style={{ flex: 1, minWidth: "45%" }}>
            <KpiCard
              label="Expenses"
              value={formatCurrency(mockMonthSummary.expenseThisMonth, currency)}
              icon="trending-down"
              accent="rose"
            />
          </View>
          <View style={{ flex: 1, minWidth: "45%" }}>
            <KpiCard
              label="Savings Rate"
              value={`${mockMonthSummary.savingsRate.toFixed(1)}%`}
              icon="dollar-sign"
              accent="blue"
            />
          </View>
        </View>

        <Card style={{ marginTop: 16 }}>
          <Text style={{ fontSize: 18, fontWeight: "700", color: colors.textMain }}>AI Monthly Snapshot</Text>
          <Text style={{ fontSize: 13, color: colors.textMuted, marginTop: 4, lineHeight: 19 }}>
            {latestInsight.summary}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10, gap: 8 }}>
            <View
              style={{
                backgroundColor: colors.successSoft,
                borderRadius: 999,
                paddingHorizontal: 10,
                paddingVertical: 4,
              }}
            >
              <Text style={{ color: colors.success, fontWeight: "700", fontSize: 12 }}>
                Health {latestInsight.healthScore}/100
              </Text>
            </View>
            <Text style={{ color: colors.textMuted, fontSize: 12 }}>Updated {latestInsight.createdAt}</Text>
          </View>
        </Card>

        <Card style={{ marginTop: 16 }}>
          <Text style={{ fontSize: 18, fontWeight: "700", color: colors.textMain, marginBottom: 4 }}>
            Monthly Trend
          </Text>
          <Text style={{ fontSize: 12, color: colors.textMuted, marginBottom: 16 }}>
            Income vs expenses, last 6 months
          </Text>
          <MonthlyTrendChart data={mockMonthTrends} currency={currency} />
        </Card>

        <Card style={{ marginTop: 16 }}>
          <Text style={{ fontSize: 18, fontWeight: "700", color: colors.textMain, marginBottom: 4 }}>
            Top Categories
          </Text>
          <Text style={{ fontSize: 12, color: colors.textMuted, marginBottom: 16 }}>
            Spending this month
          </Text>
          <CategoryBreakdownChart data={mockCategoryBreakDown} currency={currency} />
        </Card>

        <Card style={{ marginTop: 16 }}>
          <Text style={{ fontSize: 18, fontWeight: "700", color: colors.textMain, marginBottom: 12 }}>
            Recent Transactions
          </Text>
          <TransactionList transactions={mockRecentTransactions} currency={currency} />
        </Card>

        <Card style={{ marginTop: 16, marginBottom: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: "700", color: colors.textMain, marginBottom: 12 }}>
            Budget Status
          </Text>
          <BudgetProgress budgets={mockBudgets} currency={currency} />
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}
