import { Bell, Search } from "lucide-react";
import { useCurrentUser } from "../features/Authentication/useCurrentUser.js";
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

const TopBar = () => {
  const { user } = useCurrentUser();
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

      <div className="flex items-center gap-1">
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
