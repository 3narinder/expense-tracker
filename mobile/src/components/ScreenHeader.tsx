import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { useAppShell } from "../state/appShell";
import { useThemeColors } from "../theme/useThemeColors";
import ThemeToggleButton from "./ThemeToggleButton";

type Props = {
  title: string;
  subtitle?: string;
  showLogout?: boolean;
};

export default function ScreenHeader({ title, subtitle, showLogout = false }: Props) {
  const { colors } = useThemeColors();
  const router = useRouter();
  const { signOut } = useAppShell();

  const onLogout = () => {
    signOut();
    router.replace("/sign-in");
  };

  return (
    <View style={{ marginBottom: 20, gap: 8 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
        <View style={{ flex: 1, paddingRight: 10 }}>
          <Text style={{ fontSize: 26, fontWeight: "700", color: colors.textMain }}>{title}</Text>
          {subtitle ? (
            <Text style={{ fontSize: 14, color: colors.textMuted, marginTop: 4 }}>{subtitle}</Text>
          ) : null}
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <ThemeToggleButton />
          {showLogout ? (
            <Pressable
              onPress={onLogout}
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.bgSurface,
                alignItems: "center",
                justifyContent: "center",
              }}
              accessibilityRole="button"
              accessibilityLabel="Logout"
            >
              <Feather name="log-out" size={16} color={colors.textMuted} />
            </Pressable>
          ) : null}
        </View>
      </View>
    </View>
  );
}
