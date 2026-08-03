import { Bell, Plus, Search, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { useCurrentUser } from "../features/Authentication/useCurrentUser.js";
import { useActiveProfile } from "../features/Authentication/useActiveProfile.js";
import ThemeToggle from "./ThemeToggle.jsx";

const greeting = () => {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
};

const formatToday = () =>
  new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

const profileLabels = {
  personal: "Personal",
  business: "Business",
};

const TopBar = () => {
  const { user } = useCurrentUser();
  const { activeProfileType, switchProfile, isSwitchingProfile } =
    useActiveProfile();
  const firstName = user?.username?.split(" ")[0] || "";

  return (
    <header className="h-16 bg-[var(--color-bg-surface)] border-b border-[var(--color-border-main)] flex items-center justify-between px-6 shrink-0">
      <div>
        <div className="text-sm font-semibold text-[var(--color-text-main)] tracking-tight">
          {greeting()}
          {firstName && `, ${firstName}`} 👋
        </div>
        <div className="text-xs text-[var(--color-text-muted)]">{formatToday()}</div>
      </div>

      <div className="flex items-center gap-2">
        <select
          className="md:hidden h-8 rounded-lg border border-[var(--color-border-main)] bg-[var(--color-bg-surface)] px-2 text-xs font-medium text-[var(--color-text-main)]"
          value={activeProfileType}
          onChange={(e) => switchProfile(e.target.value)}
          disabled={isSwitchingProfile}
          title="Switch profile"
        >
          <option value="personal">Personal</option>
          <option value="business">Business</option>
        </select>

        <div className="hidden md:flex items-center gap-2 rounded-xl border border-[var(--color-primary)]/35 bg-[var(--color-primary-soft)] px-2.5 py-1.5 shadow-xs">
          <div className="px-1">
            <div className="text-[10px] uppercase tracking-wide text-[var(--color-text-muted)]">
              Active profile
            </div>
            <div className="text-xs font-semibold text-[var(--color-text-main)]">
              {profileLabels[activeProfileType] || "Personal"}
            </div>
          </div>
          <div className="h-6 w-px bg-[var(--color-border-main)]" />
          <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
            <select
              className="h-8 rounded-lg border border-[var(--color-border-main)] bg-[var(--color-bg-surface)] px-2.5 text-sm font-medium text-[var(--color-text-main)]"
              value={activeProfileType}
              onChange={(e) => switchProfile(e.target.value)}
              disabled={isSwitchingProfile}
              title="Switch profile"
            >
              <option value="personal">Personal</option>
              <option value="business">Business</option>
            </select>
            <Link
              to="/?openAddAccount=1"
              className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-[var(--color-border-main)] bg-[var(--color-bg-surface)] px-2.5 text-xs font-medium text-[var(--color-text-main)] hover:bg-[var(--color-bg-muted)]"
              title="Add account"
            >
              <Plus size={13} />
              Add account
            </Link>
            <button
              type="button"
              onClick={() => switchProfile("business")}
              disabled={isSwitchingProfile || activeProfileType === "business"}
              className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-[var(--color-border-main)] bg-[var(--color-bg-surface)] px-2.5 text-xs font-medium text-[var(--color-text-main)] hover:bg-[var(--color-bg-muted)] disabled:cursor-not-allowed disabled:opacity-60"
              title="Switch to Business profile"
            >
              <UserPlus size={13} />
              New profile
            </button>
          </div>
        </div>
        <button
          title="Search"
          className="h-9 w-9 rounded-lg text-[var(--color-text-muted)] hover:bg-[var(--color-bg-muted)] hover:text-[var(--color-text-main)] flex items-center justify-center transition-colors"
        >
          <Search size={17} />
        </button>
        <button
          title="Notifications"
          className="relative h-9 w-9 rounded-lg text-[var(--color-text-muted)] hover:bg-[var(--color-bg-muted)] hover:text-[var(--color-text-main)] flex items-center justify-center transition-colors"
        >
          <Bell size={17} />
          <span className="absolute top-2 right-2 h-2 w-2 bg-[var(--color-danger)] rounded-full ring-2 ring-[var(--color-bg-surface)]" />
        </button>
        <div className="w-px h-6 bg-[var(--color-border-main)] mx-1" />
        <ThemeToggle />
      </div>
    </header>
  );
};

export default TopBar;
