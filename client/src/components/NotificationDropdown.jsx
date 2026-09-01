import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Bell } from "lucide-react";
import { getNotifications, getUnreadCount, markAsRead, markAllAsRead, deleteNotification } from "../services/apiNotifications";
import { formatDistanceToNowStrict } from "date-fns";

const NotificationItem = ({ item, onClick, onDelete }) => {
  const isUnread = !item.isRead;
  return (
    <div
      onClick={() => onClick(item)}
      className={`flex gap-3 p-3 rounded-lg cursor-pointer hover:bg-[var(--color-bg-muted)] transition-colors ${isUnread ? "bg-[var(--color-primary-soft)]" : "bg-[var(--color-bg-surface)]"}`}
    >
      <div className={`h-3 w-3 mt-1 rounded-full ${isUnread ? "bg-[var(--color-primary)]" : "bg-[var(--color-border-main)]"}`} />
      <div className="flex-1">
        <div className={`flex items-center justify-between gap-2`}> 
          <div className={`text-sm ${isUnread ? "font-semibold text-[var(--color-text-main)]" : "text-[var(--color-text-muted)]"}`}>{item.title}</div>
          <div className="text-xs text-[var(--color-text-muted)]">{formatDistanceToNowStrict(new Date(item.createdAt), { addSuffix: true })}</div>
        </div>
        {item.message && <div className={`text-xs mt-1 ${isUnread ? "text-[var(--color-text-main)]" : "text-[var(--color-text-muted)]"}`}>{item.message}</div>}
        <div className="flex items-center justify-between mt-2">
          <div className="text-xs text-[var(--color-text-muted)]">{item.category}</div>
          <button onClick={(e)=>{e.stopPropagation(); onDelete(item._id);}} className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-danger)]">Dismiss</button>
        </div>
      </div>
    </div>
  );
};

const NotificationDropdown = ({ open, onClose }) => {
  const ref = useRef(null);
  const qc = useQueryClient();
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ["notifications", page],
    queryFn: () => getNotifications({ page, limit: 10 }),
    enabled: open,
    keepPreviousData: true,
  });

  const unreadQuery = useQuery({ queryKey: ["notifications","unreadCount"], queryFn: getUnreadCount, enabled: open });

  const markAsReadMut = useMutation({ mutationFn: (id) => markAsRead(id), onSuccess: ()=>{ qc.invalidateQueries(["notifications"]); qc.invalidateQueries(["notifications","unreadCount"]); } });
  const markAllMut = useMutation({ mutationFn: () => markAllAsRead(), onSuccess: ()=>{ qc.invalidateQueries(["notifications"]); qc.invalidateQueries(["notifications","unreadCount"]); } });
  const deleteMut = useMutation({ mutationFn: (id) => deleteNotification(id), onSuccess: ()=>{ qc.invalidateQueries(["notifications"]); qc.invalidateQueries(["notifications","unreadCount"]); } });

  useEffect(()=>{
    const handleClick = (e)=>{
      if (open && ref.current && !ref.current.contains(e.target)) onClose();
    };
    window.addEventListener("mousedown", handleClick);
    return ()=> window.removeEventListener("mousedown", handleClick);
  },[open, onClose]);

  if (!open) return null;

  const items = data?.items || [];

  return (
    <div ref={ref} className="absolute right-0 mt-2 w-96 bg-[var(--color-bg-surface)] border border-[var(--color-border-main)] rounded-xl shadow-lg z-50">
      <div className="p-3 border-b border-[var(--color-border-main)] flex items-center justify-between">
        <div className="text-sm font-semibold">Notifications</div>
        <div className="flex items-center gap-2">
          <button onClick={()=>markAllMut.mutate()} className="text-xs text-[var(--color-text-muted)] hover:underline">Mark all read</button>
        </div>
      </div>

      <div className="max-h-96 overflow-auto p-2 space-y-2">
        {isLoading && <div className="p-3 text-sm text-[var(--color-text-muted)]">Loading...</div>}
        {!isLoading && items.length === 0 && <div className="p-3 text-sm text-[var(--color-text-muted)]">You're all caught up.</div>}
        {!isLoading && items.map((it)=> (
          <NotificationItem key={it._id} item={it} onClick={(item)=>{ if(!item.isRead) markAsReadMut.mutate(item._id); /* navigate if needed */ onClose(); }} onDelete={(id)=>deleteMut.mutate(id)} />
        ))}
      </div>

      <div className="p-3 border-t border-[var(--color-border-main)] flex items-center justify-between">
        <div className="text-xs text-[var(--color-text-muted)]">Showing {items.length} notifications</div>
        <div className="flex items-center gap-2">
          <button onClick={()=>setPage((p)=>Math.max(1,p-1))} className="px-2 py-1 rounded bg-[var(--color-bg-surface)] border border-[var(--color-border-main)] text-xs">Prev</button>
          <button onClick={()=>setPage((p)=>p+1)} className="px-2 py-1 rounded bg-[var(--color-bg-surface)] border border-[var(--color-border-main)] text-xs">Next</button>
        </div>
      </div>
    </div>
  );
};

export default NotificationDropdown;
