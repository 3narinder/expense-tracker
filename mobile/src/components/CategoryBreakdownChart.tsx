import { View, Text, ScrollView, StyleSheet } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { useThemeColors } from "../theme/useThemeColors";

interface CategoryBreakdown {
  category_name: string;
  amount: number;
  percentage: number;
  category_color: string;
  category_icon: string;
}

interface Props {
  data: CategoryBreakdown[];
  currency?: string;
}

const screenWidth = Dimensions.get("window").width;

export default function CategoryBreakdownChart({ data, currency = "USD" }: Props) {
  const { colors } = useThemeColors();

  if (!data || data.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={[styles.emptyText, { color: colors.textGhost }]}>
          No category data yet
        </Text>
      </View>
    );
  }

  const chartData = data.map((item) => ({
    name: item.category_name,
    population: item.amount,
    color: item.category_color,
    legendFontColor: colors.textMain,
    legendFontSize: 12,
  }));

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        <PieChart
          data={chartData}
          width={screenWidth - 64}
          height={180}
          chartConfig={{
            backgroundColor: colors.bgSurface,
            backgroundGradientFrom: colors.bgSurface,
            backgroundGradientTo: colors.bgSurface,
            decimalPlaces: 0,
            color: (opacity = 1) => colors.textMain,
            labelColor: (opacity = 1) => colors.textMuted,
            style: {
              borderRadius: 16,
            },
          }}
          style={styles.chart}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  chart: {
    borderRadius: 16,
  },
  emptyContainer: {
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 14,
  },
});
