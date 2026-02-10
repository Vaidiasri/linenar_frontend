import { Notification } from '@/api/notification'
import { formatDistanceToNow } from 'date-fns'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { MessageSquare, CheckCircle, AlertCircle } from 'lucide-react'

interface NotificationItemProps {
  notification: Notification
  onRead: (id: string) => void
}

export function NotificationItem({ notification, onRead }: NotificationItemProps) {
  const Icon =
    {
      comment_created: MessageSquare,
      issue_assigned: AlertCircle,
      issue_status_changed: CheckCircle,
    }[notification.type] || AlertCircle

  return (
    <Link
      to={`/issues/${notification.issue_id}`}
      onClick={() => !notification.read && onRead(notification.id)}
      className={cn(
        'flex gap-3 p-3 text-sm hover:bg-accent/50 transition-colors relative group',
        !notification.read && 'bg-accent/10'
      )}
    >
      <div
        className={cn(
          'mt-0.5 h-2 w-2 rounded-full bg-primary shrink-0 transition-opacity',
          notification.read && 'opacity-0'
        )}
      />

      <div className="flex-1 space-y-1">
        <div className="flex items-center gap-2 text-foreground">
          <Icon className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">{notification.title}</span>
        </div>
        <p className="text-muted-foreground line-clamp-2">{notification.message}</p>
        <p className="text-xs text-muted-foreground">
          {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
        </p>
      </div>
    </Link>
  )
}
