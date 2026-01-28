interface IssueItemProps {
  id: string
  title: string
  status: 'in-progress' | 'todo' | 'done'
  priority: 'high' | 'medium' | 'low'
  assignee: string
}

export function IssueItem({ id, title, status, priority, assignee }: IssueItemProps) {
  const statusConfig = {
    'in-progress': {
      borderColor: 'border-orange-500/20',
      bgColor: 'bg-orange-500/10',
      dotColor: 'bg-orange-500',
    },
    todo: {
      borderColor: 'border-blue-500/20',
      bgColor: 'bg-blue-500/10',
      dotColor: 'bg-blue-500/50',
    },
    done: {
      borderColor: 'border-zinc-500/20',
      bgColor: 'bg-zinc-500/10',
      dotColor: 'bg-transparent',
    },
  }

  const priorityConfig = {
    high: { color: 'text-red-500', bgColor: 'bg-red-500/10' },
    medium: { color: 'text-orange-500', bgColor: 'bg-transparent' },
    low: { color: 'text-zinc-500', bgColor: 'bg-transparent' },
  }

  const config = statusConfig[status]
  const priorityStyle = priorityConfig[priority]
  const isDone = status === 'done'

  return (
    <div className="flex items-center gap-4 group cursor-pointer">
      <div className="flex items-center gap-2 min-w-[80px]">
        <span className="text-xs text-muted-foreground font-mono">{id}</span>
      </div>
      <div
        className={`size-4 rounded-full border-2 ${config.borderColor} ${config.bgColor} flex items-center justify-center`}
      >
        {isDone ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-muted-foreground"
          >
            <path d="M5 12h14" />
          </svg>
        ) : (
          <div className={`size-1.5 rounded-full ${config.dotColor}`} />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p
          className={`text-sm font-medium truncate group-hover:text-primary transition-colors ${isDone ? 'text-muted-foreground line-through' : ''}`}
        >
          {title}
        </p>
      </div>
      <div className="flex items-center gap-2 text-muted-foreground">
        <div
          className={`size-5 flex items-center justify-center ${priorityStyle.color} ${priorityStyle.bgColor} ${priority === 'high' ? 'rounded-full' : ''}`}
        >
          {priority === 'high' && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 20h.01" />
              <path d="M12 14V4" />
              <path d="M12 14h.01" />
            </svg>
          )}
          {priority === 'medium' && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="5" width="20" height="14" rx="2" />
              <path d="M2 10h20" />
            </svg>
          )}
          {priority === 'low' && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 20h.01" />
              <path d="M12 14V4" />
              <path d="M12 14h.01" />
            </svg>
          )}
        </div>
        <div className="size-5 rounded-full bg-muted flex items-center justify-center text-[10px] font-medium">
          {assignee}
        </div>
      </div>
    </div>
  )
}
