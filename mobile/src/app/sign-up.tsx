import { Link, useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Card from "../components/Card";
import ThemeToggleButton from "../components/ThemeToggleButton";
import { useAppShell } from "../state/appShell";
import { useThemeColors } from "../theme/useThemeColors";

export default function SignUp() {
  const { colors } = useThemeColors();
  const router = useRouter();
  const { signIn } = useAppShell();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bgApp }} edges={["top"]}>
      <View style={{ flex: 1, padding: 20 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 4 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                backgroundColor: colors.primary,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Feather name="credit-card" size={18} color={colors.primaryForeground} />
            </View>
            <Text style={{ color: colors.textMain, fontSize: 20, fontWeight: "700" }}>ExpenseAI</Text>
          </View>
          <ThemeToggleButton />
        </View>

        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={{ color: colors.textMain, fontSize: 34, fontWeight: "700" }}>Get started</Text>
          <Text style={{ color: colors.textMuted, marginTop: 6, marginBottom: 20, fontSize: 14 }}>
            Create your AI-powered finance profile.
          </Text>

          <Card>
            <Text style={{ color: colors.textMain, fontWeight: "600", fontSize: 13 }}>Name</Text>
            <TextInput
              placeholder="Your name"
              placeholderTextColor={colors.textGhost}
              style={{
                marginTop: 8,
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: 10,
                paddingHorizontal: 12,
                paddingVertical: 10,
                color: colors.textMain,
                backgroundColor: colors.bgMuted,
              }}
            />

            <Text style={{ color: colors.textMain, fontWeight: "600", fontSize: 13, marginTop: 12 }}>
              Email
            </Text>
            <TextInput
              placeholder="you@example.com"
              placeholderTextColor={colors.textGhost}
              autoCapitalize="none"
              keyboardType="email-address"
              style={{
                marginTop: 8,
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: 10,
                paddingHorizontal: 12,
                paddingVertical: 10,
                color: colors.textMain,
                backgroundColor: colors.bgMuted,
              }}
            />

            <Text style={{ color: colors.textMain, fontWeight: "600", fontSize: 13, marginTop: 12 }}>
              Password
            </Text>
            <TextInput
              placeholder="Create password"
              placeholderTextColor={colors.textGhost}
              secureTextEntry
              style={{
                marginTop: 8,
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: 10,
                paddingHorizontal: 12,
                paddingVertical: 10,
                color: colors.textMain,
                backgroundColor: colors.bgMuted,
              }}
            />

            <Pressable
              onPress={() => {
                signIn();
                router.replace("/(tabs)");
              }}
              style={{
                backgroundColor: colors.primary,
                borderRadius: 10,
                alignItems: "center",
                paddingVertical: 12,
                marginTop: 16,
              }}
            >
              <Text style={{ color: colors.primaryForeground, fontWeight: "700", fontSize: 14 }}>
                Create Account
              </Text>
            </Pressable>

            <Text style={{ color: colors.textMuted, textAlign: "center", marginTop: 12 }}>
              Already have an account?{" "}
              <Link href="/sign-in" style={{ color: colors.primary, fontWeight: "600" }}>
                Sign in
              </Link>
            </Text>
          </Card>
        </View>
      </View>
    </SafeAreaView>
  );
}
