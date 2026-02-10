import { useParams, useNavigate } from 'react-router-dom'
import { useGetIssuesQuery } from '@/store/api/endpoints/issues'
import { useLinearViewer } from '@/hooks/use-linear-viewer'
import { KanbanBoard } from '@/components/KanbanBoard'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Disc, UserCircle, Clock } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

export default function ViewDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: viewer } = useLinearViewer()
  const { data: issues, isLoading } = useGetIssuesQuery()

  if (isLoading) {
    return (
      <div className="p-4">
        <Skeleton className="h-48 w-full" />
      </div>
    )
  }

  let filteredIssues = issues || []
  let title = 'View'
  let Icon = Disc

  if (id === 'my-issues') {
    title = 'My Issues'
    Icon = Disc
    if (viewer) {
      filteredIssues = filteredIssues.filter((issue) => issue.assignee_id === viewer.id)
    }
  } else if (id === 'created') {
    title = 'Created by Me'
    Icon = UserCircle
    // Assuming backend doesn't return creator_id yet or we don't have it in Issue type
    // For now, let's just show all issues or empty if we can't filter
    // To implement real "Created by Me", we need creator_id in Issue model
    // filteredIssues = filteredIssues.filter(issue => issue.creator_id === viewer.id)
    filteredIssues = [] // Placeholder until backend supports it
  } else if (id === 'recent') {
    title = 'Recently Updated'
    Icon = Clock
    filteredIssues = [...filteredIssues].sort(
      (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    )
  }

  return (
    <div className="flex flex-1 flex-col h-full overflow-hidden">
      <header className="flex items-center gap-2 border-b px-4 py-3">
        <Button variant="ghost" size="icon" onClick={() => navigate('/views')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <Icon className="h-5 w-5 text-muted-foreground" />
        <h1 className="text-lg font-semibold">{title}</h1>
      </header>

      <div className="flex-1 overflow-x-auto p-4">
        <KanbanBoard issues={filteredIssues} />
      </div>
    </div>
  )
}
