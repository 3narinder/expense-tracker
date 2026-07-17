import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useThemeColors } from "../theme/useThemeColors";

interface RecentTransaction {
  id: string;
  description: string;
  amount: number;
  type: "income" | "expense";
  transaction_date: string;
  category_name: string;
  category_icon: string;
  category_color: string;
}

interface Props {
  transactions: RecentTransaction[];
  currency?: string;
  onPressTransaction?: (transaction: RecentTransaction) => void;
}

const formatCurrency = (amount: number, currency: string = "USD") => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

export default function TransactionList({ transactions, currency = "USD", onPressTransaction }: Props) {
  const { colors } = useThemeColors();

  if (!transactions || transactions.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Feather name="file-text" size={32} color={colors.textGhost} />
        <Text style={[styles.emptyText, { color: colors.textMuted }]}>
          No transactions this month.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {transactions.map((transaction) => (
        <TouchableOpacity
          key={transaction.id}
          style={[styles.item, { backgroundColor: colors.bgHover }]}
          onPress={() => onPressTransaction?.(transaction)}
          activeOpacity={0.7}
        >
          <View style={styles.leftContent}>
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: transaction.category_color + "20" },
              ]}
            >
              <Feather
                name={transaction.category_icon as keyof typeof Feather.glyphMap}
                size={16}
                color={transaction.category_color}
              />
            </View>
            <View style={styles.textContainer}>
              <Text
                style={[styles.description, { color: colors.textMain }]}
                numberOfLines={1}
              >
                {transaction.description || transaction.category_name || "Untitled"}
              </Text>
              <Text style={[styles.details, { color: colors.textMuted }]}>
                {transaction.category_name || "Uncategorized"} · {formatDate(transaction.transaction_date)}
              </Text>
            </View>
          </View>
          <Text
            style={[
              styles.amount,
              {
                color: transaction.type === "income" ? colors.success : colors.danger,
              },
            ]}
          >
            {transaction.type === "income" ? "+" : "-"}
            {formatCurrency(transaction.amount, currency)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    borderRadius: 12,
  },
  leftContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    flex: 1,
  },
  description: {
    fontSize: 14,
    fontWeight: "500",
  },
  details: {
    fontSize: 12,
    marginTop: 2,
  },
  amount: {
    fontSize: 14,
    fontWeight: "700",
  },
  emptyContainer: {
    alignItems: "center",
    paddingVertical: 40,
    gap: 12,
  },
  emptyText: {
    fontSize: 14,
  },
});
