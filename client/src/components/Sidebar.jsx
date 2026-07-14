import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ArrowLeftRight,
  Folder,
  Target,
  Sparkles,
  Wallet,
  LogOut,
} from "lucide-react";

import { useCurrentUser } from "../features/Authentication/useCurrentUser.js";
import { useLogout } from "../features/Authentication/useLogout.js";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/transactions", label: "Transactions", icon: ArrowLeftRight },
  { to: "/categories", label: "Categories", icon: Folder },
  { to: "/budgets", label: "Budgets", icon: Target },
  { to: "/insights", label: "AI Insights", icon: Sparkles },
];

const Sidebar = () => {
  const { user } = useCurrentUser();
  const { logout } = useLogout();

  const initial = user?.username?.[0]?.toUpperCase() || "U";

  return (
    <aside className="w-20 lg:w-64 bg-[var(--color-bg-surface)] border-r border-[var(--color-border-main)] hidden md:flex flex-col shrink-0 transition-[width] duration-200">
      <div className="h-16 flex items-center justify-center lg:justify-start gap-3 px-0 lg:px-6 border-b border-[var(--color-border-main)]">
        <div className="h-8 w-8 rounded-lg bg-[var(--color-accent)] flex items-center justify-center shrink-0">
          <Wallet size={16} className="text-[var(--color-bg-surface)]" />
        </div>
        <span className="font-bold text-(--color-text-main) hidden lg:inline">
          ExpenseAI
        </span>
      </div>

      <nav className="flex-1 p-3 space-y-1.5">
        {navItems?.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            title={label}
            className={({ isActive }) =>
              `relative flex items-center justify-center lg:justify-start gap-3 px-0 lg:px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? "bg-[var(--color-bg-muted)] text-(--color-text-main) before:absolute before:left-0 before:top-2.5 before:bottom-2.5 before:w-1 before:rounded-full before:bg-[var(--color-accent)]"
                  : "text-(--color-text-muted) hover:bg-[var(--color-bg-muted)] hover:text-(--color-text-main)"
              }`
            }
          >
            <Icon size={20} strokeWidth={1.75} className="shrink-0" />
            <span className="hidden lg:inline">{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-3 border-t border-[var(--color-border-main)]">
        <div className="flex items-center justify-center lg:justify-start gap-3 p-2.5 rounded-lg hover:bg-[var(--color-bg-muted)] transition-colors">
          <div className="h-9 w-9 rounded-lg bg-[var(--color-accent)] flex items-center justify-center text-[var(--color-bg-surface)] font-semibold text-sm shrink-0">
            {initial}
          </div>

          <div className="flex-1 min-w-0 hidden lg:block">
            <div className="text-sm font-semibold text-(--color-text-main) truncate">
              {user?.username || "User"}
            </div>
            <div className="text-xs text-(--color-text-muted) truncate">
              {user?.email}
            </div>
          </div>
          <button
            onClick={logout}
            title="Logout"
            className="p-1.5 rounded-lg text-(--color-text-muted) hover:bg-[var(--color-bg-muted)] hover:text-(--color-text-main) transition-colors shrink-0 hidden lg:block"
          >
            <LogOut size={16} />
          </button>
        </div>
        <button
          onClick={logout}
          title="Logout"
          className="lg:hidden mt-2 w-full flex items-center justify-center p-2 rounded-lg text-(--color-text-muted) hover:bg-[var(--color-bg-muted)] hover:text-(--color-text-main) transition-colors"
        >
          <LogOut size={16} />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
