import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Issue } from '@/api/issue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface KanbanCardProps {
  issue: Issue
}

export function KanbanCard({ issue }: KanbanCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: issue.id,
    data: {
      type: 'Issue',
      issue,
    },
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Card className="cursor-grab active:cursor-grabbing hover:ring-2 hover:ring-primary/20">
        <CardHeader className="p-3 pb-0">
          <div className="flex justify-between items-start">
            <CardTitle className="text-sm font-medium leading-tight">{issue.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-3 pt-2">
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground font-mono">
                {issue.team?.key
                  ? `${issue.team.key}-${issue.id.slice(0, 4)}`
                  : issue.id.slice(0, 6)}
              </span>
              <PriorityBadge priority={issue.priority} />
            </div>
            {issue.assignee && (
              <Avatar className="h-5 w-5">
                <AvatarImage src={issue.assignee.avatar_url || undefined} />
                <AvatarFallback className="text-[10px]">
                  {issue.assignee.full_name?.[0] || 'U'}
                </AvatarFallback>
              </Avatar>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function PriorityBadge({ priority }: { priority: number }) {
  const map: Record<number, { label: string; class: string }> = {
    1: {
      label: 'High',
      class:
        'border-red-200 text-red-700 bg-red-50 dark:bg-red-900/20 dark:text-red-400 dark:border-red-900/30',
    },
    2: {
      label: 'Mid',
      class:
        'border-orange-200 text-orange-700 bg-orange-50 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-900/30',
    },
    3: {
      label: 'Low',
      class:
        'border-blue-200 text-blue-700 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-900/30',
    },
    0: {
      label: 'None',
      class:
        'border-slate-200 text-slate-500 bg-slate-50 dark:bg-slate-800 dark:text-slate-500 dark:border-slate-700',
    },
  }

  const config = map[priority] || map[0]

  return (
    <Badge variant="outline" className={`text-[10px] h-5 px-1 font-normal ${config.class}`}>
      {config.label}
    </Badge>
  )
}
