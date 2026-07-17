import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useThemeColors } from "../theme/useThemeColors";

interface Budget {
  id: string;
  name: string;
  amount: number;
  spent: number;
  categories?: { name: string }[];
}

interface Props {
  budgets: Budget[];
  currency?: string;
}

const formatCurrency = (amount: number, currency: string = "USD") => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
};

export default function BudgetProgress({ budgets, currency = "USD" }: Props) {
  const { colors } = useThemeColors();

  if (!budgets || budgets.length === 0) {
    return (
      <View style={[styles.emptyContainer, { backgroundColor: colors.bgMuted }]}>
        <View style={[styles.iconContainer, { backgroundColor: colors.bgSurface }]}>
          <Feather name="target" size={18} color={colors.primary} />
        </View>
        <Text style={[styles.emptyTitle, { color: colors.textMain }]}>
          No active budgets
        </Text>
        <Text style={[styles.emptySubtitle, { color: colors.textMuted }]}>
          Keep your spending in check by setting limits.
        </Text>
      </View>
    );
  }

  const totalSpent = budgets.reduce((sum, b) => sum + (b.spent || 0), 0);
  const totalBudget = budgets.reduce((sum, b) => sum + (b.amount || 0), 0);
  const aggPct = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;
  const aggColor =
    aggPct >= 100
      ? colors.danger
      : aggPct >= 70
        ? colors.warning
        : colors.success;

  return (
    <View style={styles.container}>
      <View style={styles.summary}>
        <View>
          <Text style={[styles.totalSpent, { color: colors.textMain }]}>
            {formatCurrency(totalSpent, currency)}
          </Text>
          <Text style={[styles.totalLabel, { color: colors.textMuted }]}>
            of {formatCurrency(totalBudget, currency)} total
          </Text>
        </View>
        <View style={styles.percentageContainer}>
          <Text style={[styles.percentage, { color: aggColor }]}>
            {aggPct.toFixed(0)}%
          </Text>
          <Text style={[styles.percentageLabel, { color: colors.textMuted }]}>
            used
          </Text>
        </View>
      </View>
      <View style={[styles.progressBar, { backgroundColor: colors.bgMuted }]}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${Math.min(aggPct, 100)}%`,
              backgroundColor: aggColor,
            },
          ]}
        />
      </View>

      <View style={styles.budgetList}>
        {budgets.slice(0, 4).map((budget) => {
          const pct = budget.amount > 0 ? Math.min((budget.spent / budget.amount) * 100, 100) : 0;
          const color =
            pct >= 100
              ? colors.danger
              : pct >= 70
                ? colors.warning
                : colors.success;
          const label = budget.categories?.map((c) => c.name).join(", ") || budget.name;

          return (
            <View key={budget.id} style={styles.budgetItem}>
              <View style={styles.budgetHeader}>
                <Text style={[styles.budgetLabel, { color: colors.textMain }]} numberOfLines={1}>
                  {label}
                </Text>
                <Text style={[styles.budgetAmount, { color: colors.textMuted }]}>
                  {formatCurrency(budget.spent, currency)} / {formatCurrency(budget.amount, currency)}
                </Text>
              </View>
              <View style={[styles.budgetProgressBar, { backgroundColor: colors.bgMuted }]}>
                <View
                  style={[
                    styles.budgetProgressFill,
                    { width: `${pct}%`, backgroundColor: color },
                  ]}
                />
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  totalSpent: {
    fontSize: 24,
    fontWeight: "700",
  },
  totalLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  percentageContainer: {
    alignItems: "flex-end",
  },
  percentage: {
    fontSize: 16,
    fontWeight: "700",
  },
  percentageLabel: {
    fontSize: 10,
    marginTop: 2,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
  budgetList: {
    gap: 12,
  },
  budgetItem: {
    gap: 6,
  },
  budgetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  budgetLabel: {
    fontSize: 12,
    fontWeight: "500",
    flex: 1,
  },
  budgetAmount: {
    fontSize: 11,
    marginLeft: 8,
  },
  budgetProgressBar: {
    height: 6,
    borderRadius: 3,
    overflow: "hidden",
  },
  budgetProgressFill: {
    height: "100%",
    borderRadius: 3,
  },
  emptyContainer: {
    alignItems: "center",
    paddingVertical: 32,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "transparent",
    borderStyle: "dashed",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  emptySubtitle: {
    fontSize: 12,
    textAlign: "center",
  },
});
