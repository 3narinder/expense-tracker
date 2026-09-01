import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getNotifications, markAsRead, deleteNotification } from "../services/apiNotifications";
import { formatDistanceToNow } from "date-fns";

const NotificationsPage = () => {
  const qc = useQueryClient();
  const { data, isLoading, isFetching } = useQuery({ queryKey: ["notifications","list"], queryFn: () => getNotifications({ limit: 100 }), staleTime: 1000 * 60 * 5 });
  const items = data?.items || [];

  const markAsReadMut = useMutation({ mutationFn: (id) => markAsRead(id), onSuccess: ()=> qc.invalidateQueries(["notifications","list"]) });
  const deleteMut = useMutation({ mutationFn: (id)=> deleteNotification(id), onSuccess: ()=> qc.invalidateQueries(["notifications","list"]) });

  return (
    <div className="p-4">
      <div className="text-lg font-semibold mb-4">Notifications</div>
      {isLoading && <div className="text-sm text-[var(--color-text-muted)]">Loading...</div>}
      {!isLoading && items.length === 0 && (
        <div className="text-sm text-[var(--color-text-muted)]">You're all caught up.</div>
      )}
      <div className="space-y-3">
        {items.map((it) => (
          <div key={it._id} className={`p-3 rounded-lg ${!it.isRead ? 'bg-[var(--color-primary-soft)]' : 'bg-[var(--color-bg-surface)]'}`}>
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className={`text-sm ${!it.isRead ? 'font-semibold' : ''}`}>{it.title}</div>
                {it.message && <div className="text-xs text-[var(--color-text-muted)] mt-1">{it.message}</div>}
                <div className="text-xs text-[var(--color-text-muted)] mt-2">{formatDistanceToNow(new Date(it.createdAt), { addSuffix: true })}</div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <button onClick={()=> markAsReadMut.mutate(it._id)} className="text-xs text-[var(--color-text-muted)]">Mark read</button>
                <button onClick={()=> deleteMut.mutate(it._id)} className="text-xs text-[var(--color-danger)]">Dismiss</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPage;
