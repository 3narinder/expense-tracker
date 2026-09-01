import { useState } from "react";
import { Bell } from "lucide-react";
import NotificationDropdown from "./NotificationDropdown";
import { useQuery } from "@tanstack/react-query";
import { getUnreadCount } from "../services/apiNotifications";

const NotificationBell = () => {
  const [open, setOpen] = useState(false);
  const { data } = useQuery({ queryKey: ["notifications","unreadCount"], queryFn: getUnreadCount, refetchInterval: 60 * 1000 });
  const count = data?.count || 0;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        title="Notifications"
        className="relative h-9 w-9 rounded-lg text-[var(--color-text-muted)] hover:bg-[var(--color-bg-muted)] hover:text-[var(--color-text-main)] flex items-center justify-center transition-colors"
      >
        <Bell size={17} />
        {count > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[18px] h-5 px-1 rounded-full bg-[var(--color-primary)] text-[10px] font-semibold flex items-center justify-center text-white">{count}</span>
        )}
      </button>

      <NotificationDropdown open={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export default NotificationBell;
