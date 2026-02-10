import { useMemo } from 'react'
import {
  useGetNotificationsQuery,
  useMarkAsReadMutation,
  useMarkAllAsReadMutation,
} from '@/store/api/endpoints/notifications'

export function useNotifications() {
  const { data: rawNotifications = [] } = useGetNotificationsQuery(undefined, {
    pollingInterval: 30000,
  })
  const [markAsRead] = useMarkAsReadMutation()
  const [markAllAsRead] = useMarkAllAsReadMutation()

  const { notifications, unreadCount } = useMemo(() => {
    const sorted = [...rawNotifications].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
    const unread = rawNotifications.filter((n) => !n.read).length
    return { notifications: sorted, unreadCount: unread }
  }, [rawNotifications])

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
  }
}
