import { ScrollView, Text, View, ActivityIndicator } from "react-native";
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
import { useDashboardData } from "../../hooks/useDashboardData";
import { useBudgets } from "../../hooks/useBudgets";

const formatCurrency = (amount: number, currency: string = "USD") => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
};

export default function Home() {
  const { colors } = useThemeColors();
  const {
    monthSummary,
    monthTrends,
    categoryBreakDown,
    recentTransactions,
    isPending,
  } = useDashboardData();
  const { data: budgets = [] } = useBudgets();
  const currency = "USD";

  if (isPending) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.bgApp }} edges={["top"]}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  const hasNoData =
    monthSummary?.balance === 0 &&
    monthSummary?.incomeThisMonth === 0 &&
    monthSummary?.expenseThisMonth === 0 &&
    recentTransactions?.length === 0;

  if (hasNoData) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.bgApp }} edges={["top"]}>
        <ScrollView contentContainerStyle={{ padding: 20 }}>
          <ScreenHeader title="Home" subtitle="Your spending at a glance" />

          <Card style={{ alignItems: "center", paddingVertical: 40 }}>
            <View
              style={{
                width: 96,
                height: 96,
                borderRadius: 48,
                backgroundColor: colors.primarySoft,
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 24,
              }}
            >
              <Feather name="credit-card" size={40} color={colors.primary} />
            </View>
            <Text style={{ fontSize: 28, fontWeight: "700", color: colors.textMain, marginBottom: 12 }}>
              Welcome to ExpenseAI!
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: colors.textMuted,
                textAlign: "center",
                marginBottom: 24,
                lineHeight: 20,
              }}
            >
              Your dashboard is empty right now. Add a transaction, set a budget, or generate your first AI monthly summary.
            </Text>
          </Card>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bgApp }} edges={["top"]}>
      <ScrollView contentContainerStyle={{ padding: 20 }} showsVerticalScrollIndicator={false}>
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
            {formatCurrency(monthSummary?.balance || 0, currency)}
          </Text>
        </Card>

        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12, marginTop: 16 }}>
          <View style={{ flex: 1, minWidth: "45%" }}>
            <KpiCard
              label="This Month's Net"
              value={formatCurrency(monthSummary?.monthlyNet || 0, currency)}
              icon={(monthSummary?.monthlyNet ?? 0) >= 0 ? "trending-up" : "trending-down"}
              accent={(monthSummary?.monthlyNet ?? 0) >= 0 ? "emerald" : "rose"}
            />
          </View>
          <View style={{ flex: 1, minWidth: "45%" }}>
            <KpiCard
              label="Income"
              value={formatCurrency(monthSummary?.incomeThisMonth || 0, currency)}
              icon="trending-up"
              accent="orange"
            />
          </View>
          <View style={{ flex: 1, minWidth: "45%" }}>
            <KpiCard
              label="Expenses"
              value={formatCurrency(monthSummary?.expenseThisMonth || 0, currency)}
              icon="trending-down"
              accent="rose"
            />
          </View>
          <View style={{ flex: 1, minWidth: "45%" }}>
            <KpiCard
              label="Savings Rate"
              value={`${monthSummary?.savingsRate?.toFixed(1) || 0}%`}
              icon="dollar-sign"
              accent="blue"
            />
          </View>
        </View>

        <Card style={{ marginTop: 16 }}>
          <Text style={{ fontSize: 18, fontWeight: "700", color: colors.textMain, marginBottom: 4 }}>
            Monthly Trend
          </Text>
          <Text style={{ fontSize: 12, color: colors.textMuted, marginBottom: 16 }}>
            Income vs expenses, last 6 months
          </Text>
          <MonthlyTrendChart data={monthTrends} currency={currency} />
        </Card>

        <Card style={{ marginTop: 16 }}>
          <Text style={{ fontSize: 18, fontWeight: "700", color: colors.textMain, marginBottom: 4 }}>
            Top Categories
          </Text>
          <Text style={{ fontSize: 12, color: colors.textMuted, marginBottom: 16 }}>
            Spending this month
          </Text>
          <CategoryBreakdownChart data={categoryBreakDown} currency={currency} />
        </Card>

        <Card style={{ marginTop: 16 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <View>
              <Text style={{ fontSize: 18, fontWeight: "700", color: colors.textMain }}>
                Recent Transactions
              </Text>
            </View>
          </View>
          <TransactionList transactions={recentTransactions} currency={currency} />
        </Card>

        <Card style={{ marginTop: 16, marginBottom: 20 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <View>
              <Text style={{ fontSize: 18, fontWeight: "700", color: colors.textMain }}>
                Budget Status
              </Text>
            </View>
          </View>
          <BudgetProgress budgets={budgets} currency={currency} />
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}
