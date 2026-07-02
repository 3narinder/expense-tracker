import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ArrowLeftRight,
  Folder,
  Target,
  Sparkles,
} from "lucide-react";

const navItems = [
  { to: "/", label: "Home", icon: LayoutDashboard },
  { to: "/transactions", label: "Activity", icon: ArrowLeftRight },
  { to: "/categories", label: "Categories", icon: Folder },
  { to: "/budgets", label: "Budgets", icon: Target },
  { to: "/insights", label: "Insights", icon: Sparkles },
];

const BottomNav = () => {
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-slate-100 flex items-stretch justify-around pb-[env(safe-area-inset-bottom)]">
      {navItems.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          end={to === "/"}
          className={({ isActive }) =>
            `flex flex-1 flex-col items-center justify-center gap-1 py-2 text-[11px] font-medium transition ${
              isActive ? "text-violet-600" : "text-slate-500"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <Icon
                size={20}
                strokeWidth={isActive ? 2.25 : 1.75}
                className={isActive ? "text-violet-600" : "text-slate-400"}
              />
              {label}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
};

export default BottomNav;
