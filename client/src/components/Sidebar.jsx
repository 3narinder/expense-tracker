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

  const initial = user?.name?.[0]?.toUpperCase() || "U";

  return (
    <aside className="w-20 lg:w-64 bg-white border-r border-slate-100 hidden md:flex flex-col shrink-0 transition-[width] duration-200">
      <div className="h-16 flex items-center justify-center lg:justify-start gap-2 px-0 lg:px-6 border-b border-slate-100">
        <div className="h-8 w-8 rounded-lg bg-linear-to-br from-violet-400 to-violet-600 flex items-center justify-center shrink-0">
          <Wallet size={16} className="text-white" />
        </div>
        <span className="font-bold text-slate-900 hidden lg:inline">
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
              `relative flex items-center justify-center lg:justify-start gap-3 px-0 lg:px-4 py-3 rounded-2xl text-sm font-medium transition ${
                isActive
                  ? "bg-slate-100 text-slate-900 before:absolute before:left-0 before:top-2.5 before:bottom-2.5 before:w-1 before:rounded-full before:bg-violet-500"
                  : "text-slate-700 hover:bg-slate-50"
              }`
            }
          >
            <Icon size={20} strokeWidth={1.75} className="shrink-0" />
            <span className="hidden lg:inline">{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-3 border-t border-slate-100">
        <div className="flex items-center justify-center lg:justify-start gap-3 p-2.5 rounded-2xl hover:bg-slate-50 transition">
          <div className="h-9 w-9 rounded-full bg-linear-to-br from-violet-400 to-violet-600 flex items-center justify-center text-white font-semibold text-sm shrink-0">
            {initial}
          </div>

          <div className="flex-1 min-w-0 hidden lg:block">
            <div className="text-sm font-semibold text-slate-900 truncate">
              {user?.name || "User"}
            </div>
            <div className="text-xs text-slate-500 truncate">{user?.email}</div>
          </div>
          <button
            onClick={logout}
            title="Logout"
            className="p-1.5 rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition shrink-0 hidden lg:block"
          >
            <LogOut size={16} />
          </button>
        </div>
        {/* Compact logout for md-only (icon rail has no room in the row above) */}
        <button
          onClick={logout}
          title="Logout"
          className="lg:hidden mt-2 w-full flex items-center justify-center p-2 rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition"
        >
          <LogOut size={16} />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
