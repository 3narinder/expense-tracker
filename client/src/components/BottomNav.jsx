import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ArrowLeftRight,
  Folder,
  Target,
  Sparkles,
} from "lucide-react";
import { useCurrentUser } from "../features/Authentication/useCurrentUser.js";
import { useLogout } from "../features/Authentication/useLogout.js";

const navItems = [
  { to: "/", label: "Home", icon: LayoutDashboard },
  { to: "/transactions", label: "Activity", icon: ArrowLeftRight },
  { to: "/categories", label: "Categories", icon: Folder },
  { to: "/budgets", label: "Budgets", icon: Target },
  { to: "/insights", label: "Insights", icon: Sparkles },
];

const BottomNav = () => {
  const { user } = useCurrentUser();
  const { logout } = useLogout();
  const initial = user?.username?.[0]?.toUpperCase() || "U";

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-(--color-bg-surface) border-t border-(--color-border-main) flex items-stretch justify-around pb-[env(safe-area-inset-bottom)]">
      {navItems.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          end={to === "/"}
          className={({ isActive }) =>
            `flex flex-1 flex-col items-center justify-center gap-1 py-3 text-[11px] font-medium transition-colors ${
              isActive
                ? "text-(--color-text-main)"
                : "text-(--color-text-muted)"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <div
                className={
                  isActive ? "p-2 rounded-lg bg-(--color-bg-muted)" : ""
                }
              >
                <Icon
                  size={20}
                  strokeWidth={isActive ? 2.25 : 1.75}
                  className={
                    isActive
                      ? "text-(--color-accent)"
                      : "text-(--color-text-muted)"
                  }
                />
              </div>
              {label}
            </>
          )}
        </NavLink>
      ))}

      <button
        onClick={logout}
        title="Logout"
        className="flex flex-1 flex-col items-center justify-center gap-1 py-3 text-[11px] font-medium text-(--color-text-muted) transition-colors"
      >
        <div className="h-7 w-7 rounded-full bg-(--color-accent) flex items-center justify-center text-(--color-accent-foreground) font-semibold text-[11px]">
          {initial}
        </div>
        Logout
      </button>
    </nav>
  );
};

export default BottomNav;
