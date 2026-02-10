import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import type { Activity } from '@/api/issue'
import { formatDistanceToNow } from 'date-fns'

interface ActivityItemProps {
  activity: Activity
}

const messageRenderers: Record<string, (a: Activity) => React.ReactNode> = {
  created: () => 'created this issue',
  status_change: (a) => (
    <span>
      changed status from <span className="font-medium">{a.old_value}</span> to{' '}
      <span className="font-medium">{a.new_value}</span>
    </span>
  ),
  priority_change: (a) => (
    <span>
      changed priority from <span className="font-medium">{a.old_value}</span> to{' '}
      <span className="font-medium">{a.new_value}</span>
    </span>
  ),
  assignee_change: (a) => <span>{a.new_value ? `assigned to ${a.new_value}` : 'unassigned'}</span>,
}

export function ActivityItem({ activity }: ActivityItemProps) {
  const user = activity.user
  const timeAgo = formatDistanceToNow(new Date(activity.created_at), { addSuffix: true })

  if (activity.type === 'comment') return null // Comments are handled separately

  const renderMessage = messageRenderers[activity.type] || (() => 'updated the issue')

  return (
    <div className="flex gap-3 py-3">
      <Avatar className="h-6 w-6 mt-0.5">
        <AvatarImage src={user?.avatar_url || ''} />
        <AvatarFallback className="text-[10px]">{user?.full_name?.[0] || 'U'}</AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-1">
        <div className="text-sm text-foreground">
          <span className="font-semibold mr-1">{user?.full_name || 'Unknown User'}</span>
          <span className="text-muted-foreground">{renderMessage(activity)}</span>
        </div>
        <div className="text-xs text-muted-foreground">{timeAgo}</div>
      </div>
    </div>
  )
}
