import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useColorScheme } from "react-native";

type ThemePreference = "system" | "light" | "dark";
type ResolvedTheme = "light" | "dark";

type AppShellContextValue = {
  isAuthenticated: boolean;
  signIn: () => void;
  signOut: () => void;
  themePreference: ThemePreference;
  resolvedTheme: ResolvedTheme;
  toggleTheme: () => void;
};

const AppShellContext = createContext<AppShellContextValue | null>(null);

export function AppShellProvider({ children }: { children: ReactNode }) {
  const systemScheme = useColorScheme();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [themePreference, setThemePreference] = useState<ThemePreference>("system");

  const resolvedTheme: ResolvedTheme =
    themePreference === "system" ? (systemScheme === "dark" ? "dark" : "light") : themePreference;

  const toggleTheme = useCallback(() => {
    setThemePreference((previous) => {
      const current = previous === "system" ? (systemScheme === "dark" ? "dark" : "light") : previous;
      return current === "dark" ? "light" : "dark";
    });
  }, [systemScheme]);

  const value = useMemo(
    () => ({
      isAuthenticated,
      signIn: () => setIsAuthenticated(true),
      signOut: () => setIsAuthenticated(false),
      themePreference,
      resolvedTheme,
      toggleTheme,
    }),
    [isAuthenticated, resolvedTheme, themePreference, toggleTheme],
  );

  return <AppShellContext.Provider value={value}>{children}</AppShellContext.Provider>;
}

export function useAppShell() {
  const context = useContext(AppShellContext);
  if (!context) {
    throw new Error("useAppShell must be used within AppShellProvider");
  }
  return context;
}
