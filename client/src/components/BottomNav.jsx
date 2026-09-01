import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ArrowLeftRight,
  Folder,
  Target,
  Sparkles,
  Bell,
} from "lucide-react";
import { useCurrentUser } from "../features/Authentication/useCurrentUser.js";
import { useLogout } from "../features/Authentication/useLogout.js";

const navItems = [
  { to: "/", label: "Home", icon: LayoutDashboard },
  { to: "/transactions", label: "Activity", icon: ArrowLeftRight },
  { to: "/categories", label: "Categories", icon: Folder },
  { to: "/budgets", label: "Budgets", icon: Target },
  { to: "/insights", label: "Insights", icon: Sparkles },
  { to: "/notifications", label: "Notifications", icon: Bell },
];

const BottomNav = () => {
  const { user } = useCurrentUser();
  const { logout } = useLogout();
  const initial = user?.username?.[0]?.toUpperCase() || "U";

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[var(--color-bg-surface)] border-t border-[var(--color-border-main)] flex items-stretch justify-around pb-[env(safe-area-inset-bottom)]">
      {navItems.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          end={to === "/"}
          className={({ isActive }) =>
            `flex flex-1 flex-col items-center justify-center gap-1 py-3 text-[11px] font-medium transition-colors ${
              isActive
                ? "text-[var(--color-text-main)]"
                : "text-[var(--color-text-muted)]"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <div
                className={
                  isActive ? "p-2 rounded-lg bg-[var(--color-bg-muted)]" : ""
                }
              >
                <Icon
                  size={20}
                  strokeWidth={isActive ? 2.25 : 1.75}
                  className={
                    isActive
                      ? "text-[var(--color-primary)]"
                      : "text-[var(--color-text-muted)]"
                  }
                />
              </div>
              {label}
            </>
          )}
        </NavLink>
      ))}

      {/* More / quick actions button for mobile: opens bottom actions sheet */}
      <button
        onClick={() => window.dispatchEvent(new CustomEvent("toggle-mobile-actions"))}
        title="More"
        className="flex flex-1 flex-col items-center justify-center gap-1 py-3 text-[11px] font-medium text-[var(--color-text-muted)] transition-colors"
      >
        <div className="p-2 rounded-lg">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--color-text-muted)]"><circle cx="5" cy="12" r="1"></circle><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle></svg>
        </div>
        More
      </button>
    </nav>
  );
};

export default BottomNav;
