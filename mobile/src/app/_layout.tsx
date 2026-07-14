import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { useThemeColors } from "../theme/useThemeColors";

export default function RootLayout() {
  const { colors, isDark } = useThemeColors();

  return (
    <View style={{ flex: 1, backgroundColor: colors.bgApp }}>
      <StatusBar style={isDark ? "light" : "dark"} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
    </View>
  );
}
