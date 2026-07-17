import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { View } from "react-native";
import { AppShellProvider, useAppShell } from "../state/appShell";
import { useThemeColors } from "../theme/useThemeColors";

function RootNavigator() {
  const { colors, isDark } = useThemeColors();
  const { isAuthenticated } = useAppShell();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    const currentSegment = segments[0];
    const isAuthRoute = currentSegment === "sign-in" || currentSegment === "sign-up";
    const isTabsRoute = currentSegment === "(tabs)";

    if (!isAuthenticated && isTabsRoute) {
      router.replace("/sign-in");
      return;
    }

    if (isAuthenticated && isAuthRoute) {
      router.replace("/(tabs)");
    }
  }, [isAuthenticated, router, segments]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.bgApp }}>
      <StatusBar style={isDark ? "light" : "dark"} />
      <Stack initialRouteName="sign-in" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="sign-in" />
        <Stack.Screen name="sign-up" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </View>
  );
}

export default function RootLayout() {
  return (
    <AppShellProvider>
      <RootNavigator />
    </AppShellProvider>
  );
}
