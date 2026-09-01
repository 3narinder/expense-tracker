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
      className={`flex gap-2 p-2 md:p-3 rounded-lg cursor-pointer hover:bg-[var(--color-bg-muted)] transition-colors ${isUnread ? "bg-[var(--color-primary-soft)]" : "bg-[var(--color-bg-surface)]"}`}
    >
      <div className={`h-3 w-3 mt-1 rounded-full ${isUnread ? "bg-[var(--color-primary)]" : "bg-[var(--color-border-main)]"}`} />
      <div className="flex-1">
        <div className={`flex flex-col md:flex-row items-start md:items-center justify-between gap-2`}>
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

  // read cached unread count (prefetched by NotificationBell) to quickly show "You're all caught up"
  const cachedCount = qc.getQueryData(["notifications","unreadCount"]);

  // notifications list query: use a stable key and larger staleTime so reopening dropdown won't refetch immediately
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["notifications","list"],
    queryFn: () => getNotifications({ limit: 50 }),
    enabled: true, // always keep cached in background (prefetch from bell), but safe to enable
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 30, // 30 minutes
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const markAsReadMut = useMutation({ mutationFn: (id) => markAsRead(id), onSuccess: ()=>{ qc.invalidateQueries(["notifications","list"]); qc.invalidateQueries(["notifications","unreadCount"]); } });
  const markAllMut = useMutation({ mutationFn: () => markAllAsRead(), onSuccess: ()=>{ qc.invalidateQueries(["notifications","list"]); qc.invalidateQueries(["notifications","unreadCount"]); } });
  const deleteMut = useMutation({ mutationFn: (id) => deleteNotification(id), onSuccess: ()=>{ qc.invalidateQueries(["notifications","list"]); qc.invalidateQueries(["notifications","unreadCount"]); } });

  useEffect(()=>{
    const handleClick = (e)=>{
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    window.addEventListener("mousedown", handleClick);
    return ()=> window.removeEventListener("mousedown", handleClick);
  },[onClose]);

  // If there is a cached unread count of zero, show "You're all caught up" immediately while background fetch continues.
  const items = data?.items || [];
  const unreadCountKnownZero = cachedCount && cachedCount.count === 0;

  if (!open && !data) return null; // don't render dropdown when closed and no cached data

  if (!open && data) return null; // closed -> don't show dropdown (but keep cache)

  // mobile full-screen panel
  if (typeof window !== 'undefined' && window.innerWidth < 768 && open) {
    return (
      <div className="fixed inset-0 z-50 flex items-end md:hidden">
        <div onClick={onClose} className="absolute inset-0 bg-black/40" />
        <div className="relative w-full bg-[var(--color-bg-surface)] rounded-t-xl shadow-xl max-h-[90vh] overflow-auto">
          <div className="p-4 border-b border-[var(--color-border-main)] flex items-center justify-between sticky top-0 bg-[var(--color-bg-surface)]">
            <div className="text-base font-semibold">Notifications</div>
            <div className="flex items-center gap-2">
              <button onClick={()=>markAllMut.mutate()} className="text-sm text-[var(--color-text-muted)] hover:underline">Mark all read</button>
              <button onClick={onClose} className="text-sm font-medium px-2 py-1 rounded bg-[var(--color-bg-surface)] border border-[var(--color-border-main)]">Close</button>
            </div>
          </div>

          <div className="p-3 space-y-3">
            {isLoading && !data && <div className="p-3 text-sm text-[var(--color-text-muted)]">Loading...</div>}
            {!isLoading && items.length === 0 && unreadCountKnownZero && <div className="p-3 text-sm text-[var(--color-text-muted)]">You're all caught up.</div>}
            {items.map((it)=> (
              <div key={it._id} onClick={()=>{ if(!it.isRead) markAsReadMut.mutate(it._id); }} className={`p-4 rounded-lg ${!it.isRead ? 'bg-[var(--color-primary-soft)]' : 'bg-[var(--color-bg-surface)]'}`}>
                <div className="flex items-center justify-between gap-2">
                  <div className={`text-sm ${!it.isRead ? 'font-semibold text-[var(--color-text-main)]' : 'text-[var(--color-text-muted)]'}`}>{it.title}</div>
                  <div className="text-xs text-[var(--color-text-muted)]">{new Date(it.createdAt).toLocaleString()}</div>
                </div>
                {it.message && <div className="text-sm mt-2 text-[var(--color-text-main)]">{it.message}</div>}
                <div className="mt-2 flex items-center justify-between">
                  <div className="text-xs text-[var(--color-text-muted)]">{it.category}</div>
                  <button onClick={(e)=>{ e.stopPropagation(); deleteMut.mutate(it._id); }} className="text-xs text-[var(--color-danger)]">Dismiss</button>
                </div>
              </div>
            ))}
            {!isLoading && !isFetching && items.length === 0 && !unreadCountKnownZero && <div className="p-3 text-sm text-[var(--color-text-muted)]">You're all caught up.</div>}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className="absolute right-0 mt-2 w-full max-w-xs md:w-96 bg-[var(--color-bg-surface)] border border-[var(--color-border-main)] rounded-xl shadow-lg z-50">
      <div className="p-3 border-b border-[var(--color-border-main)] flex items-center justify-between">
        <div className="text-sm font-semibold">Notifications</div>
        <div className="flex items-center gap-2">
          <button onClick={()=>markAllMut.mutate()} className="text-xs text-[var(--color-text-muted)] hover:underline">Mark all read</button>
        </div>
      </div>

      <div className="max-h-96 overflow-auto p-2 space-y-2">
        {isLoading && !data && <div className="p-3 text-sm text-[var(--color-text-muted)]">Loading...</div>}
        {!isLoading && !isFetching && items.length === 0 && unreadCountKnownZero && <div className="p-3 text-sm text-[var(--color-text-muted)]">You're all caught up.</div>}
        {(!isLoading || data) && items.map((it)=> (
          <NotificationItem key={it._id} item={it} onClick={(item)=>{ if(!item.isRead) markAsReadMut.mutate(item._id); /* navigate if needed */ onClose(); }} onDelete={(id)=>deleteMut.mutate(id)} />
        ))}
        {!isLoading && !isFetching && items.length === 0 && !unreadCountKnownZero && <div className="p-3 text-sm text-[var(--color-text-muted)]">You're all caught up.</div>}
      </div>

      <div className="p-3 border-t border-[var(--color-border-main)] flex items-center justify-between">
        <div className="text-xs text-[var(--color-text-muted)]">Showing {items.length} notifications</div>
      </div>
    </div>
  );
};

export default NotificationDropdown;
