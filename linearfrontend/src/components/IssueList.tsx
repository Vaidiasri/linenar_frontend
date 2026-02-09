import { Issue } from '@/api/issue'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { format } from 'date-fns'

interface IssueListProps {
  issues: Issue[]
}

export function IssueList({ issues }: IssueListProps) {
  if (!issues.length) {
    return <div className="p-8 text-center text-muted-foreground">No issues found</div>
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Assignee</TableHead>
            <TableHead className="text-right">Created</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {issues.map((issue) => (
            <TableRow key={issue.id}>
              <TableCell className="font-medium">
                {issue.team?.key
                  ? `${issue.team.key}-${issue.id.slice(0, 4)}`
                  : issue.id.slice(0, 6)}
              </TableCell>
              <TableCell>{issue.title}</TableCell>
              <TableCell>
                <Badge variant="outline">{issue.status.replace('_', ' ')}</Badge>
              </TableCell>
              <TableCell>
                <PriorityBadge priority={issue.priority} />
              </TableCell>
              <TableCell>
                {issue.assignee ? (
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={issue.assignee.avatar_url || undefined} />
                      <AvatarFallback>{issue.assignee.full_name?.[0] || 'U'}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{issue.assignee.full_name}</span>
                  </div>
                ) : (
                  <span className="text-muted-foreground">-</span>
                )}
              </TableCell>
              <TableCell className="text-right text-muted-foreground">
                {format(new Date(issue.created_at), 'MMM d')}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

function PriorityBadge({ priority }: { priority: number }) {
  const map: Record<number, { label: string; class: string }> = {
    1: { label: 'High', class: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' },
    2: {
      label: 'Medium',
      class: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
    },
    3: { label: 'Low', class: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
    0: {
      label: 'None',
      class: 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-500',
    },
  }

  const config = map[priority] || map[0]

  return (
    <Badge variant="secondary" className={config.class}>
      {config.label}
    </Badge>
  )
}
