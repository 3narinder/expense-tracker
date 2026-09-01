import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Search, Moon, Sun } from "lucide-react";
import ThemeToggle from "./ThemeToggle.jsx";
import { useLogout } from "../features/Authentication/useLogout.js";

const MobileActionsMenu = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useLogout();

  useEffect(() => {
    const handler = () => setOpen((v) => !v);
    window.addEventListener("toggle-mobile-actions", handler);
    return () => window.removeEventListener("toggle-mobile-actions", handler);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end md:hidden">
      <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />

      <div className="relative w-full bg-[var(--color-bg-surface)] rounded-t-xl shadow-2xl max-h-[70vh] overflow-auto border-t border-[var(--color-border-main)]">
        <div className="p-4 border-b border-[var(--color-border-main)] flex items-center justify-between">
          <div className="text-base font-semibold">Quick actions</div>
          <button onClick={() => setOpen(false)} className="text-sm font-medium px-2 py-1 rounded bg-[var(--color-bg-surface)] border border-[var(--color-border-main)]">Close</button>
        </div>

        <div className="p-4 space-y-3">
          <button
            onClick={() => {
              setOpen(false);
              navigate("/transactions");
              // optional: add search focus behavior later
            }}
            className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-[var(--color-bg-muted)] transition-colors"
          >
            <Search size={18} className="text-[var(--color-text-muted)]" />
            <div className="text-sm font-medium">Search transactions</div>
          </button>

          <div className="w-full flex items-center justify-between p-3 rounded-lg border border-[var(--color-border-main)] bg-[var(--color-bg-surface)]">
            <div className="flex items-center gap-3">
              <div className="text-sm font-medium">Theme</div>
              <div className="text-xs text-[var(--color-text-muted)]">Appearance</div>
            </div>
            <ThemeToggle />
          </div>

          <button
            onClick={() => {
              logout();
              setOpen(false);
            }}
            className="w-full flex items-center gap-3 p-3 rounded-lg text-[var(--color-danger)] hover:bg-[var(--color-bg-muted)] transition-colors"
          >
            <LogOut size={18} />
            <div className="text-sm font-medium">Logout</div>
          </button>

          <div className="text-xs text-[var(--color-text-muted)] mt-2">These quick actions are shown for mobile/tablet to keep the top bar and bottom navigation uncluttered.</div>
        </div>
      </div>
    </div>
  );
};

export default MobileActionsMenu;
