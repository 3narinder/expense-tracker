import { View, Text, Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { useThemeColors } from "../theme/useThemeColors";

interface MonthlyTrend {
  month: string;
  income: number;
  expense: number;
}

interface Props {
  data: MonthlyTrend[];
  currency?: string;
}

const screenWidth = Dimensions.get("window").width;

export default function MonthlyTrendChart({ data, currency = "USD" }: Props) {
  const { colors } = useThemeColors();

  if (!data || data.length === 0) {
    return (
      <View style={{ alignItems: "center", paddingVertical: 40 }}>
        <Text style={{ color: colors.textGhost, fontSize: 14 }}>No trend data available</Text>
      </View>
    );
  }

  const chartData = {
    labels: data.map((d) => d.month.substring(0, 3)), // Show first 3 letters of month
    datasets: [
      {
        data: data.map((d) => d.income),
      },
      {
        data: data.map((d) => d.expense),
      },
    ],
  };

  return (
    <View style={{ alignItems: "center" }}>
      <BarChart
        data={chartData}
        width={screenWidth - 64}
        height={200}
        yAxisLabel=""
        yAxisSuffix=""
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
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: colors.primary,
          },
          barPercentage: 0.6,
        }}
        style={{
          borderRadius: 16,
        }}
        showBarTops={false}
        withHorizontalLabels={true}
        withVerticalLabels={true}
      />
    </View>
  );
}
