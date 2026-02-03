import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useUpdateIssue } from '@/hooks/use-issues'
import { useNavigate } from 'react-router-dom'

interface IssueItemProps {
  id: string
  title: string
  status: 'in-progress' | 'todo' | 'done'
  priority: 'high' | 'medium' | 'low'
  assignee: string
  teamName?: string
}

export function IssueItem({ id, title, status, priority, assignee, teamName }: IssueItemProps) {
  const { mutate: updateIssue } = useUpdateIssue()
  const navigate = useNavigate()

  const handleStatusChange = (newStatus: 'todo' | 'in_progress' | 'done') => {
    // Map frontend 'in-progress' to backend 'in_progress' if needed,
    // but here we are receiving backend-compatible values from the dropdown options
    updateIssue({ id, data: { status: newStatus } })
  }

  const handlePriorityChange = (newPriority: 1 | 2 | 3) => {
    updateIssue({ id, data: { priority: newPriority } })
  }

  const handleTitleClick = () => {
    navigate(`/issues/${id}`)
  }

  const statusConfig = {
    'in-progress': {
      borderColor: 'border-orange-500/20',
      bgColor: 'bg-orange-500/10',
      dotColor: 'bg-orange-500',
      label: 'In Progress',
      value: 'in_progress' as const,
    },
    todo: {
      borderColor: 'border-blue-500/20',
      bgColor: 'bg-blue-500/10',
      dotColor: 'bg-blue-500/50',
      label: 'Todo',
      value: 'todo' as const,
    },
    done: {
      borderColor: 'border-zinc-500/20',
      bgColor: 'bg-zinc-500/10',
      dotColor: 'bg-transparent',
      label: 'Done',
      value: 'done' as const,
    },
  }

  const priorityConfig = {
    high: { color: 'text-red-500', bgColor: 'bg-red-500/10', label: 'High', value: 1 as const },
    medium: {
      color: 'text-orange-500',
      bgColor: 'bg-transparent',
      label: 'Medium',
      value: 2 as const,
    },
    low: { color: 'text-zinc-500', bgColor: 'bg-transparent', label: 'Low', value: 3 as const },
  }

  // Handle mismatch between prop 'in-progress' and backend 'in_progress'
  const config = statusConfig[status] || statusConfig['todo']
  const priorityStyle = priorityConfig[priority] || priorityConfig['low']
  const isDone = status === 'done'

  return (
    <div className="flex items-center gap-4 group">
      <div className="flex items-center gap-2 min-w-[80px]">
        <span className="text-xs text-muted-foreground font-mono">
          #{id.slice(0, 5).toUpperCase()}
        </span>
      </div>

      <StatusDropdown config={config} isDone={isDone} onStatusChange={handleStatusChange} />

      <div className="flex-1 min-w-0">
        <p
          className={`text-sm font-medium truncate group-hover:text-primary transition-colors cursor-pointer ${
            isDone ? 'text-muted-foreground line-through' : ''
          }`}
          onClick={handleTitleClick}
        >
          {title}
        </p>
      </div>

      <div className="flex items-center gap-2 text-muted-foreground">
        {teamName && (
          <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-muted/50 border border-border">
            {teamName}
          </span>
        )}

        <PriorityDropdown
          priority={priority}
          priorityStyle={priorityStyle}
          onPriorityChange={handlePriorityChange}
        />

        <div className="size-5 rounded-full bg-muted flex items-center justify-center text-[10px] font-medium">
          {assignee}
        </div>
      </div>
    </div>
  )
}

interface StatusConfig {
  borderColor: string
  bgColor: string
  dotColor: string
  label: string
  value: 'in_progress' | 'todo' | 'done'
}

interface PriorityStyle {
  color: string
  bgColor: string
  label: string
  value: number
}

function StatusDropdown({
  config,
  isDone,
  onStatusChange,
}: {
  config: StatusConfig
  isDone: boolean
  onStatusChange: (status: 'todo' | 'in_progress' | 'done') => void
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <div
          className={`size-4 rounded-full border-2 ${config.borderColor} ${config.bgColor} flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity`}
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
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem onClick={() => onStatusChange('todo')}>Todo</DropdownMenuItem>
        <DropdownMenuItem onClick={() => onStatusChange('in_progress')}>
          In Progress
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onStatusChange('done')}>Done</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function PriorityDropdown({
  priority,
  priorityStyle,
  onPriorityChange,
}: {
  priority: 'high' | 'medium' | 'low'
  priorityStyle: PriorityStyle
  onPriorityChange: (priority: 1 | 2 | 3) => void
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <div
          className={`size-5 flex items-center justify-center ${priorityStyle.color} ${
            priorityStyle.bgColor
          } ${priority === 'high' ? 'rounded-full' : ''} cursor-pointer hover:bg-muted/50 rounded-sm`}
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
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onPriorityChange(1)}>High</DropdownMenuItem>
        <DropdownMenuItem onClick={() => onPriorityChange(2)}>Medium</DropdownMenuItem>
        <DropdownMenuItem onClick={() => onPriorityChange(3)}>Low</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
